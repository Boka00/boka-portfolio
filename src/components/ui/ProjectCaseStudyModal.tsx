import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import type { ProjectItem } from '../../types/portfolio';
import { ProjectMockup } from './ProjectMockup';

interface ProjectCaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

type ModalTab = 'overview' | 'architecture' | 'telemetry';

const MODAL_TABS: { id: ModalTab; code: string; label: string }[] = [
  { id: 'overview', code: '01', label: 'Overview & UX' },
  { id: 'architecture', code: '02', label: 'Architecture' },
  { id: 'telemetry', code: '03', label: 'Specs & Stack' },
];

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('overview');
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    setActiveTab('overview');

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 40);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const hasLiveDemo = Boolean(project?.liveUrl && project.liveUrl.trim().length > 0);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* HUD Modal Chassis */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.94, y: 20 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 14 }
            }
            transition={{ type: 'spring', stiffness: 310, damping: 28 }}
            className="glass-panel gradient-border-mask relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl shadow-black/60"
          >
            {/* Top Energy Laser Sweep */}
            <div
              aria-hidden="true"
              className="h-[2px] w-full bg-gradient-to-r from-violet-500 via-indigo-400 to-cyan-400"
            />

            {/* Corner HUD Brackets */}
            <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-violet-500/70 dark:border-cyan-400/70" />
            <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-violet-500/70 dark:border-cyan-400/70" />

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 px-6 py-5 dark:border-white/[0.08]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-violet-500/15 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-violet-700 dark:text-cyan-300">
                    {project.indexCode} // CASE STUDY
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {project.subtitle}
                  </span>
                </div>
                <h2
                  id="case-study-modal-title"
                  className="mt-1.5 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
                >
                  {project.title}
                </h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study modal"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/90 bg-white/80 text-slate-600 hover:border-violet-500/50 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:border-cyan-400/50 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Interactive HUD Tab Bar */}
            <div
              role="tablist"
              aria-label="Case study sections"
              className="flex gap-1.5 border-b border-slate-200/80 bg-slate-100/60 px-6 py-2.5 dark:border-white/[0.07] dark:bg-black/30"
            >
              {MODAL_TABS.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative rounded-lg px-3.5 py-1.5 font-mono text-xs font-medium transition-colors ${
                      isSelected
                        ? 'text-white'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId={prefersReducedMotion ? undefined : 'case-study-active-tab'}
                        className="absolute inset-0 -z-10 rounded-lg bg-accent-gradient shadow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="opacity-75">{tab.code} // </span>
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Preview Schematic / Screenshot */}
                    <div className="overflow-hidden rounded-xl border border-slate-200/80 dark:border-white/10">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.imageAlt}
                          loading="lazy"
                          className="h-56 w-full object-cover object-top"
                        />
                      ) : (
                        <ProjectMockup variant={project.mockupVariant} featured />
                      )}
                    </div>

                    {/* Problem vs Solution Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-slate-200/90 bg-white/80 p-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
                        <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                          CHALLENGE // PROBLEM SPACE
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                          {project.caseStudy.problem}
                        </p>
                      </div>

                      <div className="rounded-xl border border-violet-500/30 bg-violet-500/[0.05] p-4 dark:border-cyan-400/25 dark:bg-cyan-500/[0.04]">
                        <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-violet-700 dark:text-cyan-300">
                          EXECUTION // ENGINEERING SOLUTION
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm dark:text-slate-200">
                          {project.caseStudy.solution}
                        </p>
                      </div>
                    </div>

                    {/* Core Feature Checklist */}
                    <div>
                      <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Shipped Capabilities
                      </h3>
                      <ul className="space-y-2.5">
                        {project.features.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-700 sm:text-sm dark:text-slate-300"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-cyan-400" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'architecture' && (
                  <motion.div
                    key="architecture"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="rounded-xl border border-slate-200/90 bg-slate-100/75 p-4 font-mono text-xs text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
                      <span className="font-semibold text-violet-600 dark:text-cyan-400">
                        SYSTEM.BLUEPRINT:{' '}
                      </span>
                      {project.architectureNote}
                    </div>

                    {/* 3-Stage Transformium Data/UI Pipeline */}
                    <div className="space-y-3">
                      {project.caseStudy.pipeline.map((step, idx) => (
                        <div
                          key={step.stage}
                          className="relative rounded-xl border border-slate-200/90 bg-white/85 p-4 dark:border-white/[0.08] dark:bg-white/[0.03]"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded bg-violet-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-violet-700 dark:bg-white/[0.07] dark:text-cyan-300">
                              <Layers className="h-3 w-3" />
                              {step.stage}
                            </span>
                            {idx < project.caseStudy.pipeline.length - 1 && (
                              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                            )}
                          </div>
                          <h4 className="mt-2 font-display text-base font-bold text-slate-900 dark:text-white">
                            {step.title}
                          </h4>
                          <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                            {step.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'telemetry' && (
                  <motion.div
                    key="telemetry"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* 4-Card Telemetry Specs */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {project.caseStudy.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-xl border border-slate-200/90 bg-white/85 p-3.5 dark:border-white/[0.08] dark:bg-white/[0.03]"
                        >
                          <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                            {metric.label}
                          </div>
                          <div className="mt-1 font-display text-sm font-bold text-slate-900 dark:text-cyan-300">
                            {metric.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Technology Stack */}
                    <div className="rounded-xl border border-slate-200/90 bg-white/80 p-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
                      <div className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold text-slate-700 dark:text-slate-200">
                        <Cpu className="h-4 w-4 text-violet-600 dark:text-cyan-400" />
                        <span>TECHNOLOGY MATRIX</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs font-medium text-slate-800 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Responsive QA Matrix */}
                    <div className="rounded-xl border border-slate-200/90 bg-white/80 p-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
                      <div className="mb-2.5 flex items-center gap-2 font-mono text-xs font-semibold text-slate-700 dark:text-slate-200">
                        <SlidersHorizontal className="h-4 w-4 text-violet-600 dark:text-cyan-400" />
                        <span>RESPONSIVE VIEWPORT PROFILE</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 font-mono text-[11px] sm:grid-cols-4">
                        {['360px Mobile', '768px Tablet', '1280px Laptop', '1920px Desktop'].map(
                          (vp) => (
                            <div
                              key={vp}
                              className="rounded-lg border border-emerald-500/25 bg-emerald-500/[0.07] px-2.5 py-1.5 text-center text-emerald-700 dark:text-emerald-300"
                            >
                              {vp}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Modal Footer CTAs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 bg-slate-50/80 px-6 py-4 dark:border-white/[0.08] dark:bg-black/40">
              <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                ESC or click outside to close
              </span>

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

                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300/90 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 hover:border-violet-500/50 hover:text-violet-700 dark:border-white/15 dark:bg-white/[0.06] dark:text-slate-100 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
                >
                  <Code2 className="h-4 w-4" />
                  <span>View Repository</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
