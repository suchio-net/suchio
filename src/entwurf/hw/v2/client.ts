export {};
// Shared behaviour: services dropdown, mobile menu, pitch annotations, action bar.

const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
if (toggle && menu) {
  const item = toggle.parentElement!;
  const set = (open: boolean) => { menu.classList.toggle("open", open); toggle.setAttribute("aria-expanded", String(open)); };
  toggle.addEventListener("click", () => set(toggle.getAttribute("aria-expanded") !== "true"));
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
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
