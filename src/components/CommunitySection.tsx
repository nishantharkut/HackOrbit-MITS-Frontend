import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, spring } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

type Channel = {
  id: string;
  command: string;
  label: string;
  desc: string;
  href: string;
};

const channels: Channel[] = [
  {
    id: 'C-01',
    command: './connect --discord',
    label: 'Discord',
    desc: 'Mentor updates, announcements, team formation and support threads.',
    href: 'https://discord.com/',
  },
  {
    id: 'C-02',
    command: './connect --instagram',
    label: 'Instagram',
    desc: 'Visual drops, event reminders and behind-the-scenes build logs.',
    href: 'https://instagram.com/',
  },
  {
    id: 'C-03',
    command: './connect --whatsapp',
    label: 'WhatsApp',
    desc: 'Fast ops channel for deadlines, checklist nudges and urgency calls.',
    href: 'https://whatsapp.com/',
  },
];

const CommunitySection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.community-item');
      if (!items) return;

      gsap.fromTo(items, { opacity: 0, y: 16 }, {
        opacity: 1,
        y: 0,
        stagger: 0.11,
        duration: 0.45,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const buttons = Array.from(document.querySelectorAll<HTMLElement>('[data-community-btn]'));
    const springEase = spring({ stiffness: 280, damping: 16 });

    const enterHandlers = new Map<HTMLElement, () => void>();
    const leaveHandlers = new Map<HTMLElement, () => void>();

    buttons.forEach((button) => {
      const onEnter = () => {
        animate(button, { translateY: -2, scale: 1.015, ease: springEase });
      };
      const onLeave = () => {
        animate(button, { translateY: 0, scale: 1, ease: springEase });
      };

      enterHandlers.set(button, onEnter);
      leaveHandlers.set(button, onLeave);
      button.addEventListener('mouseenter', onEnter);
      button.addEventListener('mouseleave', onLeave);
    });

    return () => {
      buttons.forEach((button) => {
        const onEnter = enterHandlers.get(button);
        const onLeave = leaveHandlers.get(button);
        if (onEnter) button.removeEventListener('mouseenter', onEnter);
        if (onLeave) button.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="community" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <span className="font-mono font-medium text-[10px] text-accent tracking-[3px] uppercase block mb-3">
          $ ./join-community.sh
        </span>
        <h2 className="font-display font-bold text-[26px] md:text-[40px] text-text leading-none mb-3">
          Join the command channels.
        </h2>
        <p className="font-body text-[15px] text-text-dim leading-[1.75] max-w-[640px] mb-10">
          Choose where you want updates delivered. Every channel is active during registration and the full 48-hour sprint.
        </p>

        <div className="space-y-3">
          {channels.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="action"
              data-community-btn="true"
              className="community-item block rounded-[8px] px-4 py-4"
              style={{
                border: '1px solid hsl(var(--border-faint) / 0.04)',
                background: 'hsl(var(--bg-raised))',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[70px_220px_1fr_auto] gap-3 items-start md:items-center">
                <span className="font-mono text-[10px] text-text-ghost tracking-[2px] uppercase">{channel.id}</span>
                <span className="font-mono text-[13px] text-accent">{channel.command}</span>
                <div>
                  <span className="font-display font-bold text-[22px] text-text leading-none block">{channel.label}</span>
                  <span className="font-body text-[13px] text-text-dim leading-[1.6] mt-1 block">{channel.desc}</span>
                </div>
                <span className="font-mono text-[10px] text-accent tracking-[2px] uppercase">launch →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
