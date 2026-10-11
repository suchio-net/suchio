import { useSyncExternalStore, type SetStateAction } from "react";
import { readContactDraft, writeContactDraft, type ContactDraft } from "@/lib/contact-draft";
export type { ContactDraft } from "@/lib/contact-draft";

// A tab session preserves drafts across full page navigation and locale changes.
// Server snapshots are always empty; blocked storage falls back to browser memory.
let browserDraft: ContactDraft | undefined;
let restored = false;
const listeners = new Set<() => void>();
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function getSnapshot() {
  if (!restored && typeof window !== "undefined") {
    restored = true;
    try {
      browserDraft = readContactDraft(window.sessionStorage);
    } catch {
      /* Keep the form usable when browser storage is disabled. */
    }
  }
  return browserDraft;
}
function getServerSnapshot() {
  return undefined;
}
function setDraft(action: SetStateAction<ContactDraft | undefined>) {
  if (typeof window === "undefined") throw new Error("Contact drafts are browser-only.");
  browserDraft = typeof action === "function" ? action(getSnapshot()) : action;
  restored = true;
  try {
    writeContactDraft(window.sessionStorage, browserDraft);
  } catch {
    /* The existing unload warning still protects memory-only drafts. */
  }
  listeners.forEach((listener) => listener());
}
if (typeof window !== "undefined") {
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    // A cached contact page must see drafts cleared or edited on a later page.
    restored = false;
    getSnapshot();
    listeners.forEach((listener) => listener());
  });
}
export function useContactDraft() {
  const draft = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { draft, setDraft };
}
