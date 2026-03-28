import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from './ScrollFloat';

gsap.registerPlugin(ScrollTrigger);

const rows = [
  { label: 'EVENT', value: 'HackOrbit 2026', style: 'title' },
  { label: 'HOSTED BY', value: 'DLG Group × MITS Gwalior', style: 'subtitle' },
  { label: 'FORMAT', value: 'Online · National Level', style: 'mono' },
];

const metrics = [
  { id: '01', value: '₹25,000+', label: 'Prize Pool', note: 'Cash + category awards' },
  { id: '02', value: '500+', label: 'Participants', note: 'National intake target' },
  { id: '03', value: '48', label: 'Hours', note: 'Non-stop build window' },
];

const AboutSection = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        const items = leftRef.current.querySelectorAll('.data-row');
        gsap.fromTo(items, { x: -24, opacity: 0 }, {
          x: 0, opacity: 1, stagger: 0.15, ease: 'power2.out', duration: 0.6,
          scrollTrigger: { trigger: leftRef.current, start: 'top 78%' },
        });
      }
      if (rightRef.current) {
        gsap.fromTo(rightRef.current, { x: 24, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.7,
          scrollTrigger: { trigger: rightRef.current, start: 'top 75%' },
        });
      }
      if (metricsRef.current) {
        const metricItems = metricsRef.current.querySelectorAll('.metric-item');
        gsap.fromTo(metricItems, { y: 18, opacity: 0 }, {
          y: 0,
          opacity: 1,
          stagger: 0.09,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: metricsRef.current, start: 'top 82%' },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-[72px]">
        {/* Left */}
        <div ref={leftRef}>
          {rows.map((row, i) => (
            <div
              key={i}
              className="data-row py-5"
              style={{ borderTop: '1px solid hsl(var(--border-faint) / 0.03)' }}
            >
              <span className="font-mono text-[9px] text-text-ghost uppercase tracking-[2px] block mb-2">
                {row.label}
              </span>
              {row.style === 'title' && (
                <span className="font-display font-bold text-[40px] text-text leading-none">{row.value}</span>
              )}
              {row.style === 'subtitle' && (
                <span className="font-body font-medium text-[15px] text-text-dim">{row.value}</span>
              )}
              {row.style === 'mono' && (
                <span className="font-mono font-medium text-[14px] text-accent">{row.value}</span>
              )}
            </div>
          ))}
        </div>

        {/* Right */}
        <div ref={rightRef}>
          <span className="font-mono font-medium text-[10px] text-accent tracking-[3px] uppercase block mb-3">
            $ cat README.md
          </span>
          <ScrollFloat
            containerClassName="font-display font-bold text-[26px] md:text-[40px] text-text leading-none mb-6"
            scrollStart="top 84%"
          >
            Built for builders.
          </ScrollFloat>
          <div className="space-y-4 font-body text-[15px] text-text-dim leading-[1.8] max-w-[500px]">
            <p>
              HackOrbit is a 48-hour national hackathon organized by the DLG Group at MITS Gwalior. 
              It is built for people who write code to solve problems — not to win arguments.
            </p>
            <p>
              Six tracks cover the domains where software can make the largest impact right now. 
              You pick the problem. You pick the stack. You ship the solution.
            </p>

            {/* Pull quote */}
            <blockquote
              className="font-body font-light italic text-[16px] text-text pl-[18px] my-4"
              style={{ borderLeft: '2px solid hsl(var(--accent))' }}
            >
              Open to all undergraduate and postgraduate students across India. Teams of 2 to 4. Solo entries welcome.
            </blockquote>

            <p>
              No pitch decks. No slide competitions. Build something that works, 
              demo it live, and let the code speak. That is the only format that matters.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-12 md:mt-14">
        <div
          ref={metricsRef}
          className="rounded-[12px] overflow-hidden"
          style={{
            border: '1px solid hsl(var(--border-neutral) / 0.12)',
            background: 'linear-gradient(100deg, hsl(var(--bg-raised)) 0%, hsl(var(--bg-card)) 45%, hsl(var(--bg-raised)) 100%)',
          }}
        >
          <div
            className="px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-text-ghost"
            style={{ borderBottom: '1px solid hsl(var(--border-neutral) / 0.08)' }}
          >
            signal board / event telemetry
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {metrics.map((metric, index) => (
              <div
                key={metric.id}
                className={`metric-item px-5 py-5 md:px-6 md:py-6 ${index < metrics.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''}`}
                style={{
                  borderColor: 'hsl(var(--border-neutral) / 0.08)',
                }}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-text-ghost">[{metric.id}]</span>
                <div className="mt-2 font-mono text-[34px] leading-none font-semibold text-accent">{metric.value}</div>
                <div className="mt-2 font-display text-[18px] leading-none text-text">{metric.label}</div>
                <div className="mt-2 font-body text-[12px] text-text-dim">{metric.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
