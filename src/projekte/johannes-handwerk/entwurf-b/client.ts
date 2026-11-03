// Entwurf B: services dropdown, mobile menu and the mobile action bar.

const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
if (toggle && menu) {
  const item = toggle.parentElement!;
  const set = (open: boolean) => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => set(toggle.getAttribute("aria-expanded") !== "true"));
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let timer = 0;
    item.addEventListener("mouseenter", () => {
      clearTimeout(timer);
      set(true);
    });
    item.addEventListener("mouseleave", () => {
      timer = window.setTimeout(() => set(false), 150);
    });
  }
  item.addEventListener("focusout", (event) => {
    if (!item.contains(event.relatedTarget as Node)) set(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      set(false);
      toggle.focus();
    }
  });
}

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

// A module, so that its names stay local to this file.
export {};
