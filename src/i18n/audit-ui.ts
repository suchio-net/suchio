import type { Locale } from "./config";
import de from "./de/audit";
import en from "./en/audit";
import fr from "./fr/audit";

export type AuditUi = { [K in keyof typeof de]: (typeof de)[K] extends string ? string : string[][] | string[] };

export const auditUi = { de, en, fr } satisfies Record<Locale, typeof de>;
