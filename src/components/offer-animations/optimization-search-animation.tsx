import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowUp, LoaderCircle, Sparkles, Star } from "lucide-react";
import { useEffect, useRef, type CSSProperties } from "react";
import { FLAT_FILL, STAGE_BOX, stageStyle, useStage } from "@/components/offer-animations/stage";
import type { OptimizationAnimationCopy } from "@/i18n/services";

gsap.registerPlugin(SplitText);

const ROWS = 3;
const ROW = 50;
const EXPAND = 18;
const BRAND = "Suchio";
const COMPETITORS = [
  { name: "Nova Growth", site: "novagrowth.co" },
  { name: "Brightline Digital", site: "brightline.digital" },
  { name: "Ascend Lab", site: "ascendlab.co" },
  { name: "Northstar Digital", site: "northstar.digital" },
  { name: "Signal House", site: "signalhouse.io" },
  { name: "Orbit Studio", site: "orbit.studio" },
  { name: "Growthline", site: "growthline.co" },
  { name: "Peak & Co.", site: "peakandco.com" },
  { name: "Kindred Digital", site: "kindred.digital" },
] as const;
// The result after Suchio's starting place, so the list runs on into the space reserved for the landing pop.
const NEXT = { name: "Bluebird Media", site: "bluebird.media" } as const;
// Suchio starts at the last visible place and rises to the top while the results stream past beneath it.
const START_RANK = COMPETITORS.length + 1;
const CLIMB_SECONDS = 1.2;
const SURFACE = "rounded-[14px] bg-white shadow-[0_0_0_1px_rgb(0_0_0/6%),0_12px_26px_-16px_rgb(0_0_0/28%)]";

export function OptimizationSearchAnimation({ copy }: { copy: OptimizationAnimationCopy }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { mode, scale } = useStage(containerRef);
  const rows = ROWS;

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    let context: gsap.Context | undefined;
    let cancelled = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const play = async () => {
      // Split only after the brand font is in place so word boxes match the final layout.
      await document.fonts.ready;
      if (cancelled) return;
      context = gsap.context(() => {
        const list = stage.querySelector<HTMLElement>("[data-seo-list]")!;
        const brandRow = stage.querySelector<HTMLElement>("[data-seo-brand]")!;
        const brandRank = brandRow.querySelector<HTMLElement>("[data-seo-rank]")!;
        const rank = { value: START_RANK };
        const showRank = () => (brandRank.textContent = String(Math.round(rank.value)));
        const landedRank = { backgroundColor: "#171717", color: "#ffffff" };

        if (reducedMotion) {
          brandRank.textContent = "1";
          gsap.set("[data-seo-reveal]", { autoAlpha: 1 });
          gsap.set(["[data-seo-thinking]", "[data-seo-searching]"], { autoAlpha: 0 });
          gsap.set("[data-seo-answer-label]", { autoAlpha: 1 });
          gsap.set("[data-seo-highlight]", { scaleX: 1 });
          gsap.set(list, { y: EXPAND });
          gsap.set(brandRow, { height: ROW + EXPAND });
          gsap.set(brandRank, landedRank);
          return;
        }

        gsap.set(list, { y: -(START_RANK - rows) * ROW });
        gsap.set(brandRow, { y: (rows - 1) * ROW });
        gsap.set(["[data-seo-rating]", "[data-seo-climbed]"], { autoAlpha: 0 });
        showRank();
        const answer = SplitText.create("[data-seo-answer-text]", {
          type: "words",
          aria: "none",
          ignore: "[data-seo-chip]",
        });

        // The shimmer and spinner run on their own clock until the answer replaces them.
        const thinking = gsap.fromTo(
          "[data-seo-thinking]",
          { backgroundPosition: "200% 0" },
          { backgroundPosition: "-100% 0", duration: 1, ease: "none", repeat: -1 },
        );
        const spinner = gsap.to("[data-seo-spinner]", { rotate: 360, duration: 0.8, ease: "none", repeat: -1 });

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .set("[data-seo-reveal]", { autoAlpha: 1 })
          // The question arrives as a sent chat message.
          .from("[data-seo-message]", {
            y: 10,
            scale: 0.9,
            autoAlpha: 0,
            transformOrigin: "100% 100%",
            duration: 0.45,
            ease: "back.out(1.8)",
          })
          .from("[data-seo-overview]", { y: 8, autoAlpha: 0, duration: 0.4 }, "+=0.05")
          .from("[data-seo-results-label]", { autoAlpha: 0, duration: 0.3 }, "<0.15")
          .from("[data-seo-results]", { autoAlpha: 0, y: 6, duration: 0.35 }, "<0.05")
          // One continuous rise: the list scrolls down past Suchio while its row lifts to the top.
          .addLabel("climb", "+=0.1")
          .to(list, { y: 0, duration: CLIMB_SECONDS, ease: "expo.inOut" }, "climb")
          .to(brandRow, { y: 0, duration: CLIMB_SECONDS, ease: "expo.inOut" }, "climb")
          .to(rank, { value: 1, duration: CLIMB_SECONDS, ease: "expo.inOut", onUpdate: showRank }, "climb")
          // The landing pop: Suchio's row opens to show its rating and pushes every result beneath it down.
          .addLabel("land")
          .to(brandRow, { height: ROW + EXPAND, duration: 0.55, ease: "back.out(2.2)" }, "land")
          .to(list, { y: EXPAND, duration: 0.55, ease: "back.out(2.2)" }, "land")
          .to(brandRank, { ...landedRank, duration: 0.3 }, "land")
          .to("[data-seo-climbed]", { autoAlpha: 1, duration: 0.3 }, "land+=0.1")
          .to("[data-seo-rating]", { autoAlpha: 1, duration: 0.3 }, "land+=0.15")
          .from("[data-seo-star]", { scale: 0, duration: 0.35, stagger: 0.04, ease: "back.out(3)" }, "<")
          // With the search done, the AI writes its answer and cites Suchio.
          .to("[data-seo-searching]", { autoAlpha: 0, duration: 0.2 }, "land+=0.2")
          .to("[data-seo-answer-label]", { autoAlpha: 1, duration: 0.2 }, ">")
          .to(
            "[data-seo-thinking]",
            {
              autoAlpha: 0,
              duration: 0.3,
              onComplete: () => {
                thinking.kill();
                spinner.kill();
              },
            },
            "<",
          )
          .from(answer.words, { autoAlpha: 0, y: 3, filter: "blur(4px)", duration: 0.35, stagger: 0.014 }, "<0.05")
          .to("[data-seo-highlight]", { scaleX: 1, duration: 0.45, ease: "power2.inOut" }, "-=0.7")
          .from("[data-seo-chip]", { scale: 0, autoAlpha: 0, duration: 0.35, ease: "back.out(3)" }, "<0.15");
      }, stage);
    };

    if (reducedMotion || !("IntersectionObserver" in window)) {
      void play();
      return () => {
        cancelled = true;
        context?.revert();
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        void play();
      },
      { threshold: 0.4 },
    );
    observer.observe(container);
    return () => {
      cancelled = true;
      observer.disconnect();
      context?.revert();
    };
  }, [mode, rows]);

  const narrow = mode === "narrow";

  return (
    <div ref={containerRef} data-seo-answer-scene className="relative size-full min-h-0 select-none">
      <div ref={stageRef} className="absolute top-1/2 left-1/2" style={stageStyle(STAGE_BOX[mode], scale * FLAT_FILL)}>
        {/* The question, the AI working through search results, and its answer, centred as one block. */}
        <div data-seo-reveal className="invisible flex size-full flex-col justify-center">
          <div className="flex justify-end">
            <span
              data-seo-message
              className={`max-w-[88%] rounded-[16px] rounded-br-[5px] bg-neutral-900 px-3.5 py-2 leading-[1.4] text-white ${narrow ? "text-[13.5px]" : "text-[14px]"}`}
            >
              {copy.question}
            </span>
          </div>

          <div data-seo-overview className={`mt-3 px-3.5 py-3 ${SURFACE}`}>
            <div className="relative flex h-5 items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-[conic-gradient(from_200deg,#0a6cff,#36c08a,#ffcf5a,#0a6cff)] text-white">
                <Sparkles className="size-3" strokeWidth={2} aria-hidden="true" />
              </span>
              <span data-seo-searching className="flex items-center gap-1.5 text-[12px] font-medium text-neutral-600">
                <LoaderCircle data-seo-spinner className="size-3" strokeWidth={2.4} aria-hidden="true" />
                {copy.searching}
              </span>
              <span
                data-seo-answer-label
                className="invisible absolute left-7 text-[12px] font-medium text-neutral-600 opacity-0"
              >
                {copy.answerLabel}
              </span>
            </div>
            <div className="relative mt-2">
              <div data-seo-thinking className="absolute inset-x-0 top-1 grid gap-2" aria-hidden="true">
                {["100%", "94%", "58%"].map((width) => (
                  <span
                    key={width}
                    className="block h-[10px] rounded-full"
                    style={{
                      width,
                      backgroundImage:
                        "linear-gradient(100deg, rgb(0 0 0 / 5%) 30%, rgb(0 0 0 / 12%) 50%, rgb(0 0 0 / 5%) 70%)",
                      backgroundSize: "200% 100%",
                      backgroundPosition: "inherit",
                    }}
                  />
                ))}
              </div>
              <p
                data-seo-answer-text
                className={`m-0 leading-[1.5] text-pretty text-neutral-800 ${narrow ? "text-[13px]" : "text-[14px]"}`}
              >
                {copy.answerBefore}
                <span className="whitespace-nowrap">
                  <span className="relative inline-block font-semibold text-neutral-950">
                    <span
                      data-seo-highlight
                      className="absolute inset-x-[-3px] inset-y-[2px] origin-left rounded-[4px] bg-[#fff1c2]"
                      style={{ transform: "scaleX(0)" }}
                      aria-hidden="true"
                    />
                    <span className="relative">{BRAND}</span>
                  </span>
                  <span
                    data-seo-chip
                    className="relative -top-[0.45em] ml-0.5 inline-flex size-[14px] items-center justify-center rounded-full bg-neutral-900 align-baseline font-mono text-[8px] leading-none font-semibold text-white"
                  >
                    1
                  </span>
                </span>
                {copy.answerAfter}
              </p>
            </div>
          </div>

          <span
            data-seo-results-label
            className={`block px-1 text-[12px] font-medium text-neutral-600 ${narrow ? "mt-2.5" : "mt-4"}`}
          >
            {copy.resultsLabel}
          </span>
          {/* The height reserves room for the landing pop, so the block never changes size. */}
          <div
            data-seo-results
            className={`relative mt-1.5 shrink-0 overflow-hidden ${SURFACE}`}
            style={{ height: rows * ROW + EXPAND }}
          >
            <div data-seo-list className="absolute inset-x-0 top-0">
              {COMPETITORS.map((result, index) => (
                <Result
                  key={result.site}
                  rank={index + 1}
                  name={result.name}
                  site={result.site}
                  description={copy.descriptions[index % copy.descriptions.length]!}
                  style={{ transform: `translateY(${index * ROW}px)` }}
                />
              ))}
              <Result
                rank={START_RANK + 1}
                name={NEXT.name}
                site={NEXT.site}
                description={copy.descriptions[0]!}
                style={{ transform: `translateY(${START_RANK * ROW}px)` }}
              />
            </div>
            <BrandResult copy={copy} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Result({
  rank,
  name,
  site,
  description,
  style,
}: {
  rank: number;
  name: string;
  site: string;
  description: string;
  style: CSSProperties;
}) {
  return (
    <div
      className="absolute inset-x-0 top-0 grid h-[50px] grid-cols-[minmax(0,1fr)_24px] items-center gap-3 border-t border-neutral-100 px-3"
      style={style}
    >
      <ResultText name={name} site={site} description={description} />
      <span className="flex size-6 items-center justify-center rounded-full bg-neutral-100 font-mono text-[10px] leading-none font-medium text-neutral-400 tabular-nums">
        {rank}
      </span>
    </div>
  );
}

// Suchio's result keeps a plain outline throughout, so nothing is clipped while it moves.
function BrandResult({ copy }: { copy: OptimizationAnimationCopy }) {
  return (
    <div
      data-seo-brand
      className="absolute inset-x-0 top-0 z-10 overflow-hidden rounded-[14px] bg-white shadow-[inset_0_0_0_1px_rgb(0_0_0/12%)]"
      style={{ height: ROW }}
    >
      <div className="grid h-[50px] grid-cols-[minmax(0,1fr)_24px] items-center gap-3 px-3">
        <ResultText name={BRAND} site="suchio.net" description={copy.winnerDescription} climbed={START_RANK - 1} />
        <span
          data-seo-rank
          className="flex size-6 items-center justify-center rounded-full bg-neutral-100 font-mono text-[10px] leading-none font-semibold text-neutral-600 tabular-nums"
        />
      </div>
      <div data-seo-rating className="-mt-1 flex items-center gap-1 px-3 text-[12px] leading-none">
        <span className="flex gap-px text-[#f2a90d]">
          {[0, 1, 2, 3, 4].map((star) => (
            <Star key={star} data-seo-star className="size-2.5 fill-current" strokeWidth={0} aria-hidden="true" />
          ))}
        </span>
        <span className="font-semibold text-neutral-800">5.0</span>
      </div>
    </div>
  );
}

function ResultText({
  name,
  site,
  description,
  climbed,
}: {
  name: string;
  site: string;
  description: string;
  climbed?: number;
}) {
  return (
    <span className="min-w-0 leading-tight">
      <span className="flex min-w-0 items-baseline gap-2">
        <span className={`truncate text-[13px] font-semibold ${climbed ? "text-neutral-900" : "text-neutral-600"}`}>
          {name}
        </span>
        <span className="min-w-0 truncate text-[12px] text-neutral-600">{site}</span>
        {climbed ? (
          <span
            data-seo-climbed
            className="flex items-center gap-0.5 self-center font-mono text-[10px] leading-none font-semibold text-[#1f7a4f]"
          >
            <ArrowUp className="size-2.5" strokeWidth={2.6} aria-hidden="true" />
            {climbed}
          </span>
        ) : null}
      </span>
      <span className="mt-[3px] block truncate text-[12px] text-neutral-600">{description}</span>
    </span>
  );
}
