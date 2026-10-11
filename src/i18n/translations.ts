import type { Locale } from "./config";
import de from "./de/messages";
import en from "./en/messages";
import fr from "./fr/messages";

export type MessageKey = keyof typeof de;

export const dictionaries = { de, en, fr } as const satisfies Record<Locale, Readonly<Record<MessageKey, string>>>;
