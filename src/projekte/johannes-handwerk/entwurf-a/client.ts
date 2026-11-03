// Entwurf A: mobile menu, the mobile action bar, scroll reveals and counters. All content works without script.

const dialog = document.querySelector<HTMLDialogElement>("[data-mobile-menu]");
const burger = document.querySelector<HTMLButtonElement>("[data-burger]");
if (dialog && burger) {
  burger.addEventListener("click", () => {
    dialog.showModal();
    burger.setAttribute("aria-expanded", "true");
  });
  // The native dialog also closes with Escape and fires "close" for it.
  dialog.addEventListener("close", () => burger.setAttribute("aria-expanded", "false"));
  dialog.querySelector("[data-close]")?.addEventListener("click", () => dialog.close());
  dialog.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => dialog.close()));
}

// The action bar steps aside when the footer, which repeats its contacts, is visible.
const bar = document.querySelector<HTMLElement>(".action-bar");
const footer = document.querySelector(".site-footer");
if (bar && footer)
  new IntersectionObserver(([entry]) => bar.classList.toggle("hidden", entry.isIntersecting), {
    threshold: 0.05,
  }).observe(footer);

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Reveals: blocks rise in once when they come into view; siblings follow one another. The hidden
// start state is in theme.css and needs the "js" class from the layout.
const revealTargets = document.querySelectorAll<HTMLElement>(
  ".facts .fact, .services > h2, .focus-copy, .focus-photo, .more > li, .projects-head, .slides, .process > h2, .process-step, .reviews h2, .platforms > li, .faq-head, .faq details, .cta-title, .cta-row",
);
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((el) => el.classList.add("in"));
} else {
  revealTargets.forEach((el) => {
    const index = [...el.parentElement!.children].indexOf(el);
    el.style.setProperty("--delay", `${Math.min(index, 5) * 0.08}s`);
  });
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        entry.target.classList.add("in");
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  requestAnimationFrame(() => requestAnimationFrame(() => revealTargets.forEach((el) => observer.observe(el))));
}

// Numbers count up when they come into view. The text keeps its suffix, for example "+" or " h".
const counters = [...document.querySelectorAll<HTMLElement>("[data-count]")].flatMap((el) => {
  const match = /^(\d+)(?:,(\d+))?(.*)$/s.exec(el.textContent!.trim());
  return match ? [{ el, match }] : [];
});
if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
  const run = (el: HTMLElement, match: RegExpExecArray) => {
    const decimals = match[2]?.length ?? 0;
    const to = Number(`${match[1]}.${match[2] ?? 0}`);
    const show = (value: number) => {
      el.textContent = value.toFixed(decimals).replace(".", ",") + match[3];
    };
    const begin = performance.now();
    const frame = (now: number) => {
      const t = Math.min((now - begin) / 1800, 1);
      show(to * (1 - Math.pow(1 - t, 4)));
      if (t < 1) requestAnimationFrame(frame);
    };
    show(0);
    requestAnimationFrame(frame);
  };
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const item = counters.find((counter) => counter.el === entry.target)!;
        run(item.el, item.match);
      }
    },
    { threshold: 0.6 },
  );
  counters.forEach(({ el }) => observer.observe(el));
}

// A module, so that its names stay local to this file.
export {};
