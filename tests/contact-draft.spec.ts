import { expect, test } from "bun:test";
import { contactDraftKey, readContactDraft, writeContactDraft, type ContactDraft } from "../src/lib/contact-draft";

const draft: ContactDraft = {
  name: "Alex",
  email: "alex@example.com",
  company: "Example",
  companyUrl: "https://example.com",
  message: "A draft that survives a language change.",
  service: "seo-ai-visibility",
  budget: "budget-2",
  submission: { payload: '{"message":"retry"}', id: "one-submission" },
};
function storage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
    removeItem: (key: string) => {
      values.delete(key);
    },
  };
}

test("a contact draft and its retry ID survive a new page and are cleared after submission", () => {
  const tab = storage();
  writeContactDraft(tab, draft);
  expect(readContactDraft(tab)).toEqual(draft);
  writeContactDraft(tab, undefined);
  expect(readContactDraft(tab)).toBeUndefined();
  expect(tab.getItem(contactDraftKey)).toBeNull();
});

test("malformed, oversized, and obsolete contact drafts are discarded", () => {
  const tab = storage();
  for (const value of [
    "{",
    "null",
    JSON.stringify({ ...draft, service: "obsolete" }),
    JSON.stringify({ ...draft, budget: "obsolete" }),
    JSON.stringify({ ...draft, message: "x".repeat(5001) }),
    JSON.stringify({ ...draft, submission: { payload: 42, id: "retry" } }),
  ]) {
    tab.setItem(contactDraftKey, value);
    expect(readContactDraft(tab)).toBeUndefined();
    expect(tab.getItem(contactDraftKey)).toBeNull();
  }
});
