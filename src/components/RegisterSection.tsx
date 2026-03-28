import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, spring } from 'animejs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import ScrollFloat from './ScrollFloat';

gsap.registerPlugin(ScrollTrigger);

const RegisterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [track, setTrack] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [fieldError, setFieldError] = useState('');

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
    if (!track || !teamSize) {
      setFieldError('Select both track and team size before confirming.');
      return;
    }

    setFieldError('');
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
    { name: 'team_name', label: 'team_name:', placeholder: 'Enter team name' },
    { name: 'leader_email', label: 'leader_email:', placeholder: 'Enter leader email' },
    { name: 'track', label: 'track:' },
    { name: 'team_size', label: 'team_size:' },
  ];

  const trackOptions = [
    'AI & Machine Learning',
    'Web3 & Blockchain',
    'FinTech',
    'HealthTech',
    'EdTech',
    'Open Innovation',
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
        <ScrollFloat
          containerClassName="reg-animate font-display font-bold text-[30px] md:text-[52px] text-text tracking-[-0.02em] mt-2 leading-none opacity-0"
          scrollStart="top 88%"
        >
          Ship something real.
        </ScrollFloat>
      </div>

      {/* Terminal form */}
      <div
        className="reg-animate relative z-10 w-full max-w-[580px] mx-auto mt-10 overflow-hidden rounded-[10px] opacity-0"
        style={{
          background: 'hsl(var(--bg-raised))',
          border: '1px solid hsl(var(--border) / 0.1)',
          boxShadow: '0 16px 40px hsla(220, 60%, 2%, 0.35)',
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
            <div key={field.name} className="reg-field flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[13px] text-text-ghost select-none">&gt;</span>
                <label className="font-mono font-medium text-[12px] sm:text-[13px] text-accent sm:min-w-[140px] shrink-0">
                  {field.label}
                </label>
              </div>
              {field.name === 'track' ? (
                <Select value={track} onValueChange={setTrack}>
                  <SelectTrigger
                    data-cursor="input"
                    className="ml-5 h-[46px] flex-1 rounded-[6px] border-0 px-3 font-mono text-[13px] text-text ring-0 transition-all duration-200 focus:ring-0 sm:ml-0"
                    style={{
                      border: '1px solid hsl(var(--border-neutral) / 0.18)',
                      background: 'hsl(var(--bg-elevated) / 0.35)',
                    }}
                  >
                    <SelectValue placeholder="Select track" />
                  </SelectTrigger>
                  <SelectContent
                    className="rounded-[8px] border-0 p-1"
                    style={{
                      border: '1px solid hsl(var(--border-neutral) / 0.18)',
                      background: 'hsl(var(--bg-card))',
                    }}
                  >
                    {trackOptions.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className="font-mono text-[13px] text-text data-[highlighted]:bg-[hsl(var(--bg-elevated))] data-[highlighted]:text-[hsl(var(--text))] data-[state=checked]:bg-[hsl(var(--bg-raised))] data-[state=checked]:text-[hsl(var(--text))]"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.name === 'team_size' ? (
                <Select value={teamSize} onValueChange={setTeamSize}>
                  <SelectTrigger
                    data-cursor="input"
                    className="ml-5 h-[46px] flex-1 rounded-[6px] border-0 px-3 font-mono text-[13px] text-text ring-0 transition-all duration-200 focus:ring-0 sm:ml-0"
                    style={{
                      border: '1px solid hsl(var(--border-neutral) / 0.18)',
                      background: 'hsl(var(--bg-elevated) / 0.35)',
                    }}
                  >
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent
                    className="rounded-[8px] border-0 p-1"
                    style={{
                      border: '1px solid hsl(var(--border-neutral) / 0.18)',
                      background: 'hsl(var(--bg-card))',
                    }}
                  >
                    <SelectItem value="2" className="font-mono text-[13px] text-text data-[highlighted]:bg-[hsl(var(--bg-elevated))] data-[highlighted]:text-[hsl(var(--text))] data-[state=checked]:bg-[hsl(var(--bg-raised))] data-[state=checked]:text-[hsl(var(--text))]">2</SelectItem>
                    <SelectItem value="3" className="font-mono text-[13px] text-text data-[highlighted]:bg-[hsl(var(--bg-elevated))] data-[highlighted]:text-[hsl(var(--text))] data-[state=checked]:bg-[hsl(var(--bg-raised))] data-[state=checked]:text-[hsl(var(--text))]">3</SelectItem>
                    <SelectItem value="4" className="font-mono text-[13px] text-text data-[highlighted]:bg-[hsl(var(--bg-elevated))] data-[highlighted]:text-[hsl(var(--text))] data-[state=checked]:bg-[hsl(var(--bg-raised))] data-[state=checked]:text-[hsl(var(--text))]">4</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <input
                  data-cursor="input"
                  type={field.name === 'leader_email' ? 'email' : 'text'}
                  name={field.name}
                  placeholder={field.placeholder}
                  required
                  className="flex-1 font-mono text-[13px] text-text bg-transparent rounded-[5px] outline-none py-2 px-3 ml-5 sm:ml-0 placeholder:text-text-ghost/80"
                  style={{
                    border: '1px solid hsl(var(--border-faint) / 0.22)',
                    background: 'hsl(var(--bg-elevated) / 0.35)',
                    transition: 'border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'hsl(var(--accent) / 0.85)';
                    e.target.style.boxShadow = '0 0 0 1px hsl(var(--accent) / 0.35)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'hsl(var(--border-faint) / 0.22)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              )}
            </div>
          ))}

          {fieldError ? (
            <p className="font-mono text-[11px] text-warning tracking-[0.08em]">[ERR] {fieldError}</p>
          ) : null}

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

        #register .reg-field {
          transition: transform 180ms ease, opacity 180ms ease;
        }

        #register .reg-field:focus-within {
          transform: translateX(2px);
        }
      `}</style>
    </section>
  );
};

export default RegisterSection;
