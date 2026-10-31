import React, { useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export const CursorSpotlight: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [hasFinePointer, setHasFinePointer] = useState(false);

  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);

  const smoothX = useSpring(mouseX, { damping: 32, stiffness: 240, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 32, stiffness: 240, mass: 0.5 });

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return;

    const pointerQuery = window.matchMedia('(pointer: fine)');
    setHasFinePointer(pointerQuery.matches);

    if (!pointerQuery.matches) return;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  const background = useMotionTemplate`radial-gradient(520px circle at ${smoothX}px ${smoothY}px, rgba(139, 92, 246, 0.08), rgba(6, 182, 212, 0.04) 40%, transparent 75%)`;

  if (prefersReducedMotion || !hasFinePointer) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10"
      style={{ background }}
    />
  );
};

