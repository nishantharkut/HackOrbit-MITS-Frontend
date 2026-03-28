const Footer = () => {
  return (
    <footer>
      {/* Row 1 */}
      <div
        className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between py-7 gap-3 sm:gap-4 text-center sm:text-left"
        style={{ borderTop: '1px solid hsl(var(--border-faint) / 0.03)' }}
      >
        <span className="font-display font-bold text-[14px] tracking-[0.1em] text-text-ghost">
          HACKORBIT
        </span>
        <span className="font-mono text-[11px] text-text-ghost">
          2026 · MITS Gwalior
        </span>
        <span className="font-body text-[12px] text-text-ghost">
          DLG Group × MITS Gwalior
        </span>
      </div>

      {/* Row 2 */}
      <div className="max-w-6xl mx-auto px-6 pb-7 text-center">
        <div
          className="inline-block px-[18px] py-2.5 rounded-[6px]"
          style={{
            border: '1px solid hsl(var(--border-faint) / 0.03)',
            background: 'hsl(var(--bg-raised))',
          }}
        >
          <span className="font-body text-[10px] text-text-ghost leading-[1.65]">
            Participation is open to all bonafide students. Registration does not guarantee problem statement access until verification is complete.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
