import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { GoogleAdsLogo, LinkedInLogo, MetaLogo } from "@/components/offer-animations/brand-logos";
import { OFFER_EASE_OUT, OFFER_VIEWPORT } from "@/components/offer-animations/motion-tokens";
import { FLAT_FILL, STAGE_BOX, stageStyle, useStage } from "@/components/offer-animations/stage";
import { useHydratedReducedMotion } from "@/components/offer-animations/use-hydrated-reduced-motion";
import { DELTA_PILL, Widget } from "@/components/offer-animations/widget";
import type { CampaignAnimationCopy } from "@/i18n/services";
import type { Locale } from "@/lib/i18n";

// Weekly qualified inquiries; each campaign change lifts the bars a little more. The last bar is this week.
const WEEKS = [5, 6, 7, 8, 11, 13, 15, 18, 23, 26, 31, 36] as const;
const MAX = Math.max(...WEEKS);
const TOTAL = 286;
const GROWTH = 0.67;
const COST = 18.4;
const COST_CHANGE = -0.32;
// Ads covers search and social, so the channels name both.
const CHANNELS = [
  { name: "Google Ads", share: 0.58, Logo: GoogleAdsLogo },
  { name: "Meta", share: 0.29, Logo: MetaLogo },
  { name: "LinkedIn", share: 0.13, Logo: LinkedInLogo },
] as const;
const ACCENT = "#0a6cf5";
const BAR_IDLE = "#dbe6f8";
const BARS_START = 0.3;
const BAR_STAGGER = 0.07;
const BAR_SECONDS = 0.55;
const DRAW_SECONDS = BAR_STAGGER * (WEEKS.length - 1) + BAR_SECONDS;

export function CampaignGrowthAnimation({ locale, copy }: { locale: Locale; copy: CampaignAnimationCopy }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, OFFER_VIEWPORT);
  const noMotion = useHydratedReducedMotion();
  const { mode, scale } = useStage(containerRef);
  const narrow = mode === "narrow";
  const stage = STAGE_BOX[mode];
  const visible = noMotion || isInView;
  const [drawn, setDrawn] = useState(false);
  const finished = noMotion || drawn;
  const progress = useMotionValue(0);
  const formats = useMemo(
    () => ({
      count: new Intl.NumberFormat(locale),
      share: new Intl.NumberFormat(locale, { style: "percent" }),
      change: new Intl.NumberFormat(locale, { style: "percent", signDisplay: "exceptZero" }),
      cost: new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }),
    }),
    [locale],
  );
  const count = useTransform(progress, (value) => formats.count.format(Math.round(TOTAL * value ** 1.6)));

  // The total counts up while the bars rise, so both finish together.
  useEffect(() => {
    if (noMotion) {
      progress.set(1);
      return;
    }
    if (!isInView) return;
    const controls = animate(progress, 1, { duration: DRAW_SECONDS, delay: BARS_START, ease: [0.45, 0, 0.25, 1] });
    void controls.then(() => setDrawn(true));
    return () => controls.stop();
  }, [isInView, noMotion, progress]);

  const pop = (show: boolean, delay = 0) => ({
    initial: false as const,
    animate: { opacity: show ? 1 : 0, y: show ? 0 : 4 },
    transition: { duration: noMotion ? 0 : 0.35, delay: noMotion ? 0 : delay, ease: OFFER_EASE_OUT },
  });

  return (
    <div ref={containerRef} data-campaign-chart className="relative size-full min-h-0 select-none">
      <div className="absolute top-1/2 left-1/2 flex items-center" style={stageStyle(stage, scale * FLAT_FILL)}>
        <div className={`grid w-full ${narrow ? "grid-cols-2 gap-x-3 gap-y-3.5" : "grid-cols-[276px_1fr] gap-4"}`}>
          <Widget
            label={copy.period}
            className={narrow ? "p-4" : "p-5"}
            style={narrow ? { gridColumn: "1 / -1" } : undefined}
            visible={visible}
            delay={0}
          >
            <div className="flex items-center gap-2.5">
              <motion.span
                data-campaign-metric
                className={`${narrow ? "text-[44px]" : "text-[56px]"} leading-none font-light tracking-[-0.045em] text-neutral-900 tabular-nums`}
              >
                {count}
              </motion.span>
              <motion.span className={DELTA_PILL} {...pop(finished)}>
                {formats.change.format(GROWTH)}
              </motion.span>
            </div>
            <span className="mt-1.5 block text-[13px] text-neutral-500">{copy.metricLabel}</span>

            <div className="mt-4 flex items-end justify-between pt-7" style={{ height: narrow ? 96 : 124 }}>
              {WEEKS.map((value, index) => {
                const current = index === WEEKS.length - 1;
                return (
                  <span key={index} className={`relative flex h-full items-end ${narrow ? "w-[16px]" : "w-[14px]"}`}>
                    <motion.span
                      className="block w-full rounded-[5px]"
                      style={{ background: current ? ACCENT : BAR_IDLE }}
                      initial={false}
                      animate={{ height: visible ? `${(value / MAX) * 100}%` : "0%" }}
                      transition={
                        noMotion
                          ? { duration: 0 }
                          : { duration: BAR_SECONDS, delay: BARS_START + index * BAR_STAGGER, ease: OFFER_EASE_OUT }
                      }
                    />
                    {current ? (
                      <motion.span
                        className="absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 rounded-[6px] bg-neutral-900 px-1.5 py-1 text-[11px] leading-none font-semibold whitespace-nowrap text-white tabular-nums"
                        {...pop(finished, 0.1)}
                      >
                        {value}
                      </motion.span>
                    ) : null}
                  </span>
                );
              })}
            </div>
            <div className="mt-2 flex justify-between text-[11px] leading-none text-neutral-400 tabular-nums">
              <span>{copy.week} 1</span>
              <span>
                {copy.week} {WEEKS.length}
              </span>
            </div>
          </Widget>

          <div className={narrow ? "contents" : "flex flex-col gap-3.5"}>
            <Widget
              label={copy.channels}
              className={narrow ? "p-3" : "px-4 py-3.5"}
              style={narrow ? undefined : { flex: 1 }}
              visible={visible}
              delay={0.1}
            >
              <ul className={`m-0 grid h-full list-none content-between p-0 ${narrow ? "gap-2" : "gap-2.5"}`}>
                {CHANNELS.map((channel, index) => (
                  <motion.li
                    key={channel.name}
                    className={`flex items-center ${narrow ? "gap-2" : "gap-2.5"}`}
                    initial={false}
                    animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -6 }}
                    transition={{ duration: noMotion ? 0 : 0.35, delay: noMotion ? 0 : 0.5 + index * 0.1 }}
                  >
                    <span
                      className={`grid shrink-0 place-items-center bg-white shadow-[inset_0_0_0_1px_rgb(0_0_0/8%)] ${narrow ? "size-6 rounded-[7px]" : "size-8 rounded-[9px]"}`}
                    >
                      <channel.Logo className={narrow ? "size-3.5" : "size-[18px]"} />
                    </span>
                    <span className="min-w-0 flex-1 leading-tight">
                      <span
                        className={`block truncate font-semibold text-neutral-900 ${narrow ? "text-[12px]" : "text-[13px]"}`}
                      >
                        {channel.name}
                      </span>
                      {narrow ? null : (
                        <span className="flex items-center gap-1 text-[11px] text-neutral-500">
                          <span className="size-1.5 rounded-full bg-[#1f9d5c]" />
                          {copy.active}
                        </span>
                      )}
                    </span>
                    <span
                      className={`font-medium text-neutral-600 tabular-nums ${narrow ? "text-[12px]" : "text-[13px]"}`}
                    >
                      {formats.share.format(channel.share)}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </Widget>

            <Widget label={copy.cost} className={narrow ? "p-3" : "px-4 py-3.5"} visible={visible} delay={0.2}>
              <span
                className={`block leading-none font-light tracking-[-0.04em] text-neutral-900 tabular-nums ${narrow ? "text-[26px]" : "text-[30px]"}`}
              >
                {formats.cost.format(COST)}
              </span>
              <span className="mt-2.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-neutral-500">
                <motion.span className={DELTA_PILL} {...pop(finished, 0.2)}>
                  {formats.change.format(COST_CHANGE)}
                </motion.span>
                {copy.costNote}
              </span>
            </Widget>
          </div>
        </div>
      </div>
    </div>
  );
}
