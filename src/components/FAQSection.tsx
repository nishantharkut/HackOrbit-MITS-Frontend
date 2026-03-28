import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

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

  useEffect(() => {
    const splitInstances: SplitText[] = [];

    const ctx = gsap.context(() => {
      if (!contentRef.current) return;

      const split = new SplitText(contentRef.current, { type: 'lines' });
      splitInstances.push(split);

      gsap.fromTo(split.lines, { opacity: 0, y: 4 }, {
        opacity: 1, y: 0, stagger: 0.04, duration: 0.3,
        scrollTrigger: { trigger: contentRef.current, start: 'top 78%' },
      });
    });

    return () => {
      splitInstances.forEach((split) => split.revert());
      ctx.revert();
    };
  }, []);

  const renderContent = () => {
    return manContent.split('\n').map((line, i) => {
      const trimmed = line.trimStart();
      const isHeader = trimmed === line && line.length > 0 && line === line.toUpperCase();

      return (
          <div key={i} className="man-line">
          {isHeader ? (
            <span className="font-mono font-semibold text-[11px] sm:text-[13px] text-accent">{line}</span>
          ) : (
            <span className="font-mono text-[11px] sm:text-[13px] text-text-dim whitespace-pre-wrap break-words">{line || '\u00A0'}</span>
          )}
        </div>
      );
    });
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <span className="font-mono font-medium text-[10px] text-accent tracking-[3px] uppercase block mb-3">
          $ man hackorbit
        </span>
        <h2 className="font-display font-bold text-[26px] md:text-[40px] text-text leading-none mb-12">
          Common queries.
        </h2>

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
          <div ref={contentRef} className="p-4 sm:p-7 md:px-8 leading-[2] overflow-x-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
