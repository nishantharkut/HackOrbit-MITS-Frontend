import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';
import ScrollFloat from './ScrollFloat';

gsap.registerPlugin(ScrollTrigger);

const prizes = [
  { label: 'TOTAL PRIZE POOL', value: 25000, prefix: '₹', suffix: '+', large: true, sub: 'Across all tracks and special awards', color: 'accent' },
  { label: 'FIRST PLACE', value: 10000, prefix: '₹', suffix: '', large: false, sub: 'Per winning team', color: 'accent' },
  { label: 'SECOND PLACE', value: 6000, prefix: '₹', suffix: '', large: false, sub: 'Per team', color: 'accent' },
  { label: 'THIRD PLACE', value: 3000, prefix: '₹', suffix: '', large: false, sub: 'Per team', color: 'accent' },
  { label: 'SPECIAL AWARDS', value: 6000, prefix: '₹', suffix: '+', large: false, sub: 'Best UI, Best Social Impact, Best Tech', color: 'warning' },
];

function glitchCounter(el: HTMLElement, target: number, prefix: string, suffix: string) {
  const obj = { value: 0 };

  const interval = setInterval(() => {
    el.textContent = prefix + Math.floor(Math.random() * target).toLocaleString('en-IN') + suffix;
  }, 48);

  setTimeout(() => {
    clearInterval(interval);
    animate(obj, {
      value: target,
      duration: 880,
      easing: 'easeOutExpo',
      onUpdate: () => {
        el.textContent = prefix + Math.floor(obj.value).toLocaleString('en-IN') + suffix;
      },
    });
  }, 580);
}

const PrizesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          prizes.forEach((p, i) => {
            setTimeout(() => {
              const el = valueRefs.current[i];
              if (el) glitchCounter(el, p.value, p.prefix, p.suffix);
            }, i * 200);
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="prizes"
      className="py-16 md:py-24"
      style={{
        background: 'hsl(var(--bg-raised))',
        borderTop: '1px solid hsl(var(--border-faint) / 0.03)',
        borderBottom: '1px solid hsl(var(--border-faint) / 0.03)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <span className="font-mono font-medium text-[10px] text-accent tracking-[3px] uppercase block mb-3">
          $ cat prizes.json
        </span>
        <ScrollFloat
          containerClassName="font-display font-bold text-[26px] md:text-[40px] text-text leading-none mb-12"
          scrollStart="top 84%"
        >
          The stakes.
        </ScrollFloat>

        <p className="font-body text-[15px] text-text-dim leading-[1.75] max-w-[620px] mb-10">
          Prize design is performance design. We reward execution, originality and impact with a payout structure that respects serious builders.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-4">
          <div
            data-cursor="number"
            className="relative overflow-hidden rounded-[12px] p-7 md:p-8"
            style={{
              border: '1px solid hsl(var(--accent) / 0.26)',
              background: 'linear-gradient(145deg, hsl(var(--bg-card)) 0%, hsl(var(--bg-raised)) 55%, hsl(var(--bg-card)) 100%)',
            }}
          >
            <div
              className="absolute -right-16 -top-16 h-44 w-44 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.18) 0%, transparent 70%)' }}
            />

            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-text/90 block">{prizes[0].label}</span>
            <span
              ref={el => { valueRefs.current[0] = el; }}
              className="mt-4 block font-display text-[56px] md:text-[72px] leading-none font-bold text-accent"
            >
              {prizes[0].prefix}0{prizes[0].suffix}
            </span>
            <p className="mt-4 max-w-[48ch] font-body text-[14px] text-text-dim leading-[1.7]">
              {prizes[0].sub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prizes.slice(1).map((p, idx) => {
              const refIndex = idx + 1;

              return (
                <div
                  key={p.label}
                  data-cursor="number"
                  className="rounded-[10px] p-5"
                  style={{
                    border: `1px solid ${p.color === 'warning' ? 'hsl(var(--warning) / 0.22)' : 'hsl(var(--border-neutral) / 0.12)'}`,
                    background: 'hsl(var(--bg-card))',
                  }}
                >
                  <span className="font-mono text-[11px] font-semibold text-text/85 uppercase tracking-[0.14em] block mb-3">
                    {p.label}
                  </span>
                  <span
                    ref={el => { valueRefs.current[refIndex] = el; }}
                    className="block font-display text-[42px] leading-none font-bold"
                    style={{ color: p.color === 'warning' ? 'hsl(var(--warning))' : 'hsl(var(--accent))' }}
                  >
                    {p.prefix}0{p.suffix}
                  </span>
                  <span className="mt-2 block font-body text-[12px] text-text-dim leading-[1.55]">
                    {p.sub}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
