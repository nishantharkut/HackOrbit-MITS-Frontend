import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger } from 'animejs';
import ScrollFloat from './ScrollFloat';

gsap.registerPlugin(ScrollTrigger);

type Sponsor = {
  tier: string;
  id: string;
  name: string;
  focus: string;
  status: string;
  logoFile?: string;
  logoAlt?: string;
};

const sponsorAsset = (fileName: string) => `${import.meta.env.BASE_URL}sponsors/${fileName}`;

const sponsors: Sponsor[] = [
  {
    tier: 'TITLE',
    id: 'S-01/',
    name: 'DLG Group',
    focus: 'Innovation programs and ecosystem support',
    status: 'CONFIRMED',
    logoFile: 'dlg-computer.svg',
    logoAlt: 'DLG Group logo',
  },
  {
    tier: 'HOST',
    id: 'S-02/',
    name: 'MITS Gwalior',
    focus: 'Campus, mentorship and community operations',
    status: 'CONFIRMED',
    logoFile: 'mits-gwalior.jpg',
    logoAlt: 'MITS Gwalior logo',
  },
  {
    tier: 'GROWTH',
    id: 'S-03/',
    name: 'GitHub',
    focus: 'Credits, infra support and deployment tooling',
    status: 'ONBOARDING',
    logoFile: 'github.svg',
    logoAlt: 'GitHub logo',
  },
  {
    tier: 'COMMUNITY',
    id: 'S-04/',
    name: 'Devfolio',
    focus: 'Developer community amplification and outreach',
    status: 'OPEN',
    logoFile: 'devfolio.svg',
    logoAlt: 'Devfolio logo',
  },
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
        <ScrollFloat
          containerClassName="font-display font-bold text-[26px] md:text-[40px] text-text leading-none mb-12"
          scrollStart="top 84%"
        >
          Backed by operators.
        </ScrollFloat>

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

              <div className="sponsor-row opacity-0 grid grid-cols-1 md:grid-cols-[88px_88px_1fr_1.2fr_118px] gap-3 items-center">
                <span className="font-mono text-[10px] text-text-ghost tracking-[1px]">{item.tier}</span>
                <span className="font-mono text-[12px] text-accent">{item.id}</span>
                <div className="min-w-0 flex items-center gap-3.5">
                  <div
                    className="sponsor-logo-shell h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-[10px] flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(180deg, hsl(var(--bg-elevated) / 0.92), hsl(var(--bg-card) / 0.9))',
                      border: '1px solid hsl(var(--border-faint) / 0.14)',
                      boxShadow: 'inset 0 0 0 1px hsl(var(--border-faint) / 0.04)',
                    }}
                  >
                    <img
                      src={item.logoFile ? sponsorAsset(item.logoFile) : undefined}
                      alt={item.logoAlt ?? `${item.name} logo`}
                      className={`${item.name === 'GitHub' ? 'h-9 w-9 md:h-10 md:w-10' : 'h-8 w-8 md:h-9 md:w-9'} object-contain opacity-95`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <span className="font-display font-bold text-[20px] text-text leading-none tracking-[-0.01em] truncate">
                    {item.name}
                  </span>
                </div>
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
