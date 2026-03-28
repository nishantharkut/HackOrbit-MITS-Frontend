import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import TerminalCursor from './components/TerminalCursor';
import HeroSection from './components/HeroSection';
import MarqueeStrip from './components/MarqueeStrip';
import AboutSection from './components/AboutSection';
import TracksSection from './components/TracksSection';
import TimelineSection from './components/TimelineSection';
import PrizesSection from './components/PrizesSection';
import FAQSection from './components/FAQSection';
import RegisterSection from './components/RegisterSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="dark">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.4s ease' }}>
        <Navbar />
        <HeroSection show={!loading} />
        <MarqueeStrip />
        <AboutSection />
        <MarqueeStrip />
        <TracksSection />
        <MarqueeStrip />
        <TimelineSection />
        <MarqueeStrip />
        <PrizesSection />
        <MarqueeStrip />
        <FAQSection />
        <MarqueeStrip />
        <RegisterSection />
        <Footer />
      </div>

      <TerminalCursor />
    </div>
  );
};

export default App;
