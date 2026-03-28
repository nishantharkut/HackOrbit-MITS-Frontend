import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const lines = [
  { text: '> hackorbit --init 2026', tag: '' },
  { text: '', tag: '' },
  { text: '  checking requirements...    ', tag: 'OK' },
  { text: '  loading tracks...           ', tag: 'OK' },
  { text: '  fetching prize pool...      ', tag: 'OK' },
  { text: '  compiling themes...         ', tag: 'OK' },
  { text: '  registrations               ', tag: 'LIVE' },
  { text: '', tag: '' },
  { text: '> ready. begin transmission.', tag: '' },
];

const Preloader = ({ onComplete }: PreloaderProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [revealedChars, setRevealedChars] = useState<number[]>(lines.map(() => 0));
  const [showTags, setShowTags] = useState<boolean[]>(lines.map(() => false));
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(wrapperRef.current, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.55,
            ease: 'power2.in',
            delay: 0.4,
            onComplete: () => onCompleteRef.current(),
          });
        },
      });

      let cumTime = 0;
      lines.forEach((line, lineIdx) => {
        if (!line.text && !line.tag) {
          cumTime += 0.3;
          return;
        }
        const totalChars = line.text.length;
        if (totalChars > 0) {
          // Animate char reveal via proxy
          const obj = { count: 0 };
          tl.to(obj, {
            count: totalChars,
            duration: totalChars * 0.022,
            ease: 'none',
            onUpdate: () => {
              setRevealedChars(prev => {
                const next = [...prev];
                next[lineIdx] = Math.floor(obj.count);
                return next;
              });
            },
          }, cumTime);
          cumTime += totalChars * 0.022;
        }
        if (line.tag) {
          tl.call(() => {
            setShowTags(prev => {
              const next = [...prev];
              next[lineIdx] = true;
              return next;
            });
          }, [], cumTime);
          cumTime += 0.4;
        } else {
          cumTime += 0.3;
        }
      });

      // Blink LIVE dot
      const liveDot = document.getElementById('preloader-live-dot');
      if (liveDot) {
        gsap.to(liveDot, { opacity: 0.3, repeat: -1, yoyo: true, duration: 0.6 });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ background: 'hsl(var(--bg))' }}
    >
      <div className="font-mono text-[13px] leading-[2.4]">
        {lines.map((line, i) => {
          if (!line.text && !line.tag) return <div key={i} className="h-6" />;

          const visibleText = line.text.slice(0, revealedChars[i]);
          const hiddenText = line.text.slice(revealedChars[i]);

          return (
            <div key={i} className="whitespace-pre">
              <span style={{ color: 'hsl(var(--accent))' }}>{visibleText}</span>
              <span style={{ color: 'transparent' }}>{hiddenText}</span>
              {line.tag === 'OK' && showTags[i] && (
                <span style={{ color: 'hsl(var(--positive))' }}>[OK]</span>
              )}
              {line.tag === 'LIVE' && showTags[i] && (
                <>
                  <span id="preloader-live-dot" style={{ color: 'hsl(var(--accent))' }}>●</span>
                  <span style={{ color: 'hsl(var(--accent))' }}>[LIVE]</span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Preloader;
