import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, spring } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const RegisterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll('.reg-animate');
      if (els) {
        gsap.fromTo(els, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  useEffect(() => {
    const submitBtn = submitRef.current;
    if (!submitBtn) return;

    const springEase = spring({ stiffness: 280, damping: 16 });

    const handleEnter = () => {
      animate(submitBtn, {
        translateY: -3,
        scale: 1.02,
        ease: springEase,
      });
    };

    const handleLeave = () => {
      animate(submitBtn, {
        translateY: 0,
        scale: 1,
        ease: springEase,
      });
    };

    submitBtn.addEventListener('mouseenter', handleEnter);
    submitBtn.addEventListener('mouseleave', handleLeave);

    return () => {
      submitBtn.removeEventListener('mouseenter', handleEnter);
      submitBtn.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const fields = [
    { name: 'team_name', label: 'team_name:' },
    { name: 'leader_email', label: 'leader_email:' },
    { name: 'track', label: 'track:' },
    { name: 'team_size', label: 'team_size:' },
  ];

  return (
    <section
      ref={sectionRef}
      id="register"
      className="flex flex-col justify-center items-center relative overflow-hidden py-24 md:py-32"
      style={{ minHeight: '70vh' }}
    >
      {/* BG glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsla(82,95%,58%,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center">
        <p className="reg-animate font-body font-light text-[17px] text-text-dim opacity-0">
          Your next 48 hours start here.
        </p>
        <h2 className="reg-animate font-display font-bold text-[30px] md:text-[52px] text-text tracking-[-0.02em] mt-2 leading-none opacity-0">
          Ship something real.
        </h2>
      </div>

      {/* Terminal form */}
      <div
        className="reg-animate relative z-10 w-full max-w-[580px] mx-auto mt-10 overflow-hidden rounded-[10px] opacity-0"
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
          <span className="font-mono text-[11px] text-text-dim">register.sh</span>
          <span className="font-mono text-[10px] text-text-ghost">bash</span>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-7 space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[13px] text-text-ghost select-none">&gt;</span>
                <label className="font-mono font-medium text-[12px] sm:text-[13px] text-accent sm:min-w-[140px] shrink-0">
                  {field.label}
                </label>
              </div>
              <input
                data-cursor="input"
                type="text"
                name={field.name}
                required
                className="flex-1 font-mono text-[13px] text-text bg-transparent border-0 outline-none py-1 px-2 ml-5 sm:ml-0"
                style={{
                  borderBottom: '1px solid hsl(var(--border-faint) / 0.03)',
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = 'hsl(var(--accent))';
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = 'hsl(var(--border-faint) / 0.03)';
                }}
              />
            </div>
          ))}

          <div className="pt-4">
            <button
                ref={submitRef}
              type="submit"
              data-cursor="action"
              disabled={submitted}
                className="w-full font-mono font-semibold text-[13px] bg-accent text-bg h-[46px] rounded-[6px] active:scale-[0.97] disabled:opacity-70"
            >
              {submitted
                ? '[SUCCESS] registration confirmed'
                : submitting
                    ? (
                      <>
                        {'> running... '}
                        <span className="inline-block" style={{ animation: 'cursor-blink 0.55s steps(1) infinite' }}>█</span>
                      </>
                    )
                  : '> ./register.sh --confirm'}
            </button>
          </div>
        </form>
      </div>

      <p className="reg-animate font-body text-[12px] text-text-ghost text-center mt-3.5 opacity-0">
        No credit card · No fees · Results in 48 hours
      </p>

      <style>{`
        @keyframes cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default RegisterSection;
