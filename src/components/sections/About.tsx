import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe2, Layers, ShieldCheck, Sparkles, SunMoon } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { useTheme } from '../../context/ThemeContext';
import { SectionHeading } from '../ui/SectionHeading';

export const About: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { theme, toggleTheme } = useTheme();
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Tbilisi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date());
        setLocalTime(`${formatted} GET`);
      } catch {
        setLocalTime('UTC+04:00');
      }
    };
    updateClock();
    const timer = window.setInterval(updateClock, 30000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="about-heading"
          indexCode="01 // ABOUT"
          eyebrow="Engineering Profile"
          title="Interfaces engineered for clarity,"
          highlight="speed, and scale."
          description="A snapshot of how I think about front-end architecture, strict typing, and tactile user experience."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Card 1: Main Bio (7 cols) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="glass-panel gradient-border-mask flex flex-col justify-between rounded-2xl p-6 sm:p-8 md:col-span-7"
          >
            <div>
              <div className="mb-5 flex items-center gap-4">
                {/* [PERSONALIZE]: Replace monogram badge with <img src="/avatar.webp" ... /> when ready */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-gradient font-display text-xl font-bold text-white shadow-lg shadow-violet-500/20">
                  BM
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    Boris Mkrtichiani · &ldquo;Boka&rdquo;
                  </h3>
                  <p className="font-mono text-xs text-violet-600 dark:text-cyan-400">
                    Front-End / React Developer
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                I&apos;m a Front-End Developer in Tbilisi, Georgia (studying Information Technology
                at Georgian Technical University and trained at 10X College) building B2B SaaS
                interfaces, CRMs, dashboards, and normalized data-management workspaces with
                React.js, TypeScript, and Tailwind CSS.
              </p>
              <p className="mt-3.5 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Backed by certified training in Ethical Hacking &amp; Web Security (AlgoUni, OWASP
                Top 10) and Cisco Networking Academy, I pair composable component architecture and
                Formik/Yup schema validation with security-first front-end practices like strict CSP
                headers and XSS-safe data flows.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-200/80 pt-5 dark:border-white/[0.07]">
              {[
                'Modular Components',
                'Strict TypeScript',
                'OWASP & CSP Aware',
                'WCAG AA Contrast',
              ].map(
                (pill) => (
                  <span
                    key={pill}
                    className="rounded-lg border border-slate-200/90 bg-white/75 px-3 py-1 font-mono text-[11px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                  >
                    {pill}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Card 2: What I Care About + Live Theme Showcase (5 cols) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="glass-panel gradient-border-mask flex flex-col justify-between rounded-2xl p-6 sm:p-7 md:col-span-5"
          >
            <div>
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-semibold text-violet-600 dark:text-cyan-400">
                <Layers className="h-4 w-4" />
                <span>CORE PILLARS</span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Architecture, Type Safety &amp; Theme Craft
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-violet-500 dark:text-cyan-400" />
                  <span>
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      End-to-end validation:
                    </strong>{' '}
                    TypeScript interfaces paired with Formik &amp; Yup schemas.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <SunMoon className="mt-0.5 h-4 w-4 shrink-0 text-violet-500 dark:text-cyan-400" />
                  <span>
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      First-class theming:
                    </strong>{' '}
                    Every flagship app I build supports persistent dark &amp; light palettes.
                  </span>
                </li>
              </ul>
            </div>

            {/* Interactive Theme Token Inspector */}
            <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200/90 bg-slate-100/80 p-3 dark:border-white/10 dark:bg-black/40">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Active Design Tokens
                </div>
                <div className="font-mono text-xs font-semibold text-slate-900 dark:text-white">
                  {theme === 'dark' ? '#0A0A0F · Obsidian Dark' : '#F8FAFC · Blueprint Light'}
                </div>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-lg bg-accent-gradient px-3 py-1.5 font-mono text-[11px] font-semibold text-white shadow-sm hover:opacity-90"
              >
                Test Theme
              </button>
            </div>
          </motion.div>

          {/* Card 3: Location & Remote Availability (5 cols) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="glass-panel gradient-border-mask flex flex-col justify-between rounded-2xl p-6 sm:p-7 md:col-span-5"
          >
            <div>
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-semibold text-violet-600 dark:text-cyan-400">
                <Globe2 className="h-4 w-4" />
                <span>LOCATION &amp; COLLABORATION</span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                {SITE_CONFIG.location} · Global Remote Ready
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Strong daily overlap with European, UK, and US East Coast engineering teams. Open
                to full-time product roles, freelance builds, and remote contracts.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5 pt-2 font-mono text-xs">
              <div className="rounded-xl border border-slate-200/80 bg-white/75 p-3 dark:border-white/[0.07] dark:bg-white/[0.03]">
                <span className="block text-[10px] text-slate-400">LOCAL TIME</span>
                <span className="mt-0.5 block font-semibold text-slate-900 dark:text-white">
                  {localTime || SITE_CONFIG.timezone}
                </span>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white/75 p-3 dark:border-white/[0.07] dark:bg-white/[0.03]">
                <span className="block text-[10px] text-slate-400">STATUS</span>
                <span className="mt-0.5 block font-semibold text-emerald-600 dark:text-emerald-400">
                  Open to Offers
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Interest / Motion Craft Card (7 cols) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="glass-panel gradient-border-mask flex flex-col justify-between rounded-2xl p-6 sm:p-7 md:col-span-7"
          >
            <div>
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-semibold text-violet-600 dark:text-cyan-400">
                <Sparkles className="h-4 w-4" />
                <span>BEYOND THE EDITOR</span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Kinetic Motion UI &amp; Sci-Fi Concept Telemetry
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Outside day-to-day React work, I geek out on industrial concept-art HUDs—especially
                programmable-matter motion systems and high-precision dev-tool interfaces like
                Linear and Vercel. Studying how micro-transitions communicate spatial hierarchy
                inspires me to make web apps feel responsive, tactile, and unmistakably modern
                without ever compromising performance or reduced-motion accessibility.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-200/80 pt-4 font-mono text-[11px] text-slate-500 dark:border-white/[0.07] dark:text-slate-400">
              <span>COORDS // {SITE_CONFIG.coordinates}</span>
              <span className="text-violet-600 dark:text-cyan-400">MOTION-SAFE: TRUE</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

