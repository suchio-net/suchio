import { ArrowRight, Menu } from "lucide-react";
import {
  motion,
  useAnimate,
  useInView,
  useMotionValue,
  useTransform,
  type AnimationSequence,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef } from "react";
import { OFFER_EASE_IN_OUT, OFFER_EASE_OUT, OFFER_VIEWPORT } from "@/components/offer-animations/motion-tokens";
import { stageStyle, useStage, type StageMode } from "@/components/offer-animations/stage";
import { useHydratedReducedMotion } from "@/components/offer-animations/use-hydrated-reduced-motion";
import type { WebExperienceAnimationCopy } from "@/i18n/services";

// Designed at 1.25× the shared stage box so the page mock keeps fine detail; scaled back down to fit.
const DETAIL = 1.25;

type Frame = { x: number; y: number; width: number; height: number; radius: number };
type Geometry = {
  stage: { width: number; height: number };
  // On phones the desktop window is shown smaller (content scale k) so the whole page still fits.
  desktop: Frame & { k: number };
  phone: Frame;
  finalDesktop: { x: number; y: number; scale: number };
  finalPhone: { x: number; y: number; scale: number };
};

// The page is built in a browser window, the window then narrows into a phone, and finally the desktop
// page returns behind the phone so both layouts stay visible. The end state stays flat: a 3D tilt is
// rasterised as one layer and softens the small type.
const GEOMETRY: Record<StageMode, Geometry> = {
  wide: {
    stage: { width: 600, height: 475 },
    desktop: { x: 60, y: 68, width: 480, height: 340, radius: 12, k: 1 },
    phone: { x: 192, y: 34, width: 216, height: 408, radius: 28 },
    finalDesktop: { x: 8, y: 70, scale: 0.86 },
    finalPhone: { x: 430, y: 120, scale: 0.75 },
  },
  narrow: {
    stage: { width: 400, height: 490 },
    desktop: { x: 10, y: 110, width: 480, height: 340, radius: 12, k: 0.79 },
    phone: { x: 92, y: 41, width: 216, height: 408, radius: 28 },
    finalDesktop: { x: 6, y: 40, scale: 1 },
    finalPhone: { x: 238, y: 150, scale: 0.72 },
  },
};

// Frame-local positions for each layout. Copy is sized in em, so it scales without re-wrapping mid-morph.
const LAYOUT = {
  desktop: {
    brand: { x: 22, y: 42, size: 14 },
    column: { x: 22, y: 80, size: 14, width: 228 },
    image: { x: 266, y: 80, width: 192, height: 164, radius: 10 },
    cards: { y: 290 },
  },
  phone: {
    brand: { x: 16, y: 30, size: 13 },
    column: { x: 16, y: 62, size: 13.5, width: 184 },
    image: { x: 16, y: 294, width: 184, height: 90, radius: 9 },
    cards: { y: 390 },
  },
} as const;

const REVEALS = [
  ["chrome", 0.1],
  ["nav", 0.16],
  ["kicker", 0.22],
  ["headline", 0.27],
  ["intro", 0.34],
  ["image", 0.4],
  ["cta", 0.46],
  ["card-0", 0.52],
  ["card-1", 0.56],
  ["card-2", 0.6],
] as const;

const MORPH_AT = 1.25;
const SETTLE_AT = 2.25;

export function WebExperienceAnimation({ copy }: { copy: WebExperienceAnimationCopy }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mode, scale } = useStage(containerRef);
  return (
    <div ref={containerRef} data-web-experience className="relative size-full min-h-0 select-none">
      {/* Remount per layout so the motion values are rebuilt for the new geometry. */}
      <Scene key={mode} copy={copy} geometry={GEOMETRY[mode]} scale={scale / DETAIL} />
    </div>
  );
}

function Scene({ copy, geometry, scale }: { copy: WebExperienceAnimationCopy; geometry: Geometry; scale: number }) {
  const { stage, desktop, phone, finalDesktop, finalPhone } = geometry;
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const isInView = useInView(scope, OFFER_VIEWPORT);
  const noMotion = useHydratedReducedMotion();
  const morph = useMotionValue(0);
  const settle = useMotionValue(0);
  const desktopOnly = useMotionValue(0);
  const backdropOpacity = useTransform(settle, [0.15, 0.7], [0, 1]);
  const backdropX = useTransform(settle, [0, 1], [desktop.x, finalDesktop.x]);
  const backdropY = useTransform(settle, [0, 1], [desktop.y + 6, finalDesktop.y]);
  const backdropScale = useTransform(settle, [0, 1], [finalDesktop.scale * 0.9, finalDesktop.scale]);
  const phoneX = useTransform(settle, [0, 1], [0, finalPhone.x - phone.x]);
  const phoneY = useTransform(settle, [0, 1], [0, finalPhone.y - phone.y]);
  const phoneScale = useTransform(settle, [0, 1], [1, finalPhone.scale]);

  useEffect(() => {
    if (noMotion) {
      scope.current?.querySelectorAll<HTMLElement>("[data-web-reveal]").forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });
      morph.set(1);
      settle.set(1);
      return;
    }
    if (!isInView) return;

    const sequence: AnimationSequence = [
      ['[data-web-reveal="device"]', { opacity: [0, 1], y: [10, 0] }, { duration: 0.4, at: 0, ease: OFFER_EASE_OUT }],
      ...REVEALS.map(([part, at]): AnimationSequence[number] => [
        `[data-web-reveal="${part}"]`,
        { opacity: [0, 1], y: [6, 0] },
        { duration: 0.35, at, ease: OFFER_EASE_OUT },
      ]),
      [morph, 1, { duration: 0.95, at: MORPH_AT, ease: OFFER_EASE_IN_OUT }],
      [settle, 1, { duration: 0.95, at: SETTLE_AT, ease: OFFER_EASE_IN_OUT }],
    ];
    const controls = animate(sequence);
    return () => controls.stop();
  }, [animate, isInView, morph, noMotion, scope, settle]);

  return (
    <div ref={scope} className="absolute inset-0">
      <div className="absolute top-1/2 left-1/2" style={stageStyle(stage, scale)}>
        <div className="absolute inset-0">
          <motion.div
            className="absolute origin-top-left"
            style={{ left: 0, top: 0, x: backdropX, y: backdropY, scale: backdropScale, opacity: backdropOpacity }}
          >
            <Device copy={copy} geometry={geometry} morph={desktopOnly} />
          </motion.div>

          <motion.div className="absolute inset-0 origin-top-left" style={{ x: phoneX, y: phoneY }}>
            <motion.div
              className="absolute inset-0"
              style={{ scale: phoneScale, transformOrigin: `${phone.x}px ${phone.y}px` }}
            >
              <div data-web-reveal="device" className="absolute inset-0" style={{ opacity: 0 }}>
                <Device copy={copy} geometry={geometry} morph={morph} reveal positioned />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function useMix(value: MotionValue<number>, from: number, to: number) {
  return useTransform(value, [0, 1], [from, to]);
}

function Device({
  copy,
  geometry,
  morph,
  reveal = false,
  positioned = false,
}: {
  copy: WebExperienceAnimationCopy;
  geometry: Geometry;
  morph: MotionValue<number>;
  reveal?: boolean;
  positioned?: boolean;
}) {
  const { desktop, phone } = LAYOUT;
  const { desktop: desktopFrame, phone: phoneFrame } = geometry;
  const frameX = useMix(morph, desktopFrame.x, phoneFrame.x);
  const frameY = useMix(morph, desktopFrame.y, phoneFrame.y);
  const width = useMix(morph, desktopFrame.width * desktopFrame.k, phoneFrame.width);
  const height = useMix(morph, desktopFrame.height * desktopFrame.k, phoneFrame.height);
  const radius = useMix(morph, desktopFrame.radius * desktopFrame.k, phoneFrame.radius);
  // The page inside is laid out at full size and scaled by k, which reaches 1 as it becomes the phone.
  const contentScale = useMix(morph, desktopFrame.k, 1);
  const contentWidth = useTransform(() => width.get() / contentScale.get());
  const contentHeight = useTransform(() => height.get() / contentScale.get());
  const bezel = useTransform(
    morph,
    [0, 1],
    [
      "0 0 0 1px rgba(15, 40, 90, 0.1), 0 30px 60px -30px rgba(8, 30, 80, 0.35)",
      "0 0 0 4.5px rgba(17, 17, 17, 1), 0 30px 60px -26px rgba(8, 30, 80, 0.5)",
    ],
  );
  const desktopChrome = useTransform(morph, [0, 0.35], [1, 0]);
  const phoneChrome = useTransform(morph, [0.6, 0.95], [0, 1]);
  const brandX = useMix(morph, desktop.brand.x, phone.brand.x);
  const brandY = useMix(morph, desktop.brand.y, phone.brand.y);
  const brandSize = useMix(morph, desktop.brand.size, phone.brand.size);
  const columnX = useMix(morph, desktop.column.x, phone.column.x);
  const columnY = useMix(morph, desktop.column.y, phone.column.y);
  const columnSize = useMix(morph, desktop.column.size, phone.column.size);
  const columnWidth = useMix(morph, desktop.column.width, phone.column.width);
  const imageX = useMix(morph, desktop.image.x, phone.image.x);
  const imageY = useMix(morph, desktop.image.y, phone.image.y);
  const imageWidth = useMix(morph, desktop.image.width, phone.image.width);
  const imageHeight = useMix(morph, desktop.image.height, phone.image.height);
  const imageRadius = useMix(morph, desktop.image.radius, phone.image.radius);
  const cardsY = useMix(morph, desktop.cards.y, phone.cards.y);
  const cardsOpacity = useTransform(morph, [0, 0.3], [1, 0]);

  const part = (name: string) => (reveal ? { "data-web-reveal": name, style: { opacity: 0 } } : {});

  return (
    <motion.div
      className="absolute overflow-hidden bg-white"
      style={{
        left: positioned ? frameX : 0,
        top: positioned ? frameY : 0,
        width,
        height,
        borderRadius: radius,
        boxShadow: bezel,
      }}
    >
      <motion.div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: contentWidth, height: contentHeight, scale: contentScale }}
      >
        <div {...part("chrome")} className="absolute inset-0">
          <motion.div className="absolute inset-x-0 top-0 h-[26px]" style={{ opacity: desktopChrome }}>
            <div className="absolute top-[10px] left-[12px] flex gap-[4px]">
              {[0, 1, 2].map((dot) => (
                <span key={dot} className="size-[6px] rounded-full bg-neutral-200" />
              ))}
            </div>
            <span className="absolute top-[6px] left-1/2 flex h-[14px] w-[120px] -translate-x-1/2 items-center justify-center rounded-full bg-neutral-100 text-[9px] leading-none text-neutral-400">
              suchio.net
            </span>
            <span className="absolute inset-x-0 bottom-0 h-px bg-neutral-100" />
          </motion.div>
          <motion.span
            className="absolute top-[7px] left-1/2 h-[8px] w-[36px] -translate-x-1/2 rounded-full bg-neutral-900"
            style={{ opacity: phoneChrome }}
          />
          <motion.span
            className="absolute bottom-[6px] left-1/2 h-[3px] w-[40px] -translate-x-1/2 rounded-full bg-neutral-900"
            style={{ opacity: phoneChrome }}
          />
        </div>

        <motion.div
          {...part("nav")}
          className="absolute flex items-center gap-1.5 leading-none font-semibold tracking-[-0.02em] text-neutral-900"
          style={{ left: brandX, top: brandY, fontSize: brandSize, ...(reveal ? { opacity: 0 } : {}) }}
        >
          <span className="size-[0.8em] rounded-full bg-brand-500" />
          suchio
        </motion.div>
        <motion.div
          className="absolute top-[43px] right-[22px] flex items-center text-[12px] leading-none font-medium text-neutral-500"
          style={{ opacity: desktopChrome }}
        >
          <span {...part("nav")} className="flex gap-3.5">
            {copy.nav.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </span>
        </motion.div>
        <motion.span className="absolute top-[27px] right-[13px] text-neutral-700" style={{ opacity: phoneChrome }}>
          <Menu className="size-[11px]" strokeWidth={2.2} aria-hidden="true" />
        </motion.span>

        <motion.div
          className="absolute flex flex-col items-start"
          style={{ left: columnX, top: columnY, fontSize: columnSize, width: columnWidth }}
        >
          <span {...part("kicker")} className="text-[0.9em] font-medium text-brand-600">
            {copy.kicker}
          </span>
          <span
            {...part("headline")}
            className="mt-[0.4em] text-[1.8em] leading-[1.05] font-semibold tracking-[-0.035em] text-balance text-neutral-900"
          >
            {copy.headline}
          </span>
          <span {...part("intro")} className="mt-[0.75em] text-[1em] leading-[1.4] text-pretty text-neutral-600">
            {copy.intro}
          </span>
          <span
            {...part("cta")}
            className="mt-[0.85em] inline-flex items-center gap-[0.5em] rounded-full bg-neutral-900 py-[0.5em] pr-[0.5em] pl-[1.1em] text-[0.95em] font-semibold text-white shadow-[0_6px_14px_-6px_rgb(0_0_0/45%)]"
          >
            {copy.cta}
            <span className="flex size-[1.45em] items-center justify-center rounded-full bg-white text-neutral-900">
              <ArrowRight className="size-[0.95em]" strokeWidth={2.4} aria-hidden="true" />
            </span>
          </span>
        </motion.div>

        <motion.div
          className="absolute overflow-hidden"
          style={{ left: imageX, top: imageY, width: imageWidth, height: imageHeight, borderRadius: imageRadius }}
        >
          <div {...part("image")} className="absolute inset-0">
            <PosterArt />
          </div>
        </motion.div>

        <motion.div
          className="absolute right-[22px] left-[22px] grid grid-cols-3 gap-2"
          style={{ top: cardsY, opacity: cardsOpacity }}
        >
          {copy.cards.map((title, index) => (
            <div
              key={title}
              {...part(`card-${index}`)}
              className="rounded-[8px] bg-white px-2.5 py-[7px] shadow-[0_0_0_1px_rgb(15_40_90/8%),0_6px_14px_-8px_rgb(15_40_90/25%)]"
            >
              <span className="block font-mono text-[8.5px] leading-none font-medium text-brand-500">0{index + 1}</span>
              <span className="mt-1 block truncate text-[11.5px] leading-none font-semibold text-neutral-900">
                {title}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function PosterArt() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(165deg, #0a3d9e 0%, #0f63e6 52%, #67a8ff 100%)" }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: "62%",
          aspectRatio: "1",
          right: "-12%",
          top: "-14%",
          background: "radial-gradient(circle at 35% 35%, #ffe2b8, #ffb36b 70%)",
        }}
      />
      {[0, 1, 2].map((ring) => (
        <div
          key={ring}
          className="absolute rounded-t-full border border-b-0 border-white/35"
          style={{ left: `${8 + ring * 9}%`, right: `${8 + ring * 9}%`, bottom: 0, height: `${72 - ring * 16}%` }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-[#082c75]/55" />
    </div>
  );
}
