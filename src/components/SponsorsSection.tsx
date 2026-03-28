import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

type Sponsor = {
  tier: string;
  id: string;
  name: string;
  focus: string;
  status: string;
};

const sponsors: Sponsor[] = [
  { tier: 'TITLE', id: 'S-01/', name: 'DLG Group', focus: 'Innovation programs and ecosystem support', status: 'CONFIRMED' },
  { tier: 'HOST', id: 'S-02/', name: 'MITS Gwalior', focus: 'Campus, mentorship and community operations', status: 'CONFIRMED' },
  { tier: 'GROWTH', id: 'S-03/', name: 'Cloud Partner', focus: 'Credits, infra support and deployment tooling', status: 'ONBOARDING' },
  { tier: 'COMMUNITY', id: 'S-04/', name: 'Ecosystem Partner', focus: 'Developer community amplification and outreach', status: 'OPEN' },
];

const SponsorsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          const rows = sectionRef.current?.querySelectorAll('.sponsor-row');
          const scans = sectionRef.current?.querySelectorAll('.sponsor-scan');

          if (scans) {
            animate(scans, {
              translateX: ['-105%', '105%'],
              duration: 520,
              delay: stagger(85),
              easing: 'easeInOutQuart',
            });
          }

          if (rows) {
            animate(rows, {
              opacity: [0, 1],
              translateY: [12, 0],
              duration: 280,
              delay: stagger(85, { start: 160 }),
              easing: 'easeOutQuart',
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="py-16 md:py-24"
      style={{
        background: 'hsl(var(--bg-raised))',
        borderTop: '1px solid hsl(var(--border-faint) / 0.03)',
        borderBottom: '1px solid hsl(var(--border-faint) / 0.03)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <span className="font-mono font-medium text-[10px] text-accent tracking-[3px] uppercase block mb-3">
          $ ls sponsors/
        </span>
        <h2 className="font-display font-bold text-[26px] md:text-[40px] text-text leading-none mb-12">
          Backed by operators.
        </h2>

        <div className="border border-border-faint rounded-[8px] overflow-hidden">
          <div
            className="grid grid-cols-[88px_88px_1fr_1.2fr_118px] gap-3 px-4 py-3 text-[9px] font-mono uppercase tracking-[2px] text-text-ghost"
            style={{ borderBottom: '1px solid hsl(var(--border-faint) / 0.03)' }}
          >
            <span>TIER</span>
            <span>ID</span>
            <span>PARTNER</span>
            <span>CAPABILITY</span>
            <span className="text-right">STATUS</span>
          </div>

          {sponsors.map((item) => (
            <div
              key={item.id}
              data-cursor="action"
              className="relative group px-4 py-4 transition-all duration-200 hover:bg-accent-dim"
              style={{ borderBottom: '1px solid hsl(var(--border-faint) / 0.03)' }}
            >
              <div
                className="sponsor-scan absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, transparent, hsl(var(--accent-dim) / 0.10), transparent)',
                  transform: 'translateX(-105%)',
                }}
              />

              <div className="sponsor-row opacity-0 grid grid-cols-1 md:grid-cols-[88px_88px_1fr_1.2fr_118px] gap-3 items-start">
                <span className="font-mono text-[10px] text-text-ghost tracking-[1px]">{item.tier}</span>
                <span className="font-mono text-[12px] text-accent">{item.id}</span>
                <span className="font-display font-bold text-[20px] text-text leading-none">{item.name}</span>
                <span className="font-body text-[13px] text-text-dim leading-[1.6]">{item.focus}</span>
                <span className="font-mono text-[9px] tracking-[2px] text-right text-accent">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
