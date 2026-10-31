import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { JOURNEY_ITEMS } from '../../data/journey';
import { useActiveSection } from '../../hooks/useActiveSection';

const SECTION_LABELS: Record<string, string> = {
  hero: '00 // INIT',
  about: '01 // ABOUT',
  skills: '02 // STACK',
  projects: '03 // WORK',
  journey: '04 // JOURNEY',
  contact: '05 // CONTACT',
};

export const TelemetryProgressBar: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  const [scrollPct, setScrollPct] = useState(0);

  const sectionIds = useMemo(() => {
    const ids = ['hero', 'about', 'skills', 'projects'];
    if (JOURNEY_ITEMS.length > 0) ids.push('journey');
    ids.push('contact');
    return ids;
  }, []);

  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollPct(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Top 2px Kinetic Energy Scroll Rail */}
      <motion.div
        aria-hidden="true"
        style={{
          scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress,
        }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-violet-500 via-indigo-400 to-cyan-400"
      />

      {/* Desktop Bottom-Left Telemetry HUD Pill */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-5 left-5 z-30 hidden items-center gap-2.5 rounded-full border border-slate-200/85 bg-white/80 px-3.5 py-1.5 font-mono text-[10px] font-medium text-slate-600 shadow-sm backdrop-blur-md xl:inline-flex dark:border-white/10 dark:bg-[#0B0B13]/85 dark:text-slate-400"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {SECTION_LABELS[activeSection] ?? '00 // INIT'}
        </span>
        <span className="text-slate-300 dark:text-white/15">|</span>
        <span className="tabular-nums text-violet-600 dark:text-cyan-400">
          {String(scrollPct).padStart(2, '0')}%
        </span>
      </div>
    </>
  );
};

