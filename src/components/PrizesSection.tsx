import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';

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
        <h2 className="font-display font-bold text-[26px] md:text-[40px] text-text leading-none mb-12">
          The stakes.
        </h2>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr]">
          {prizes.map((p, i) => (
            <div
              key={i}
              data-cursor="number"
              className={`p-7 ${i === 0 ? 'sm:row-span-2' : ''}`}
              style={{
                borderRight: '1px solid hsl(var(--border-faint) / 0.03)',
                borderBottom: '1px solid hsl(var(--border-faint) / 0.03)',
              }}
            >
              <span className="font-mono text-[9px] text-text-ghost uppercase tracking-[2px] block mb-3">
                {p.label}
              </span>
              <span
                ref={el => { valueRefs.current[i] = el; }}
                className={`font-display font-bold leading-none block ${p.large ? 'text-[52px]' : 'text-[36px]'}`}
                style={{ color: p.color === 'warning' ? 'hsl(var(--warning))' : 'hsl(var(--accent))' }}
              >
                {p.prefix}0{p.suffix}
              </span>
              <span className="font-body text-[12px] text-text-ghost mt-2.5 block">{p.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
