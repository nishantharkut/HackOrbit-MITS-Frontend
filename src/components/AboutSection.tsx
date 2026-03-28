import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const rows = [
  { label: 'EVENT', value: 'HackOrbit 2026', style: 'title' },
  { label: 'HOSTED BY', value: 'DLG Group × MITS Gwalior', style: 'subtitle' },
  { label: 'FORMAT', value: 'Online · National Level', style: 'mono' },
];

const AboutSection = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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
          <h2 className="font-display font-bold text-[26px] md:text-[40px] text-text leading-none mb-6">
            Built for builders.
          </h2>
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
    </section>
  );
};

export default AboutSection;
