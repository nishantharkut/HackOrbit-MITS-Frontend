import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TimelineSection.css';

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
    date: '2026-03-15',
    title: 'Registration Opens',
    desc: 'Team onboarding starts. Registrations and track intents are now being accepted.',
    status: 'STATUS: ACCEPTING TEAMS',
    statusColor: 'accent',
  },
  {
    hash: 'e4f5g6h',
    date: '2026-04-01',
    title: 'Team Lock-in',
    desc: 'Final day to update member rosters before problem-release phase begins.',
    status: 'STATUS: DEADLINE',
    statusColor: 'warning',
  },
  {
    hash: 'i7j8k9l',
    date: '2026-04-14',
    title: 'Problem Statements',
    desc: 'Official statements are released and published to all validated participants.',
    status: 'STATUS: CLASSIFIED UNTIL THEN',
    statusColor: 'ghost',
  },
  {
    hash: 'm1n2o3p',
    date: '2026-04-15',
    title: 'Hacking Begins',
    desc: 'Build clock starts. Teams enter full sprint mode for 48 consecutive hours.',
    status: 'STATUS: T-MINUS CALCULATING',
    statusColor: 'accent',
  },
  {
    hash: 'q4r5s6t',
    date: '2026-04-16',
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
      const y = 500;
      path.setAttribute('d', `M 120 ${y} L ${Math.max(120, totalWidth - 120)} ${y}`);

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      return length;
    };

    let lineLength = setupPath();

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
            duration: 0.35,
            ease: 'power1.inOut',
          },
          onRefresh: () => {
            lineLength = setupPath();
          },
          onUpdate: (self) => {
            path.style.strokeDashoffset = `${lineLength * (1 - self.progress)}`;
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
    return 'hsl(var(--text-ghost))';
  };

  if (!isDesktop) {
    return (
      <section ref={mobileSectionRef} id="timeline" className="timeline-mobile-section">
        <div className="timeline-mobile-container max-w-6xl mx-auto">
          <span className="font-mono font-medium text-[10px] text-accent tracking-[3px] uppercase block mb-3">
            $ git log --oneline
          </span>
          <h2 className="timeline-mobile-title font-display font-bold text-text leading-none">
            From brief to build.
          </h2>

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
                  <div className="font-mono text-[11px] text-text-ghost mb-2">[{milestone.hash}]          [{milestone.date}]</div>
                  <h3 className="timeline-mobile-item-title font-display font-bold text-text leading-[0.95] tracking-[-0.02em]">{milestone.title}</h3>
                  <p className="timeline-mobile-item-desc font-body text-text-dim leading-[1.75]">{milestone.desc}</p>
                  <div className="font-mono font-medium text-[10px] tracking-[2px] mt-3" style={{ color: statusColor(milestone.statusColor) }}>
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
        <h2 className="font-display font-bold text-[40px] text-text leading-none mb-16">From brief to build.</h2>
      </div>

      <div className="relative h-screen overflow-hidden">
        <svg
          className="absolute left-0 top-0 h-full pointer-events-none"
          style={{ width: `${milestones.length * 100}vw` }}
          viewBox={`0 0 ${milestones.length * window.innerWidth} 1000`}
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            className="timeline-path"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        <div ref={trackRef} className="timeline-track flex w-fit h-full items-center">
          {milestones.map((milestone) => (
            <div key={milestone.hash} className="timeline-panel w-screen h-screen flex items-center px-[10vw] relative">
              <div>
                <div className="font-mono text-[11px] text-text-ghost mb-2">[{milestone.hash}]          [{milestone.date}]</div>
                <h3 className="font-display font-bold text-[56px] text-text leading-[0.95] tracking-[-0.02em] max-w-[700px]">
                  {milestone.title}
                </h3>
                <p className="font-body text-[15px] text-text-dim max-w-[420px] mt-[14px] leading-[1.75]">{milestone.desc}</p>
                <div className="font-mono font-medium text-[10px] tracking-[2px] mt-3" style={{ color: statusColor(milestone.statusColor) }}>
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
