"use client";

import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("@/lib/motionFeatures").then((mod) => mod.default);

/**
 * Carga las animaciones de Motion aparte (con `m.` en vez de `motion.`) para
 * que la página aparezca rápido en celulares y las animaciones lleguen después. Si el celular tiene activado
 * "reducir movimiento", las animaciones se apagan solas.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
