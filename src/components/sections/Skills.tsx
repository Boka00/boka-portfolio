import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Braces,
  CheckSquare,
  Code,
  FileCode2,
  GitBranch,
  Github,
  Globe,
  Layers,
  LayoutGrid,
  Palette,
  Sliders,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { SKILL_GROUPS } from '../../data/skills';
import type { SkillIconKey } from '../../types/portfolio';
import { SectionHeading } from '../ui/SectionHeading';

function renderSkillIcon(iconKey: SkillIconKey): React.ReactNode {
  const iconProps = { className: 'h-4 w-4 text-violet-600 dark:text-cyan-400' };
  switch (iconKey) {
    case 'typescript':
      return <Terminal {...iconProps} />;
    case 'javascript':
      return <Braces {...iconProps} />;
    case 'html5':
      return <FileCode2 {...iconProps} />;
    case 'css3':
      return <LayoutGrid {...iconProps} />;
    case 'scss':
      return <Palette {...iconProps} />;
    case 'react':
      return <Sparkles {...iconProps} />;
    case 'tailwind':
      return <Layers {...iconProps} />;
    case 'cssmodules':
      return <Code {...iconProps} />;
    case 'formik':
      return <Sliders {...iconProps} />;
    case 'yup':
      return <CheckSquare {...iconProps} />;
    case 'git':
      return <GitBranch {...iconProps} />;
    case 'github':
      return <Github {...iconProps} />;
    case 'restapi':
      return <Globe {...iconProps} />;
  }
}

export const Skills: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="skills-heading"
          indexCode="02 // STACK"
          eyebrow="Technical Arsenal"
          title="Focused tools for building"
          highlight="resilient interfaces."
          description="Every technology in my stack has been battle-tested across real multi-view CRUD, quiz, and explorer applications."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, groupIdx) => (
            <motion.div
              key={group.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: groupIdx * 0.08 }}
              className="glass-panel gradient-border-mask flex flex-col rounded-2xl p-6 sm:p-7"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-md bg-violet-500/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-violet-700 dark:bg-white/[0.06] dark:text-cyan-300">
                  {group.code}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  {group.items.length} tools
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                {group.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
                {group.subtitle}
              </p>

              <ul className="mt-6 flex flex-col gap-2.5">
                {group.items.map((skill) => (
                  <motion.li
                    key={skill.name}
                    whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                    className="group/chip flex items-start gap-3 rounded-xl border border-slate-200/85 bg-white/80 p-3 hover:border-violet-500/50 dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-cyan-400/40"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200/80 bg-slate-50 dark:border-white/10 dark:bg-white/[0.04]">
                      {renderSkillIcon(skill.iconKey)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-display text-sm font-semibold text-slate-900 group-hover/chip:text-violet-700 dark:text-slate-100 dark:group-hover/chip:text-cyan-300">
                        {skill.name}
                      </div>
                      <div className="mt-0.5 text-xs leading-snug text-slate-500 dark:text-slate-400">
                        {skill.context}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

