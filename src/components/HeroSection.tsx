import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { animate, createSpring } from 'animejs';

gsap.registerPlugin(ScrollTrigger, SplitText);

const TITLE_TEXT = 'HACKORBIT';
const TAGLINE_TEXT = '48 hours. Real problems. No limits.';
const SCRAMBLE_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

const statTargets = [
  { value: 25000, prefix: '₹', suffix: '+', label: 'prize pool' },
  { value: 500, prefix: '', suffix: '+', label: 'participants' },
  { value: 48, prefix: '', suffix: '', label: 'hours' },
];

const HeroSection = ({ show }: { show: boolean }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const registerDotRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const [statValues, setStatValues] = useState<string[]>(['₹0+', '0+', '0']);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (!gridRef.current) return;

      const xPct = event.clientX / window.innerWidth - 0.5;
      const yPct = event.clientY / window.innerHeight - 0.5;

      gsap.to(gridRef.current, {
        x: xPct * 18,
        y: yPct * 14,
        duration: 1.2,
        ease: 'power1.out',
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    if (!show || !sectionRef.current) return;

    const splitInstances: SplitText[] = [];
    const titleChars: HTMLSpanElement[] = [];

    const ctx = gsap.context(() => {
      const promptSplit = new SplitText(promptRef.current, { type: 'chars' });
      const taglineSplit = new SplitText(taglineRef.current, { type: 'words' });
      splitInstances.push(promptSplit, taglineSplit);

      gsap.set([yearRef.current, ctaRowRef.current, pillsRef.current], { opacity: 0 });
      gsap.set(yearRef.current, { y: 8 });
      gsap.set(ctaRowRef.current, { y: 14 });
      gsap.set(pillsRef.current, { y: 10 });
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'center center' });
      gsap.set(promptRef.current, { opacity: 1, y: 0 });

      const chars = titleRef.current?.querySelectorAll<HTMLSpanElement>('.hero-char') ?? [];
      chars.forEach((char) => {
        gsap.set(char, { opacity: 0 });
        titleChars.push(char);
      });

      gsap.set(taglineSplit.words, { yPercent: 105, opacity: 1 });

      const timeline = gsap.timeline();

      timeline.from(promptSplit.chars, {
        opacity: 0,
        duration: 0.01,
        stagger: 0.022,
        ease: 'none',
      }, 0);

      timeline.to(promptRef.current, {
        opacity: 0.25,
        y: -36,
        duration: 0.5,
      }, 1.2);

      titleChars.forEach((char, index) => {
        const target = TITLE_TEXT[index];

        timeline.call(() => {
          gsap.set(char, { opacity: 1 });

          const start = performance.now();
          const duration = 400;

          const scramble = () => {
            const elapsed = performance.now() - start;
            if (elapsed >= duration) {
              char.textContent = target;
              return;
            }

            char.textContent = SCRAMBLE_SET[Math.floor(Math.random() * SCRAMBLE_SET.length)];
            requestAnimationFrame(scramble);
          };

          scramble();
        }, [], 1.6 + index * 0.055);
      });

      timeline.to(yearRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
      }, 2.5);

      timeline.to(dividerRef.current, {
        scaleX: 1,
        duration: 0.4,
      }, 2.55);

      timeline.to(taglineSplit.words, {
        yPercent: 0,
        duration: 0.34,
        stagger: 0.055,
        ease: 'power2.out',
      }, 2.8);

      timeline.to(ctaRowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
      }, 3.2);

      timeline.to(pillsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
      }, 3.4);

      gsap.to(registerDotRef.current, {
        y: 36,
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: 'power1.inOut',
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          statTargets.forEach((stat, idx) => {
            const obj = { value: 0 };

            gsap.to(obj, {
              value: stat.value,
              duration: 1.2,
              ease: 'expo.out',
              onUpdate: () => {
                setStatValues((prev) => {
                  const next = [...prev];
                  next[idx] = `${stat.prefix}${Math.floor(obj.value).toLocaleString('en-IN')}${stat.suffix}`;
                  return next;
                });
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => {
      splitInstances.forEach((split) => split.revert());
      ctx.revert();
    };
  }, [show]);

  useEffect(() => {
    const primary = primaryBtnRef.current;
    if (!primary) return;

    const spring = createSpring({ stiffness: 280, damping: 16 });

    const handleEnter = () => {
      animate(primary, {
        translateY: -3,
        scale: 1.02,
        duration: spring,
      });
    };

    const handleLeave = () => {
      animate(primary, {
        translateY: 0,
        scale: 1,
        duration: spring,
      });
    };

    primary.addEventListener('mouseenter', handleEnter);
    primary.addEventListener('mouseleave', handleLeave);

    return () => {
      primary.removeEventListener('mouseenter', handleEnter);
      primary.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden"
      style={{ paddingTop: 52 }}
    >
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(to bottom, hsl(var(--border-faint) / 0.03) 0px, transparent 1px, transparent 48px)',
          opacity: 0.6,
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        <p ref={promptRef} className="font-mono font-medium text-[13px] text-text-dim mb-8">
          {'> deploy --event hackorbit --year 2026'}
        </p>

        <h1 ref={titleRef} className="font-display font-bold text-[50px] md:text-[108px] text-text tracking-[-0.01em] leading-none">
          {TITLE_TEXT.split('').map((letter, index) => (
            <span key={`${letter}-${index}`} className="hero-char inline-block">
              {letter}
            </span>
          ))}
        </h1>

        <div ref={yearRef} className="mt-2">
          <span className="font-mono font-semibold text-[16px] text-accent tracking-[6px]">2026</span>
        </div>

        <div
          ref={dividerRef}
          className="my-4 w-[56px] h-px"
          style={{ background: 'hsl(var(--border-neutral) / 0.05)' }}
        />

        <p ref={taglineRef} className="font-body font-light text-[15px] md:text-[20px] text-text-dim max-w-[400px]">
          {TAGLINE_TEXT}
        </p>

        <div ref={ctaRowRef} className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full sm:w-auto">
          <a
            ref={primaryBtnRef}
            href="#register"
            data-cursor="action"
            className="font-display font-semibold text-[14px] tracking-[0.07em] bg-accent text-bg h-12 rounded-[7px] px-7 flex items-center justify-center active:scale-[0.97] w-full sm:w-auto"
          >
            Register Your Team
          </a>
          <a
            href="#tracks"
            data-cursor="action"
            className="font-display font-semibold text-[14px] h-12 rounded-[7px] px-7 flex items-center justify-center transition-all duration-200 text-text-dim hover:text-accent w-full sm:w-auto"
            style={{ border: '1px solid hsl(var(--border-neutral) / 0.05)' }}
          >
            View Themes →
          </a>
        </div>

        <p className="font-body text-[12px] text-text-ghost mt-[10px]">Solo entries welcome · Teams of 2–4</p>

        <div ref={pillsRef} className="flex gap-[14px] mt-6 justify-center flex-wrap">
          {statTargets.map((stat, idx) => (
            <div
              key={stat.label}
              data-cursor="number"
              className="flex flex-col items-center rounded-[6px] px-5 py-[10px]"
              style={{
                background: 'hsl(var(--bg-raised))',
                border: '1px solid hsl(var(--border) / 0.07)',
              }}
            >
              <span
                ref={(el) => {
                  statRefs.current[idx] = el;
                }}
                className="font-mono font-semibold text-[22px] text-accent"
              >
                {statValues[idx]}
              </span>
              <span className="font-body text-[10px] text-text-ghost uppercase tracking-[2px]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="relative w-px h-10" style={{ background: 'hsl(var(--text-ghost))' }}>
          <div ref={registerDotRef} className="absolute w-1 h-1 rounded-full bg-text-ghost left-1/2 -translate-x-1/2 top-0" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[3px] text-text-ghost mt-2">scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
