import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const tracks = [
  { id: 'T-01/', name: 'AI & Machine Learning', desc: 'Intelligent systems, computer vision, NLP applications' },
  { id: 'T-02/', name: 'Web3 & Blockchain', desc: 'Decentralized applications, smart contracts, DeFi' },
  { id: 'T-03/', name: 'FinTech', desc: 'Financial inclusion, payment systems, investment tools' },
  { id: 'T-04/', name: 'HealthTech', desc: 'Medical diagnostics, health monitoring, patient care' },
  { id: 'T-05/', name: 'EdTech', desc: 'Learning platforms, skill development, academic tools' },
  { id: 'T-06/', name: 'Open Innovation', desc: 'Any domain, any problem worth solving' },
];

const TracksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 78%',
        onEnter: () => {
          // Scan line animation
          const scanLines = sectionRef.current?.querySelectorAll('.scan-line');
          const contents = sectionRef.current?.querySelectorAll('.theme-content');
          
          if (scanLines) {
            animate(scanLines, {
              translateX: ['-110%', '110%'],
              duration: 560,
              delay: stagger(90),
              easing: 'easeInOutQuart',
            });
          }
          if (contents) {
            animate(contents, {
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 280,
              delay: stagger(90, { start: 200 }),
              easing: 'easeOutQuart',
            });
          }
        },
        once: true,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tracks"
      className="py-16 md:py-24"
      style={{
        background: 'hsl(var(--bg-raised))',
        borderTop: '1px solid hsl(var(--border-faint) / 0.03)',
        borderBottom: '1px solid hsl(var(--border-faint) / 0.03)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <span className="font-mono font-medium text-[10px] text-accent tracking-[3px] uppercase block mb-3">
          $ ls tracks/
        </span>
        <h2 className="font-display font-bold text-[26px] md:text-[40px] text-text leading-none mb-12">
          Choose your mission.
        </h2>

        <div>
          {tracks.map((track, i) => (
            <div
              key={i}
              data-cursor="action"
              className="relative flex items-start py-[22px] overflow-hidden group transition-all duration-200 hover:bg-accent-dim hover:rounded-[6px] hover:pl-3"
              style={{ borderBottom: '1px solid hsl(var(--border-faint) / 0.03)' }}
            >
              {/* Scan line */}
              <div
                className="scan-line absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, transparent, hsl(var(--accent-dim) / 0.10), transparent)',
                  transform: 'translateX(-110%)',
                }}
              />

              <div className="theme-content opacity-0 flex items-start w-full">
                {/* Unix perm */}
                <span className="hidden md:block font-mono font-medium text-[10px] text-text-ghost w-[72px] flex-shrink-0 pt-1">
                  drwx
                </span>
                {/* Track ID */}
                <span className="font-mono font-semibold text-[12px] text-accent w-[52px] sm:w-[80px] flex-shrink-0 pt-1">
                  {track.id}
                </span>
                {/* Name + Desc */}
                <div className="flex-1 min-w-0">
                  <span className="font-display font-bold text-[18px] md:text-[24px] text-text leading-none block">
                    {track.name}
                  </span>
                  <span className="font-body text-[13px] text-text-dim mt-1.5 block max-w-[540px] leading-[1.65]">
                    {track.desc}
                  </span>
                </div>
                {/* Status */}
                <span
                  className="hidden sm:block font-mono font-medium text-[9px] tracking-[2px] text-accent px-2 py-[3px] rounded-[3px] flex-shrink-0 ml-4"
                  style={{ border: '1px solid hsl(var(--accent-dim) / 0.10)' }}
                >
                  OPEN
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TracksSection;
