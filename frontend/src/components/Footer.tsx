export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'bytemeal-app');

  return (
    <footer className="glass-nav border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">
              © {year} ByteMeal. Fighting food waste, one meal at a time.
            </span>
          </div>
          <div className="text-white/50 text-sm flex items-center gap-1">
            Built with{' '}
            <span className="text-brand-orange mx-1">♥</span>
            {' '}using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-sky hover:text-brand-sky-light transition-colors font-medium ml-1"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
