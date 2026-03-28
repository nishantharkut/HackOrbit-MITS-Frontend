import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [buildNum, setBuildNum] = useState(247);
  const [status, setStatus] = useState<'PASSING' | 'RUNNING'>('PASSING');
  const digitRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -60px',
        onUpdate: (self) => {
          if (!navRef.current) return;
          if (self.scroll() > 60) {
            navRef.current.style.background = 'hsla(220,22%,6%,0.88)';
            navRef.current.style.backdropFilter = 'blur(16px) saturate(1.3)';
            navRef.current.style.borderBottomColor = 'hsl(var(--border) / 0.07)';
          } else {
            navRef.current.style.background = 'transparent';
            navRef.current.style.backdropFilter = 'none';
            navRef.current.style.borderBottomColor = 'transparent';
          }
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // Blink the CI dot
  useEffect(() => {
    const dot = document.getElementById('ci-dot');
    if (!dot) return;
    const anim = gsap.to(dot, { opacity: 0.3, repeat: -1, yoyo: true, duration: 0.9 });
    return () => { anim.kill(); };
  }, []);

  // Build number incrementer
  useEffect(() => {
    const tick = () => {
      setBuildNum(prev => prev + 1);
      setStatus('RUNNING');
      setTimeout(() => setStatus('PASSING'), 1800);
    };

    const getDelay = () => (Math.random() * 8 + 18) * 1000;
    let timeout: ReturnType<typeof setTimeout>;

    const schedule = () => {
      timeout = setTimeout(() => {
        tick();
        schedule();
      }, getDelay());
    };
    schedule();

    return () => clearTimeout(timeout);
  }, []);

  const buildStr = String(buildNum).padStart(6, '0');

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10"
      style={{
        height: 52,
        borderBottom: '1px solid transparent',
        transition: 'background 0.45s cubic-bezier(0.16,1,0.3,1), border-color 0.45s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Wordmark */}
      <span className="font-display font-bold text-[15px] tracking-[0.1em] text-text">
        HACKORBIT
      </span>

      {/* CI Status - hidden on mobile */}
      <div className="hidden md:flex items-center gap-3 font-mono text-[10px]">
        <span className="text-text-ghost">BUILD #</span>
        <span className="text-text-dim tracking-wide" ref={el => { digitRefs.current[0] = el; }}>
          {buildStr}
        </span>
        <span id="ci-dot" className="text-accent">●</span>
        <span
          className="font-mono font-medium tracking-[2px]"
          style={{ color: status === 'PASSING' ? 'hsl(var(--accent))' : 'hsl(var(--warning))' }}
        >
          {status}
        </span>
      </div>

      {/* CTA */}
      <a
        href="#register"
        data-cursor="action"
        className="font-display font-semibold text-[13px] bg-accent text-bg px-4 flex items-center rounded-[5px] transition-all hover:brightness-110 active:scale-[0.97]"
        style={{ height: 34 }}
      >
        Register&nbsp;&nbsp;→
      </a>
    </nav>
  );
};

export default Navbar;
