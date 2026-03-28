import { useState, useEffect, useRef } from 'react';
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
import SponsorsSection from './components/SponsorsSection';
import CommunitySection from './components/CommunitySection';
import RegisterSection from './components/RegisterSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', onLenisScroll);

    const onTick = (time: number) => lenis.raf(time * 1000);

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.off('scroll', onLenisScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (loading) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      lenisRef.current?.stop();
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      return;
    }

    body.style.overflow = '';
    html.style.overflow = '';
    lenisRef.current?.start();

    return () => {
      body.style.overflow = '';
      html.style.overflow = '';
    };
  }, [loading]);

  useEffect(() => {
    if (loading) return;

    const raf = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [loading]);

  return (
    <div>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.4s ease', pointerEvents: loading ? 'none' : 'auto' }}>
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
        <SponsorsSection />
        <MarqueeStrip />
        <CommunitySection />
        <MarqueeStrip />
        <RegisterSection />
        <Footer />
      </div>

      <TerminalCursor />
    </div>
  );
};

export default App;
