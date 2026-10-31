import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Code2, Cpu, Layers } from 'lucide-react';
import type { ProjectItem } from '../../types/portfolio';
import { ProjectMockup } from './ProjectMockup';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onInspect: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onInspect,
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 240, damping: 24 });
  const springRotateY = useSpring(rotateY, { stiffness: 240, damping: 24 });

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    mouseX.set(localX);
    mouseY.set(localY);

    if (!prefersReducedMotion) {
      const pctX = localX / rect.width - 0.5;
      const pctY = localY / rect.height - 0.5;
      rotateX.set(-pctY * 4.5);
      rotateY.set(pctX * 4.5);
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const spotlightBg = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.14), rgba(6, 182, 212, 0.08) 45%, transparent 80%)`;

  const hasLiveDemo = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReducedMotion
          ? undefined
          : {
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformPerspective: 1100,
            }
      }
      className={`glass-panel gradient-border-mask group relative flex flex-col overflow-hidden rounded-2xl shadow-lg shadow-slate-900/[0.04] dark:shadow-black/40 ${
        project.featured ? 'lg:col-span-6' : 'lg:col-span-4'
      }`}
    >
      {/* Interactive pointer-tracking radial spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlightBg }}
      />

      {/* Top laser energy hairline on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] scale-x-0 bg-gradient-to-r from-transparent via-violet-500 to-cyan-400 transition-transform duration-500 group-hover:scale-x-100"
      />

      {/* Corner HUD registration brackets that illuminate on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-2.5 top-2.5 z-20 h-2.5 w-2.5 border-l-2 border-t-2 border-violet-500/0 transition-colors duration-300 group-hover:border-violet-500/80 dark:group-hover:border-cyan-400/80"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 top-2.5 z-20 h-2.5 w-2.5 border-r-2 border-t-2 border-violet-500/0 transition-colors duration-300 group-hover:border-violet-500/80 dark:group-hover:border-cyan-400/80"
      />

      {/* Clickable Visual Header -> Opens Interactive HUD Case Study */}
      <button
        type="button"
        onClick={() => onInspect(project)}
        aria-label={`Open architectural case study for ${project.title}`}
        className="relative z-10 block w-full cursor-pointer text-left"
      >
        {project.imageUrl ? (
          <div
            className={`w-full overflow-hidden border-b border-slate-200/80 bg-slate-100 dark:border-white/[0.07] dark:bg-[#090910] ${
              project.featured ? 'h-56 sm:h-64' : 'h-48'
            }`}
          >
            <img
              src={project.imageUrl}
              alt={project.imageAlt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <ProjectMockup variant={project.mockupVariant} featured={project.featured} />
        )}

        <span className="pointer-events-none absolute bottom-3 right-3 rounded-lg border border-slate-300/80 bg-white/90 px-2.5 py-1 font-mono text-[10px] font-semibold text-violet-700 opacity-0 shadow-sm backdrop-blur transition-opacity duration-200 group-hover:opacity-100 dark:border-cyan-400/40 dark:bg-black/80 dark:text-cyan-300">
          INSPECT HUD &rarr;
        </span>
      </button>

      {/* Card Body */}
      <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-7">
        {/* Telemetry Meta Row */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-wider ${
              project.featured
                ? 'bg-gradient-to-r from-violet-500/15 to-cyan-500/15 text-violet-700 dark:text-cyan-300'
                : 'bg-slate-200/70 text-slate-600 dark:bg-white/[0.06] dark:text-slate-400'
            }`}
          >
            {project.indexCode}
          </span>

          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
            <Cpu className="h-3.5 w-3.5 text-violet-500 dark:text-cyan-400" />
            <span className="max-w-[210px] truncate sm:max-w-none">
              {project.featured ? 'Flagship Build' : 'Core Build'}
            </span>
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-xs font-medium text-violet-600 dark:text-cyan-400">
          {project.subtitle}
        </p>

        {/* Summary */}
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.description}
        </p>

        {/* Key Engineering Features */}
        <ul className="mt-4 space-y-2 border-t border-slate-200/80 pt-4 dark:border-white/[0.07]">
          {project.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-xs leading-relaxed text-slate-600 sm:text-[13px] dark:text-slate-300"
            >
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-600 dark:text-cyan-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Architecture Highlight Bar for Flagship Cards */}
        {project.featured && (
          <div className="mt-4 rounded-xl border border-slate-200/80 bg-slate-100/70 px-3.5 py-2 font-mono text-[11px] text-slate-600 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-slate-400">
            <span className="font-semibold text-violet-600 dark:text-violet-400">ARCH: </span>
            {project.architectureNote}
          </div>
        )}

        {/* Tech Tags + Action Buttons pinned to bottom */}
        <div className="mt-auto pt-5">
          <div className="mb-5 flex flex-wrap gap-1.5" aria-label={`${project.title} technologies`}>
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-slate-200/90 bg-white/80 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {hasLiveDemo && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-accent-gradient px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-violet-500/20 hover:opacity-95"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}

            <button
              type="button"
              onClick={() => onInspect(project)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/35 bg-violet-500/[0.08] px-3.5 py-2.5 text-xs font-semibold text-violet-700 hover:bg-violet-500/15 dark:border-cyan-400/30 dark:bg-cyan-400/[0.08] dark:text-cyan-300 dark:hover:bg-cyan-400/15"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Case Study</span>
            </button>

            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.title} on GitHub`}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300/90 bg-white/90 px-3.5 py-2.5 text-xs font-semibold text-slate-800 hover:border-violet-500/50 hover:text-violet-700 dark:border-white/15 dark:bg-white/[0.05] dark:text-slate-100 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
            >
              <Code2 className="h-4 w-4" />
              <span>Code</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
