import type { ServiceId } from "@/i18n/services";
import { isBudgetId } from "@/lib/contact-options";
import { isServiceId } from "@/lib/service-routes";

export type ContactDraft = {
  name: string;
  email: string;
  company: string;
  companyUrl: string;
  message: string;
  service?: ServiceId | "not-sure";
  budget: string;
  submission?: { payload: string; id: string };
};

export const contactDraftKey = "suchio:contact-draft:v1";
type DraftStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function isContactDraft(value: unknown): value is ContactDraft {
  if (!value || typeof value !== "object") return false;
  const draft = value as Record<string, unknown>;
  const limits = { name: 100, email: 254, company: 120, companyUrl: 2048, message: 5000 };
  if (Object.entries(limits).some(([field, limit]) => typeof draft[field] !== "string" || draft[field].length > limit))
    return false;
  if (typeof draft.budget !== "string" || (draft.budget !== "" && !isBudgetId(draft.budget))) return false;
  if (
    draft.service !== undefined &&
    draft.service !== "not-sure" &&
    (typeof draft.service !== "string" || !isServiceId(draft.service))
  )
    return false;
  if (draft.submission !== undefined) {
    if (!draft.submission || typeof draft.submission !== "object") return false;
    const submission = draft.submission as Record<string, unknown>;
    if (
      typeof submission.payload !== "string" ||
      submission.payload.length > 20_000 ||
      typeof submission.id !== "string" ||
      submission.id.length > 100
    )
      return false;
  }
  return true;
}

export function readContactDraft(storage: DraftStorage): ContactDraft | undefined {
  const stored = storage.getItem(contactDraftKey);
  if (!stored) return undefined;
  try {
    const draft: unknown = JSON.parse(stored);
    if (isContactDraft(draft)) return draft;
  } catch {
    /* Discard malformed data from an interrupted or older session. */
  }
  storage.removeItem(contactDraftKey);
  return undefined;
}

export function writeContactDraft(storage: DraftStorage, draft: ContactDraft | undefined) {
  if (draft) storage.setItem(contactDraftKey, JSON.stringify(draft));
  else storage.removeItem(contactDraftKey);
}
