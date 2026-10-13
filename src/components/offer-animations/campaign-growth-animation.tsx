import { FlaskConical, Image as ImageIcon, Rocket } from "lucide-react";
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { OFFER_EASE_OUT } from "@/components/offer-animations/motion-tokens";
import { FLAT_FILL, STAGE_BOX, stageStyle, useStage, type StageMode } from "@/components/offer-animations/stage";
import { useHydratedReducedMotion } from "@/components/offer-animations/use-hydrated-reduced-motion";
import type { CampaignAnimationCopy } from "@/i18n/services";
import type { Locale } from "@/lib/i18n";

// Vertical extent of the chart inside the shared stage box.
const PLOT: Record<StageMode, { top: number; bottom: number }> = {
  wide: { top: 110, bottom: 300 },
  narrow: { top: 120, bottom: 306 },
};
const INSET = 6;
const MAX = 38;
// Weekly qualified inquiries; each campaign change lifts the curve a little more.
const WEEKS = [5, 6, 7, 8, 11, 13, 15, 18, 23, 26, 31, 36] as const;
// The labels climb like a staircase at the top of the chart, following the curve: the latest highest.
const EVENTS = [
  { week: 1, Icon: Rocket },
  { week: 5, Icon: ImageIcon },
  { week: 9, Icon: FlaskConical },
] as const;

// Bottom edge of each label: one step per label, the last event on the top step.
function labelBottom(top: number, index: number) {
  return top - 4 + (EVENTS.length - 1 - index) * 32;
}

const CHANNELS = [
  { name: "Google Ads", share: 58 },
  { name: "Meta", share: 29 },
  { name: "LinkedIn", share: 13 },
] as const;
const TOTAL = 286;
const DRAW_SECONDS = 2;
const ACCENT = "#0a6cf5";

function chart(mode: StageMode) {
  const { width } = STAGE_BOX[mode];
  const { top, bottom } = PLOT[mode];
  const right = width - INSET;
  const points = WEEKS.map((value, index) => ({
    x: INSET + (index / (WEEKS.length - 1)) * (right - INSET),
    y: bottom - (value / MAX) * (bottom - top),
  }));
  return { top, bottom, right, points, curve: smoothPath(points), samples: sampleCurve(points) };
}

export function CampaignGrowthAnimation({ locale, copy }: { locale: Locale; copy: CampaignAnimationCopy }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.45 });
  const noMotion = useHydratedReducedMotion();
  const { mode, scale } = useStage(containerRef);
  const stage = STAGE_BOX[mode];
  const { top, bottom, right, points, curve, samples } = useMemo(() => chart(mode), [mode]);
  const [reached, setReached] = useState(0);
  const progress = useMotionValue(0);
  const formatter = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const clipWidth = useTransform(() => INSET + progress.get() * (right - INSET) + 8);
  const tipX = useTransform(() => INSET + progress.get() * (right - INSET));
  const tipY = useTransform(() => heightAt(samples, tipX.get()));
  const count = useTransform(progress, (value) => formatter.format(Math.round(TOTAL * value ** 1.6)));
  const done = reached > EVENTS.length;

  useEffect(() => {
    if (noMotion) {
      progress.set(1);
      return;
    }
    if (!isInView) return;
    const controls = animate(progress, 1, { duration: DRAW_SECONDS, ease: [0.45, 0, 0.25, 1], delay: 0.15 });
    return () => controls.stop();
  }, [isInView, noMotion, progress]);

  // Pins pop as the line passes them; the final step marks the end of the draw.
  useMotionValueEvent(progress, "change", (value) => {
    const passed = EVENTS.filter(({ week }) => value >= week / (WEEKS.length - 1)).length + (value >= 1 ? 1 : 0);
    setReached((current) => (passed > current ? passed : current));
  });
  const shown = noMotion ? EVENTS.length + 1 : reached;

  return (
    <div ref={containerRef} data-campaign-chart className="relative size-full min-h-0 select-none">
      <div className="absolute top-1/2 left-1/2" style={stageStyle(stage, scale * FLAT_FILL)}>
        <div className="flex items-end gap-2.5">
          <motion.span
            data-campaign-metric
            className="font-mono text-[46px] leading-none font-medium tracking-[-0.06em] text-neutral-900 tabular-nums"
          >
            {count}
          </motion.span>
          <motion.span
            className="mb-1.5 rounded-full bg-[#e3f4ea] px-2 py-1 font-mono text-[12px] leading-none font-semibold text-[#1f7a4f]"
            initial={false}
            animate={{ opacity: shown > EVENTS.length ? 1 : 0, y: shown > EVENTS.length ? 0 : 4 }}
            transition={{ duration: noMotion ? 0 : 0.35, ease: OFFER_EASE_OUT }}
          >
            +67%
          </motion.span>
        </div>
        <span className="mt-2 block text-[14px] font-medium text-neutral-600">{copy.metricLabel}</span>

        <svg className="absolute inset-0 overflow-visible" width={stage.width} height={stage.height}>
          <defs>
            <linearGradient id="campaign-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={ACCENT} stopOpacity="0.16" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="campaign-line" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#7fb3ff" />
              <stop offset="100%" stopColor={ACCENT} />
            </linearGradient>
            <clipPath id="campaign-reveal">
              <motion.rect x="0" y="0" height={stage.height} style={{ width: clipWidth }} />
            </clipPath>
          </defs>

          {[0, 1, 2].map((line) => {
            const y = top + ((bottom - top) / 3) * line;
            return <line key={y} x1={INSET} x2={right} y1={y} y2={y} stroke="rgb(0 0 0 / 7%)" strokeDasharray="3 5" />;
          })}
          <line x1={INSET} x2={right} y1={bottom} y2={bottom} stroke="rgb(0 0 0 / 12%)" />

          <g clipPath="url(#campaign-reveal)">
            <path d={`${curve} L ${right} ${bottom} L ${INSET} ${bottom} Z`} fill="url(#campaign-area)" />
            <path
              d={curve}
              fill="none"
              stroke="url(#campaign-line)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {EVENTS.map(({ week }, index) => {
            const point = points[week]!;
            return (
              <motion.g
                key={week}
                initial={false}
                animate={{ opacity: shown > index ? 1 : 0 }}
                transition={{ duration: noMotion ? 0 : 0.25 }}
              >
                <line
                  x1={point.x}
                  x2={point.x}
                  y1={labelBottom(top, index)}
                  y2={point.y - 7}
                  stroke="rgb(0 0 0 / 22%)"
                  strokeDasharray="2 3"
                />
                <circle cx={point.x} cy={point.y} r="5" fill="#ffffff" stroke={ACCENT} strokeWidth="2.5" />
              </motion.g>
            );
          })}

          {!noMotion ? (
            <motion.g style={{ x: tipX, y: tipY }} initial={false} animate={{ opacity: done ? 0 : 1 }}>
              <circle r="11" fill={ACCENT} opacity="0.18" />
              <circle r="5.5" fill={ACCENT} stroke="#ffffff" strokeWidth="2.5" />
            </motion.g>
          ) : null}
          <motion.g
            transform={`translate(${points.at(-1)!.x} ${points.at(-1)!.y})`}
            initial={false}
            animate={{ opacity: shown > EVENTS.length ? 1 : 0 }}
            transition={{ duration: noMotion ? 0 : 0.3 }}
          >
            <circle r="5.5" fill="#ffffff" stroke={ACCENT} strokeWidth="3" />
          </motion.g>
        </svg>

        {EVENTS.map(({ week, Icon }, index) => {
          const point = points[week]!;
          const visible = shown > index;
          const first = index === 0;
          const last = index === EVENTS.length - 1;
          // The outer labels lean inwards so they never run past the edge; each still covers its line.
          return (
            <motion.span
              key={week}
              className="absolute flex items-center gap-1.5 rounded-full bg-white py-1 pr-2.5 pl-1 text-[12px] leading-none font-semibold whitespace-nowrap text-neutral-800 shadow-[0_0_0_1px_rgb(0_0_0/8%),0_8px_18px_-10px_rgb(0_0_0/30%)]"
              style={{
                left: first ? Math.max(0, point.x - 40) : last ? Math.min(stage.width, point.x + 48) : point.x,
                top: labelBottom(top, index),
                translateX: first ? "0%" : last ? "-100%" : "-50%",
                translateY: "-100%",
              }}
              initial={false}
              animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={noMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 20 }}
            >
              <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#fdf1d8] text-[#b36a00]">
                <Icon className="size-[11px]" strokeWidth={2.2} aria-hidden="true" />
              </span>
              {copy.events[index]}
            </motion.span>
          );
        })}

        <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-4">
          {CHANNELS.map((channel, index) => (
            <div key={channel.name}>
              <span className="flex items-baseline justify-between gap-2 text-[12px] leading-none font-semibold whitespace-nowrap text-neutral-800">
                {channel.name}
                <span className="font-mono font-medium text-neutral-600 tabular-nums">{channel.share}%</span>
              </span>
              <span className="mt-2 block h-[5px] overflow-hidden rounded-full bg-black/[0.06]">
                <motion.span
                  className="block h-full origin-left rounded-full"
                  style={{ background: ACCENT }}
                  initial={false}
                  animate={{ scaleX: noMotion || isInView ? channel.share / 100 : 0 }}
                  transition={{
                    duration: noMotion ? 0 : 1,
                    delay: noMotion ? 0 : 0.6 + index * 0.12,
                    ease: OFFER_EASE_OUT,
                  }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type Point = { x: number; y: number };

// Catmull-Rom through the weekly points, written as cubic Béziers so the line stays smooth.
function segments(list: readonly Point[]) {
  return list.slice(0, -1).map((point, index) => {
    const previous = list[index - 1] ?? point;
    const next = list[index + 1]!;
    const after = list[index + 2] ?? next;
    return {
      start: point,
      control1: { x: point.x + (next.x - previous.x) / 6, y: point.y + (next.y - previous.y) / 6 },
      control2: { x: next.x - (after.x - point.x) / 6, y: next.y - (after.y - point.y) / 6 },
      end: next,
    };
  });
}

function smoothPath(list: readonly Point[]) {
  return segments(list).reduce(
    (path, { control1, control2, end }) =>
      `${path} C ${control1.x} ${control1.y} ${control2.x} ${control2.y} ${end.x} ${end.y}`,
    `M ${list[0]!.x} ${list[0]!.y}`,
  );
}

function sampleCurve(list: readonly Point[]) {
  return segments(list).flatMap(({ start, control1, control2, end }) =>
    Array.from({ length: 24 }, (_, step) => {
      const t = step / 24;
      const u = 1 - t;
      return {
        x: u ** 3 * start.x + 3 * u * u * t * control1.x + 3 * u * t * t * control2.x + t ** 3 * end.x,
        y: u ** 3 * start.y + 3 * u * u * t * control1.y + 3 * u * t * t * control2.y + t ** 3 * end.y,
      };
    }),
  );
}

function heightAt(samples: readonly Point[], x: number) {
  const index = samples.findIndex((sample) => sample.x >= x);
  if (index <= 0) return samples[index === 0 ? 0 : samples.length - 1]!.y;
  const before = samples[index - 1]!;
  const after = samples[index]!;
  return before.y + ((after.y - before.y) * (x - before.x)) / (after.x - before.x || 1);
}
