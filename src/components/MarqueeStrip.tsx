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
        height: 40,
        background: '#f5f1ed',
        borderTop: '2px dashed #b8a89f',
        borderBottom: '2px dashed #b8a89f',
        boxShadow: 'inset 0 1px 0 rgba(0,0,0,0.05)',
      }}
    >
      <div ref={trackRef} className="flex items-center h-full whitespace-nowrap w-fit">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[2px]" style={{ color: '#1a3a3a', letterSpacing: '2px' }}>
          {content}
        </span>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[2px]" style={{ color: '#1a3a3a', letterSpacing: '2px' }}>
          {content}
        </span>
      </div>
    </div>
  );
};

export default MarqueeStrip;
