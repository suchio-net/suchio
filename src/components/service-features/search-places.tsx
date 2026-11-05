import { Globe, MapPin, Navigation, Phone, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { OFFER_EASE_OUT } from "@/components/offer-animations/motion-tokens";
import { useHydratedReducedMotion } from "@/components/offer-animations/use-hydrated-reduced-motion";
import { useHydrated } from "@/components/use-hydrated";
import type { SearchPlace, SearchPlacesCopy } from "@/i18n/service-features";

// One page, three places it appears. The tour shows each place once; a line runs from the part of the
// page that place reads to what the visitor sees there.
const PLACES: SearchPlace[] = ["google", "maps", "ai"];
const PLACE_SECONDS = 4.2;
const GREEN = "#26734d";
const ease = OFFER_EASE_OUT;
const actionIcons = [Navigation, Phone, Globe] as const;

export function SearchPlaces({ copy }: { copy: SearchPlacesCopy }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const partRefs = useRef<Partial<Record<SearchPlace, HTMLDivElement | null>>>({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(rootRef, { once: true, amount: 0.4 });
  const hydrated = useHydrated();
  const noMotion = useHydratedReducedMotion();
  const animate = hydrated && !noMotion;
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  // The cycle starts once the section is in view and stops for good when a visitor picks a place.
  const touring = animate && inView && !stopped;
  const [path, setPath] = useState<string | null>(null);
  const place = PLACES[active]!;

  useEffect(() => {
    if (!touring) return;
    if (active === PLACES.length - 1) {
      const stop = window.setTimeout(() => setStopped(true), PLACE_SECONDS * 1000);
      return () => window.clearTimeout(stop);
    }
    const next = window.setTimeout(() => setActive((index) => index + 1), PLACE_SECONDS * 1000);
    return () => window.clearTimeout(next);
  }, [active, touring]);

  // The line starts at the right edge of the marked part and ends at the left edge of the result card.
  const measure = useCallback(() => {
    const root = rootRef.current;
    const part = partRefs.current[place];
    const result = resultRef.current;
    if (!root || !part || !result || result.offsetParent === null) return setPath(null);
    const box = root.getBoundingClientRect();
    const from = part.getBoundingClientRect();
    const to = result.getBoundingClientRect();
    if (to.left < from.right) return setPath(null);
    const x1 = from.right - box.left + 6;
    const y1 = from.top + from.height / 2 - box.top;
    const x2 = to.left - box.left - 6;
    const y2 = to.top + 36 - box.top;
    const bend = (x2 - x1) / 2;
    setPath(`M${x1} ${y1} C${x1 + bend} ${y1} ${x2 - bend} ${y2} ${x2} ${y2}`);
  }, [place]);

  useLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [measure]);

  const choose = (index: number, focus = false) => {
    setStopped(true);
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  };
  const onKey = (event: KeyboardEvent, index: number) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    choose((index + step + PLACES.length) % PLACES.length, true);
  };

  const part = (id: SearchPlace | null, className: string, children: React.ReactNode) => {
    const lit = id === place;
    return (
      <motion.div
        ref={(element) => {
          if (id) partRefs.current[id] = element;
        }}
        className={`relative rounded-[12px] px-3 py-2.5 ${className}`}
        initial={false}
        animate={{ opacity: id === null || lit ? 1 : 0.4 }}
        transition={{ duration: animate ? 0.4 : 0, ease }}
      >
        {lit && (
          <motion.span
            layoutId="seo-mark"
            className="absolute inset-0 rounded-[12px]"
            style={{ background: "#f1faf4", boxShadow: `inset 0 0 0 2px ${GREEN}` }}
            transition={{ type: "spring", duration: animate ? 0.55 : 0, bounce: 0.12 }}
          />
        )}
        <div className="relative grid gap-0.5">{children}</div>
      </motion.div>
    );
  };

  return (
    <div
      ref={rootRef}
      data-feature="seo"
      className="relative grid grid-cols-2 gap-14 rounded-[1.75rem] bg-service-search-bg p-10 max-nav:grid-cols-1 max-nav:gap-6 max-nav:p-4"
    >
      <svg
        className="pointer-events-none absolute inset-0 size-full overflow-visible max-nav:hidden"
        aria-hidden="true"
      >
        <AnimatePresence>
          {path && (
            <motion.path
              key={`${place}-${path}`}
              d={path}
              fill="none"
              stroke={GREEN}
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="1 0"
              initial={animate ? { pathLength: 0, opacity: 1 } : false}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: animate ? 0.25 : 0, duration: animate ? 0.6 : 0, ease }}
            />
          )}
        </AnimatePresence>
      </svg>

      <div
        aria-hidden="true"
        className="grid content-start gap-2 rounded-[1.25rem] bg-white p-3.5 text-[12.5px] leading-[1.45] text-ink shadow-[0_0_0_1px_rgb(0_0_0/5%),0_18px_40px_-24px_rgb(38_115_77/45%)]"
      >
        <span className="max-w-full justify-self-center truncate rounded-full bg-neutral-100 px-3 py-1 text-[11px] text-neutral-500">
          {copy.domainPath}
        </span>
        {part(
          "google",
          "shadow-[inset_0_0_0_1px_rgb(0_0_0/7%)]",
          <>
            <small className="text-[11px] text-neutral-400">{copy.forSearch}</small>
            <b className="font-medium text-[#1a0dab]">{copy.seoTitle}</b>
            <span>{copy.seoDescription}</span>
          </>,
        )}
        {part(
          null,
          "",
          <>
            <span className="text-[19px] font-semibold tracking-[-0.015em]">{copy.pageTitle}</span>
            <span className="text-muted">{copy.pageCopy}</span>
          </>,
        )}
        {part(
          "maps",
          "shadow-[inset_0_0_0_1px_rgb(0_0_0/7%)]",
          <>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0" strokeWidth={2} />
              {copy.address}
            </span>
            <span className="text-neutral-500">{copy.hours}</span>
          </>,
        )}
        {part(
          "ai",
          "shadow-[inset_0_0_0_1px_rgb(0_0_0/7%)]",
          <>
            <b className="font-semibold">{copy.faqQuestion}</b>
            <span>{copy.faqAnswer}</span>
          </>,
        )}
      </div>

      <div className="min-w-0">
        <div
          role="tablist"
          aria-label={copy.tabsLabel}
          className="relative grid w-fit max-w-full grid-cols-3 gap-1 rounded-full bg-white/70 p-1 shadow-[inset_0_0_0_1px_rgb(38_115_77/14%)] max-narrow:w-full max-narrow:grid-cols-[auto_auto_auto]"
        >
          {PLACES.map((id, index) => {
            const selected = index === active;
            return (
              <button
                key={id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`seo-tab-${id}`}
                aria-selected={selected}
                aria-controls="seo-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => choose(index)}
                onKeyDown={(event) => onKey(event, index)}
                className={`relative overflow-hidden rounded-full px-4 py-2 text-meta font-semibold whitespace-nowrap transition-colors duration-200 max-narrow:px-1.5 max-narrow:text-[12.5px] max-narrow:leading-tight max-narrow:whitespace-normal ${selected ? "text-white" : "text-muted hover:text-ink"}`}
              >
                {selected && (
                  <motion.span
                    layoutId="seo-tab"
                    className="absolute inset-0 rounded-full"
                    style={{ background: GREEN }}
                    transition={{ type: "spring", duration: animate ? 0.45 : 0, bounce: 0.15 }}
                  />
                )}
                {/* A non-breaking hyphen keeps "Google-Suche" on one line when the tabs wrap on phones. */}
                <span className="relative">{copy.places[id].label.replaceAll("-", "‑")}</span>
                {selected && touring && (
                  <motion.span
                    key={`progress-${index}`}
                    className="absolute right-3 bottom-1 left-3 h-0.5 origin-left rounded-full bg-white/70"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: PLACE_SECONDS, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id="seo-panel" aria-labelledby={`seo-tab-${place}`} className="mt-5">
          <motion.div
            ref={resultRef}
            layout
            aria-hidden="true"
            className="relative overflow-hidden rounded-[1.25rem] bg-white text-[12.5px] leading-[1.45] text-ink shadow-[0_0_0_1px_rgb(0_0_0/5%),0_18px_40px_-24px_rgb(38_115_77/45%)]"
            transition={{ layout: { duration: animate ? 0.45 : 0, ease } }}
          >
            <div className="grid [&>*]:[grid-area:1/1]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={place}
                  layout="position"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: animate ? 0.35 : 0, ease }}
                >
                  {place === "google" && <GoogleResult copy={copy} />}
                  {place === "maps" && <MapsResult copy={copy} animate={animate} />}
                  {place === "ai" && <AiResult copy={copy} animate={animate} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={place}
              className="m-0 mt-5 text-base/6 text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: animate ? 0.25 : 0 }}
            >
              {copy.places[place].explain}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function GoogleResult({ copy }: { copy: SearchPlacesCopy }) {
  return (
    <div className="grid gap-1 p-5">
      <span className="flex min-w-0 items-center gap-2">
        <i className="grid size-[26px] shrink-0 place-items-center rounded-full bg-[#eaf2ff] text-[12px] font-bold text-[#245bb8] not-italic">
          M
        </i>
        <span className="min-w-0">
          <b className="block truncate font-semibold">Mustermann Bäder</b>
          <small className="block truncate text-[11.5px] text-neutral-500">{copy.domainPath.replace("/", " › ")}</small>
        </span>
      </span>
      <span className="mt-1.5 text-[17px] leading-snug text-[#1a0dab]">{copy.seoTitle}</span>
      <span className="text-[#4d5156]">{copy.seoDescription}</span>
    </div>
  );
}

function MapsResult({ copy, animate }: { copy: SearchPlacesCopy; animate: boolean }) {
  return (
    <div>
      <div
        className="relative h-[7.5rem]"
        style={{
          background:
            "linear-gradient(28deg, transparent 47%, white 47%, white 53%, transparent 53%), linear-gradient(118deg, transparent 62%, white 62%, white 66%, transparent 66%), linear-gradient(90deg, transparent 30%, #fff 30%, #fff 33%, transparent 33%), radial-gradient(circle at 78% 30%, #cfe8d6 0 18%, transparent 19%), #ecebe4",
        }}
      >
        <motion.span
          className="absolute top-[38%] left-[48%] grid size-[30px] place-items-center rounded-[50%_50%_50%_0] bg-[#d93025] text-white"
          style={{ rotate: -45, x: "-50%", y: "-50%" }}
          initial={animate ? { y: "-160%", opacity: 0 } : false}
          animate={{ y: "-50%", opacity: 1 }}
          transition={{ delay: animate ? 0.3 : 0, type: "spring", duration: animate ? 0.6 : 0, bounce: 0.4 }}
        >
          <MapPin className="size-4 rotate-45" strokeWidth={2.2} />
        </motion.span>
      </div>
      <div className="p-4">
        <b className="block text-[14px] font-semibold">Mustermann Bäder</b>
        <small className="block text-[11.5px] text-neutral-500">{copy.mapsCategory}</small>
        <small className="block text-[11.5px]" style={{ color: GREEN }}>
          {copy.mapsOpen}
        </small>
        <span className="mt-3 flex flex-wrap gap-1.5">
          {copy.mapsActions.map((action, index) => {
            const Icon = actionIcons[index]!;
            return (
              <span
                key={action}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold text-[#1a5fb4] shadow-[inset_0_0_0_1px_rgb(0_0_0/10%)]"
              >
                <Icon className="size-3.5" strokeWidth={2} />
                {action}
              </span>
            );
          })}
        </span>
        <small className="mt-3 block text-[11.5px] text-neutral-500">{copy.address}</small>
      </div>
    </div>
  );
}

function AiResult({ copy, animate }: { copy: SearchPlacesCopy; animate: boolean }) {
  const words = copy.aiAnswer.split(" ");
  return (
    <div className="grid gap-3 p-4">
      <span className="max-w-[85%] justify-self-end rounded-[16px_16px_4px_16px] bg-neutral-100 px-3 py-2">
        {copy.aiQuestion}
      </span>
      <span className="flex gap-2.5 text-[13.5px]">
        <Sparkles className="size-4 shrink-0" strokeWidth={2} style={{ color: GREEN }} />
        <span className="min-w-0">
          {/* The answer streams in word by word, the way assistants write. */}
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={animate ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ delay: animate ? 0.35 + index * 0.045 : 0, duration: 0.2 }}
            >
              {word}{" "}
            </motion.span>
          ))}
          <motion.span
            className="ml-1 inline-block rounded-full bg-[#e9f7ef] px-2 py-px text-[11px] font-semibold"
            style={{ color: GREEN }}
            initial={animate ? { opacity: 0, scale: 0.8 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: animate ? 0.45 + words.length * 0.045 : 0, type: "spring", duration: 0.4 }}
          >
            mustermann-baeder.de
          </motion.span>
        </span>
      </span>
    </div>
  );
}
