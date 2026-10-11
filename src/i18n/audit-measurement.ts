import type { Locale } from "./config";
import de from "./de/measurement";
import en from "./en/measurement";
import fr from "./fr/measurement";

export const measurementCopy = { de, en, fr } satisfies Record<Locale, Record<string, string>>;

// Keep this versioned text with the database consent_version for evidence.
export const measurementConsentVersion = "2026-09-26-v1";
