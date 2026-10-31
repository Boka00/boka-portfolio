import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { JOURNEY_ITEMS } from '../../data/journey';
import { useActiveSection } from '../../hooks/useActiveSection';
import { ThemeToggle } from '../ui/ThemeToggle';

interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const navLinks = useMemo<NavLinkItem[]>(() => {
    const items: NavLinkItem[] = [
      { id: 'about', label: 'About', href: '#about' },
      { id: 'skills', label: 'Skills', href: '#skills' },
      { id: 'projects', label: 'Projects', href: '#projects' },
    ];
    if (JOURNEY_ITEMS.length > 0) {
      items.push({ id: 'journey', label: 'Journey', href: '#journey' });
    }
    items.push({ id: 'contact', label: 'Contact', href: '#contact' });
    return items;
  }, []);

  const sectionIds = useMemo(() => ['hero', ...navLinks.map((l) => l.id)], [navLinks]);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'border-b border-slate-200/80 bg-white/75 backdrop-blur-xl shadow-sm shadow-slate-900/[0.03] dark:border-white/[0.08] dark:bg-[#0A0A0F]/80'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8"
      >
        {/* Brand Monogram */}
        <a
          href="#hero"
          className="group inline-flex items-center gap-2.5 rounded-xl py-1 pr-2"
          aria-label={`${SITE_CONFIG.fullName} — Back to top`}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-accent-gradient font-display text-base font-bold text-white shadow-md shadow-violet-500/25">
            B
          </span>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              {SITE_CONFIG.nickname}
              <span className="font-mono text-xs font-medium text-violet-600 dark:text-cyan-400">
                .dev
              </span>
            </span>
            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
              React · TypeScript
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-1 rounded-full border border-slate-200/80 bg-white/70 p-1 backdrop-blur-md md:flex dark:border-white/[0.08] dark:bg-white/[0.03]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId={prefersReducedMotion ? undefined : 'active-nav-pill'}
                      className="absolute inset-0 -z-10 rounded-full border border-violet-500/30 bg-violet-500/10 dark:border-cyan-400/30 dark:bg-white/[0.08]"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <a
            href="#contact"
            className="hidden items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-violet-600 md:inline-flex dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-300"
          >
            Hire Boka
          </a>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/90 bg-white/80 text-slate-700 md:hidden dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-slate-200/80 bg-white/95 backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-[#0A0A0F]/95"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-medium ${
                      isActive
                        ? 'bg-violet-500/10 text-violet-700 dark:bg-white/[0.08] dark:text-cyan-300'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-accent-gradient px-4 py-3 text-sm font-semibold text-white"
              >
                Let&apos;s Build Together
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

