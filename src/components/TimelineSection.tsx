import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { hash: 'a1b2c3d', date: '2026-03-15', title: 'Registration Opens', desc: 'Submit your team details and select your track. Early birds get access to preparation resources.', status: 'ACCEPTING TEAMS', statusColor: 'accent' },
  { hash: 'e4f5g6h', date: '2026-04-01', title: 'Team Lock-in', desc: 'Final deadline for team composition changes. Verify all member details are correct.', status: 'DEADLINE', statusColor: 'warning' },
  { hash: 'i7j8k9l', date: '2026-04-14', title: 'Problem Statements', desc: 'Track-specific problem statements released. Study them before the clock starts.', status: 'CLASSIFIED UNTIL THEN', statusColor: 'ghost' },
  { hash: 'm1n2o3p', date: '2026-04-15', title: 'Hacking Begins', desc: '48 consecutive hours. Build, test, iterate. Mentors available on all channels.', status: 'T-MINUS CALCULATING', statusColor: 'accent' },
  { hash: 'q4r5s6t', date: '2026-04-16', title: 'Submissions Close', desc: 'All code pushed. Demo videos uploaded. No extensions.', status: 'HARD DEADLINE', statusColor: 'warning' },
];

const TimelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    if (!trackRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth) + 'px',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.1,
          end: () => '+=' + trackRef.current!.scrollWidth,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (milestones.length - 1));
            setCurrent(idx);
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const getStatusColor = (c: string) => {
    if (c === 'accent') return 'hsl(var(--accent))';
    if (c === 'warning') return 'hsl(var(--warning))';
    return 'hsl(var(--text-ghost))';
  };

  if (isMobile) {
    return (
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <span className="font-mono font-medium text-[10px] text-accent tracking-[3px] uppercase block mb-3">
            $ git log --oneline
          </span>
          <h2 className="font-display font-bold text-[26px] text-text leading-none mb-12">
            From brief to build.
          </h2>
          <div className="relative pl-6" style={{ borderLeft: '2px solid hsl(var(--accent) / 0.2)' }}>
            {milestones.map((m, i) => (
              <div key={i} className="mb-12 relative">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-accent" />
                <div className="font-mono text-[11px] text-text-ghost mb-1">{m.hash} &nbsp; {m.date}</div>
                <div className="font-display font-bold text-[32px] text-text leading-[0.95]">{m.title}</div>
                <p className="font-body text-[15px] text-text-dim mt-3 leading-[1.75] max-w-[400px]">{m.desc}</p>
                <span className="font-mono font-medium text-[10px] tracking-[2px] mt-3 block" style={{ color: getStatusColor(m.statusColor) }}>
                  STATUS: {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={sectionRef} className="relative">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-24">
        <span className="font-mono font-medium text-[10px] text-accent tracking-[3px] uppercase block mb-3">
          $ git log --oneline
        </span>
        <h2 className="font-display font-bold text-[26px] md:text-[40px] text-text leading-none mb-16">
          From brief to build.
        </h2>
      </div>

      <div ref={trackRef} className="flex items-center w-fit" style={{ height: 'calc(100vh - 180px)' }}>
        {milestones.map((m, i) => (
          <div key={i} className="w-screen h-full flex items-center px-[10vw]">
            <div>
              <div className="font-mono text-[11px] text-text-ghost mb-2">
                {m.hash} &nbsp;&nbsp;&nbsp; {m.date}
              </div>
              <div className="font-display font-bold text-[32px] md:text-[56px] text-text leading-[0.95] tracking-[-0.02em]">
                {m.title}
              </div>
              <p className="font-body text-[15px] text-text-dim mt-3.5 max-w-[400px] leading-[1.75]">
                {m.desc}
              </p>
              <span className="font-mono font-medium text-[10px] tracking-[2px] mt-3 block" style={{ color: getStatusColor(m.statusColor) }}>
                STATUS: {m.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] text-text-ghost z-50 pointer-events-none">
        {String(current + 1).padStart(2, '0')} / {String(milestones.length).padStart(2, '0')}
      </div>
    </div>
  );
};

export default TimelineSection;
