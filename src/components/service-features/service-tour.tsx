import { Check, Menu, PencilLine } from "lucide-react";
import { AnimatePresence, motion, useInView, type Transition } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { OFFER_EASE_OUT } from "@/components/offer-animations/motion-tokens";
import { useHydratedReducedMotion } from "@/components/offer-animations/use-hydrated-reduced-motion";
import { useHydrated } from "@/components/use-hydrated";
import type { ServiceTourCopy, TourStepId } from "@/i18n/service-features";

// The tour plays each part of the website service once, then stops on the last one. Clicking a tab
// stops the tour and shows that part.
const STEPS: TourStepId[] = ["design", "speed", "enquiry", "care"];
const STEP_SECONDS = 5.2;
const ease = OFFER_EASE_OUT;
const BRAND = "#245bb8";

export function ServiceTour({ copy }: { copy: ServiceTourCopy }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(rootRef, { once: true, amount: 0.4 });
  const hydrated = useHydrated();
  const noMotion = useHydratedReducedMotion();
  const [active, setActive] = useState(0);
  // The tour starts once the section is in view and stops for good when a visitor picks a tab.
  const started = hydrated && !noMotion && inView;
  const [stopped, setStopped] = useState(false);
  const [picks, setPicks] = useState(0);
  const touring = started && !stopped;
  // A new run key replays the scene from its first frame.
  const run = (started ? 1 : 0) + picks;

  useEffect(() => {
    if (!touring) return;
    if (active === STEPS.length - 1) {
      const stop = window.setTimeout(() => setStopped(true), STEP_SECONDS * 1000);
      return () => window.clearTimeout(stop);
    }
    const next = window.setTimeout(() => setActive((index) => index + 1), STEP_SECONDS * 1000);
    return () => window.clearTimeout(next);
  }, [active, touring]);

  const choose = (index: number, focus = false) => {
    setStopped(true);
    setActive(index);
    setPicks((value) => value + 1);
    if (focus) tabRefs.current[index]?.focus();
  };
  const onKey = (event: KeyboardEvent, index: number) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    choose((index + step + STEPS.length) % STEPS.length, true);
  };

  const animate = hydrated && !noMotion;
  const id = STEPS[active]!;

  return (
    <div
      ref={rootRef}
      data-feature="tour"
      className="grid grid-cols-[minmax(0,19rem)_minmax(0,1fr)] items-center gap-10 rounded-[1.75rem] bg-service-websites-bg p-10 max-nav:grid-cols-1 max-nav:gap-6 max-nav:p-4"
    >
      <div
        role="tablist"
        aria-label={copy.tabsLabel}
        aria-orientation="vertical"
        className="grid gap-1.5 max-nav:grid-cols-2"
      >
        {STEPS.map((step, index) => {
          const selected = index === active;
          return (
            <button
              key={step}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`tour-tab-${step}`}
              aria-selected={selected}
              aria-controls="tour-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => choose(index)}
              onKeyDown={(event) => onKey(event, index)}
              className="relative overflow-hidden rounded-[1rem] px-4 py-3.5 text-left transition-colors duration-200 hover:bg-white/60 max-nav:px-3 max-nav:py-2.5"
            >
              {selected && (
                <motion.span
                  layoutId="tour-tab"
                  className="absolute inset-0 rounded-[1rem] bg-white shadow-[0_0_0_1px_rgb(0_0_0/5%),0_14px_30px_-20px_rgb(36_91_184/55%)]"
                  transition={{ type: "spring", duration: animate ? 0.5 : 0, bounce: 0.15 }}
                />
              )}
              <span className="relative block text-ui font-semibold text-ink">{copy.steps[step].title}</span>
              <motion.span
                className="relative block overflow-hidden text-meta text-muted max-nav:hidden"
                initial={false}
                animate={{ height: selected ? "auto" : 0, opacity: selected ? 1 : 0 }}
                transition={{ duration: animate ? 0.4 : 0, ease }}
              >
                <span className="block pt-1.5">{copy.steps[step].text}</span>
              </motion.span>
              {selected && touring && (
                <motion.span
                  key={`progress-${run}-${index}`}
                  className="absolute right-4 bottom-0 left-4 h-0.5 origin-left rounded-full"
                  style={{ background: BRAND }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: STEP_SECONDS, ease: "linear" }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id="tour-panel" aria-labelledby={`tour-tab-${id}`} className="min-w-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.p
            key={id}
            className="m-0 mb-4 hidden text-meta text-muted max-nav:block"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: animate ? 0.25 : 0 }}
          >
            {copy.steps[id].text}
          </motion.p>
        </AnimatePresence>
        <Browser domain={copy.domain}>
          <AnimatePresence initial={false}>
            <motion.div
              key={`${id}-${run}`}
              className="absolute inset-0"
              initial={animate ? { opacity: 0, scale: 0.985 } : false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: animate ? 0.35 : 0, ease }}
            >
              {id === "design" && <DesignScene copy={copy} animate={animate} />}
              {id === "speed" && <SpeedScene copy={copy} animate={animate} />}
              {id === "enquiry" && <EnquiryScene copy={copy} animate={animate} />}
              {id === "care" && <CareScene copy={copy} animate={animate} />}
            </motion.div>
          </AnimatePresence>
        </Browser>
      </div>
    </div>
  );
}

function Browser({ domain, children }: { domain: string; children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-[1.125rem] bg-white shadow-[0_0_0_1px_rgb(0_0_0/6%),0_30px_60px_-34px_rgb(20_40_80/55%)]"
    >
      <div className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-2.5">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((dot) => (
            <i key={dot} className="block size-2.5 rounded-full bg-neutral-200" />
          ))}
        </span>
        <span className="mx-auto rounded-full bg-neutral-100 px-4 py-1 text-[11px] text-neutral-500">{domain}</span>
        <span className="w-[42px]" />
      </div>
      <div className="relative h-[23rem] overflow-hidden max-narrow:h-[23rem]">{children}</div>
    </div>
  );
}

// Shared page parts. `t` gives each part its own entrance delay when the scene plays.
function enter(animate: boolean, delay: number, from: { y?: number; x?: number; scale?: number } = { y: 12 }) {
  const transition: Transition = { delay, duration: 0.55, ease };
  return animate
    ? { initial: { opacity: 0, ...from }, animate: { opacity: 1, y: 0, x: 0, scale: 1 }, transition }
    : { initial: false as const };
}

function PageTop({ copy, animate, delay = 0 }: { copy: ServiceTourCopy; animate: boolean; delay?: number }) {
  return (
    <motion.div className="flex items-center justify-between px-6 pt-5" {...enter(animate, delay, { y: -8 })}>
      <span className="flex items-center gap-2 text-[13px] font-bold text-[#1b2430]">
        <i className="block size-4 rounded-[5px]" style={{ background: BRAND }} />
        Mustermann Bäder
      </span>
      <span className="flex items-center gap-5 text-[12px] text-neutral-500 max-narrow:hidden">
        {copy.nav.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </span>
      <Menu className="hidden size-4 text-neutral-700 max-narrow:block" strokeWidth={2} />
    </motion.div>
  );
}

function Tile({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-[14px] ${className}`}
      style={{
        background:
          "linear-gradient(90deg, rgb(255 255 255 / 65%) 1.5px, transparent 1.5px) 0 0 / 20px 20px, linear-gradient(rgb(255 255 255 / 65%) 1.5px, transparent 1.5px) 0 0 / 20px 20px, linear-gradient(140deg, #cfe0f7, #9fbde6 55%, #7fa3d6)",
      }}
    />
  );
}

function DesignScene({ copy, animate }: { copy: ServiceTourCopy; animate: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <PageTop copy={copy} animate={animate} delay={0.1} />
      <div className="grid flex-1 grid-cols-[1.1fr_1fr] gap-6 px-6 pt-6 max-narrow:grid-cols-1">
        <div>
          <motion.p
            className="m-0 text-[26px] leading-[1.08] font-semibold tracking-[-0.025em] text-[#1b2430] max-narrow:text-[22px]"
            {...enter(animate, 0.3)}
          >
            {copy.headline}
          </motion.p>
          <motion.p className="m-0 mt-3 text-[13px] leading-snug text-neutral-500" {...enter(animate, 0.45)}>
            {copy.sub}
          </motion.p>
          <motion.span
            className="mt-4 inline-block rounded-full bg-[#1b2430] px-4 py-2 text-[12px] font-semibold text-white"
            {...enter(animate, 0.6)}
          >
            {copy.cta}
          </motion.span>
        </div>
        <motion.div className="max-narrow:hidden" {...enter(animate, 0.5, { scale: 0.94 })}>
          <Tile className="h-[9.5rem]" />
        </motion.div>
      </div>
      <div className="grid grid-cols-3 gap-3 px-6 pb-6 max-narrow:grid-cols-2">
        {copy.cards.map((card, index) => (
          <motion.div
            key={card}
            className={`rounded-[12px] bg-neutral-50 p-3 shadow-[inset_0_0_0_1px_rgb(0_0_0/5%)] ${index === 2 ? "max-narrow:hidden" : ""}`}
            {...enter(animate, 0.85 + index * 0.12, { y: 16 })}
          >
            <i
              className="mb-2 block h-1.5 w-8 rounded-full"
              style={{ background: BRAND, opacity: 0.25 + index * 0.25 }}
            />
            <span className="text-[12px] font-semibold text-[#1b2430]">{card}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// The marker runs to 1.8 of 6 seconds; the page fills in when it stops.
const SPEED_STOP = 1.8 / 6;

function SpeedScene({ copy, animate }: { copy: ServiceTourCopy; animate: boolean }) {
  const run = { delay: 0.4, duration: 1.5, ease: [0.3, 0, 0.2, 1] as const };
  const loaded = animate ? { delay: run.delay + run.duration, duration: 0.5, ease } : { duration: 0 };
  return (
    <div className="flex h-full flex-col">
      <motion.span
        className="absolute top-0 left-0 h-[3px] origin-left"
        style={{ background: BRAND, width: "100%" }}
        initial={animate ? { scaleX: 0, opacity: 1 } : false}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={animate ? { scaleX: run, opacity: { delay: run.delay + run.duration + 0.2 } } : { duration: 0 }}
      />
      <PageTop copy={copy} animate={false} />
      <div className="relative flex-1 px-6 pt-6">
        {/* Grey placeholders until the marker stops, then the real content fades in over them. */}
        <div className="grid grid-cols-[1.1fr_1fr] gap-6 max-narrow:grid-cols-1">
          <div className="relative">
            <motion.div
              className="grid gap-2.5"
              initial={animate ? { opacity: 1 } : false}
              animate={{ opacity: 0 }}
              transition={loaded}
            >
              <i className="block h-5 w-[85%] rounded-md bg-neutral-100" />
              <i className="block h-5 w-[60%] rounded-md bg-neutral-100" />
              <i className="mt-2 block h-3 w-[90%] rounded bg-neutral-100" />
              <i className="mt-3 block h-8 w-28 rounded-full bg-neutral-100" />
            </motion.div>
            <motion.div
              className="absolute inset-0"
              initial={animate ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={loaded}
            >
              <p className="m-0 text-[26px] leading-[1.08] font-semibold tracking-[-0.025em] text-[#1b2430] max-narrow:text-[22px]">
                {copy.headline}
              </p>
              <span className="mt-4 inline-block rounded-full bg-[#1b2430] px-4 py-2 text-[12px] font-semibold text-white">
                {copy.cta}
              </span>
            </motion.div>
          </div>
          <motion.div
            className="max-narrow:hidden"
            initial={animate ? { opacity: 0.25 } : false}
            animate={{ opacity: 1 }}
            transition={loaded}
          >
            <Tile className="h-[8rem]" />
          </motion.div>
        </div>
      </div>
      <motion.div
        className="mx-6 mb-6 rounded-[14px] bg-white p-4 shadow-[0_0_0_1px_rgb(0_0_0/6%),0_16px_34px_-22px_rgb(0_0_0/35%)]"
        {...enter(animate, 0.15, { y: 20 })}
      >
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-semibold text-[#1b2430]">{copy.speedLabel}</span>
          <motion.span
            className="flex items-center gap-1 font-semibold text-[#26734d]"
            initial={animate ? { opacity: 0, x: -4 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={loaded}
          >
            <Check className="size-3.5" strokeWidth={2.5} />
            {copy.speedReady}
          </motion.span>
        </div>
        <div className="relative mt-3 h-2 rounded-full">
          <div className="absolute inset-0 flex overflow-hidden rounded-full">
            <i className="block h-full bg-[#3fb27f]" style={{ width: `${(2.5 / 6) * 100}%` }} />
            <i className="block h-full bg-[#e8a33a]" style={{ width: `${(1.5 / 6) * 100}%` }} />
            <i className="block h-full flex-1 bg-[#e5484d]" />
          </div>
          <motion.span
            className="absolute top-1/2 -ml-2 block size-4 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#1b2430] shadow"
            initial={animate ? { left: "0%" } : false}
            animate={{ left: `${SPEED_STOP * 100}%` }}
            transition={animate ? run : { duration: 0 }}
          />
        </div>
        <div className="relative mt-2 h-4 text-[10.5px] text-neutral-500">
          <span className="absolute -translate-x-1/2" style={{ left: `${(2.5 / 6) * 100}%` }}>
            {copy.speedGood}
          </span>
          <span className="absolute -translate-x-1/2 max-narrow:hidden" style={{ left: `${(4.4 / 6) * 100}%` }}>
            {copy.speedPoor}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function EnquiryScene({ copy, animate }: { copy: ServiceTourCopy; animate: boolean }) {
  const [sent, setSent] = useState(!animate);
  const fieldStart = 0.45;
  const fieldStep = 0.55;
  const submitAt = fieldStart + copy.formFields.length * fieldStep + 0.25;

  useEffect(() => {
    if (!animate) return;
    const timer = window.setTimeout(() => setSent(true), (submitAt + 0.35) * 1000);
    return () => window.clearTimeout(timer);
  }, [animate, submitAt]);

  return (
    <div className="relative grid h-full place-items-center px-6">
      {/* The page stays visible behind the form, dimmed like a dialog backdrop. */}
      <div className="absolute inset-0 opacity-35">
        <DesignScene copy={copy} animate={false} />
      </div>
      <div className="absolute inset-0 bg-[#1b2430]/[0.07]" />
      <motion.div
        layout
        className="relative w-full max-w-[19rem] overflow-hidden rounded-[18px] bg-white p-5 shadow-[0_0_0_1px_rgb(0_0_0/6%),0_20px_40px_-26px_rgb(0_0_0/40%)]"
        transition={{ layout: { duration: animate ? 0.45 : 0, ease } }}
        {...(animate ? { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } } : {})}
      >
        <div className="grid [&>*]:[grid-area:1/1]">
          <AnimatePresence initial={false}>
            {sent ? (
              <motion.div
                key="sent"
                layout="position"
                className="grid justify-items-center py-6 text-center"
                initial={animate ? { opacity: 0, scale: 0.96 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: animate ? 0.4 : 0, ease }}
              >
                <span className="grid size-12 place-items-center rounded-full bg-[#e9f7ef]">
                  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="#26734d" strokeWidth={2.6}>
                    <motion.path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={animate ? { pathLength: 0 } : false}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: animate ? 0.15 : 0, duration: animate ? 0.45 : 0, ease }}
                    />
                  </svg>
                </span>
                <span className="mt-3 text-[15px] font-semibold text-[#1b2430]">{copy.formSent}</span>
                <span className="mt-1 text-[12px] text-neutral-500">{copy.formSentText}</span>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                layout="position"
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <p className="m-0 text-[15px] font-semibold text-[#1b2430]">{copy.formTitle}</p>
                <div className="mt-4 grid gap-2.5">
                  {copy.formFields.map((field, index) => (
                    <label key={field.label} className="grid gap-1 text-[11px] text-neutral-500">
                      {field.label}
                      <span className="relative block h-9 rounded-[10px] bg-neutral-50 px-3 text-[13px] leading-9 text-[#1b2430] shadow-[inset_0_0_0_1px_rgb(0_0_0/8%)]">
                        <motion.span
                          className="block overflow-hidden whitespace-nowrap"
                          initial={{ clipPath: "inset(0 100% 0 0)" }}
                          animate={{ clipPath: "inset(0 0% 0 0)" }}
                          transition={{ delay: fieldStart + index * fieldStep, duration: 0.45, ease: "linear" }}
                        >
                          {field.value}
                        </motion.span>
                      </span>
                    </label>
                  ))}
                </div>
                <motion.span
                  className="mt-4 block rounded-full bg-[#1b2430] py-2.5 text-center text-[12.5px] font-semibold text-white"
                  animate={{ scale: [1, 0.95, 1] }}
                  transition={{ delay: submitAt, duration: 0.3, times: [0, 0.5, 1] }}
                >
                  {copy.formSubmit}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function CareScene({ copy, animate }: { copy: ServiceTourCopy; animate: boolean }) {
  const [changed, setChanged] = useState(!animate);
  const [saved, setSaved] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const change = window.setTimeout(() => setChanged(true), 1500);
    const save = window.setTimeout(() => setSaved(true), 2500);
    return () => {
      window.clearTimeout(change);
      window.clearTimeout(save);
    };
  }, [animate]);

  const swap = { duration: animate ? 0.35 : 0, ease };
  return (
    <div className="relative flex h-full flex-col">
      <PageTop copy={copy} animate={false} />
      <div className="px-6 pt-6">
        <p className="m-0 text-[26px] leading-[1.08] font-semibold tracking-[-0.025em] text-[#1b2430] max-narrow:text-[22px]">
          {copy.headline}
        </p>
        <p className="m-0 mt-4 flex flex-wrap items-baseline gap-x-2 text-[13px] text-neutral-500">
          <b className="font-semibold text-[#1b2430]">{copy.careLabel}</b>
          <motion.span
            className="relative rounded px-1 max-narrow:-ml-1 max-narrow:basis-full"
            animate={
              changed && animate
                ? { backgroundColor: ["rgb(233 247 239 / 0%)", "#e9f7ef", "rgb(233 247 239 / 0%)"] }
                : {}
            }
            transition={{ duration: 1.4, times: [0, 0.2, 1] }}
          >
            <span className="inline-grid align-bottom [&>*]:[grid-area:1/1]">
              <AnimatePresence initial={false}>
                <motion.span
                  key={changed ? "after" : "before"}
                  className="inline-block whitespace-nowrap"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={swap}
                >
                  {changed ? copy.careAfter : copy.careBefore}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.span>
        </p>
      </div>
      <motion.div
        className="mx-6 mt-6 max-w-[22rem] rounded-[14px] bg-white p-4 shadow-[0_0_0_1px_rgb(0_0_0/6%),0_20px_40px_-26px_rgb(0_0_0/40%)]"
        {...enter(animate, 0.3, { y: 18 })}
      >
        <span className="flex items-center gap-2 text-[12px] font-semibold text-[#1b2430]">
          <PencilLine className="size-3.5" strokeWidth={2} style={{ color: BRAND }} />
          {copy.careLabel}
        </span>
        <span className="mt-2.5 block h-10 overflow-hidden rounded-[10px] bg-neutral-50 px-3 text-[13px] leading-10 text-[#1b2430] shadow-[inset_0_0_0_2px_rgb(36_91_184/55%)]">
          <div className="grid [&>*]:[grid-area:1/1]">
            <AnimatePresence initial={false}>
              <motion.span
                key={changed ? "after" : "before"}
                className="block truncate"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={swap}
              >
                {changed ? copy.careAfter : copy.careBefore}
              </motion.span>
            </AnimatePresence>
          </div>
        </span>
      </motion.div>
      <AnimatePresence>
        {saved && (
          <motion.span
            className="absolute right-6 bottom-6 flex items-center gap-1.5 rounded-full bg-[#1b2430] px-4 py-2 text-[12px] font-semibold whitespace-nowrap text-white max-narrow:right-4 max-narrow:bottom-4"
            initial={animate ? { opacity: 0, y: 14 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: animate ? 0.5 : 0, bounce: 0.25 }}
          >
            <Check className="size-3.5" strokeWidth={2.5} />
            {copy.careSaved}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
