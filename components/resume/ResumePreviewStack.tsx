"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Fanned "paper stack" mock. Three faux pages with subtle mouse-parallax tilt.
 * Pure CSS/SVG — no PDF render, no fake data that could mislead.
 */
export function ResumePreviewStack() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 15 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    mx.set((e.clientX - b.left) / b.width - 0.5);
    my.set((e.clientY - b.top) / b.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative h-[520px] md:h-[600px] w-full flex items-center justify-center"
      style={{ perspective: 1600 }}
      aria-hidden="true"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative w-[280px] md:w-[340px] aspect-[1/1.414]"
      >
        {/* Back page */}
        <FauxPage className="absolute inset-0 -rotate-6 translate-x-6 translate-y-4 opacity-70" delay={0.15} />
        {/* Middle page */}
        <FauxPage className="absolute inset-0 rotate-3 translate-x-3 translate-y-2 opacity-85" delay={0.1} />
        {/* Top page */}
        <FauxPage className="absolute inset-0 transition-transform duration-500 hover:-translate-y-2" top delay={0} />
      </motion.div>
    </div>
  );
}

function FauxPage({ className = "", top = false, delay = 0 }: { className?: string; top?: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl bg-[hsl(var(--surface-2))] border border-border/70 overflow-hidden ${className}`}
      style={{
        boxShadow: top
          ? "0 40px 80px -40px hsl(var(--primary) / 0.35), 0 8px 24px -12px hsl(var(--foreground) / 0.15)"
          : "0 30px 60px -40px hsl(var(--primary) / 0.25)",
      }}
    >
      <div className="h-2 bg-[hsl(var(--primary))]" />
      <div className="p-6 space-y-3">
        <div className="space-y-1.5">
          <div className="h-4 w-2/3 rounded bg-[hsl(var(--primary))] opacity-90" />
          <div className="h-2 w-1/2 rounded bg-[hsl(var(--accent))] opacity-80" />
        </div>
        <div className="pt-2 space-y-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-1.5 rounded bg-[hsl(var(--foreground))] opacity-15" style={{ width: `${90 - i * 12}%` }} />
          ))}
        </div>
        <div className="pt-3 space-y-1.5">
          <div className="h-2.5 w-1/3 rounded bg-[hsl(var(--primary))] opacity-70" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-1.5 rounded bg-[hsl(var(--foreground))] opacity-12" style={{ width: `${85 - i * 8}%` }} />
          ))}
        </div>
        <div className="pt-3 space-y-1.5">
          <div className="h-2.5 w-2/5 rounded bg-[hsl(var(--primary))] opacity-70" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-1.5 rounded bg-[hsl(var(--foreground))] opacity-12" style={{ width: `${80 - i * 10}%` }} />
          ))}
        </div>
        <div className="pt-3 flex gap-1.5 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3 w-10 rounded-full border border-[hsl(var(--primary))] opacity-60" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}