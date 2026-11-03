import { CalendarClock, Paperclip } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { OFFER_EASE_IN_OUT, OFFER_EASE_OUT, OFFER_VIEWPORT } from "@/components/offer-animations/motion-tokens";
import { FLAT_FILL, STAGE_BOX, stageStyle, useStage } from "@/components/offer-animations/stage";
import { useHydratedReducedMotion } from "@/components/offer-animations/use-hydrated-reduced-motion";
import { Widget } from "@/components/offer-animations/widget";
import type { AutomationAnimationCopy } from "@/i18n/services";

// The agent reads one email: it marks the sender and each bracketed phrase, and every mark fills one CRM field.
const START = 0.6;
const STEP = 0.55;
const MARK_SECONDS = 0.3;
const MARK_COLOR = "rgb(255 245 0 / 75%)";
const MARK_CLEAR = "rgb(255 245 0 / 0%)";
const MARK_GLOW = [MARK_CLEAR, "rgb(255 245 0 / 32%)", MARK_CLEAR];
// A four-point sparkle, the usual sign for an AI step at work.
const SPARKLE = "M6 .4C6.5 3.4 8.6 5.5 11.6 6 8.6 6.5 6.5 8.6 6 11.6 5.5 8.6 3.4 6.5.4 6 3.4 5.5 5.5 3.4 6 .4Z";

const wait = (seconds: number) => new Promise((resolve) => window.setTimeout(resolve, seconds * 1000));

export function AutomationFlowAnimation({ copy }: { copy: AutomationAnimationCopy }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, OFFER_VIEWPORT);
  const noMotion = useHydratedReducedMotion();
  const { mode, scale } = useStage(containerRef);
  const narrow = mode === "narrow";
  const stage = STAGE_BOX[mode];
  const [reading, setReading] = useState(false);
  const [marked, setMarked] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (noMotion || !isInView) return;
    let cancelled = false;
    const run = async () => {
      await wait(START);
      if (cancelled) return;
      setReading(true);
      for (let field = 1; field <= copy.fields.length; field += 1) {
        setMarked(field);
        await wait(STEP);
        if (cancelled) return;
      }
      setReady(true);
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [copy.fields.length, isInView, noMotion]);

  const visible = noMotion || isInView;
  const shownMarks = noMotion ? copy.fields.length : marked;
  const done = noMotion || ready;
  const working = reading && !done;
  // Odd parts sit inside square brackets; mark 0 is the sender's name in the header.
  const parts = copy.body.split(/\[(.+?)\]/);
  const initials = copy.sender
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <div ref={containerRef} data-automation-flow className="relative size-full min-h-0 select-none">
      <div className="absolute top-1/2 left-1/2 flex items-center" style={stageStyle(stage, scale * FLAT_FILL)}>
        <div className={`grid w-full items-start ${narrow ? "gap-3.5" : "grid-cols-[252px_1fr] gap-4"}`}>
          <Widget
            label={copy.inbox}
            className={narrow ? "p-3.5" : "p-4"}
            visible={visible}
            delay={0}
            from={narrow ? { y: -28 } : { x: -56 }}
            bounce={0.3}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="grid size-[30px] shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white"
                style={{ background: "linear-gradient(140deg, #ffb36b, #f0624d)" }}
              >
                {initials}
              </span>
              <span className="min-w-0 flex-1 text-[13px] leading-tight font-semibold text-neutral-900">
                <Mark lit={shownMarks > 0} noMotion={noMotion}>
                  {copy.sender}
                </Mark>
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-neutral-400">
                {copy.time}
                <motion.span
                  className="size-1.5 rounded-full bg-[#0a6cf5]"
                  initial={false}
                  animate={{ opacity: reading || noMotion ? 0 : 1, scale: reading || noMotion ? 0 : 1 }}
                  transition={{ duration: noMotion ? 0 : 0.25 }}
                />
              </span>
            </div>
            <span className="mt-3 block truncate text-[14px] leading-tight font-semibold text-neutral-900">
              {copy.subject}
            </span>
            <p
              className={`m-0 mt-1.5 text-neutral-600 ${narrow ? "text-[13px] leading-[19px]" : "text-[14px] leading-[22px]"}`}
            >
              {parts.map((part, index) =>
                index % 2 === 1 ? (
                  <Mark key={index} lit={shownMarks > (index + 1) / 2} noMotion={noMotion}>
                    {part}
                  </Mark>
                ) : (
                  part
                ),
              )}
            </p>
            {narrow ? null : (
              <span className="mt-3.5 inline-flex items-center gap-1.5 rounded-[8px] bg-neutral-50 px-2 py-1.5 text-[11px] font-medium text-neutral-600 shadow-[inset_0_0_0_1px_rgb(0_0_0/6%)]">
                <Paperclip className="size-3" strokeWidth={2} aria-hidden="true" />
                {copy.attachment}
              </span>
            )}
          </Widget>

          <Widget
            label={copy.crm}
            className={narrow ? "p-3.5" : "p-4"}
            visible={visible}
            delay={0.15}
            from={narrow ? { y: 16 } : { x: 28 }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[14px] leading-tight font-semibold text-neutral-900">{copy.lead}</span>
              <AgentStatus shown={reading || done} working={working} done={done} noMotion={noMotion} />
            </div>

            <dl className={`m-0 grid ${narrow ? "mt-3 grid-cols-2 gap-x-3 gap-y-2.5" : "mt-2"}`}>
              {copy.fields.map((field, index) => (
                <div
                  key={field.label}
                  className={`relative min-w-0 ${narrow ? "" : "border-t border-black/[0.06] py-2 first:border-t-0"}`}
                >
                  {/* The row glows in the marker colour when its value lands, linking it to the phrase in the email. */}
                  <motion.span
                    className={`pointer-events-none absolute -inset-x-1.5 rounded-[8px] ${narrow ? "-inset-y-1" : "inset-y-0.5"}`}
                    initial={false}
                    animate={{ backgroundColor: shownMarks > index && !noMotion ? MARK_GLOW : MARK_CLEAR }}
                    transition={{ duration: 0.8, delay: 0.15, times: [0, 0.3, 1] }}
                  />
                  <dt className="relative text-[11px] leading-none text-neutral-500">{field.label}</dt>
                  <dd className="relative m-0 mt-1 h-[18px] text-[13px] leading-[18px] font-semibold text-neutral-900">
                    <FieldValue filled={shownMarks > index} noMotion={noMotion}>
                      {field.value}
                    </FieldValue>
                  </dd>
                </div>
              ))}
            </dl>

            <motion.div
              className={`flex items-center gap-2.5 rounded-[12px] bg-neutral-50 px-2.5 py-2 shadow-[inset_0_0_0_1px_rgb(0_0_0/5%)] ${narrow ? "mt-3" : "mt-2"}`}
              initial={false}
              animate={{ opacity: done ? 1 : 0, y: done ? 0 : 12 }}
              transition={
                noMotion ? { duration: 0 } : { type: "spring", duration: 0.5, bounce: 0.35, delay: done ? 0.25 : 0 }
              }
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-[8px] bg-[#e3f4ea] text-[#1f7a4f]">
                <CalendarClock className="size-3.5" strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1 text-[12px] leading-tight">
                <span className="block truncate font-semibold text-neutral-900">{copy.followUp}</span>
                <span className="block truncate text-neutral-500">{copy.followUpTime}</span>
              </span>
            </motion.div>
          </Widget>
        </div>
      </div>
    </div>
  );
}

// While the agent works, a short arc circles a turning sparkle. When it finishes, the arc closes into a full
// ring, the badge turns green and a check draws where the sparkle was.
function AgentStatus({
  shown,
  working,
  done,
  noMotion,
}: {
  shown: boolean;
  working: boolean;
  done: boolean;
  noMotion: boolean;
}) {
  const settle = { duration: noMotion ? 0 : 0.4, ease: OFFER_EASE_OUT };
  return (
    <motion.span
      className="relative grid size-[24px] shrink-0 place-items-center rounded-full"
      initial={false}
      animate={{
        opacity: shown ? 1 : 0,
        backgroundColor: done ? "#e3f4ea" : "#eaf2ff",
        color: done ? "#1f8a5b" : "#245bb8",
      }}
      transition={settle}
    >
      <motion.svg
        className="absolute inset-0 size-full"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        initial={false}
        animate={working ? { rotate: [0, 360] } : { rotate: 0 }}
        transition={working ? { duration: 0.9, ease: "linear", repeat: Infinity } : { duration: 0 }}
      >
        <motion.circle
          cx="12"
          cy="12"
          r="11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: done ? 1 : 0.28, opacity: done ? 0.55 : 1 }}
          transition={settle}
        />
      </motion.svg>
      <motion.svg
        className="absolute size-3"
        viewBox="0 0 12 12"
        aria-hidden="true"
        initial={false}
        animate={
          done
            ? { scale: 0, rotate: 135, opacity: 0 }
            : working
              ? { scale: [1, 0.7, 1], rotate: [0, 90, 180], opacity: 1 }
              : { scale: 1, rotate: 0, opacity: 1 }
        }
        transition={
          working && !done
            ? { duration: 1.3, ease: "easeInOut", repeat: Infinity }
            : { duration: noMotion ? 0 : 0.3, ease: OFFER_EASE_IN_OUT }
        }
      >
        <path fill="currentColor" d={SPARKLE} />
      </motion.svg>
      <svg className="absolute size-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <motion.path
          d="M2.6 6.4 5 8.7l4.4-5"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: done ? 1 : 0, opacity: done ? 1 : 0 }}
          transition={{ duration: noMotion ? 0 : 0.35, delay: noMotion ? 0 : 0.2, ease: OFFER_EASE_OUT }}
        />
      </svg>
    </motion.span>
  );
}

// A marker stroke that sweeps across the phrase; it also follows the text across a line break.
function Mark({ lit, noMotion, children }: { lit: boolean; noMotion: boolean; children: ReactNode }) {
  return (
    <motion.span
      className="-mx-[2px] rounded-[3px] box-decoration-clone px-[2px] text-neutral-900"
      style={{ backgroundImage: `linear-gradient(${MARK_COLOR}, ${MARK_COLOR})`, backgroundRepeat: "no-repeat" }}
      initial={false}
      animate={{ backgroundSize: lit ? "100% 100%" : "0% 100%" }}
      transition={noMotion ? { duration: 0 } : { duration: MARK_SECONDS, ease: OFFER_EASE_IN_OUT }}
    >
      {children}
    </motion.span>
  );
}

// An empty field shows a grey placeholder until its value slides in from the email side.
function FieldValue({ filled, noMotion, children }: { filled: boolean; noMotion: boolean; children: ReactNode }) {
  const transition = { duration: noMotion ? 0 : 0.3, delay: noMotion || !filled ? 0 : 0.2, ease: OFFER_EASE_OUT };
  return (
    <>
      <motion.span
        className="absolute top-1/2 left-0 h-2 w-16 -translate-y-1/2 rounded-full bg-neutral-100"
        initial={false}
        animate={{ opacity: filled ? 0 : 1 }}
        transition={transition}
      />
      <motion.span
        className="block truncate"
        initial={false}
        animate={{ opacity: filled ? 1 : 0, x: filled ? 0 : -8 }}
        transition={transition}
      >
        {children}
      </motion.span>
    </>
  );
}
