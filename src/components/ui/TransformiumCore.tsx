import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface TransformiumCoreProps {
  activeMode: number;
  onSelectMode: (index: number) => void;
}

interface ShardTransform {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  accent: boolean;
}

const MODE_META = [
  {
    code: 'UI.GRID',
    label: 'Modular Layout',
    telemetry: 'grid-cols-12 // 360->1920px',
    conduits: [
      { x1: 62, y1: 68, x2: 198, y2: 68 },
      { x1: 62, y1: 115, x2: 198, y2: 115 },
      { x1: 62, y1: 162, x2: 198, y2: 162 },
    ],
  },
  {
    code: 'REACT.AST',
    label: 'Component Tree',
    telemetry: 'hooks + context // isolated state',
    conduits: [
      { x1: 130, y1: 42, x2: 64, y2: 108 },
      { x1: 130, y1: 42, x2: 130, y2: 108 },
      { x1: 130, y1: 42, x2: 196, y2: 108 },
      { x1: 64, y1: 108, x2: 46, y2: 174 },
      { x1: 130, y1: 108, x2: 130, y2: 174 },
      { x1: 196, y1: 108, x2: 214, y2: 174 },
    ],
  },
  {
    code: 'TS.STRICT',
    label: 'Type Matrix',
    telemetry: 'strict: true // zero implicit any',
    conduits: [
      { x1: 130, y1: 38, x2: 208, y2: 115 },
      { x1: 208, y1: 115, x2: 130, y2: 192 },
      { x1: 130, y1: 192, x2: 52, y2: 115 },
      { x1: 52, y1: 115, x2: 130, y2: 38 },
    ],
  },
] as const;

const SHARD_COUNT = 16;
const SHARD_INDICES = Array.from({ length: SHARD_COUNT }, (_, i) => i);

/**
 * Deterministic programmable-matter shard coordinates for 16 kinetic voxel plates
 * inspired by KSI / Galvatron Transformium concept-art HUD mechanics.
 */
function getShardFormation(mode: number, index: number, scatterPulse: boolean): ShardTransform {
  if (scatterPulse) {
    const angle = (index / SHARD_COUNT) * Math.PI * 2;
    const radius = index % 2 === 0 ? 96 : 62;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      rotate: (index * 37) % 180,
      scale: 0.72,
      accent: index % 2 === 0,
    };
  }

  // Formation 0: 4x4 Modular Bento Chassis
  if (mode === 0) {
    const col = index % 4;
    const row = Math.floor(index / 4);
    const isCorner = (col === 0 || col === 3) && (row === 0 || row === 3);
    const isCore = (col === 1 || col === 2) && (row === 1 || row === 2);
    return {
      x: (col - 1.5) * 44,
      y: (row - 1.5) * 40,
      rotate: isCore ? 0 : isCorner ? 45 : 0,
      scale: isCore ? 1.06 : 0.88,
      accent: isCore || index === 0 || index === 15,
    };
  }

  // Formation 1: React AST Component Hierarchy
  if (mode === 1) {
    if (index === 0) {
      return { x: 0, y: -73, rotate: 45, scale: 1.2, accent: true };
    }
    if (index >= 1 && index <= 3) {
      return {
        x: (index - 2) * 66,
        y: -7,
        rotate: 0,
        scale: 1.04,
        accent: true,
      };
    }
    if (index >= 4 && index <= 9) {
      const leaf = index - 4;
      return {
        x: (leaf - 2.5) * 36,
        y: 56,
        rotate: leaf % 2 === 0 ? 14 : -14,
        scale: 0.84,
        accent: leaf === 1 || leaf === 4,
      };
    }
    const sub = index - 10;
    return {
      x: (sub - 2.5) * 32,
      y: 86,
      rotate: 45,
      scale: 0.64,
      accent: false,
    };
  }

  // Formation 2: TypeScript Strict Hexagonal / Reactor Lock
  if (index < 4) {
    const innerAngle = (index / 4) * Math.PI * 2 + Math.PI / 4;
    return {
      x: Math.cos(innerAngle) * 26,
      y: Math.sin(innerAngle) * 26,
      rotate: 45,
      scale: 0.96,
      accent: true,
    };
  }
  const outerIdx = index - 4; // 0..11
  const outerAngle = (outerIdx / 12) * Math.PI * 2 - Math.PI / 2;
  const radius = outerIdx % 2 === 0 ? 78 : 64;
  return {
    x: Math.cos(outerAngle) * radius,
    y: Math.sin(outerAngle) * radius,
    rotate: (outerAngle * 180) / Math.PI + 45,
    scale: outerIdx % 3 === 0 ? 1.02 : 0.82,
    accent: outerIdx % 3 === 0,
  };
}

export const TransformiumCore: React.FC<TransformiumCoreProps> = ({
  activeMode,
  onSelectMode,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [pointerOffset, setPointerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scatterPulse, setScatterPulse] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  const normalizedMode = activeMode % MODE_META.length;
  const currentMeta = MODE_META[normalizedMode];

  const triggerReconstruct = (nextMode?: number) => {
    if (typeof nextMode === 'number') {
      onSelectMode(nextMode);
    }
    if (prefersReducedMotion) return;
    setPulseCount((c) => c + 1);
    setScatterPulse(true);
    window.setTimeout(() => {
      setScatterPulse(false);
    }, 190);
  };

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    setPointerOffset({
      x: Math.round(relX * 36),
      y: Math.round(relY * 36),
    });
  };

  const handlePointerLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  return (
    <div className="glass-panel gradient-border-mask relative mx-auto w-full max-w-[450px] overflow-hidden rounded-2xl p-5 shadow-2xl shadow-violet-950/10 dark:shadow-black/60">
      {/* Precision Chamfered HUD Corner Brackets */}
      <span aria-hidden="true" className="pointer-events-none absolute left-2.5 top-2.5 h-3 w-3 border-l-2 border-t-2 border-violet-500/70 dark:border-cyan-400/70" />
      <span aria-hidden="true" className="pointer-events-none absolute right-2.5 top-2.5 h-3 w-3 border-r-2 border-t-2 border-violet-500/70 dark:border-cyan-400/70" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2.5 left-2.5 h-3 w-3 border-b-2 border-l-2 border-violet-500/70 dark:border-cyan-400/70" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2.5 right-2.5 h-3 w-3 border-b-2 border-r-2 border-violet-500/70 dark:border-cyan-400/70" />

      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 dark:border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <span className="font-mono text-[11px] font-semibold tracking-wider text-slate-700 dark:text-slate-200">
            TRANSFORMIUM // {currentMeta.code}
          </span>
        </div>

        <button
          type="button"
          onClick={() => triggerReconstruct((normalizedMode + 1) % MODE_META.length)}
          aria-label="Morph programmable matter formation"
          className="inline-flex items-center gap-1 rounded-md border border-slate-200/90 bg-white/70 px-2 py-0.5 font-mono text-[10px] font-medium text-violet-700 hover:border-violet-500/50 dark:border-white/10 dark:bg-white/[0.04] dark:text-cyan-300 dark:hover:border-cyan-400/50"
        >
          <RefreshCw className="h-2.5 w-2.5" />
          <span>MORPH</span>
        </button>
      </div>

      {/* Interactive Programmable-Matter Reactor Stage */}
      <div
        ref={stageRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        className="relative my-4 flex h-[242px] cursor-crosshair items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100/80 dark:border-white/[0.07] dark:bg-[#07070D]"
      >
        {/* Schematic CAD Reticle + Dynamic Energy Conduits */}
        <svg
          aria-hidden="true"
          viewBox="0 0 260 230"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="conduitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.65" />
            </linearGradient>
          </defs>

          <circle
            cx="130"
            cy="115"
            r="92"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeDasharray="3 6"
            className="text-slate-300 dark:text-slate-700/80"
          />
          <circle
            cx="130"
            cy="115"
            r="52"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            className="text-violet-400/40 dark:text-cyan-400/30"
          />
          <line x1="130" y1="12" x2="130" y2="218" stroke="currentColor" strokeWidth="0.6" className="text-slate-300/80 dark:text-white/[0.06]" />
          <line x1="16" y1="115" x2="244" y2="115" stroke="currentColor" strokeWidth="0.6" className="text-slate-300/80 dark:text-white/[0.06]" />

          {/* Active Formation Energy Conduits */}
          {currentMeta.conduits.map((line, i) => (
            <motion.line
              key={`${currentMeta.code}-line-${i}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: scatterPulse ? 0.15 : 0.75 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#conduitGrad)"
              strokeWidth="1.25"
              strokeDasharray="4 3"
            />
          ))}
        </svg>

        {/* Expanding Shockwave Ring on Morph */}
        {!prefersReducedMotion && pulseCount > 0 && (
          <motion.div
            key={pulseCount}
            aria-hidden="true"
            initial={{ scale: 0.25, opacity: 0.75 }}
            animate={{ scale: 2.3, opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="pointer-events-none absolute h-24 w-24 rounded-full border border-cyan-400/70"
          />
        )}

        {/* Vertical Laser Scan Beam */}
        {!prefersReducedMotion && (
          <div
            aria-hidden="true"
            className="animate-scanline pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-cyan-400/[0.09] to-transparent"
          />
        )}

        {/* 16 Programmable-Matter Voxel Shards */}
        <div className="relative flex items-center justify-center">
          {SHARD_INDICES.map((idx) => {
            const target = getShardFormation(normalizedMode, idx, scatterPulse);
            const parallaxFactor = target.accent ? 0.32 : 0.16;
            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  x: target.x + pointerOffset.x * parallaxFactor,
                  y: target.y + pointerOffset.y * parallaxFactor,
                  rotate: prefersReducedMotion ? 0 : target.rotate,
                  scale: target.scale,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        type: 'spring',
                        stiffness: 235,
                        damping: 19,
                        mass: 0.68,
                        delay: scatterPulse ? 0 : idx * 0.012,
                      }
                }
                className={`absolute flex h-8 w-8 items-center justify-center rounded-lg border backdrop-blur-md ${
                  target.accent
                    ? 'border-violet-500/80 bg-gradient-to-br from-violet-500/30 via-indigo-500/20 to-cyan-400/30 shadow-[0_0_22px_rgba(139,92,246,0.32)] dark:border-cyan-400/75'
                    : 'border-slate-300/90 bg-white/85 dark:border-white/15 dark:bg-white/[0.05]'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-[2px] ${
                    target.accent
                      ? 'bg-gradient-to-r from-violet-500 to-cyan-300'
                      : 'bg-slate-400 dark:bg-slate-500'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Top-Left Live Pointer Vector Readout */}
        <div className="pointer-events-none absolute left-3 top-2.5 font-mono text-[9px] tracking-wider text-slate-400 dark:text-slate-500">
          VEC [{pointerOffset.x >= 0 ? `+${pointerOffset.x}` : pointerOffset.x},{' '}
          {pointerOffset.y >= 0 ? `+${pointerOffset.y}` : pointerOffset.y}]
        </div>

        {/* Bottom Telemetry Status Pill */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between rounded-lg border border-slate-200/70 bg-white/90 px-2.5 py-1 font-mono text-[10px] text-slate-600 backdrop-blur dark:border-white/[0.08] dark:bg-black/70 dark:text-slate-400">
          <span className="truncate">{currentMeta.telemetry}</span>
          <span className="ml-2 shrink-0 font-semibold text-violet-600 dark:text-cyan-400">
            {scatterPulse ? 'MORPHING' : '16/16 LOCKED'}
          </span>
        </div>
      </div>

      {/* Formation Selector Tabs */}
      <div
        role="group"
        aria-label="Select architecture visualization formation"
        className="grid grid-cols-3 gap-1.5"
      >
        {MODE_META.map((item, idx) => {
          const isSelected = normalizedMode === idx;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => triggerReconstruct(idx)}
              aria-pressed={isSelected}
              className={`rounded-lg border px-2.5 py-2 text-left transition-all ${
                isSelected
                  ? 'border-violet-500/60 bg-violet-500/10 text-slate-900 dark:border-cyan-400/55 dark:bg-white/[0.08] dark:text-white'
                  : 'border-slate-200/80 bg-white/50 text-slate-500 hover:border-slate-300 hover:text-slate-800 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-slate-400 dark:hover:border-white/15 dark:hover:text-slate-200'
              }`}
            >
              <div className="font-mono text-[10px] font-semibold tracking-wider text-violet-600 dark:text-cyan-400">
                {item.code}
              </div>
              <div className="mt-0.5 truncate text-[11px] font-medium">{item.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
