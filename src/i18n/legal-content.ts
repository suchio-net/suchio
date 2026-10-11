import type { Locale } from "./config";
import de from "./de/legal";
import en from "./en/legal";
import fr from "./fr/legal";
import type { LegalContent } from "./legal-shared";

export { legalUpdatedAt, type LegalPageKind } from "./legal-shared";

export const legalContent = { de, en, fr } as const satisfies Record<Locale, LegalContent>;
