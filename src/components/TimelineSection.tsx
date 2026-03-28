import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TimelineSection.css';
import ScrollFloat from './ScrollFloat';

gsap.registerPlugin(ScrollTrigger);

type Milestone = {
  hash: string;
  date: string;
  title: string;
  desc: string;
  status: string;
  statusColor: 'accent' | 'warning' | 'ghost';
};

const milestones: Milestone[] = [
  {
    hash: 'a1b2c3d',
    date: '15 March 2026',
    title: 'Registration Opens',
    desc: 'Team onboarding starts. Registrations and track intents are now being accepted.',
    status: 'STATUS: ACCEPTING TEAMS',
    statusColor: 'accent',
  },
  {
    hash: 'e4f5g6h',
    date: '1 April 2026',
    title: 'Team Lock-in',
    desc: 'Final day to update member rosters before problem-release phase begins.',
    status: 'STATUS: DEADLINE',
    statusColor: 'warning',
  },
  {
    hash: 'i7j8k9l',
    date: '14 April 2026',
    title: 'Problem Statements',
    desc: 'Official statements are released and published to all validated participants.',
    status: 'STATUS: CLASSIFIED UNTIL THEN',
    statusColor: 'ghost',
  },
  {
    hash: 'm1n2o3p',
    date: '15 April 2026',
    title: 'Hacking Begins',
    desc: 'Build clock starts. Teams enter full sprint mode for 48 consecutive hours.',
    status: 'STATUS: T-MINUS CALCULATING',
    statusColor: 'accent',
  },
  {
    hash: 'q4r5s6t',
    date: '16 April 2026',
    title: 'Submissions Close',
    desc: 'Submission window closes and all repositories move to evaluation queue.',
    status: 'STATUS: HARD DEADLINE',
    statusColor: 'warning',
  },
];

const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const mobileSectionRef = useRef<HTMLElement>(null);
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const mobileDotRef = useRef<HTMLDivElement>(null);
  const mobileBoxesRef = useRef<Array<HTMLDivElement | null>>([]);
  const [current, setCurrent] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsDesktop(media.matches);

    onChange();
    media.addEventListener('change', onChange);

    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop || !sectionRef.current || !trackRef.current || !pathRef.current) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const path = pathRef.current;

    const setupPath = () => {
      const totalWidth = milestones.length * window.innerWidth;
      const startX = 120;
      const endX = Math.max(startX, totalWidth - 120);
      const y = 5;
      path.setAttribute('d', `M ${startX} ${y} L ${endX} ${y}`);
      gsap.set(path, { scaleX: 0, transformOrigin: 'left center' });
    };

    setupPath();

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.05,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          end: () => `+=${Math.max(1, track.scrollWidth - window.innerWidth)}`,
          snap: {
            snapTo: 1 / (milestones.length - 1),
            duration: 0.42,
            ease: 'power1.inOut',
          },
          onRefresh: () => {
            setupPath();
          },
          onUpdate: (self) => {
            const progress = self.progress;
            const sweepProgress = progress <= 0.5 ? progress * 2 : (1 - progress) * 2;
            gsap.set(path, {
              scaleX: Math.max(0, sweepProgress),
              transformOrigin: 'left center',
            });

            const idx = Math.round(self.progress * (milestones.length - 1));
            setCurrent(idx);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, section);

    return () => ctx.revert();
  }, [isDesktop]);

  useEffect(() => {
    if (isDesktop || !mobileSectionRef.current || !mobileTimelineRef.current) return;

    const timer = window.setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mobileSectionRef.current,
            start: 'top 30%',
            end: 'bottom center',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          mobileTimelineRef.current,
          { maxHeight: '0%', opacity: 0 },
          { maxHeight: '100%', opacity: 1, duration: 0.5 },
          0,
        );

        mobileBoxesRef.current.forEach((box, idx) => {
          if (!box) return;

          tl.fromTo(
            box,
            { opacity: 0 },
            { opacity: 1, duration: 0.15 },
            idx * 0.1,
          );
        });

        if (mobileDotRef.current) {
          tl.fromTo(
            mobileDotRef.current,
            { animationIterationCount: 'infinite' },
            { animationIterationCount: '1', duration: 0.1 },
            0.3,
          );
        }
      }, mobileSectionRef);

      return () => ctx.revert();
    }, 120);

    return () => window.clearTimeout(timer);
  }, [isDesktop]);

  const statusColor = (kind: Milestone['statusColor']) => {
    if (kind === 'accent') return 'hsl(var(--accent))';
    if (kind === 'warning') return 'hsl(var(--warning))';
    return 'hsl(var(--text-dim))';
  };

  const statusTone = (kind: Milestone['statusColor']) => {
    if (kind === 'accent') {
      return {
        color: 'hsl(var(--accent))',
        border: '1px solid hsl(var(--accent) / 0.5)',
        background: 'hsl(var(--accent) / 0.14)',
        boxShadow: '0 0 0 1px hsl(var(--accent) / 0.14) inset',
      };
    }

    if (kind === 'warning') {
      return {
        color: 'hsl(var(--warning))',
        border: '1px solid hsl(var(--warning) / 0.5)',
        background: 'hsl(var(--warning) / 0.14)',
        boxShadow: '0 0 0 1px hsl(var(--warning) / 0.14) inset',
      };
    }

    return {
      color: 'hsl(var(--text))',
      border: '1px solid hsl(var(--border) / 0.9)',
      background: 'hsl(var(--bg-raised))',
      boxShadow: '0 0 0 1px hsl(var(--border-faint) / 0.5) inset',
    };
  };

  if (!isDesktop) {
    return (
      <section ref={mobileSectionRef} id="timeline" className="timeline-mobile-section">
        <div className="timeline-mobile-container max-w-6xl mx-auto">
          <span className="font-mono font-medium text-[10px] text-accent tracking-[3px] uppercase block mb-3">
            $ git log --oneline
          </span>
          <ScrollFloat
            containerClassName="timeline-mobile-title font-display font-bold text-text leading-none"
            scrollStart="top 88%"
          >
            From brief to build.
          </ScrollFloat>

          <div className="timeline-mobile-info relative">
            <div
              ref={mobileTimelineRef}
              className="timeline-mobile-line absolute top-0 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to top, hsl(var(--accent)) 20%, hsl(var(--accent) / 0.7) 55%, transparent 95%)',
                maxHeight: '0%',
              }}
            >
              <div ref={mobileDotRef} className="timeline-mobile-dot" />
            </div>

            <div className="timeline-mobile-list">
              {milestones.map((milestone, idx) => (
                <div
                  key={milestone.hash}
                  ref={(el) => {
                    mobileBoxesRef.current[idx] = el;
                  }}
                  className="timeline-mobile-item"
                >
                  <div
                    className="inline-flex items-center gap-2 rounded-[7px] px-3 py-1 font-mono text-[11px] text-text mb-3"
                    style={{
                      border: '1px solid hsl(var(--border) / 0.8)',
                      background: 'hsl(var(--bg-raised))',
                    }}
                  >
                    <span className="text-text-ghost">[{milestone.hash}]</span>
                    <span className="text-accent">{milestone.date}</span>
                  </div>
                  <h3 className="timeline-mobile-item-title font-display font-bold text-text leading-[0.95] tracking-[-0.02em]">{milestone.title}</h3>
                  <p className="timeline-mobile-item-desc font-body text-text-dim leading-[1.75]">{milestone.desc}</p>
                  <div
                    className="mt-4 inline-flex rounded-[7px] px-3 py-1 font-mono font-semibold text-[10px] tracking-[2px]"
                    style={statusTone(milestone.statusColor)}
                  >
                    {milestone.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="timeline" className="timeline-section relative">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-24">
        <span className="font-mono font-medium text-[10px] text-accent tracking-[3px] uppercase block mb-3">
          $ git log --oneline
        </span>
        <ScrollFloat
          containerClassName="font-display font-bold text-[40px] text-text leading-none mb-16"
          scrollStart="top 84%"
        >
          From brief to build.
        </ScrollFloat>
      </div>

      <div className="relative h-[78vh] min-h-[560px] overflow-hidden">
        <svg
          className="absolute left-0 top-[66%] h-[10px] -translate-y-1/2 pointer-events-none"
          style={{ width: `${milestones.length * 100}vw` }}
          viewBox={`0 0 ${milestones.length * window.innerWidth} 10`}
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            className="timeline-path"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ transformBox: 'fill-box' }}
            fill="none"
          />
        </svg>

        <div ref={trackRef} className="timeline-track flex w-fit h-full items-center">
          {milestones.map((milestone) => (
            <div key={milestone.hash} className="timeline-panel w-screen h-full flex items-start relative pt-12 md:pt-14">
              <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
                <div
                  className="inline-flex items-center gap-2 rounded-[7px] px-3 py-1 font-mono text-[11px] text-text mb-3"
                  style={{
                    border: '1px solid hsl(var(--border) / 0.8)',
                    background: 'hsl(var(--bg-raised))',
                  }}
                >
                  <span className="text-text-ghost">[{milestone.hash}]</span>
                  <span className="text-accent">{milestone.date}</span>
                </div>
                <h3 className="font-display font-bold text-[56px] text-text leading-[0.95] tracking-[-0.02em] max-w-[700px]">
                  {milestone.title}
                </h3>
                <p className="font-body text-[15px] text-text-dim max-w-[420px] mt-[14px] leading-[1.75]">{milestone.desc}</p>
                <div
                  className="mt-4 inline-flex rounded-[7px] px-3 py-1 font-mono font-semibold text-[10px] tracking-[2px]"
                  style={statusTone(milestone.statusColor)}
                >
                  {milestone.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] text-text-ghost z-[60] pointer-events-none">
          {String(current + 1).padStart(2, '0')} / {String(milestones.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
