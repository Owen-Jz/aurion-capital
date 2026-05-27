"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface Stat {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 24, prefix: "$", suffix: "B+", label: "Assets Under Management" },
  { value: 5200, prefix: "", suffix: "+", label: "Operating Employees" },
  { value: 35, prefix: "", suffix: "+", label: "Countries Across Five Continents" },
  { value: 17, prefix: "", suffix: "+", label: "Years as Owner-Operators" },
];

function useIntersectionObserver(
  threshold = 0.3
): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    // Immediate check: if element is already in viewport (back navigation), fire now
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      observer.unobserve(element);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

function AnimatedNumber({
  value,
  prefix = "",
  suffix,
  isVisible,
}: {
  value: number;
  prefix?: string;
  suffix: string;
  isVisible: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = performance.now();

    function step(timestamp: number) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a decelerating feel
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCurrent(value);
      }
    }

    requestAnimationFrame(step);
  }, [value]);

  useEffect(() => {
    if (isVisible) {
      animate();
    }
  }, [isVisible, animate]);

  const formatted =
    value >= 1000
      ? current.toLocaleString("en-US")
      : current.toString();

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  const [sectionRef, isVisible] = useIntersectionObserver(0.2);

  return (
    <section
      ref={sectionRef}
      className="relative bg-surface border-t border-b border-border"
      aria-label="Key statistics"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative flex flex-col items-center text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0)"
                  : "translateY(24px)",
                transition: `opacity 0.7s ease-out ${index * 150}ms, transform 0.7s ease-out ${index * 150}ms`,
              }}
            >
              {/* Gold accent line */}
              <div
                className="mb-6 h-px w-12 bg-gold transition-all duration-700 ease-out group-hover:w-20"
                aria-hidden="true"
              />

              {/* Number */}
              <p className="font-serif text-4xl font-bold tracking-tight text-gold sm:text-5xl">
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </p>

              {/* Label */}
              <p className="mt-3 text-sm font-medium leading-relaxed tracking-wide text-muted sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-14 text-center text-xs leading-relaxed tracking-wide text-muted/70">
          As of March 31, 2025. Includes assets under management and advisement.
        </p>
      </div>
    </section>
  );
}
