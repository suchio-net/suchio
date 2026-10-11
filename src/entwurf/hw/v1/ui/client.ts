// Shared behaviour for v1: navigation, pitch notes, header states and the
// scroll reveals. Everything degrades to plain, visible content without JS
// and stays still with reduced motion.
import { animate } from "motion";
import "./smooth";

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
if (toggle && menu) {
  const item = toggle.parentElement!;
  const set = (open: boolean) => { menu.classList.toggle("open", open); toggle.setAttribute("aria-expanded", String(open)); };
  toggle.addEventListener("click", () => set(toggle.getAttribute("aria-expanded") !== "true"));
  if (finePointer) {
    let timer = 0;
    item.addEventListener("mouseenter", () => { clearTimeout(timer); set(true); });
    item.addEventListener("mouseleave", () => { timer = window.setTimeout(() => set(false), 150); });
  }
  item.addEventListener("focusout", event => { if (!item.contains(event.relatedTarget as Node)) set(false); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && menu.classList.contains("open")) { set(false); toggle.focus(); } });
}

const dialog = document.querySelector<HTMLDialogElement>("[data-mobile-menu]");
const burger = document.querySelector<HTMLButtonElement>("[data-burger]");
if (dialog && burger) {
  burger.addEventListener("click", () => { dialog.showModal(); burger.setAttribute("aria-expanded", "true"); });
  dialog.addEventListener("close", () => burger.setAttribute("aria-expanded", "false"));
  dialog.querySelector("[data-close]")?.addEventListener("click", () => dialog.close());
  dialog.querySelectorAll("a").forEach(link => link.addEventListener("click", () => dialog.close()));
}

// Draft menu: one small button that opens the Suchio link, notes and version switch.
const draftToggle = document.querySelector<HTMLButtonElement>("[data-draft-toggle]");
const draftPanel = document.querySelector<HTMLElement>("[data-draft-panel]");
if (draftToggle && draftPanel) {
  const draft = draftToggle.parentElement!;
  const set = (open: boolean) => { draftPanel.hidden = !open; draftToggle.setAttribute("aria-expanded", String(open)); };
  draftToggle.addEventListener("click", () => set(draftPanel.hidden));
  document.addEventListener("click", event => { if (!draftPanel.hidden && !draft.contains(event.target as Node)) set(false); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && !draftPanel.hidden) { set(false); draftToggle.focus(); } });
}

const notes = document.querySelector<HTMLButtonElement>("[data-notes-toggle]");
if (notes) {
  const setNotes = (on: boolean) => {
    document.body.classList.toggle("notes", on);
    notes.setAttribute("aria-pressed", String(on));
    try { sessionStorage.setItem("hw-notes", on ? "1" : "0"); } catch { /* storage unavailable */ }
  };
  let initial = new URLSearchParams(location.search).has("hinweise");
  try { initial ||= sessionStorage.getItem("hw-notes") === "1"; } catch { /* storage unavailable */ }
  if (initial) setNotes(true);
  notes.addEventListener("click", () => setNotes(!document.body.classList.contains("notes")));
}

// The mobile action bar steps aside when the footer, which repeats its contacts, is visible.
const bar = document.querySelector<HTMLElement>(".action-bar");
const footer = document.querySelector(".site-footer");
if (bar && footer) new IntersectionObserver(([entry]) => bar.classList.toggle("hidden", entry.isIntersecting), { threshold: 0.05 }).observe(footer);

// Header: glass once the page scrolls, out of the way while scrolling down,
// back on the way up, and inverted over the black sections.
const header = document.querySelector<HTMLElement>("[data-header]");
if (header) {
  const darks = [...document.querySelectorAll<HTMLElement>("[data-dark]")];
  let last = scrollY, ticking = false;
  const sync = () => {
    ticking = false;
    const y = scrollY;
    header.classList.toggle("scrolled", y > 8);
    const menuOpen = menu?.classList.contains("open");
    if (!menuOpen && Math.abs(y - last) > 4) header.classList.toggle("away", y > last && y > 240);
    last = y;
    const probe = header.offsetHeight / 2;
    header.classList.toggle("on-dark", darks.some(el => { const r = el.getBoundingClientRect(); return r.top <= probe && r.bottom >= probe; }));
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(sync); } }, { passive: true });
  header.addEventListener("focusin", () => header.classList.remove("away"));
  sync();
}

// Reveals: headings, blocks, rules, photo wipes and the footer wordmark get .in
// once. Elements already on screen animate in right after the first paint.
const revealTargets = document.querySelectorAll<HTMLElement>("[data-split], [data-reveal], .rule, [data-wipe], [data-mark]");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach(el => el.classList.add("in"));
} else {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      entry.target.classList.add("in");
    }
  }, { rootMargin: "0px 0px -12% 0px" });
  requestAnimationFrame(() => requestAnimationFrame(() => revealTargets.forEach(el => observer.observe(el))));
}

// Photos turn to colour while they cross the middle of the screen; inside a
// horizontal rail, the middle is measured across instead of down.
const photos = [...document.querySelectorAll<HTMLElement>("[data-photo]")];
if (photos.length && "IntersectionObserver" in window) {
  const colour = (entries: IntersectionObserverEntry[]) => { for (const entry of entries) entry.target.classList.toggle("color", entry.isIntersecting); };
  const vertical = new IntersectionObserver(colour, { rootMargin: "-38% 0px -38% 0px" });
  const horizontal = new IntersectionObserver(colour, { rootMargin: "0px -34% 0px -34%" });
  for (const photo of photos) (photo.closest("[data-rail]") ? horizontal : vertical).observe(photo);
}

// Numbers count up when they come into view.
const counters = document.querySelectorAll<HTMLElement>("[data-count]");
if (counters.length) {
  const format = (value: number, decimals: number) => value.toLocaleString("de-DE", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const run = (el: HTMLElement) => {
    const to = Number(el.dataset.count), decimals = Number(el.dataset.decimals ?? 0);
    if (reduceMotion) { el.textContent = format(to, decimals); return; }
    animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: value => { el.textContent = format(value, decimals); } });
  };
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      run(entry.target as HTMLElement);
    }
  }, { threshold: 0.6 });
  counters.forEach(el => { if (!reduceMotion) el.textContent = format(0, Number(el.dataset.decimals ?? 0)); observer.observe(el); });
}

// Buttons lean towards the pointer and spring back.
if (finePointer && !reduceMotion) {
  document.querySelectorAll<HTMLElement>(".btn").forEach(button => {
    button.addEventListener("pointermove", event => {
      const r = button.getBoundingClientRect();
      const x = (event.clientX - r.left - r.width / 2) * 0.22, y = (event.clientY - r.top - r.height / 2) * 0.35;
      animate(button, { x, y }, { type: "spring", stiffness: 260, damping: 18, mass: 0.6 });
    });
    button.addEventListener("pointerleave", () => animate(button, { x: 0, y: 0 }, { type: "spring", stiffness: 200, damping: 14 }));
  });
}
