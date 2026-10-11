import type { Locale } from "@/i18n/config";
import de from "./de/not-found";
import en from "./en/not-found";
import fr from "./fr/not-found";

export type NotFoundCopy = {
  title: string;
  copy: string;
  back: string;
};

export const notFoundMessages = { de, en, fr } as const satisfies Record<Locale, NotFoundCopy>;
