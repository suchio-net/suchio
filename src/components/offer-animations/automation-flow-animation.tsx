"use client";

import { Bot, BrainCircuit, Database, GitBranch, ListTodo, Search, UserRoundPlus, Webhook } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { OFFER_EASE_IN_OUT, OFFER_EASE_OUT, OFFER_VIEWPORT } from "@/components/offer-animations/motion-tokens";
import { useHydratedReducedMotion } from "@/components/offer-animations/use-hydrated-reduced-motion";
import type { AutomationAnimationCopy } from "@/i18n/services";

const tools = [
  { key: "model", Icon: BrainCircuit },
  { key: "context", Icon: Database },
  { key: "research", Icon: Search },
] as const;

const nodeVariants = {
  hidden: { opacity: 0, y: 9, scale: 0.88 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// Draw the connections and send the signal as the cards finish popping into place.
const TIMING = {
  trigger: 0, agent: 0.14, condition: 0.28, success: 0.42, fallback: 0.56,
  lines: { input: 0, decision: 0.14, stem: 0.28, rails: 0.38, legs: 0.58 },
  signals: { input: 0.42, decision: 0.64, stem: 0.88, rails: 0.96, legs: 1.12 },
  confirmed: 1.28,
} as const;

const lineTones = {
  brand: { line: "bg-service-automation-fg", signal: "ring-service-automation-fg" },
  success: { line: "bg-service-automation-fg", signal: "ring-service-automation-fg" },
  muted: { line: "bg-service-automation-fg/25", signal: "ring-service-automation-fg" },
} as const;

function TriggerPulse({ running }: { running: boolean }) {
  return (
    <motion.span
      data-flow-pulse="trigger"
      className="pointer-events-none absolute inset-0 rounded-full border border-service-automation-fg"
      initial={false}
      animate={running
        ? { opacity: [0, 0.42, 0], transform: ["scale(0.8)", "scale(1.35)", "scale(1.35)"] }
        : { opacity: 0, transform: "scale(0.8)" }}
      transition={running
        ? { delay: TIMING.signals.input - 0.04, duration: 0.4, ease: OFFER_EASE_OUT }
        : { duration: 0 }}
      aria-hidden="true"
    />
  );
}

function ProcessEmphasis({ running, delay, success = false }: { running: boolean; delay: number; success?: boolean }) {
  return (
    <motion.span
      data-flow-card-pulse
      className={`pointer-events-none absolute inset-0 rounded-[inherit] ring-2 ring-inset ${success ? "ring-emerald-500" : "ring-service-automation-fg"}`}
      initial={false}
      animate={running
        ? { opacity: [0, 0.36, 0], transform: ["scale(0.995)", "scale(1.01)", "scale(1.018)"] }
        : { opacity: 0, transform: "scale(1)" }}
      transition={running
        ? { duration: 0.34, delay, ease: OFFER_EASE_IN_OUT }
        : { duration: 0 }}
      aria-hidden="true"
    />
  );
}

function LineSignal({
  running,
  delay,
  duration,
  direction,
  name,
  tone,
  ease,
}: {
  running: boolean;
  delay: number;
  duration: number;
  direction: "forward" | "reverse" | "down";
  name: string;
  tone: keyof typeof lineTones;
  ease: typeof OFFER_EASE_OUT | "linear";
}) {
  const startTransform = direction === "forward"
    ? "translateX(-100%)"
    : direction === "reverse"
      ? "translateX(100%)"
      : "translateY(-100%)";
  const endTransform = direction === "down" ? "translateY(0%)" : "translateX(0%)";
  const bubblePosition = direction === "forward"
    ? "right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
    : direction === "reverse"
      ? "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
      : "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2";

  return (
    <motion.span
      data-flow-signal={name}
      className="pointer-events-none absolute inset-0 z-10 block overflow-visible"
      initial={false}
      animate={running
        ? {
            opacity: [0, 1, 1, 0],
            transform: [startTransform, endTransform],
          }
        : { opacity: 0, transform: startTransform }}
      transition={running
        ? {
            opacity: { duration, delay, times: [0, 0.08, 0.9, 1], ease: "linear" },
            transform: { duration, delay, ease },
          }
        : { duration: 0 }}
      aria-hidden="true"
    >
      <span className={`absolute size-1.5 rounded-full bg-white ring-2 ${lineTones[tone].signal} ${bubblePosition}`} />
    </motion.span>
  );
}

function FlowLine({ name, segment = false, className, direction, start, duration, signalStart, signalDuration = duration, signalEase = "linear", tone = "brand", running, noMotion }: {
  name: string;
  segment?: boolean;
  className: string;
  direction: "forward" | "reverse" | "down";
  start: number;
  duration: number;
  signalStart?: number;
  signalDuration?: number;
  signalEase?: typeof OFFER_EASE_OUT | "linear";
  tone?: keyof typeof lineTones;
  running: boolean;
  noMotion: boolean;
}) {
  const vertical = direction === "down";
  return <span data-flow-connector={segment ? undefined : name} data-flow-segment={segment ? name : undefined} className={className} aria-hidden="true">
    <motion.span
      data-flow-line={name}
      className={`absolute inset-0 ${lineTones[tone].line} ${vertical ? "origin-top" : direction === "reverse" ? "origin-right" : "origin-left"}`}
      initial={false}
      variants={vertical
        ? { hidden: { scaleY: 0 }, visible: { scaleY: 1 } }
        : { hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
      transition={{ delay: noMotion ? 0 : start, duration: noMotion ? 0 : duration, ease: "linear" }}
    />
    {/* Keep the signal outside the scaled line so it travels at a steady speed. */}
    {signalStart !== undefined ? <LineSignal running={running} delay={signalStart} duration={signalDuration} direction={direction} name={name} tone={tone} ease={signalEase} /> : null}
  </span>;
}

export function AutomationFlowAnimation({ copy }: { copy: AutomationAnimationCopy }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, OFFER_VIEWPORT);
  const noMotion = useHydratedReducedMotion();
  const active = noMotion || isInView;
  const running = !noMotion && isInView;
  const completionTransition = {
    delay: noMotion ? 0 : TIMING.confirmed,
    duration: noMotion ? 0 : 0.18,
    ease: OFFER_EASE_OUT,
  };
  const cardTransition = (delay: number) => noMotion
    ? { duration: 0 }
    : {
        delay,
        type: "spring" as const,
        duration: 0.4,
        bounce: 0.24,
        opacity: { delay, duration: 0.14, ease: OFFER_EASE_OUT },
      };

  return (
    <motion.div
      ref={containerRef}
      data-automation-flow
      className="grid h-full min-h-0 w-full place-items-center"
      initial={false}
      animate={active ? "visible" : "hidden"}
    >
      <div className="w-full max-w-md">
        <div className="grid grid-cols-[minmax(5rem,.7fr)_1rem_minmax(0,1.5fr)] items-stretch">
          <motion.div
            data-flow-node="trigger"
            className="relative grid min-w-0 place-items-center rounded-xl bg-white p-3 text-center shadow-surface max-[600px]:p-2"
            variants={nodeVariants}
            transition={cardTransition(TIMING.trigger)}
          >
            <ProcessEmphasis running={running} delay={TIMING.signals.input - 0.02} />
            <span className="min-w-0">
              <span className="relative mx-auto grid size-7 place-items-center">
                <TriggerPulse running={running} />
                <Webhook className="relative size-5 text-brand-600" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="mt-2 block text-xs font-semibold text-pretty [overflow-wrap:normal] hyphens-none">{copy.trigger}</span>
            </span>
          </motion.div>

          <FlowLine name="trigger-agent" className="relative my-auto block h-0.5" direction="forward" start={TIMING.lines.input} duration={0.2} signalStart={TIMING.signals.input} signalDuration={0.18} signalEase={[0.42, 0, 1, 1]} tone="brand" running={running} noMotion={noMotion} />

          <motion.div
            data-flow-node="agent"
            className="relative min-w-0 rounded-xl bg-brand-50 p-3 shadow-accent-surface max-[600px]:p-2"
            variants={nodeVariants}
            transition={cardTransition(TIMING.agent)}
          >
            <ProcessEmphasis running={running} delay={TIMING.signals.input + 0.18} />
            <div className="flex min-w-0 items-center gap-2">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-neutral-900 text-white">
                <Bot className="size-4" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-pretty [overflow-wrap:normal] hyphens-none">{copy.agent}</span>
                <span className="block text-xs text-pretty text-neutral-400 [overflow-wrap:normal] hyphens-none max-[400px]:hidden">{copy.extract}</span>
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 max-[600px]:mt-2 max-[600px]:gap-1">
              {tools.map(({ key, Icon }) => (
                <span className="grid min-w-0 place-items-center gap-1 rounded-lg bg-white p-2 text-center shadow-surface max-[600px]:p-1" key={key}>
                  <Icon className="size-3.5 text-neutral-500" strokeWidth={1.8} aria-hidden="true" />
                  <span className="text-xs font-medium text-neutral-500">{copy[key]}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <FlowLine name="agent-condition" className="relative mx-auto block h-8 w-0.5 max-[600px]:h-3" direction="down" start={TIMING.lines.decision} duration={0.2} signalStart={TIMING.signals.decision} signalDuration={0.18} tone="brand" running={running} noMotion={noMotion} />

        <motion.div
          data-flow-node="condition"
          className="relative mx-auto flex w-full max-w-xs min-w-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-center shadow-surface max-[600px]:px-3 max-[600px]:py-2"
          variants={nodeVariants}
          transition={cardTransition(TIMING.condition)}
        >
          <ProcessEmphasis running={running} delay={TIMING.signals.decision + 0.18} />
          <GitBranch className="size-5 shrink-0 text-brand-600" strokeWidth={1.9} aria-hidden="true" />
          <span className="text-xs font-semibold text-pretty [overflow-wrap:normal] hyphens-none">{copy.condition}</span>
        </motion.div>

        <div
          data-flow-connector="condition-outcomes"
          className="relative grid h-12 w-full grid-cols-2 gap-3 max-[600px]:h-6"
          aria-hidden="true"
        >
          <FlowLine name="stem" segment className="absolute top-0 left-1/2 z-10 h-[calc(.75rem+2px)] w-0.5 -translate-x-1/2" direction="down" start={TIMING.lines.stem} duration={0.1} signalStart={TIMING.signals.stem} signalDuration={0.08} tone="brand" running={running} noMotion={noMotion} />

          <div className="relative">
            <FlowLine name="left-rail" segment className="absolute top-3 right-[-0.375rem] left-1/2 h-0.5" direction="reverse" start={TIMING.lines.rails} duration={0.2} signalStart={TIMING.signals.rails} signalDuration={0.16} tone="success" running={running} noMotion={noMotion} />
            <FlowLine name="left-leg" segment className="absolute top-3 bottom-0 left-1/2 w-0.5 -translate-x-1/2" direction="down" start={TIMING.lines.legs} duration={0.16} signalStart={TIMING.signals.legs} signalDuration={0.16} signalEase={OFFER_EASE_OUT} tone="success" running={running} noMotion={noMotion} />
          </div>

          <div className="relative">
            <FlowLine name="right-rail" segment className="absolute top-3 right-1/2 left-[-0.375rem] h-0.5" direction="forward" start={TIMING.lines.rails} duration={0.2} tone="muted" running={running} noMotion={noMotion} />
            <FlowLine name="right-leg" segment className="absolute top-3 right-1/2 bottom-0 w-0.5 translate-x-1/2" direction="down" start={TIMING.lines.legs} duration={0.16} tone="muted" running={running} noMotion={noMotion} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <motion.div
            data-flow-node="success"
            className="relative flex min-w-0 items-center gap-2 rounded-xl bg-white p-3 shadow-surface max-[600px]:p-2"
            variants={{
              hidden: { ...nodeVariants.hidden, backgroundColor: "var(--color-white)", color: "var(--color-neutral-500)", boxShadow: "var(--shadow-surface)" },
              visible: { ...nodeVariants.visible, backgroundColor: "var(--color-emerald-50)", color: "var(--color-emerald-700)", boxShadow: "inset 0 0 0 1px var(--color-emerald-200)" },
            }}
            transition={{ ...cardTransition(TIMING.success), backgroundColor: completionTransition, color: completionTransition, boxShadow: completionTransition }}
          >
            <ProcessEmphasis running={running} delay={TIMING.confirmed} success />
            <UserRoundPlus className="size-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
            <span className="min-w-0">
              <span className="block text-xs font-medium">{copy.yes}</span>
              <span className="block text-xs font-semibold text-neutral-900 text-pretty [overflow-wrap:normal] hyphens-none">{copy.success}</span>
            </span>
          </motion.div>
          <motion.div
            data-flow-node="fallback"
            className="relative flex min-w-0 items-center gap-2 rounded-xl bg-white p-3 shadow-surface max-[600px]:p-2"
            variants={nodeVariants}
            transition={cardTransition(TIMING.fallback)}
          >
            <ListTodo className="size-5 shrink-0 text-neutral-500" strokeWidth={1.8} aria-hidden="true" />
            <span className="min-w-0">
              <span className="block text-xs font-medium text-neutral-400">{copy.review}</span>
              <span className="block text-xs font-semibold text-pretty [overflow-wrap:normal] hyphens-none">{copy.fallback}</span>
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
