import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-200/80 bg-white/60 py-10 backdrop-blur-md dark:border-white/[0.07] dark:bg-[#08080D]/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        {/* Left: Copyright & Craft */}
        <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            &copy; {currentYear} {SITE_CONFIG.fullName} ({SITE_CONFIG.nickname}). All rights reserved.
          </p>
          <p className="font-mono text-xs text-slate-500 dark:text-slate-500">
            Built with React, TypeScript, Tailwind CSS &amp; Framer Motion · {SITE_CONFIG.location}
          </p>
        </div>

        {/* Right: Quick Socials + Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href={SITE_CONFIG.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/90 bg-white/80 text-slate-600 hover:border-violet-500/40 hover:text-violet-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:border-cyan-400/40 dark:hover:text-cyan-300"
          >
            <Github className="h-4 w-4" />
          </a>

          <a
            href={SITE_CONFIG.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/90 bg-white/80 text-slate-600 hover:border-violet-500/40 hover:text-violet-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:border-cyan-400/40 dark:hover:text-cyan-300"
          >
            <Linkedin className="h-4 w-4" />
          </a>

          <a
            href={`mailto:${SITE_CONFIG.email}`}
            aria-label={`Email ${SITE_CONFIG.fullName}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/90 bg-white/80 text-slate-600 hover:border-violet-500/40 hover:text-violet-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:border-cyan-400/40 dark:hover:text-cyan-300"
          >
            <Mail className="h-4 w-4" />
          </a>

          <span aria-hidden="true" className="mx-1 h-5 w-px bg-slate-200 dark:bg-white/10" />

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white/80 px-3 py-2 font-mono text-xs font-medium text-slate-700 hover:border-violet-500/50 hover:text-violet-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

