import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

// The campaign and automation scenes are boards of small widgets: a grey label above a white card.
const WIDGET_SHADOW = "0 0 0 1px rgb(0 0 0 / 5%), 0 1px 2px rgb(0 0 0 / 4%), 0 14px 30px -18px rgb(0 0 0 / 24%)";

export const DELTA_PILL =
  "rounded-full bg-[#e3f4ea] px-2 py-1 text-[12px] leading-none font-semibold whitespace-nowrap text-[#1f7a4f] tabular-nums";

export function Widget({
  label,
  className = "",
  style,
  visible,
  delay,
  from = { y: 10 },
  bounce = 0.15,
  children,
}: {
  label: string;
  className?: string;
  style?: CSSProperties;
  visible: boolean;
  delay: number;
  // Where the widget enters from before it settles in place.
  from?: { x?: number; y?: number };
  bounce?: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      className="flex min-w-0 flex-col"
      style={style}
      initial={false}
      animate={visible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: from.x ?? 0, y: from.y ?? 0 }}
      transition={{ delay: visible ? delay : 0, type: "spring", duration: 0.55, bounce }}
    >
      <span className="mb-2 block truncate pl-1 text-[11px] leading-none font-medium text-neutral-500">{label}</span>
      <div className={`flex-1 rounded-[20px] bg-white ${className}`} style={{ boxShadow: WIDGET_SHADOW }}>
        {children}
      </div>
    </motion.div>
  );
}
