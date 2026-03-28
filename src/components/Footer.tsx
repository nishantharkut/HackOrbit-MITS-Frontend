const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Register', href: '#register' },
];

const resources = [
  { label: 'Sponsors', href: '#partners' },
  { label: 'Community', href: '#community' },
  { label: 'Code of Conduct', href: '#' },
  { label: 'Submission Guide', href: '#' },
];

const contacts = [
  { label: 'Email', value: 'hello@hackorbit.tech', href: 'mailto:hello@hackorbit.tech' },
  { label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { label: 'Location', value: 'MITS Gwalior, Madhya Pradesh', href: '#' },
];

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid hsl(var(--border-faint) / 0.14)',
        background: 'hsl(var(--bg-raised))',
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 pb-6 pt-10 md:px-10 md:pb-8 md:pt-14">
        <div className="grid grid-cols-1 gap-10 border-b pb-10 md:grid-cols-[1.15fr_0.85fr] md:gap-8 md:pb-12" style={{ borderColor: 'hsl(var(--border-faint) / 0.12)' }}>
          <div>
            <span className="mb-4 block font-mono text-[10px] font-medium uppercase tracking-[3px] text-accent">
              $ subscribe --priority-access
            </span>
            <h3 className="max-w-[16ch] font-display text-[34px] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-text sm:text-[48px] md:text-[56px]">
              Stay in the loop.
            </h3>

            <form className="mt-8 max-w-[460px]" onSubmit={(event) => event.preventDefault()}>
              <div className="grid grid-cols-[1fr_auto] items-end gap-4 border-b pb-2" style={{ borderColor: 'hsl(var(--border-faint) / 0.35)' }}>
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[2px] text-accent">Email</span>
                  <input
                    type="email"
                    placeholder="you@college.edu"
                    className="w-full bg-transparent font-mono text-[14px] text-text outline-none placeholder:text-text-ghost/70"
                  />
                </label>
                <button
                  type="submit"
                  data-cursor="action"
                  className="font-mono text-[11px] font-semibold uppercase tracking-[2px] text-accent transition-colors duration-150 hover:text-text"
                >
                  OK
                </button>
              </div>
            </form>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-[2px] text-text-ghost">
              First 150 verified teams get fast-track review.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[2px] text-accent">Explore</div>
              <div className="space-y-1.5">
                {quickLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    data-cursor="action"
                    className="block font-body text-[14px] text-text-dim transition-colors duration-150 hover:text-accent"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[2px] text-accent">Resources</div>
              <div className="space-y-1.5">
                {resources.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    data-cursor="action"
                    className="block font-body text-[14px] text-text-dim transition-colors duration-150 hover:text-accent"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[2px] text-accent">Contact</div>
              <div className="space-y-2">
                {contacts.map((entry) => (
                  <a
                    key={entry.label}
                    href={entry.href}
                    data-cursor="action"
                    className="block"
                  >
                    <span className="mr-2 font-mono text-[10px] uppercase tracking-[2px] text-accent">{entry.label}</span>
                    <span className="font-body text-[13px] text-text-dim transition-colors duration-150 hover:text-accent">{entry.value}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden pb-1 pt-7 md:pt-10">
          <div
            aria-hidden
            className="select-none font-display text-[min(19vw,260px)] font-bold uppercase leading-[0.78] tracking-[-0.055em] text-text"
          >
            HACKORBIT
          </div>
        </div>

        <div className="mt-3 flex flex-col items-start justify-between gap-3 border-t pt-4 md:mt-4 md:flex-row md:items-center" style={{ borderColor: 'hsl(var(--border-faint) / 0.12)' }}>
          <span className="font-mono text-[10px] uppercase tracking-[2px] text-text-ghost">
            Build Status: Passing
          </span>
          <span className="font-body text-[12px] text-text-ghost">
            Participation is open to all bonafide students. Final access is granted after verification.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
