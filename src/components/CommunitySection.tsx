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
  icon: 'discord' | 'instagram' | 'whatsapp';
};

const channels: Channel[] = [
  {
    id: 'C-01',
    command: './connect --discord',
    label: 'Discord',
    desc: 'Mentor updates, announcements, team formation and support threads.',
    href: 'https://discord.com/',
    icon: 'discord',
  },
  {
    id: 'C-02',
    command: './connect --instagram',
    label: 'Instagram',
    desc: 'Visual drops, event reminders and behind-the-scenes build logs.',
    href: 'https://instagram.com/',
    icon: 'instagram',
  },
  {
    id: 'C-03',
    command: './connect --whatsapp',
    label: 'WhatsApp',
    desc: 'Fast ops channel for deadlines, checklist nudges and urgency calls.',
    href: 'https://whatsapp.com/',
    icon: 'whatsapp',
  },
];

const ChannelLogo = ({ icon }: { icon: Channel['icon'] }) => {
  if (icon === 'discord') {
    return (
      <svg viewBox="0 0 127.14 96.36" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0 105.89 105.89 0 0 0 19.39 8.09C2.79 32.65-1.71 56.6.54 80.21h.04a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.84-5.18c.91-.66 1.8-1.34 2.66-2.04a75.58 75.58 0 0 0 64.32 0c.87.71 1.76 1.39 2.67 2.04a68.68 68.68 0 0 1-10.85 5.19 77 77 0 0 0 6.89 11.1A105.25 105.25 0 0 0 126.6 80.22h.03c2.64-27.37-4.5-51.1-18.93-72.15zM42.45 65.69c-6.27 0-11.43-5.76-11.43-12.85 0-7.1 5.06-12.85 11.43-12.85 6.39 0 11.54 5.79 11.43 12.85 0 7.09-5.04 12.85-11.43 12.85zm42.24 0c-6.27 0-11.43-5.76-11.43-12.85 0-7.1 5.06-12.85 11.43-12.85 6.39 0 11.54 5.79 11.43 12.85 0 7.09-5.04 12.85-11.43 12.85z" />
      </svg>
    );
  }

  if (icon === 'instagram') {
    return (
      <svg viewBox="0 0 448 512" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.2 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.5 74.7-74.7 74.7zM370.5 136.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zM447.9 165c-1.7-35.3-9.8-66.6-35.7-92.5S355 38.5 319.7 36.8c-35.3-2-141.1-2-176.4 0-35.3 1.7-66.6 9.8-92.5 35.7S12.8 129.7 11.1 165c-2 35.3-2 141.1 0 176.4 1.7 35.3 9.8 66.6 35.7 92.5s57.2 34 92.5 35.7c35.3 2 141.1 2 176.4 0 35.3-1.7 66.6-9.8 92.5-35.7s34-57.2 35.7-92.5c2-35.3 2-141.1 0-176.4zM398.8 388c-7.7 19.4-22.6 34.3-42 42-29 11.5-97.8 8.9-132.7 8.9s-103.9 2.7-132.7-8.9c-19.4-7.7-34.3-22.6-42-42-11.5-29-8.9-97.8-8.9-132.7s-2.7-103.9 8.9-132.7c7.7-19.4 22.6-34.3 42-42 29-11.5 97.8-8.9 132.7-8.9s103.9-2.7 132.7 8.9c19.4 7.7 34.3 22.6 42 42 11.5 29 8.9 97.8 8.9 132.7s2.8 103.9-8.9 132.7z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M20.52 3.48A11.86 11.86 0 0012.05.02C5.5.02.16 5.36.16 11.9c0 2.1.55 4.15 1.6 5.95L.02 24l6.33-1.66a11.9 11.9 0 005.7 1.46h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.17-1.23-6.15-3.43-8.42zM12.06 21.8h-.01a9.9 9.9 0 01-5.03-1.37l-.36-.21-3.76.99 1-3.66-.24-.38a9.88 9.88 0 01-1.52-5.27c0-5.45 4.44-9.89 9.91-9.89 2.64 0 5.11 1.03 6.97 2.9a9.79 9.79 0 012.9 6.98c0 5.45-4.45 9.9-9.91 9.9zm5.43-7.4c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.97 1.18-.18.2-.36.23-.66.08-.3-.15-1.29-.47-2.45-1.5-.9-.8-1.5-1.79-1.68-2.1-.17-.3-.02-.46.13-.61.14-.14.3-.36.46-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.69-1.67-.94-2.29-.25-.6-.5-.52-.69-.53h-.58c-.2 0-.53.08-.8.38-.28.3-1.06 1.04-1.06 2.54s1.08 2.95 1.23 3.16c.15.2 2.12 3.24 5.15 4.55.72.31 1.28.49 1.72.62.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.71.25-1.32.18-1.44-.08-.13-.28-.2-.58-.35z" />
    </svg>
  );
};

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
              <div className="grid grid-cols-1 md:grid-cols-[70px_44px_220px_1fr_auto] gap-3 items-start md:items-center">
                <span className="font-mono text-[10px] text-text-ghost tracking-[2px] uppercase">{channel.id}</span>
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] text-accent"
                  style={{
                    background: 'hsl(var(--bg-elevated))',
                    border: '1px solid hsl(var(--border-faint) / 0.14)',
                  }}
                >
                  <ChannelLogo icon={channel.icon} />
                </span>
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
