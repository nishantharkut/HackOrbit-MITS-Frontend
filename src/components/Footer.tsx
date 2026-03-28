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
        borderTop: '1px solid hsl(var(--border-faint) / 0.03)',
        background: 'hsl(var(--bg-raised))',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr] gap-8 md:gap-12">
          <div>
            <span className="font-mono font-medium text-[10px] text-accent tracking-[3px] uppercase block mb-3">
              $ cat contact.yml
            </span>
            <h3 className="font-display font-bold text-[28px] text-text leading-none mb-3">HACKORBIT</h3>
            <p className="font-body text-[14px] text-text-dim leading-[1.75] max-w-[380px]">
              National-level 48-hour build sprint for student teams shipping real, testable solutions.
            </p>
            <div className="mt-5 font-mono text-[10px] text-text-ghost tracking-[2px] uppercase">
              2026 · MITS Gwalior · DLG Group
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] text-text-ghost tracking-[2px] uppercase mb-3">Quick Links</div>
            <div className="space-y-2">
              {quickLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  data-cursor="action"
                  className="block font-body text-[14px] text-text-dim hover:text-accent transition-colors duration-150"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] text-text-ghost tracking-[2px] uppercase mb-3">Resources + Contact</div>
            <div className="space-y-2 mb-4">
              {resources.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  data-cursor="action"
                  className="block font-body text-[14px] text-text-dim hover:text-accent transition-colors duration-150"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="space-y-2">
              {contacts.map((entry) => (
                <a
                  key={entry.label}
                  href={entry.href}
                  data-cursor="action"
                  className="block"
                >
                  <span className="font-mono text-[10px] text-text-ghost tracking-[2px] uppercase mr-2">{entry.label}</span>
                  <span className="font-body text-[13px] text-text-dim hover:text-accent transition-colors duration-150">{entry.value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-8 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
          style={{ borderTop: '1px solid hsl(var(--border-faint) / 0.03)' }}
        >
          <span className="font-mono text-[10px] text-text-ghost tracking-[2px] uppercase">
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
