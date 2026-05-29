"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Lightweight click-to-play video card.
 *
 * Loads only a poster image until the user clicks play, then lazily mounts
 * an iframe (or HTML5 video). Designed for marketing pages where many
 * explainer videos coexist and autoloading would tank page weight.
 */

interface VideoPlayerProps {
  /** YouTube embed URL (https://www.youtube.com/embed/...) or direct mp4 URL */
  src: string;
  poster: string;
  title: string;
  duration?: string;
  eyebrow?: string;
  aspect?: "video" | "square";
}

export default function VideoPlayer({
  src,
  poster,
  title,
  duration,
  eyebrow,
  aspect = "video",
}: VideoPlayerProps) {
  const [open, setOpen] = useState(false);
  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full overflow-hidden rounded-sm border transition-all"
        style={{
          borderColor: "var(--border)",
          background: "var(--surface)",
        }}
      >
        <div
          className="relative"
          style={{
            aspectRatio: aspect === "video" ? "16/9" : "1/1",
            backgroundImage: `url(${poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0 transition-opacity"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,15,30,0) 0%, rgba(10,15,30,0.55) 100%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(201,168,76,0.95)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
              }}
            >
              <Play size={26} fill="#0a0f1e" stroke="#0a0f1e" />
            </motion.div>
          </div>
          {eyebrow && (
            <div className="absolute top-4 left-4">
              <span
                className="inline-block text-[10px] uppercase tracking-[0.22em] px-2 py-1"
                style={{ background: "rgba(10,15,30,0.6)", color: "#c9a84c" }}
              >
                {eyebrow}
              </span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
            <p className="font-serif text-xl font-bold text-white">{title}</p>
            {duration && (
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                Watch · {duration}
              </p>
            )}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(5,8,16,0.92)" }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-white font-serif text-lg">{title}</p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close video"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <X size={16} color="white" />
                </button>
              </div>
              <div
                className="relative w-full overflow-hidden rounded-sm"
                style={{ aspectRatio: "16/9", background: "#000" }}
              >
                {isYouTube ? (
                  <iframe
                    src={`${src}${src.includes("?") ? "&" : "?"}autoplay=1&rel=0&modestbranding=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <video
                    src={src}
                    controls
                    autoPlay
                    poster={poster}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
