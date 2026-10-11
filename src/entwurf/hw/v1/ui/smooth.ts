// Smooth scrolling for v1: Lenis eases wheel and trackpad input, GSAP's ticker
// drives it and ScrollTrigger reads the same scroll position. Touch keeps the
// native scroll (and CSS scroll snap), and reduced motion keeps everything as is.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

export const lenis = finePointer && !reduceMotion ? new Lenis({ autoRaf: false, anchors: true, lerp: 0.11, wheelMultiplier: 0.9 }) : undefined;

if (lenis) {
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/** Scrolls the page smoothly (or at once with reduced motion), through Lenis where it runs. */
export function scrollToY(y: number, onComplete?: () => void) {
  if (lenis) lenis.scrollTo(y, { duration: 0.9, easing: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), onComplete: () => onComplete?.() });
  else { scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" }); onComplete?.(); }
}

export { gsap, ScrollTrigger };
