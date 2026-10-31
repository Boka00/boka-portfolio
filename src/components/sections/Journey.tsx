import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, Check, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS, JOURNEY_ITEMS } from '../../data/journey';
import { SectionHeading } from '../ui/SectionHeading';

export const Journey: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  if (JOURNEY_ITEMS.length === 0 && CERTIFICATIONS.length === 0) {
    return null;
  }

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="journey-heading"
          indexCode="04 // CREDENTIALS"
          eyebrow="Education & Verified Certifications"
          title="Academic IT foundation backed by"
          highlight="front-end & security credentials."
          description="Combining university software engineering studies, intensive B2B React training, and certified cybersecurity coursework."
        />

        {/* Verified Certifications Bento Row */}
        {CERTIFICATIONS.length > 0 && (
          <div className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className="glass-panel gradient-border-mask flex flex-col justify-between rounded-2xl p-5 sm:p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-violet-500/12 px-2.5 py-1 font-mono text-[10px] font-semibold text-violet-700 dark:bg-white/[0.06] dark:text-cyan-300">
                      <Award className="h-3.5 w-3.5" />
                      <span>{cert.date}</span>
                    </span>

                    {cert.credentialId && (
                      <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                        {cert.credentialId}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3.5 font-display text-lg font-bold text-slate-900 dark:text-white">
                    {cert.title}
                  </h3>
                  <p className="mt-0.5 font-mono text-xs font-medium text-violet-600 dark:text-cyan-400">
                    {cert.issuer}
                  </p>

                  {cert.distinction && (
                    <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                      <ShieldCheck className="h-3 w-3" />
                      <span>{cert.distinction}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-200/80 pt-3.5 dark:border-white/[0.07]">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-slate-200/90 bg-white/80 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Education & Learning Progression Timeline */}
        <div className="relative ml-2 border-l border-slate-300/90 pl-7 sm:ml-4 sm:pl-10 dark:border-white/10">
          {JOURNEY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="relative mb-10 last:mb-0"
            >
              {/* Timeline Node */}
              <span
                aria-hidden="true"
                className="absolute -left-[35px] top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 border-violet-500 bg-white sm:-left-[47px] dark:border-cyan-400 dark:bg-[#0A0A0F]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600 dark:bg-cyan-400" />
              </span>

              <div className="glass-panel gradient-border-mask rounded-2xl p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-md bg-violet-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-violet-700 dark:bg-white/[0.06] dark:text-cyan-300">
                      {item.code}
                    </span>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      {item.period}
                    </span>
                  </div>
                  <span className="rounded-full border border-slate-200/90 bg-white/70 px-3 py-0.5 font-mono text-[11px] text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300">
                    {item.category}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-xl font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-0.5 font-mono text-xs font-medium text-violet-600 dark:text-cyan-400">
                  {item.organization}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>

                <ul className="mt-4 space-y-2 border-t border-slate-200/80 pt-4 dark:border-white/[0.07]">
                  {item.highlights.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-cyan-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-200/90 bg-white/80 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
