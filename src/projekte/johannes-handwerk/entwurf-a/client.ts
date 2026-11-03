// Entwurf A: mobile menu and the mobile action bar. Everything else works without script.

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
