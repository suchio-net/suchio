import { Check, MousePointer2, Search } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { OFFER_EASE_OUT } from "@/components/offer-animations/motion-tokens";
import { useHydratedReducedMotion } from "@/components/offer-animations/use-hydrated-reduced-motion";
import { useHydrated } from "@/components/use-hydrated";
import type { ClickEnquiryCopy } from "@/i18n/service-features";
import type { Locale } from "@/i18n/config";

// One enquiry travels through four panels: the ad gets clicked, the landing page form gets sent, the
// enquiry is matched to its ad, and the campaign report counts it. Each panel lights up in turn.
const PHASE_AT = [0.2, 1.9, 3.9, 5.2] as const;
const ease = OFFER_EASE_OUT;
const AMBER = "#91600a";
const CLICKS = 412;
const BUDGET = 1000;
const BEFORE = 13;

export function ClickEnquiry({ copy, locale }: { copy: ClickEnquiryCopy; locale: Locale }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.45 });
  const hydrated = useHydrated();
  const noMotion = useHydratedReducedMotion();
  const animate = hydrated && !noMotion;
  const [phase, setPhase] = useState(-1);

  useEffect(() => {
    if (!animate || !inView) return;
    const timers = [...PHASE_AT, PHASE_AT[3] + 1.1].map((at, index) =>
      window.setTimeout(() => setPhase(index), at * 1000),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [animate, inView]);

  // Before hydration the server renders the finished state, so the page reads correctly without script.
  const shown = animate ? phase : 4;
  const euro = (value: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
  const counted = shown >= 3;

  return (
    <div ref={rootRef} data-feature="ads" className="rounded-[1.75rem] bg-service-campaigns-bg p-10 max-nav:p-4">
      <ol className="m-0 grid list-none grid-cols-4 gap-4 p-0 max-wide:grid-cols-2 max-narrow:grid-cols-1">
        {copy.steps.map((step, index) => (
          <li key={step.title} className="min-w-0">
            <Panel lit={shown >= index} animate={animate}>
              {index === 0 && <AdPanel copy={copy} phase={shown} animate={animate} />}
              {index === 1 && <PagePanel copy={copy} phase={shown} animate={animate} />}
              {index === 2 && <MatchPanel copy={copy} phase={shown} animate={animate} />}
              {index === 3 && (
                <div className="grid gap-2.5 p-4">
                  <span className="grid text-[11px] text-neutral-500">
                    <b className="truncate text-[12.5px] font-semibold text-[#1b2430]">{copy.dashboardTitle}</b>
                    {copy.dashboardExample}
                  </span>
                  <Metric label={copy.clicks} value={new Intl.NumberFormat(locale).format(CLICKS)} />
                  <Metric
                    label={copy.enquiries}
                    value={String(counted ? BEFORE + 1 : BEFORE)}
                    changed={counted}
                    animate={animate}
                  />
                  <Metric
                    label={copy.costPerEnquiry}
                    value={euro(BUDGET / (counted ? BEFORE + 1 : BEFORE))}
                    changed={counted}
                    animate={animate}
                    strong
                  />
                </div>
              )}
            </Panel>
            <p className="mt-4 mb-0 flex items-baseline gap-2 text-ui font-semibold text-ink">
              <span className="text-meta font-semibold tabular-nums" style={{ color: AMBER }}>
                {index + 1}
              </span>
              {step.title}
            </p>
            <p className="mt-1 mb-0 text-meta text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Panel({ lit, animate, children }: { lit: boolean; animate: boolean; children: ReactNode }) {
  return (
    <motion.div
      aria-hidden="true"
      className="relative h-[13.5rem] overflow-hidden rounded-[1.125rem] bg-white text-[12px] leading-snug text-[#1b2430]"
      initial={false}
      animate={{
        opacity: lit ? 1 : 0.45,
        y: lit ? 0 : 6,
        boxShadow: lit
          ? "0 0 0 1px rgb(0 0 0 / 5%), 0 22px 44px -26px rgb(145 96 10 / 55%)"
          : "0 0 0 1px rgb(0 0 0 / 5%), 0 0 0 0 rgb(145 96 10 / 0%)",
      }}
      transition={{ duration: animate ? 0.5 : 0, ease }}
    >
      {children}
    </motion.div>
  );
}

function AdPanel({ copy, phase, animate }: { copy: ClickEnquiryCopy; phase: number; animate: boolean }) {
  const clicking = phase === 0;
  return (
    <div className="grid gap-3 p-4">
      <span className="flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5 text-[11.5px] text-neutral-600">
        <Search className="size-3 shrink-0" strokeWidth={2.2} />
        <span className="truncate">{copy.query}</span>
      </span>
      <div className="relative">
        <span className="block text-[10.5px] font-semibold">{copy.sponsored}</span>
        <span className="block text-[10.5px] text-neutral-500">{copy.domain}</span>
        <motion.span
          className="mt-1 block text-[14px] leading-snug text-[#1a0dab]"
          animate={{ textDecorationColor: phase >= 1 ? "rgb(26 13 171 / 100%)" : "rgb(26 13 171 / 0%)" }}
          style={{ textDecorationLine: "underline", textUnderlineOffset: 3 }}
          transition={{ duration: 0.2 }}
        >
          {copy.adTitle}
        </motion.span>
        <span className="mt-1 block text-[11.5px] text-neutral-600">{copy.adText}</span>
        {animate && phase <= 1 && (
          <motion.span
            className="absolute top-0 left-0 text-[#1b2430]"
            initial={{ x: 150, y: 120, opacity: 0 }}
            animate={clicking || phase === 1 ? { x: 70, y: 30, opacity: phase === 1 ? 0 : 1 } : {}}
            transition={{ duration: 0.9, ease, opacity: { delay: phase === 1 ? 0.3 : 0, duration: 0.3 } }}
          >
            <MousePointer2 className="size-5 fill-white" strokeWidth={1.8} />
            {phase === 1 && (
              <motion.i
                className="absolute -top-2 -left-2 block size-6 rounded-full border-2"
                style={{ borderColor: AMBER }}
                initial={{ scale: 0.3, opacity: 1 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.span>
        )}
      </div>
    </div>
  );
}

function PagePanel({ copy, phase, animate }: { copy: ClickEnquiryCopy; phase: number; animate: boolean }) {
  const active = phase >= 1;
  const sent = phase >= 2;
  return (
    <div className="grid h-full content-start gap-2 p-4">
      <span className="truncate text-[10.5px] text-neutral-400">{copy.domain}</span>
      <span className="text-[15px] leading-tight font-semibold tracking-[-0.01em]">{copy.pageHeadline}</span>
      <div className="grid [&>*]:[grid-area:1/1]">
        <AnimatePresence initial={false}>
          {sent ? (
            <motion.span
              key="sent"
              className="mt-2 grid justify-items-center gap-2 rounded-[12px] bg-[#e9f7ef] py-5 text-[12px] font-semibold text-[#26734d]"
              initial={animate ? { opacity: 0, scale: 0.95 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease }}
            >
              <Check className="size-5" strokeWidth={2.6} />
              {copy.pageSent}
            </motion.span>
          ) : (
            <motion.span
              key="form"
              className="grid gap-1.5"
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              {copy.pageFields.map((value, index) => (
                <span
                  key={value}
                  className="block h-8 rounded-[8px] bg-neutral-50 px-2.5 leading-8 shadow-[inset_0_0_0_1px_rgb(0_0_0/8%)]"
                >
                  <motion.span
                    className="block overflow-hidden whitespace-nowrap"
                    initial={false}
                    animate={{ clipPath: active ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
                    transition={{
                      delay: animate && active ? 0.35 + index * 0.5 : 0,
                      duration: animate ? 0.45 : 0,
                      ease: "linear",
                    }}
                  >
                    {value}
                  </motion.span>
                </span>
              ))}
              <span className="mt-1 block rounded-full bg-[#1b2430] py-2 text-center text-[11.5px] font-semibold text-white">
                {copy.pageSubmit}
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MatchPanel({ copy, phase, animate }: { copy: ClickEnquiryCopy; phase: number; animate: boolean }) {
  const matched = phase >= 2;
  return (
    <div className="relative grid h-full grid-cols-[minmax(0,1fr)] content-center px-4">
      <MiniCard label={copy.enquiries} title={copy.pageFields.join(", ")} />
      <svg className="mx-auto block h-10 w-4" viewBox="0 0 16 40" fill="none">
        <motion.path
          d="M8 2v34"
          stroke={AMBER}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="3 5"
          initial={false}
          animate={{ pathLength: matched ? 1 : 0, opacity: matched ? 1 : 0.3 }}
          transition={{ delay: animate && matched ? 0.3 : 0, duration: animate ? 0.6 : 0, ease }}
        />
      </svg>
      <MiniCard label={copy.sponsored} title={copy.adTitle} />
      <motion.span
        className="absolute top-1/2 left-1/2 grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white ring-4 ring-white"
        style={{ background: AMBER }}
        initial={false}
        animate={{ scale: matched ? 1 : 0, opacity: matched ? 1 : 0 }}
        transition={{
          delay: animate && matched ? 0.85 : 0,
          type: "spring",
          duration: animate ? 0.45 : 0,
          bounce: 0.35,
        }}
      >
        <Check className="size-4" strokeWidth={2.6} />
      </motion.span>
    </div>
  );
}

function MiniCard({ label, title }: { label: string; title: string }) {
  return (
    <span className="block min-w-0 rounded-[10px] bg-neutral-50 px-3 py-2 shadow-[inset_0_0_0_1px_rgb(0_0_0/6%)]">
      <small className="block text-[10.5px] text-neutral-500">{label}</small>
      <span className="block truncate text-[12px] font-semibold">{title}</span>
    </span>
  );
}

function Metric({
  label,
  value,
  changed = false,
  animate = false,
  strong = false,
}: {
  label: string;
  value: string;
  changed?: boolean;
  animate?: boolean;
  strong?: boolean;
}) {
  return (
    <span
      className={`flex items-baseline justify-between gap-2 rounded-[10px] px-3 py-2 ${strong ? "bg-[#fff8e8]" : "bg-neutral-50"}`}
    >
      <span className="truncate text-[11px] text-neutral-500">{label}</span>
      <span className="relative overflow-hidden">
        <div className="grid [&>*]:[grid-area:1/1]">
          <AnimatePresence initial={false}>
            <motion.b
              key={value}
              className={`block font-semibold tabular-nums ${strong ? "text-[15px]" : "text-[13px]"}`}
              style={{ color: strong ? AMBER : "#1b2430" }}
              initial={animate ? { y: "100%", opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ delay: animate && changed ? 0.25 : 0, duration: animate ? 0.4 : 0, ease }}
            >
              {value}
            </motion.b>
          </AnimatePresence>
        </div>
      </span>
    </span>
  );
}
