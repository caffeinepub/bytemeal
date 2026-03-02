import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Utensils } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Donate Food', path: '/donate' },
  { label: 'Get Help', path: '/request-help' },
  { label: 'Food Listings', path: '/listings' },
  { label: 'Volunteer', path: '/volunteer' },
  { label: 'NGO Register', path: '/ngo-register' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl btn-orange flex items-center justify-center shadow-orange-glow">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">
              Byte<span className="text-gradient-orange">Meal</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/15 text-white border border-white/20'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-card border-t border-white/10 animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/15 text-white border border-white/20'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
