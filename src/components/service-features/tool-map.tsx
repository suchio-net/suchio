import {
  CalendarDays,
  ClipboardList,
  Contact,
  FolderOpen,
  Mail,
  MessageCircle,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { OFFER_EASE_OUT } from "@/components/offer-animations/motion-tokens";
import { useHydratedReducedMotion } from "@/components/offer-animations/use-hydrated-reduced-motion";
import { useHydrated } from "@/components/use-hydrated";
import type { ToolId, ToolMapCopy } from "@/i18n/service-features";

// An example enquiry enters through the form, reaches the automation in the middle and fans out to the
// other tools. Each tool lights up with what just happened there. Clicking a tool lists what we automate.
const VIOLET = "#6650a6";
const ease = OFFER_EASE_OUT;
const TOOLS: { id: ToolId; icon: LucideIcon; x: number; y: number }[] = [
  { id: "form", icon: ClipboardList, x: 17, y: 27 },
  { id: "mail", icon: Mail, x: 50, y: 9 },
  { id: "crm", icon: Contact, x: 83, y: 27 },
  { id: "chat", icon: MessageCircle, x: 83, y: 73 },
  { id: "calendar", icon: CalendarDays, x: 50, y: 84 },
  { id: "documents", icon: FolderOpen, x: 17, y: 73 },
];
const HUB = { x: 50, y: 50 };
const IN_SECONDS = 0.9;
const OUT_START = 1.5;
const OUT_STAGGER = 0.32;
const OUT_SECONDS = 0.7;
const outputs = TOOLS.filter((tool) => tool.id !== "form");
// The moment each tool lights up, counted from the start of a run.
const litAt = (id: ToolId) =>
  id === "form" ? 0.3 : OUT_START + outputs.findIndex((tool) => tool.id === id) * OUT_STAGGER + OUT_SECONDS;
const RUN_SECONDS = litAt(outputs.at(-1)!.id) + 0.4;

export function ToolMap({ copy }: { copy: ToolMapCopy }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.45 });
  const hydrated = useHydrated();
  const noMotion = useHydratedReducedMotion();
  const animate = hydrated && !noMotion;
  const [replays, setReplays] = useState(0);
  // Run 0 means no animation; each replay starts a new run.
  const run = animate && inView ? 1 + replays : 0;
  const [clock, setClock] = useState({ run: 0, seconds: 0 });
  const [selected, setSelected] = useState<ToolId>("form");

  // A run lights the tools on a timeline; without motion everything shows lit at once.
  useEffect(() => {
    if (!run) return;
    const started = performance.now();
    let frame = 0;
    const tick = () => {
      const seconds = (performance.now() - started) / 1000;
      setClock({ run, seconds });
      if (seconds < RUN_SECONDS) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run]);

  const elapsed = !run ? Infinity : clock.run === run ? clock.seconds : 0;
  const lit = (id: ToolId) => elapsed >= litAt(id);
  const running = elapsed < RUN_SECONDS;
  const active = TOOLS.find((tool) => tool.id === selected)!;

  return (
    <div
      ref={rootRef}
      data-feature="map"
      className="grid grid-cols-[minmax(0,1fr)_20rem] items-center gap-10 rounded-[1.75rem] bg-service-automation-bg p-10 max-nav:grid-cols-1 max-nav:gap-6 max-nav:p-4"
    >
      <div className="relative h-[27rem] min-w-0 max-narrow:h-[24rem]">
        <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {TOOLS.map((tool) => (
            <motion.line
              key={tool.id}
              x1={HUB.x}
              y1={HUB.y}
              x2={tool.x}
              y2={tool.y}
              strokeWidth={tool.id === selected ? 2 : 1.5}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              initial={false}
              animate={{
                stroke: lit(tool.id) ? (tool.id === selected ? VIOLET : "rgb(102 80 166 / 45%)") : "rgb(0 0 0 / 10%)",
              }}
              transition={{ duration: animate ? 0.4 : 0 }}
            />
          ))}
        </svg>

        {animate && running && (
          <div key={run} aria-hidden="true">
            <Packet from={TOOLS[0]!} to={HUB} delay={0.3} />
            {outputs.map((tool, index) => (
              <Packet key={tool.id} from={HUB} to={tool} delay={OUT_START + index * OUT_STAGGER} />
            ))}
          </div>
        )}

        <motion.div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 justify-items-center gap-1.5 rounded-[1.125rem] bg-white px-5 py-3.5 text-center shadow-[0_0_0_1px_rgb(0_0_0/5%),0_20px_40px_-24px_rgb(102_80_166/60%)]"
          initial={false}
          animate={{ scale: animate && elapsed > IN_SECONDS && elapsed < OUT_START + 0.2 ? 1.06 : 1 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        >
          <svg viewBox="0 0 12 12" className="size-5" style={{ color: VIOLET }}>
            <path
              fill="currentColor"
              d="M6 .4C6.5 3.4 8.6 5.5 11.6 6 8.6 6.5 6.5 8.6 6 11.6 5.5 8.6 3.4 6.5.4 6 3.4 5.5 5.5 3.4 6 .4Z"
            />
          </svg>
          <span className="text-[12.5px] font-semibold whitespace-nowrap text-[#1b2430]">{copy.hub}</span>
        </motion.div>

        <div role="group" aria-label={copy.toolsLabel}>
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const on = lit(tool.id);
            const isSelected = tool.id === selected;
            return (
              <button
                key={tool.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelected(tool.id)}
                className="group absolute grid w-[min(9.5rem,31%)] -translate-x-1/2 -translate-y-6 justify-items-center gap-1 text-center max-narrow:-translate-y-5"
                style={{ left: `${tool.x}%`, top: `${tool.y}%` }}
              >
                <motion.span
                  className="grid size-12 place-items-center rounded-[14px] bg-white max-narrow:size-10"
                  initial={false}
                  animate={{
                    color: on ? VIOLET : "#9ca3af",
                    boxShadow: isSelected
                      ? `0 0 0 2px ${VIOLET}, 0 14px 30px -18px rgb(102 80 166 / 70%)`
                      : on
                        ? "0 0 0 1px rgb(102 80 166 / 25%), 0 14px 30px -18px rgb(102 80 166 / 55%)"
                        : "0 0 0 1px rgb(0 0 0 / 6%), 0 0 0 0 rgb(0 0 0 / 0%)",
                    scale: animate && on && elapsed < litAt(tool.id) + 0.35 ? 1.08 : 1,
                  }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: animate ? 0.35 : 0, ease }}
                >
                  <Icon className="size-5" strokeWidth={1.9} />
                </motion.span>
                <span className="text-[12px] leading-tight font-semibold text-[#1b2430] max-narrow:text-[11px]">
                  {copy.tools[tool.id].name}
                </span>
                <motion.span
                  className="rounded-full bg-white/80 px-2 py-0.5 text-[10.5px] leading-tight max-narrow:hidden"
                  style={{ color: VIOLET }}
                  initial={false}
                  animate={{ opacity: on ? 1 : 0, y: on ? 0 : -4 }}
                  transition={{ duration: animate ? 0.35 : 0, ease }}
                >
                  {copy.tools[tool.id].event}
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-w-0 rounded-[1.25rem] bg-white p-6 shadow-[0_0_0_1px_rgb(0_0_0/5%),0_18px_40px_-26px_rgb(102_80_166/45%)]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={selected}
            aria-live="polite"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: animate ? 0.25 : 0, ease }}
          >
            <span className="flex items-center gap-2.5">
              <span
                className="grid size-9 place-items-center rounded-[11px]"
                style={{ background: "#f2edff", color: VIOLET }}
              >
                <active.icon className="size-[18px]" strokeWidth={1.9} aria-hidden="true" />
              </span>
              <h3 className="m-0 text-heading-sm">{copy.tools[selected].name}</h3>
            </span>
            <ul className="m-0 mt-4 grid list-none gap-3 p-0 text-base/6 text-muted">
              {copy.tools[selected].examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
        {animate && (
          <button
            type="button"
            onClick={() => setReplays((value) => value + 1)}
            disabled={running}
            className="mt-6 inline-flex items-center gap-2 text-meta font-semibold text-ink underline decoration-line-strong underline-offset-4 transition-[text-decoration-color,opacity] hover:decoration-ink disabled:opacity-40"
          >
            <RotateCcw className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
            {copy.replay}
          </button>
        )}
      </div>
    </div>
  );
}

function Packet({ from, to, delay }: { from: { x: number; y: number }; to: { x: number; y: number }; delay: number }) {
  return (
    <motion.span
      className="pointer-events-none absolute z-10 -mt-[5px] -ml-[5px] block size-2.5 rounded-full"
      style={{ background: VIOLET, boxShadow: "0 0 0 4px rgb(102 80 166 / 18%)" }}
      initial={{ left: `${from.x}%`, top: `${from.y}%`, opacity: 0 }}
      animate={{ left: `${to.x}%`, top: `${to.y}%`, opacity: [0, 1, 1, 0] }}
      transition={{
        delay,
        duration: from === HUB ? OUT_SECONDS : IN_SECONDS,
        ease: [0.45, 0, 0.25, 1],
        opacity: { delay, duration: from === HUB ? OUT_SECONDS : IN_SECONDS, times: [0, 0.15, 0.85, 1] },
      }}
    />
  );
}
