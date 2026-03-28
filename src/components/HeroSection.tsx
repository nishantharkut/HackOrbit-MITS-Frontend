import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { animate, spring } from 'animejs';
import HeroGlobe from './HeroGlobe';
import DecryptedText from './DecryptedText';

const TITLE_TEXT = 'HACKORBIT';
const TAGLINE_TEXT = '48 hours. Real problems. No limits.';

const HeroSection = ({ show }: { show: boolean }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRowRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const helperRef = useRef<HTMLParagraphElement>(null);
  const globePanelRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const [titleDecryptReady, setTitleDecryptReady] = useState(false);
  const [titleDecryptKey, setTitleDecryptKey] = useState(0);

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

    let cancelled = false;
    const splitInstances: SplitText[] = [];

    setTitleDecryptReady(false);
    setTitleDecryptKey((previous) => previous + 1);
    const setup = async () => {
      if ('fonts' in document) {
        await (document as Document & { fonts: FontFaceSet }).fonts.ready;
      }
      if (cancelled) return;

      const ctx = gsap.context(() => {
        const promptSplit = new SplitText(promptRef.current, { type: 'chars' });
        const taglineSplit = new SplitText(taglineRef.current, { type: 'words' });
        splitInstances.push(promptSplit, taglineSplit);

        const globeRevealItems = Array.from(globePanelRef.current?.querySelectorAll<HTMLElement>('.globe-reveal') ?? []);

        gsap.set([metaRowRef.current, ctaRowRef.current, helperRef.current], {
          opacity: 0,
        });
        gsap.set(metaRowRef.current, { y: 14 });
        gsap.set([ctaRowRef.current, helperRef.current], { y: 20 });
        gsap.set(promptRef.current, { opacity: 1, y: 0 });
        gsap.set(taglineRef.current, { opacity: 0 });
        gsap.set(taglineSplit.words, { yPercent: 115, opacity: 0 });
        gsap.set(globePanelRef.current, {
          opacity: 0,
          x: 36,
          y: 14,
          rotateY: -16,
          scale: 0.96,
          transformOrigin: 'left center',
        });
        gsap.set(globeRevealItems, { opacity: 0, y: 18 });

        const timeline = gsap.timeline();

        timeline.from(promptSplit.chars, {
          opacity: 0,
          duration: 0.01,
          stagger: 0.022,
          ease: 'none',
        });

        timeline.to(promptRef.current, {
          opacity: 0.28,
          y: -28,
          duration: 0.45,
        }, 1.05);

        timeline.call(() => {
          if (cancelled) return;
          setTitleDecryptReady(true);
        }, [], 1.14);

        timeline.to(metaRowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: 'power2.out',
        }, 2.0);

        timeline.to(globePanelRef.current, {
          opacity: 1,
          x: 0,
          y: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
        }, 2.0);

        timeline.to(taglineRef.current, {
          opacity: 1,
          duration: 0.01,
          ease: 'none',
        }, 2.17);

        timeline.to(taglineSplit.words, {
          yPercent: 0,
          opacity: 1,
          duration: 0.36,
          stagger: 0.05,
          ease: 'power2.out',
        }, 2.18);

        timeline.to(ctaRowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: 'power2.out',
        }, 2.34);

        timeline.to(helperRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        }, 2.46);

        timeline.to(globeRevealItems, {
          opacity: 1,
          y: 0,
          duration: 0.48,
          stagger: 0.08,
          ease: 'power2.out',
        }, 2.56);
      }, sectionRef);

      if (cancelled) {
        splitInstances.forEach((split) => split.revert());
        ctx.revert();
        return;
      }

      return () => {
        splitInstances.forEach((split) => split.revert());
        ctx.revert();
      };
    };

    let dispose: (() => void) | void;
    void setup().then((cleanup) => {
      dispose = cleanup;
    });

    return () => {
      cancelled = true;
      if (dispose) dispose();
    };
  }, [show]);

  useEffect(() => {
    const primary = primaryBtnRef.current;
    if (!primary) return;

    const springEase = spring({ stiffness: 280, damping: 16 });

    const handleEnter = () => {
      animate(primary, {
        translateY: -3,
        scale: 1.02,
        ease: springEase,
      });
    };

    const handleLeave = () => {
      animate(primary, {
        translateY: 0,
        scale: 1,
        ease: springEase,
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
      className="relative isolate min-h-screen overflow-hidden pb-24 pt-[88px] md:pt-[96px]"
    >
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'none',
          opacity: 1,
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-6xl items-center px-6 md:px-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.03fr)_minmax(330px,0.97fr)] xl:gap-14">
          <div className="max-w-[640px]">
            <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <p
                ref={promptRef}
                className="font-mono text-[13px] font-medium text-text-dim"
              >
                {'> deploy --event hackorbit --year 2026'}
              </p>
            </div>

            <h1
              ref={titleRef}
              className={`mt-4 font-display text-[58px] font-bold leading-[0.92] tracking-[-0.045em] text-text transition-opacity duration-300 sm:text-[78px] lg:text-[112px] ${titleDecryptReady ? 'opacity-100' : 'opacity-0'}`}
            >
              {titleDecryptReady ? (
                <DecryptedText
                  key={titleDecryptKey}
                  text={TITLE_TEXT}
                  animateOn="view"
                  speed={44}
                  maxIterations={15}
                  sequential
                  revealDirection="start"
                  className="text-text"
                  encryptedClassName="text-text-dim"
                  parentClassName="inline-block"
                />
              ) : (
                <span className="inline-block">{TITLE_TEXT}</span>
              )}
            </h1>

            <div ref={metaRowRef} className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.46em] text-accent sm:text-[13px]">
                2026
              </span>
              <span className="h-px w-10 bg-border-neutral/70" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-ghost sm:text-[11px]">
                mission node / MITS Gwalior
              </span>
            </div>

            <p
              ref={taglineRef}
              className="mt-9 max-w-[24ch] font-body text-[22px] font-light leading-[1.05] text-text-dim sm:max-w-none sm:whitespace-nowrap sm:text-[28px]"
            >
              {TAGLINE_TEXT}
            </p>

            <div ref={ctaRowRef} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                ref={primaryBtnRef}
                href="#register"
                data-cursor="action"
                className="group flex h-12 items-center justify-center rounded-[7px] px-7 font-display text-[14px] font-semibold tracking-[0.08em] text-bg active:scale-[0.97] sm:w-auto"
                style={{
                  background: 'hsl(var(--accent))',
                }}
              >
                Register Your Team
              </a>
              <a
                href="#tracks"
                data-cursor="action"
                className="flex h-12 items-center justify-center rounded-[7px] px-7 font-display text-[14px] font-semibold text-text-dim transition-all duration-200 hover:border-accent hover:text-accent sm:w-auto"
                style={{ border: '1px solid hsl(var(--border-neutral) / 0.5)' }}
              >
                View Themes -&gt;
              </a>
            </div>

            <p ref={helperRef} className="mt-3 font-body text-[12px] text-text-ghost">
              Solo entries welcome · Teams of 2-4
            </p>
          </div>

          <div style={{ perspective: 1200 }}>
            <div
              ref={globePanelRef}
              data-cursor="action"
              className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[22px]"
              style={{
                border: '1px solid hsl(var(--border) / 0.07)',
                background: 'hsl(var(--bg-card))',
              }}
            >

              <div
                className="globe-reveal relative flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-6"
                style={{ borderColor: 'hsl(var(--border-faint) / 0.03)' }}
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-accent">
                    $ map participants --live
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-text-ghost">
                    focus
                  </span>
                  <span className="mt-1 block font-mono text-[11px] text-accent">
                    GWL / 26.22 / 78.18
                  </span>
                </div>
              </div>

              <div className="relative px-4 pb-5 pt-4 sm:px-6 sm:pb-6">
                <div className="relative aspect-square overflow-hidden rounded-[22px] border border-border-faint/60">
                  <div
                    className="globe-reveal absolute left-4 top-4 z-10 rounded-[12px] px-4 py-3 backdrop-blur-sm"
                    style={{
                      background: 'hsla(220,18%,9%,0.82)',
                      border: '1px solid hsl(var(--border) / 0.09)',
                    }}
                  >
                    <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-text-ghost">
                      host node
                    </span>
                    <span className="mt-2 block font-display text-[20px] font-semibold leading-none text-text">
                      MITS Gwalior
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-full max-w-[520px]">
                      <HeroGlobe />
                    </div>
                  </div>

                  <div
                    className="globe-reveal absolute bottom-4 right-4 z-10 rounded-[14px] px-4 py-3 text-right backdrop-blur-sm"
                    style={{
                      background: 'hsla(220,18%,9%,0.82)',
                      border: '1px solid hsl(var(--border) / 0.07)',
                    }}
                  >
                    <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-text-ghost">
                      event date
                    </span>
                    <span className="mt-2 block font-mono text-[18px] font-semibold text-accent">
                      15 / 06 / 26
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
