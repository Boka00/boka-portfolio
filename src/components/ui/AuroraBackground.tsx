import React from 'react';

export const AuroraBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Subtle CAD / schematic coordinate grid */}
      <div className="absolute inset-0 bg-grid-light bg-[size:56px_56px] opacity-70 [mask-image:radial-gradient(ellipse_80%_65%_at_50%_22%,#000_35%,transparent_100%)] dark:bg-grid-dark dark:opacity-100" />

      {/* Electric Violet primary aurora orb */}
      <div className="animate-aurora absolute -top-44 left-1/2 h-[32rem] w-[44rem] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[130px] dark:bg-violet-600/20" />

      {/* Cyan secondary kinetic orb */}
      <div className="animate-aurora-slow absolute right-[-10%] top-[24%] h-[26rem] w-[34rem] rounded-full bg-cyan-500/12 blur-[130px] dark:bg-cyan-500/15" />

      {/* Deep indigo lower ambient glow */}
      <div className="animate-aurora absolute bottom-[-12%] left-[-8%] h-[24rem] w-[32rem] rounded-full bg-indigo-500/10 blur-[130px] dark:bg-violet-700/14" />
    </div>
  );
};

