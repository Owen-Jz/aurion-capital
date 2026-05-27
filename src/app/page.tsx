import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Impact from "@/components/Impact";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Statistics />
        <About />
        <Capabilities />
        <Impact />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
