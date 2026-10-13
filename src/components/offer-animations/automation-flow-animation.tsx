import { Bot, BrainCircuit, Check, Database, GitBranch, ListTodo, Search, UserRoundPlus, Webhook } from "lucide-react";
import { animate, motion, useInView, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { OFFER_EASE_IN_OUT, OFFER_EASE_OUT } from "@/components/offer-animations/motion-tokens";
import { FLAT_FILL, STAGE_BOX, stageStyle, useStage, type StageMode } from "@/components/offer-animations/stage";
import { useHydratedReducedMotion } from "@/components/offer-animations/use-hydrated-reduced-motion";
import type { AutomationAnimationCopy } from "@/i18n/services";

type Box = { left: number; top: number; width: number; height: number };
type Layout = {
  // The flow is drawn in a block of this height, centred vertically in the shared stage box.
  height: number;
  trigger: Box;
  agent: Box;
  condition: Box;
  lead: Box;
  review: Box;
  paths: { intake: string; decide: string; lead: string; review: string };
};

// Wide: intake beside the agent, as in the original flow. Narrow: one column with the intake as a row.
const LAYOUTS: Record<StageMode, Layout> = {
  wide: {
    height: 346,
    trigger: { left: 0, top: 0, width: 130, height: 120 },
    agent: { left: 146, top: 0, width: 334, height: 120 },
    condition: { left: 90, top: 168, width: 300, height: 44 },
    lead: { left: 0, top: 262, width: 232, height: 84 },
    review: { left: 248, top: 262, width: 232, height: 84 },
    paths: {
      intake: "M 130 60 H 146",
      decide: "M 240 120 V 168",
      lead: "M 240 212 V 226 Q 240 232 234 232 H 122 Q 116 232 116 238 V 262",
      review: "M 240 212 V 226 Q 240 232 246 232 H 358 Q 364 232 364 238 V 262",
    },
  },
  narrow: {
    height: 352,
    trigger: { left: 0, top: 0, width: 320, height: 40 },
    agent: { left: 0, top: 62, width: 320, height: 108 },
    condition: { left: 0, top: 192, width: 320, height: 40 },
    lead: { left: 0, top: 268, width: 154, height: 84 },
    review: { left: 166, top: 268, width: 154, height: 84 },
    paths: {
      intake: "M 160 40 V 62",
      decide: "M 160 170 V 192",
      lead: "M 160 232 V 244 Q 160 250 154 250 H 83 Q 77 250 77 256 V 268",
      review: "M 160 232 V 244 Q 160 250 166 250 H 237 Q 243 250 243 256 V 268",
    },
  },
};
const TOOLS = [
  { key: "model", Icon: BrainCircuit },
  { key: "context", Icon: Database },
  { key: "research", Icon: Search },
] as const;
const COLORS = { flow: "#6650a6", lead: "#1f8a5b", review: "#b7791f", idle: "rgb(102 80 166 / 20%)" } as const;
const NODE_SHADOW = "0 0 0 1px rgba(60, 40, 120, 0.08), 0 12px 26px -16px rgba(60, 40, 120, 0.45)";

type Outcome = "lead" | "review";
type Step = "idle" | "intake" | "agent" | "decide" | "route" | "done";

const wait = (seconds: number) => new Promise((resolve) => window.setTimeout(resolve, seconds * 1000));

export function AutomationFlowAnimation({ copy }: { copy: AutomationAnimationCopy }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.45 });
  const noMotion = useHydratedReducedMotion();
  const { mode, scale } = useStage(containerRef);
  const stage = STAGE_BOX[mode];
  const layout = LAYOUTS[mode];
  const narrow = mode === "narrow";
  const [step, setStep] = useState<Step>("idle");
  const [tools, setTools] = useState(0);
  const [appeared, setAppeared] = useState(false);
  const intake = useMotionValue(0);
  const decide = useMotionValue(0);
  const lead = useMotionValue(0);

  // One inquiry, in strict order: each signal starts only when the previous step has finished.
  useEffect(() => {
    if (noMotion || !isInView) return;
    let cancelled = false;
    const travel = (value: MotionValue<number>, duration: number) =>
      animate(value, 1, { duration, ease: OFFER_EASE_IN_OUT }).then(() => undefined);

    const run = async () => {
      setAppeared(true);
      await wait(0.45);
      if (cancelled) return;
      setStep("intake");
      await travel(intake, 0.4);
      if (cancelled) return;
      setStep("agent");
      for (let tool = 1; tool <= TOOLS.length; tool += 1) {
        await wait(0.18);
        if (cancelled) return;
        setTools(tool);
      }
      await wait(0.2);
      if (cancelled) return;
      setStep("decide");
      await travel(decide, 0.3);
      await wait(0.3);
      if (cancelled) return;
      setStep("route");
      await travel(lead, 0.5);
      if (!cancelled) setStep("done");
    };
    void run();
    return () => {
      cancelled = true;
      [intake, decide, lead].forEach((value) => value.stop());
    };
  }, [decide, intake, isInView, lead, noMotion]);

  const shown: Step = noMotion ? "done" : step;
  const visible = noMotion || appeared;
  const litTools = noMotion ? TOOLS.length : tools;
  const routed = shown === "route" || shown === "done";
  const finished = shown === "done";
  const { paths } = layout;

  return (
    <div ref={containerRef} data-automation-flow className="relative size-full min-h-0 select-none">
      <div className="absolute top-1/2 left-1/2" style={stageStyle(stage, scale * FLAT_FILL)}>
        <div className="absolute inset-x-0" style={{ top: (stage.height - layout.height) / 2, height: layout.height }}>
          <svg className="absolute inset-0 overflow-visible" width={stage.width} height={layout.height}>
            {Object.values(paths).map((path) => (
              <path key={path} d={path} fill="none" stroke={COLORS.idle} strokeWidth="2" />
            ))}
            <Trail d={paths.intake} progress={intake} color={COLORS.flow} full={noMotion} />
            <Trail d={paths.decide} progress={decide} color={COLORS.flow} full={noMotion} />
            <Trail d={paths.lead} progress={lead} color={COLORS.lead} full={noMotion} />
          </svg>

          {!noMotion ? (
            <>
              <Signal path={paths.intake} progress={intake} color={COLORS.flow} />
              <Signal path={paths.decide} progress={decide} color={COLORS.flow} />
              <Signal path={paths.lead} progress={lead} color={COLORS.lead} />
            </>
          ) : null}

          <Node
            className={`flex items-center justify-center gap-2.5 ${narrow ? "" : "flex-col text-center"}`}
            box={layout.trigger}
            delay={0}
            visible={visible}
          >
            <Pulse active={shown === "intake"} />
            <Webhook className="size-5 shrink-0 text-[#6650a6]" strokeWidth={1.8} aria-hidden="true" />
            <span className="text-[14px] leading-tight font-semibold whitespace-nowrap text-neutral-900">
              {copy.trigger}
            </span>
          </Node>

          <Node className="p-3" box={layout.agent} delay={0.1} visible={visible}>
            <Pulse active={shown === "agent"} />
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-neutral-900 text-white">
                <Bot className="size-4" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[14px] font-semibold text-neutral-900">{copy.agent}</span>
                <span className="block truncate text-[12px] text-neutral-600">{copy.extract}</span>
              </span>
            </div>
            <div className={`mt-3 grid grid-cols-3 gap-2`}>
              {TOOLS.map(({ key, Icon }, index) => {
                const lit = litTools > index;
                return (
                  <span
                    key={key}
                    className={`relative flex items-center justify-center gap-1.5 ${narrow ? "h-[36px]" : "h-[40px]"} rounded-[9px] text-[12px] font-medium transition-[background-color,color,box-shadow] duration-300 ${
                      lit
                        ? "bg-[#f3efff] text-[#4b3a85] shadow-[inset_0_0_0_1.5px_#6650a6]"
                        : "bg-neutral-50 text-neutral-400 shadow-[inset_0_0_0_1px_rgb(0_0_0/6%)]"
                    }`}
                  >
                    <Icon className="size-3.5" strokeWidth={1.9} aria-hidden="true" />
                    {copy[key]}
                    <motion.span
                      className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded-full bg-[#6650a6] text-white"
                      initial={false}
                      animate={{ scale: lit ? 1 : 0, opacity: lit ? 1 : 0 }}
                      transition={noMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 22 }}
                    >
                      <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                    </motion.span>
                  </span>
                );
              })}
            </div>
          </Node>

          <Node
            className="flex items-center justify-center gap-2 rounded-full px-2"
            box={layout.condition}
            delay={0.2}
            visible={visible}
          >
            <Pulse active={shown === "decide"} />
            <GitBranch className="size-4 text-[#6650a6]" strokeWidth={1.9} aria-hidden="true" />
            <span className="text-[13px] font-semibold text-neutral-900">{copy.condition}</span>
            <motion.span
              className="rounded-full px-1.5 py-1 text-[12px] leading-none font-semibold text-white"
              style={{ background: COLORS.lead }}
              initial={false}
              animate={{ opacity: routed ? 1 : 0, scale: routed ? 1 : 0.6 }}
              transition={noMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 24 }}
            >
              {copy.yes}
            </motion.span>
          </Node>

          <OutcomeNode
            box={layout.lead}
            compact={narrow}
            tone="lead"
            icon={<UserRoundPlus className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />}
            label={copy.yes}
            title={copy.success}
            lit={finished}
            visible={visible}
            delay={0.3}
          />
          <OutcomeNode
            box={layout.review}
            compact={narrow}
            tone="review"
            icon={<ListTodo className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />}
            label={copy.review}
            title={copy.fallback}
            lit={false}
            visible={visible}
            delay={0.36}
          />
        </div>
      </div>
    </div>
  );
}

function Node({
  className,
  box,
  delay,
  visible,
  children,
}: {
  className: string;
  box: Box;
  delay: number;
  visible: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={`absolute rounded-[14px] bg-white ${className}`}
      style={{ ...box, boxShadow: NODE_SHADOW }}
      initial={false}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.94 }}
      transition={{ delay: visible ? delay : 0, type: "spring", duration: 0.45, bounce: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// A soft ring on the step that is currently working.
function Pulse({ active }: { active: boolean }) {
  return (
    <motion.span
      className="pointer-events-none absolute -inset-px rounded-[inherit]"
      style={{ boxShadow: `0 0 0 2px ${COLORS.flow}` }}
      initial={false}
      animate={{ opacity: active ? 0.55 : 0 }}
      transition={{ duration: 0.3, ease: OFFER_EASE_OUT }}
    />
  );
}

// The lit part of a connector grows with the same value that moves its signal, so both stay in step.
function Trail({
  d,
  progress,
  color,
  full = false,
}: {
  d: string;
  progress: MotionValue<number>;
  color: string;
  full?: boolean;
}) {
  const opacity = useTransform(progress, [0, 0.02], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      style={{ pathLength: full ? 1 : progress, opacity: full ? 1 : opacity }}
    />
  );
}

function Signal({ path, progress, color }: { path: string; progress: MotionValue<number>; color: string }) {
  const distance = useTransform(progress, (value) => `${value * 100}%`);
  const opacity = useTransform(progress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);
  return (
    <motion.span
      className="pointer-events-none absolute top-0 left-0 size-[10px] rounded-full"
      style={{
        offsetPath: `path("${path}")`,
        offsetRotate: "0deg",
        offsetDistance: distance,
        opacity,
        background: color,
        boxShadow: `0 0 0 3px #ffffff, 0 0 0 7px ${color}26`,
      }}
    />
  );
}

function OutcomeNode({
  box,
  compact,
  tone,
  icon,
  label,
  title,
  lit,
  visible,
  delay,
}: {
  box: Box;
  compact: boolean;
  tone: Outcome;
  icon: ReactNode;
  label: string;
  title: string;
  lit: boolean;
  visible: boolean;
  delay: number;
}) {
  const color = COLORS[tone];
  return (
    <motion.div
      className={`absolute flex items-center rounded-[14px] ${compact ? "gap-2 px-2.5" : "gap-3 px-3.5"}`}
      style={box}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 8,
        boxShadow: lit ? `0 0 0 1.5px ${color}, 0 16px 30px -18px ${color}` : NODE_SHADOW,
        backgroundColor: lit ? (tone === "lead" ? "#eef8f2" : "#fdf5e6") : "#ffffff",
      }}
      transition={{
        opacity: { delay: visible ? delay : 0, duration: 0.3 },
        y: { delay: visible ? delay : 0, type: "spring", duration: 0.45, bounce: 0.2 },
        boxShadow: { duration: 0.35, ease: OFFER_EASE_OUT },
        backgroundColor: { duration: 0.35, ease: OFFER_EASE_OUT },
      }}
    >
      <motion.span
        className={`grid shrink-0 place-items-center rounded-[9px] ${compact ? "size-7" : "size-8"}`}
        initial={false}
        animate={{ backgroundColor: lit ? color : "#f5f5f5", color: lit ? "#ffffff" : "#737373" }}
        transition={{ duration: 0.35, ease: OFFER_EASE_OUT }}
      >
        {icon}
      </motion.span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[12px] font-medium" style={{ color }}>
          {label}
        </span>
        <span className="block text-[13px] font-semibold text-pretty text-neutral-900">{title}</span>
      </span>
    </motion.div>
  );
}
