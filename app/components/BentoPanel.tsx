"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function BentoPanel({
  children,
  className = "",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`portfolio-bento ${interactive ? "bento-interactive" : ""} ${className}`}
      whileHover={interactive && !reduceMotion ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      {children}
    </motion.div>
  );
}
