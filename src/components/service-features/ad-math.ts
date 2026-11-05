import type { Locale } from "@/lib/i18n";

// Example values for the cost-per-enquiry calculator. The page labels them as an example.
export const adInputs = {
  budget: { min: 200, max: 5000, step: 100, value: 1000 },
  cpc: { min: 0.5, max: 8, step: 0.1, value: 2.5 },
  rate: { min: 1, max: 10, step: 0.5, value: 3 },
} as const;

/** The comparison row: the same campaign with this many more percentage points of visitors enquiring. */
export const betterPoints = 2;

export type AdInputs = { budget: number; cpc: number; rate: number };

export function calculateAd({ budget, cpc, rate }: AdInputs) {
  const clicks = Math.floor(budget / cpc);
  const enquiries = Math.round((clicks * rate) / 100);
  const betterEnquiries = Math.round((clicks * (rate + betterPoints)) / 100);
  const cost = enquiries > 0 ? budget / enquiries : null;
  const betterCost = betterEnquiries > 0 ? budget / betterEnquiries : null;
  const betterShare = cost && betterCost ? betterCost / cost : 1;
  return { clicks, enquiries, cost, betterCost, betterShare };
}

export function formatAd(locale: Locale, inputs: AdInputs, result: ReturnType<typeof calculateAd>) {
  const euro = (value: number, digits: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(value);
  const whole = (value: number) => new Intl.NumberFormat(locale).format(value);
  const money = (value: number | null) => (value === null ? undefined : euro(value, value < 10 ? 2 : 0));
  return {
    budget: euro(inputs.budget, 0),
    cpc: euro(inputs.cpc, 2),
    rate: new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 1 }).format(inputs.rate / 100),
    clicks: whole(result.clicks),
    enquiries: whole(result.enquiries),
    cost: money(result.cost),
    betterCost: money(result.betterCost),
  };
}
