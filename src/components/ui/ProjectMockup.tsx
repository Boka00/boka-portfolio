import React from 'react';
import type { ProjectMockupVariant } from '../../types/portfolio';

interface ProjectMockupProps {
  variant: ProjectMockupVariant;
  featured?: boolean;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ variant, featured = false }) => {
  const heightClass = featured ? 'h-56 sm:h-64' : 'h-48';

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden border-b border-slate-200/80 bg-slate-100/90 p-4 dark:border-white/[0.07] dark:bg-[#090910] ${heightClass}`}
    >
      {/* Subtle radial glow inside mockup */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-violet-500/15 blur-2xl dark:bg-violet-500/20" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-cyan-500/15 blur-2xl dark:bg-cyan-500/20" />

      {/* App Window Frame */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-300/80 bg-white/95 shadow-sm transition-transform duration-500 group-hover:scale-[1.02] dark:border-white/10 dark:bg-[#11111B]">
        {/* Window Top Chrome */}
        <div className="flex items-center justify-between border-b border-slate-200/80 px-3 py-2 dark:border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-400/80" />
            <span className="h-2 w-2 rounded-full bg-amber-400/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          </div>
          <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
            {variant === 'bookmark' && '10x-bookmarks.app // tsx'}
            {variant === 'crm' && '10x-crm.workspace // kanban'}
            {variant === 'quiz' && 'react-master-quiz // 150-q'}
            {variant === 'countries' && 'rest-countries // v3.1'}
            {variant === 'rewind' && 'rewind-markup // scss-7-1'}
          </span>
          <span className="rounded bg-violet-500/10 px-1.5 py-0.5 font-mono text-[9px] font-medium text-violet-600 dark:text-cyan-300">
            UI
          </span>
        </div>

        {/* Variant 1: 10X Bookmark Manager */}
        {variant === 'bookmark' && (
          <div className="grid flex-1 grid-cols-12 gap-2.5 p-3">
            <div className="col-span-4 flex flex-col gap-1.5 border-r border-slate-200/70 pr-2 dark:border-white/[0.06]">
              <div className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Tags (Normalized)</div>
              {[
                { tag: '#react', count: 18, active: true },
                { tag: '#typescript', count: 14, active: true },
                { tag: '#design-sys', count: 9, active: false },
                { tag: '#docs', count: 11, active: false },
              ].map((t) => (
                <div
                  key={t.tag}
                  className={`flex items-center justify-between rounded px-1.5 py-1 font-mono text-[10px] ${
                    t.active
                      ? 'bg-violet-500/15 text-violet-700 dark:text-cyan-300'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <span className="truncate">{t.tag}</span>
                  <span>{t.count}</span>
                </div>
              ))}
            </div>
            <div className="col-span-8 flex flex-col gap-2">
              <div className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[10px] text-slate-400 dark:border-white/10 dark:bg-white/[0.03]">
                <span>Search title, URL, tags...</span>
                <span className="text-violet-500 dark:text-cyan-400">PINNED</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-violet-500/30 bg-violet-500/[0.06] p-2 dark:border-cyan-400/25 dark:bg-white/[0.03]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold text-slate-800 dark:text-slate-100">React.dev Docs</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  </div>
                  <p className="mt-1 font-mono text-[9px] text-slate-500 dark:text-slate-400">Server &amp; Hook APIs</p>
                </div>
                <div className="rounded-lg border border-slate-200/80 bg-slate-50/70 p-2 dark:border-white/[0.07] dark:bg-white/[0.02]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold text-slate-800 dark:text-slate-100">TS Handbook</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  </div>
                  <p className="mt-1 font-mono text-[9px] text-slate-500 dark:text-slate-400">Narrowing &amp; Generics</p>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between rounded-md bg-emerald-500/10 px-2 py-1 font-mono text-[9px] text-emerald-700 dark:text-emerald-300">
                <span>Yup Schema: Valid URL + Tags</span>
                <span>Dark / Light</span>
              </div>
            </div>
          </div>
        )}

        {/* Variant 2: 10X CRM */}
        {variant === 'crm' && (
          <div className="flex flex-1 flex-col gap-2.5 p-3">
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'PIPELINE', val: '$148.4k', accent: 'text-violet-600 dark:text-violet-300' },
                { label: 'WIN RATE', val: '38.2%', accent: 'text-cyan-600 dark:text-cyan-300' },
                { label: 'CALL TIMER', val: '04:18', accent: 'text-emerald-600 dark:text-emerald-300' },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-lg border border-slate-200/80 bg-slate-50/80 px-2.5 py-1.5 dark:border-white/[0.07] dark:bg-white/[0.03]"
                >
                  <div className="font-mono text-[8px] tracking-wider text-slate-400">{kpi.label}</div>
                  <div className={`font-mono text-xs font-bold ${kpi.accent}`}>{kpi.val}</div>
                </div>
              ))}
            </div>
            <div className="grid flex-1 grid-cols-3 gap-2">
              {[
                { col: 'Lead In', count: 4, highlight: false },
                { col: 'Negotiation', count: 3, highlight: true },
                { col: 'Closed Won', count: 6, highlight: false },
              ].map((stage) => (
                <div
                  key={stage.col}
                  className={`flex flex-col gap-1.5 rounded-lg border p-2 ${
                    stage.highlight
                      ? 'border-violet-500/40 bg-violet-500/[0.06] dark:border-cyan-400/35'
                      : 'border-slate-200/70 bg-slate-50/50 dark:border-white/[0.06] dark:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[9px] text-slate-500 dark:text-slate-400">
                    <span className="truncate">{stage.col}</span>
                    <span>{stage.count}</span>
                  </div>
                  <div className="h-3 rounded bg-slate-200/90 dark:bg-white/10" />
                  <div className="h-3 w-4/5 rounded bg-gradient-to-r from-violet-500/40 to-cyan-500/40" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Variant 3: React Master Quiz */}
        {variant === 'quiz' && (
          <div className="flex flex-1 flex-col justify-between p-3">
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span className="text-slate-500 dark:text-slate-400">Q 042 / 150 · Hooks</span>
              <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-amber-600 dark:text-amber-300">Streak x9</span>
            </div>
            <div className="my-1.5 rounded-lg border border-slate-200/80 bg-slate-50 px-2.5 py-2 font-mono text-[10px] text-slate-700 dark:border-white/[0.07] dark:bg-white/[0.03] dark:text-slate-200">
              When does useLayoutEffect fire relative to browser paint?
            </div>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[9px]">
              <div className="rounded border border-emerald-500/50 bg-emerald-500/15 px-2 py-1 text-emerald-700 dark:text-emerald-300">
                A. Synchronously pre-paint
              </div>
              <div className="rounded border border-slate-200 px-2 py-1 text-slate-500 dark:border-white/10 dark:text-slate-400">
                B. Idle callback queue
              </div>
            </div>
          </div>
        )}

        {/* Variant 4: REST Countries Explorer */}
        {variant === 'countries' && (
          <div className="flex flex-1 flex-col gap-2 p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 rounded border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[9px] text-slate-400 dark:border-white/10 dark:bg-white/[0.03]">
                Filter: Georgia...
              </div>
              <div className="rounded border border-violet-500/30 bg-violet-500/10 px-2 py-1 font-mono text-[9px] text-violet-700 dark:text-cyan-300">
                Europe / Asia
              </div>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-2">
              {[
                { name: 'Georgia', cap: 'Tbilisi', pop: '3.7M' },
                { name: 'Germany', cap: 'Berlin', pop: '83.2M' },
              ].map((country) => (
                <div
                  key={country.name}
                  className="flex flex-col justify-between rounded-lg border border-slate-200/80 bg-slate-50/70 p-2 dark:border-white/[0.07] dark:bg-white/[0.025]"
                >
                  <div className="font-mono text-[10px] font-bold text-slate-800 dark:text-slate-100">
                    {country.name}
                  </div>
                  <div className="font-mono text-[9px] text-slate-500 dark:text-slate-400">
                    {country.cap} · {country.pop}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Variant 5: 10x Markup & Rewind */}
        {variant === 'rewind' && (
          <div className="flex flex-1 flex-col gap-2 p-3">
            <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-violet-500/15 via-indigo-500/10 to-cyan-500/15 px-2.5 py-2">
              <span className="font-mono text-[10px] font-semibold text-slate-800 dark:text-slate-100">
                Semantic Grid Architecture
              </span>
              <span className="font-mono text-[9px] text-violet-600 dark:text-cyan-300">360px→1920px</span>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-2">
              <div className="col-span-2 rounded-lg border border-slate-200/80 bg-slate-50/80 p-2 font-mono text-[9px] text-slate-500 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-400">
                &lt;main&gt; + BEM SCSS Mixins
              </div>
              <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-2 font-mono text-[9px] text-cyan-700 dark:text-cyan-300">
                7-1 SCSS
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

