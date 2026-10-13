import { useEffect, useState, type CSSProperties, type RefObject } from "react";

// Every offer visual is designed inside the same box and scaled the same way, so all four appear at an
// identical size. Phone-sized slots (portrait, see offer-visual.astro) use a taller, narrower box that
// keeps the type legible.
export const STAGE_BOX = {
  wide: { width: 480, height: 380 },
  narrow: { width: 320, height: 392 },
} as const;
export type StageMode = keyof typeof STAGE_BOX;

export function useStage(ref: RefObject<HTMLElement | null>) {
  const [fit, setFit] = useState<{ mode: StageMode; scale: number }>({ mode: "wide", scale: 1 });

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const measure = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      // The slot's CSS sets its proportions per breakpoint; a portrait slot means the narrow box.
      const mode: StageMode = width < height ? "narrow" : "wide";
      const box = STAGE_BOX[mode];
      setFit({ mode, scale: Math.min(width / box.width, height / box.height) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [ref]);

  return fit;
}

// Centres a stage of the given design size and scales it into its slot.
export function stageStyle(size: { width: number; height: number }, scale: number): CSSProperties {
  return {
    width: size.width,
    height: size.height,
    marginLeft: -size.width / 2,
    marginTop: -size.height / 2,
    transform: `scale(${scale})`,
  };
}

// Flat scenes (search, chart, flow) fill their box edge to edge; this leaves them the same breathing room
// the device mock-ups have around them, so all four read at the same visual size.
export const FLAT_FILL = 0.9;
