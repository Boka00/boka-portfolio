import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { MagneticButton } from '../ui/MagneticButton';
import { TransformiumCore } from '../ui/TransformiumCore';

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || userInteracted) return;
    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % SITE_CONFIG.rotatingRoles.length);
    }, 3200);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, userInteracted]);

  useEffect(() => {
    if (!userInteracted) return;
    const resumeTimer = window.setTimeout(() => setUserInteracted(false), 9000);
    return () => window.clearTimeout(resumeTimer);
  }, [userInteracted, roleIndex]);

  const handleSelectMode = (idx: number) => {
    setUserInteracted(true);
    setRoleIndex(idx);
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-20 pt-10 sm:pb-28 sm:pt-16 lg:pb-32 lg:pt-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Core Pitch & CTAs */}
          <div className="lg:col-span-7">
            {/* Status Pill */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-3.5 py-1.5 text-xs font-medium text-emerald-800 dark:border-emerald-400/25 dark:bg-emerald-500/10 dark:text-emerald-300"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-semibold">{SITE_CONFIG.availability.label}</span>
              <span aria-hidden="true" className="text-emerald-600/60 dark:text-emerald-400/50">
                ·
              </span>
              <span className="font-mono text-[11px] text-emerald-700/90 dark:text-emerald-200/80">
                {SITE_CONFIG.availability.modes.join(' / ')}
              </span>
            </motion.div>

            {/* Main Display Heading */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-2 inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-violet-500 dark:text-cyan-400" />
                <span>Based in {SITE_CONFIG.location}</span>
              </p>

              <h1
                id="hero-heading"
                className="font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1.06] dark:text-white"
              >
                Boris{' '}
                <span className="text-gradient">&ldquo;{SITE_CONFIG.nickname}&rdquo;</span>
                <span className="block">Mkrtichiani</span>
              </h1>
            </motion.div>

            {/* Rotating Role Line */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 flex min-h-[2.5rem] items-center gap-2.5 font-mono text-base font-semibold sm:text-xl"
            >
              <span aria-hidden="true" className="text-violet-600 dark:text-cyan-400">
                &gt;
              </span>
              <div className="relative overflow-hidden py-0.5" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={SITE_CONFIG.rotatingRoles[roleIndex]}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-slate-800 dark:text-slate-100"
                  >
                    {SITE_CONFIG.rotatingRoles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span
                aria-hidden="true"
                className="inline-block h-5 w-[2px] animate-pulse bg-violet-500 dark:bg-cyan-400"
              />
            </motion.div>

            {/* One-Sentence Value Proposition */}
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300"
            >
              {SITE_CONFIG.tagline}
            </motion.p>

            {/* Primary & Secondary Magnetic CTAs */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <MagneticButton>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:opacity-95"
                >
                  <span>View Projects</span>
                  <ArrowDownRight className="h-4 w-4" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href={SITE_CONFIG.cvUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300/90 bg-white/85 px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm hover:border-violet-500/50 hover:text-violet-700 dark:border-white/15 dark:bg-white/[0.05] dark:text-slate-100 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
                >
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </a>
              </MagneticButton>
            </motion.div>

            {/* Social Row */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-8 flex flex-wrap items-center gap-5 border-t border-slate-200/80 pt-6 dark:border-white/[0.08]"
            >
              <a
                href={SITE_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-medium text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-cyan-300"
              >
                <Github className="h-4 w-4" />
                <span>GitHub ({SITE_CONFIG.socials.githubHandle})</span>
              </a>

              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-medium text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-cyan-300"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center gap-2 font-mono text-xs font-medium text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-cyan-300"
              >
                <Mail className="h-4 w-4" />
                <span>{SITE_CONFIG.email}</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive Transformium Architecture Core */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <TransformiumCore activeMode={roleIndex} onSelectMode={handleSelectMode} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

