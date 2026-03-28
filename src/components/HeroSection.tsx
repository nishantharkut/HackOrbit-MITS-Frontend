import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
const TITLE_TEXT = 'HACKORBIT';
const PROMPT_TEXT = '> deploy --event hackorbit --year 2026';
const TAGLINE_WORDS = ['48 hours.', 'Real problems.', 'No limits.'];

const stats = [
  { value: 25000, prefix: '₹', suffix: '+', label: 'prize pool' },
  { value: 500, prefix: '', suffix: '+', label: 'participants' },
  { value: 48, prefix: '', suffix: '', label: 'hours' },
];

const HeroSection = ({ show }: { show: boolean }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Animation state
  const [promptRevealed, setPromptRevealed] = useState(0);
  const [promptDimmed, setPromptDimmed] = useState(false);
  const [titleChars, setTitleChars] = useState<string[]>(TITLE_TEXT.split('').map(() => ''));
  const [titleVisible, setTitleVisible] = useState<boolean[]>(TITLE_TEXT.split('').map(() => false));
  const [showYear, setShowYear] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [wordRevealed, setWordRevealed] = useState<boolean[]>(TAGLINE_WORDS.map(() => false));
  const [showCta, setShowCta] = useState(false);
  const [showPills, setShowPills] = useState(false);
  const [statValues, setStatValues] = useState(stats.map(() => '0'));

  // Parallax grid
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const xPct = e.clientX / window.innerWidth - 0.5;
      const yPct = e.clientY / window.innerHeight - 0.5;
      gsap.to(gridRef.current, { x: xPct * 18, y: yPct * 14, duration: 1.2, ease: 'power1.out' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Main timeline
  useEffect(() => {
    if (!show) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Prompt reveal
      const promptObj = { count: 0 };
      tl.to(promptObj, {
        count: PROMPT_TEXT.length,
        duration: PROMPT_TEXT.length * 0.022,
        ease: 'none',
        onUpdate: () => setPromptRevealed(Math.floor(promptObj.count)),
      }, 0);

      // Prompt dim
      tl.call(() => setPromptDimmed(true), [], 1.2);

      // Title scramble
      TITLE_TEXT.split('').forEach((targetChar, i) => {
        const startTime = 1.6 + i * 0.055;
        let scrambleInterval: ReturnType<typeof setInterval>;

        tl.call(() => {
          setTitleVisible(prev => { const n = [...prev]; n[i] = true; return n; });
          scrambleInterval = setInterval(() => {
            setTitleChars(prev => {
              const n = [...prev];
              n[i] = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
              return n;
            });
          }, 30);

          setTimeout(() => {
            clearInterval(scrambleInterval);
            setTitleChars(prev => { const n = [...prev]; n[i] = targetChar; return n; });
          }, 400);
        }, [], startTime);
      });

      // Year + line
      tl.call(() => setShowYear(true), [], 2.5);
      tl.call(() => setShowLine(true), [], 2.6);

      // Tagline words
      TAGLINE_WORDS.forEach((_, wi) => {
        tl.call(() => {
          setWordRevealed(prev => { const n = [...prev]; n[wi] = true; return n; });
        }, [], 2.8 + wi * 0.055);
      });

      // CTA + Pills
      tl.call(() => setShowCta(true), [], 3.2);
      tl.call(() => setShowPills(true), [], 3.4);

      // Count up stats
      tl.call(() => {
        stats.forEach((stat, i) => {
          const obj = { value: 0 };
          gsap.to(obj, {
            value: stat.value,
            duration: 1.2,
            ease: 'power3.out',
            onUpdate: () => {
              setStatValues(prev => {
                const n = [...prev];
                n[i] = stat.prefix + Math.floor(obj.value).toLocaleString('en-IN') + stat.suffix;
                return n;
              });
            },
          });
        });
      }, [], 3.4);
    });

    return () => ctx.revert();
  }, [show]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden"
      style={{ paddingTop: 52 }}
    >
      {/* Grid bg */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(to bottom, hsl(var(--border-faint) / 0.03) 0px, transparent 1px, transparent 48px)',
          opacity: 0.6,
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Prompt */}
        <div className="font-mono font-medium text-[10px] md:text-[13px] mb-8 transition-all duration-500 px-4 text-center break-all md:break-normal"
          style={{ color: 'hsl(var(--text-dim))', opacity: promptDimmed ? 0.25 : 1, transform: promptDimmed ? 'translateY(-36px)' : 'translateY(0)' }}
        >
          <span>{PROMPT_TEXT.slice(0, promptRevealed)}</span>
          <span style={{ color: 'transparent' }}>{PROMPT_TEXT.slice(promptRevealed)}</span>
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-[50px] md:text-[108px] text-text tracking-[-0.01em] leading-none">
          {TITLE_TEXT.split('').map((_, i) => (
            <span key={i} className="inline-block" style={{ opacity: titleVisible[i] ? 1 : 0 }}>
              {titleChars[i] || '\u00A0'}
            </span>
          ))}
        </h1>

        {/* Year */}
        <div className="mt-2 transition-all duration-400" style={{ opacity: showYear ? 1 : 0, transform: showYear ? 'translateY(0)' : 'translateY(8px)' }}>
          <span className="font-mono font-semibold text-[16px] text-accent tracking-[6px]">2026</span>
        </div>

        {/* Line */}
        <div
          className="my-4 origin-center transition-transform duration-400"
          style={{ width: 56, height: 1, background: 'hsl(var(--border-neutral) / 0.05)', transform: showLine ? 'scaleX(1)' : 'scaleX(0)' }}
        />

        {/* Tagline */}
        <div className="font-body font-light text-[15px] md:text-[20px] text-text-dim max-w-[400px]">
          {TAGLINE_WORDS.map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden mr-1.5">
              <span
                className="inline-block transition-transform duration-400"
                style={{ transform: wordRevealed[wi] ? 'translateY(0)' : 'translateY(105%)' }}
              >
                {word}
              </span>
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 transition-all duration-400 px-6 w-full sm:w-auto" style={{ opacity: showCta ? 1 : 0, transform: showCta ? 'translateY(0)' : 'translateY(14px)' }}>
          <a
            href="#register"
            data-cursor="action"
            className="font-display font-semibold text-[14px] tracking-[0.07em] bg-accent text-bg h-12 rounded-[7px] px-7 flex items-center justify-center transition-transform hover:-translate-y-[3px] hover:scale-[1.02] active:scale-[0.97] w-full sm:w-auto"
          >
            Register Your Team
          </a>
          <a
            href="#tracks"
            data-cursor="action"
            className="font-display font-semibold text-[14px] h-12 rounded-[7px] px-7 flex items-center justify-center transition-all text-text-dim hover:text-accent w-full sm:w-auto"
            style={{ border: '1px solid hsl(var(--border-neutral) / 0.05)' }}
          >
            View Themes&nbsp;→
          </a>
        </div>

        <p className="font-body text-[12px] text-text-ghost mt-3">
          Solo entries welcome · Teams of 2–4
        </p>

        {/* Stat pills */}
        <div className="flex gap-3.5 mt-6 justify-center flex-wrap transition-all duration-400" style={{ opacity: showPills ? 1 : 0, transform: showPills ? 'translateY(0)' : 'translateY(10px)' }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              data-cursor="number"
              className="flex flex-col items-center px-5 py-2.5 rounded-[6px]"
              style={{
                background: 'hsl(var(--bg-raised))',
                border: '1px solid hsl(var(--border) / 0.07)',
              }}
            >
              <span className="font-mono font-semibold text-[22px] text-accent">
                {statValues[i]}
              </span>
              <span className="font-body text-[10px] text-text-ghost uppercase tracking-[2px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="relative w-px h-10" style={{ background: 'hsl(var(--text-ghost))' }}>
          <div
            className="absolute w-1 h-1 rounded-full bg-text-ghost left-1/2 -translate-x-1/2"
            style={{ animation: 'scrollDot 1.8s ease-in-out infinite' }}
          />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[3px] text-text-ghost mt-2">scroll</span>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%, 100% { top: 0; }
          50% { top: 36px; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
