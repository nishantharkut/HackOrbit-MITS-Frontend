import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

interface PreloaderProps {
  onComplete: () => void;
}

const lines = [
  { text: '> hackorbit --init 2026', tag: '' },
  { text: '  checking requirements...    ', tag: 'OK' },
  { text: '  loading tracks...           ', tag: 'OK' },
  { text: '  fetching prize pool...      ', tag: 'OK' },
  { text: '  compiling themes...         ', tag: 'OK' },
  { text: '  registrations               ', tag: 'LIVE' },
  { text: '> ready. begin transmission.', tag: '' },
];

const Preloader = ({ onComplete }: PreloaderProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tagRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;
    const splitInstances: SplitText[] = [];

    const setup = async () => {
      if ('fonts' in document) {
        await (document as Document & { fonts: FontFaceSet }).fonts.ready;
      }
      if (cancelled) return;

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

        lines.forEach((line, idx) => {
          const lineEl = lineRefs.current[idx];
          if (!lineEl) return;

          const split = new SplitText(lineEl, { type: 'chars' });
          splitInstances.push(split);

          tl.from(split.chars, {
            opacity: 0,
            duration: 0.01,
            stagger: 0.022,
            ease: 'none',
          });

          if (line.tag) {
            tl.to(tagRefs.current[idx], {
              opacity: 1,
              duration: 0.1,
            }, '>-0.05');
          }
        });

        const liveDot = document.getElementById('preloader-live-dot');
        if (liveDot) {
          gsap.to(liveDot, { opacity: 0.3, repeat: -1, yoyo: true, duration: 0.6 });
        }
      });

      if (cancelled) {
        splitInstances.forEach((split) => split.revert());
        ctx.revert();
        return;
      }

      return () => {
        splitInstances.forEach((split) => split.revert());
        ctx.revert();
      };
    };

    let dispose: (() => void) | void;
    void setup().then((cleanup) => {
      dispose = cleanup;
    });

    return () => {
      cancelled = true;
      if (dispose) dispose();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ background: 'hsl(var(--bg))' }}
    >
      <div className="font-mono text-[13px] leading-[2.4] text-accent">
        <div className="h-6" />
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre">
            <span
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
            >
              {line.text}
            </span>
            {line.tag === 'OK' && (
              <span
                ref={(el) => {
                  tagRefs.current[i] = el;
                }}
                className="opacity-0 text-positive"
              >
                [OK]
              </span>
            )}
            {line.tag === 'LIVE' && (
              <span
                ref={(el) => {
                  tagRefs.current[i] = el;
                }}
                className="opacity-0 text-accent"
              >
                <span id="preloader-live-dot">●</span>[LIVE]
              </span>
            )}
          </div>
        ))}
        <div className="h-6" />
      </div>
    </div>
  );
};

export default Preloader;
