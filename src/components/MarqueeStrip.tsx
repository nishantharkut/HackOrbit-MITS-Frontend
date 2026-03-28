import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const content = 'HACKORBIT 2026  ·  MITS GWALIOR  ·  48 HRS  ·  ₹25,000+  ·  AI/ML  ·  WEB3  ·  FINTECH  ·  HEALTHTECH  ·  EDTECH  ·  OPEN INNOVATION  ·  REGISTER BY APRIL 15  ·  TEAMS OF 2-4  ·  500+ PARTICIPANTS  ·  NATIONAL LEVEL  ·  ';

const MarqueeStrip = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: '-50%',
        duration: 55,
        repeat: -1,
        ease: 'none',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      className="overflow-hidden"
      style={{
        height: 34,
        background: 'hsl(var(--bg-raised))',
        borderTop: '1px solid hsl(var(--border-faint) / 0.03)',
        borderBottom: '1px solid hsl(var(--border-faint) / 0.03)',
      }}
    >
      <div ref={trackRef} className="flex items-center h-full whitespace-nowrap w-fit">
        <span className="font-mono text-[10px] uppercase tracking-[2px] text-text-ghost">
          {content}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[2px] text-text-ghost">
          {content}
        </span>
      </div>
    </div>
  );
};

export default MarqueeStrip;
