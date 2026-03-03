export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="glass-nav border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center">
          <span className="text-white/60 text-sm">
            © {year} ByteMeal. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
