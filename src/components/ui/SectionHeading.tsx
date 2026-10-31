import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionHeadingProps {
  indexCode: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  id?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  indexCode,
  eyebrow,
  title,
  highlight,
  description,
  id,
  align = 'left',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const isCentered = align === 'center';

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 ${isCentered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}
    >
      <div
        className={`mb-4 inline-flex items-center gap-2.5 rounded-full border border-violet-500/25 bg-violet-500/[0.07] px-3.5 py-1 font-mono text-xs font-medium tracking-wider text-violet-700 dark:border-violet-400/25 dark:bg-violet-500/10 dark:text-cyan-300 ${
          isCentered ? 'mx-auto' : ''
        }`}
      >
        <span className="text-violet-500 dark:text-violet-400">[{indexCode}]</span>
        <span className="h-1 w-1 rounded-full bg-cyan-500" />
        <span className="uppercase">{eyebrow}</span>
      </div>

      <h2
        id={id}
        className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12] dark:text-slate-50"
      >
        {title}{' '}
        {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>

      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
          {description}
        </p>
      )}

      {/* Animated HUD Calibration Rule */}
      <motion.div
        aria-hidden="true"
        initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`mt-5 h-px w-28 origin-left bg-gradient-to-r from-violet-500 via-cyan-400 to-transparent ${
          isCentered ? 'mx-auto origin-center' : ''
        }`}
      />
    </motion.div>
  );
};
