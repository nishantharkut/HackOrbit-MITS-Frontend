import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from './ScrollFloat';

gsap.registerPlugin(ScrollTrigger);

const manContent = `NAME
       hackorbit -- 48-hour national hackathon by MITS Gwalior

SYNOPSIS
       hackorbit [--register] [--team-size 2-4] [--mode online]

DESCRIPTION
       HackOrbit is a national-level student hackathon hosted by DLG
       Group and MITS Gwalior. Participants build solutions over 48
       consecutive hours.

WHO CAN PARTICIPATE
       All undergraduate and postgraduate students with a valid college
       ID. International students welcome.

TEAM SIZE
       Minimum 2, maximum 4. Solo entries are accepted and will be
       assigned a score modifier.

REGISTRATION FEE
       None. HackOrbit is completely free to enter.

WHAT TO BUILD
       Choose one of six tracks or go with Open Innovation. Problem
       statements are released 24 hours before hacking begins.

JUDGING CRITERIA
       Technical implementation (30%), creativity and storytelling
       (30%), real-world impact (20%), presentation quality (20%).

TECH STACK
       No restrictions. Use any language, framework, or platform.
       All code must be written during the event.

PRIZES
       Total prize pool exceeds ₹25,000. Distributed across top
       three positions and special category awards.

SUBMISSIONS
       All projects submitted via GitHub with a 3-minute demo video.
       Deadline enforced automatically. No extensions.

CONTACT
       Reach the organizing team at dlg@mitsgwalior.in or through
       the official HackOrbit Discord server.`;

const FAQSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const wheelTargetRef = useRef(0);
  const wheelRafRef = useRef<number | null>(null);

  const shellPrompts = [
    'operator@hackorbit-node MINGW64 /srv/hackorbit/web (main) $',
    'runner@hackorbit-node:/opt/hackorbit/frontend$'
  ];

  const formatCommand = (header: string) =>
    header
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z-]/g, '');

  useEffect(() => {
    let cancelled = false;

    const setup = async () => {
      if ('fonts' in document) {
        await (document as Document & { fonts: FontFaceSet }).fonts.ready;
      }
      if (cancelled) return;

      const ctx = gsap.context(() => {
        if (!contentRef.current) return;

        const rows = contentRef.current.querySelectorAll('.man-block');

        gsap.fromTo(rows, { opacity: 0, y: 6 }, {
          opacity: 1, y: 0, stagger: 0.04, duration: 0.3,
          scrollTrigger: { trigger: contentRef.current, start: 'top 78%' },
        });
      });

      if (cancelled) {
        ctx.revert();
        return;
      }

      return () => {
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

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    wheelTargetRef.current = content.scrollTop;

    const animateToTarget = () => {
      if (!contentRef.current) {
        wheelRafRef.current = null;
        return;
      }

      const current = contentRef.current.scrollTop;
      const target = wheelTargetRef.current;
      const next = current + (target - current) * 0.12;

      if (Math.abs(target - current) < 0.5) {
        contentRef.current.scrollTop = target;
        wheelRafRef.current = null;
        return;
      }

      contentRef.current.scrollTop = next;
      wheelRafRef.current = window.requestAnimationFrame(animateToTarget);
    };

    const onWheel = (event: WheelEvent) => {
      if (!contentRef.current) return;

      event.preventDefault();
      event.stopPropagation();

      const maxScroll = contentRef.current.scrollHeight - contentRef.current.clientHeight;
      wheelTargetRef.current = Math.min(
        Math.max(0, wheelTargetRef.current + event.deltaY * 0.65),
        maxScroll,
      );

      if (wheelRafRef.current === null) {
        wheelRafRef.current = window.requestAnimationFrame(animateToTarget);
      }
    };

    content.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      content.removeEventListener('wheel', onWheel);
      if (wheelRafRef.current !== null) {
        window.cancelAnimationFrame(wheelRafRef.current);
        wheelRafRef.current = null;
      }
    };
  }, []);

  const renderContent = () => {
    const blocks = manContent
      .trim()
      .split('\n\n')
      .map((block) => block.split('\n').filter((line) => line.trim().length > 0));

    return blocks.map((block, index) => {
      const [header, ...bodyLines] = block;
      const prompt = shellPrompts[index % shellPrompts.length];

      return (
        <div key={header + index} className="man-block border-b border-border-faint/25 pb-4 last:border-b-0 last:pb-0">
          <div
            className="rounded-[6px] px-2.5 py-1.5 font-mono text-[10px] sm:text-[11px] leading-[1.45] whitespace-pre-wrap break-words"
            style={{
              background: 'hsl(var(--bg-elevated) / 0.65)',
              border: '1px solid hsl(var(--border-faint) / 0.16)',
            }}
          >
            <span className="text-text-dim">{prompt} </span>
            <span className="text-accent">man hackorbit --{formatCommand(header)}</span>
          </div>
          <div
            className="mt-2 border-l border-border-faint/45 pl-3 py-1"
            style={{ background: 'hsl(var(--bg) / 0.18)' }}
          >
            <div className="font-mono font-semibold tracking-[0.08em] text-[10px] sm:text-[11px] text-accent mb-1">
              {header}
            </div>
            <div className="space-y-1">
              {bodyLines.map((line, lineIndex) => (
                <div
                  key={`${header}-${lineIndex}`}
                  className="font-mono text-[11px] sm:text-[13px] text-text-dim leading-[1.48]"
                >
                  {line.trimStart()}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <span className="font-mono font-medium text-[10px] text-accent tracking-[3px] uppercase block mb-3">
          $ man hackorbit
        </span>
        <ScrollFloat
          containerClassName="font-display font-bold text-[26px] md:text-[40px] text-text leading-none mb-12"
          scrollStart="top 84%"
        >
          Common queries.
        </ScrollFloat>

        {/* Terminal window */}
        <div
          className="max-w-[900px] mx-auto overflow-hidden rounded-[10px]"
          style={{
            background: 'hsl(var(--bg-raised))',
            border: '1px solid hsl(var(--border) / 0.07)',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between px-4"
            style={{
              height: 40,
              background: 'hsl(var(--bg-elevated))',
              borderBottom: '1px solid hsl(var(--border-faint) / 0.03)',
            }}
          >
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(var(--negative))' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(var(--warning))' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(var(--positive))' }} />
            </div>
            <span className="font-mono text-[11px] text-text-dim">HACKORBIT(1)</span>
            <span className="font-mono text-[10px] text-text-ghost">man 1.0</span>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            tabIndex={0}
            className="h-[560px] p-5 sm:p-7 md:px-8 md:py-8 space-y-4 overflow-y-auto overflow-x-auto overscroll-contain"
          >
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
