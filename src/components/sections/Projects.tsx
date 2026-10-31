import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { PROJECTS } from '../../data/projects';
import type { ProjectFilterTag, ProjectItem } from '../../types/portfolio';
import { ProjectCard } from '../ui/ProjectCard';
import { ProjectCaseStudyModal } from '../ui/ProjectCaseStudyModal';
import { SectionHeading } from '../ui/SectionHeading';

const FILTER_OPTIONS: ProjectFilterTag[] = [
  'All',
  'React',
  'TypeScript',
  'SCSS / CSS',
  'REST API',
];

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterTag>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return PROJECTS;
    }
    return PROJECTS.filter((project) => project.filterTags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="projects-heading"
            indexCode="03 // WORK"
            eyebrow="Featured Projects"
            title="Production-minded builds with"
            highlight="real state & architecture."
            description="Click any project’s Case Study trigger to inspect its data pipeline, architectural trade-offs, and responsive specs."
          />

          {/* Interactive Stack Filter Bar */}
          <div
            role="group"
            aria-label="Filter projects by technology"
            className="mb-12 flex flex-wrap items-center gap-1.5"
          >
            {FILTER_OPTIONS.map((tag) => {
              const isSelected = activeFilter === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveFilter(tag)}
                  aria-pressed={isSelected}
                  className={`relative rounded-xl px-3.5 py-2 font-mono text-xs font-medium transition-colors ${
                    isSelected
                      ? 'text-white'
                      : 'border border-slate-200/90 bg-white/75 text-slate-600 hover:border-violet-400/50 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId={prefersReducedMotion ? undefined : 'project-filter-pill'}
                      className="absolute inset-0 -z-10 rounded-xl bg-accent-gradient shadow-md shadow-violet-500/20"
                      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                    />
                  )}
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* 12-Column Responsive Bento Project Grid */}
        <motion.div layout className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onInspect={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub Archive Callout */}
        <div className="mt-12 flex justify-center">
          <a
            href={SITE_CONFIG.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl border border-slate-300/90 bg-white/80 px-5 py-3 font-mono text-xs font-semibold text-slate-700 hover:border-violet-500/50 hover:text-violet-700 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
          >
            <Github className="h-4 w-4" />
            <span>Explore full repository archive on GitHub ({SITE_CONFIG.socials.githubHandle})</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Interactive Galvatron / HUD Case-Study Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
