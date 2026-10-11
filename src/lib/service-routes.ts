import type { ServiceId } from "@/i18n/services";
import type { Locale } from "@/i18n/config";
import { localizePath } from "@/lib/locale-path";

export const serviceOrder: readonly ServiceId[] = [
  "websites-apps",
  "seo-ai-visibility",
  "paid-campaigns",
  "ai-automation",
];

/** Public URL slug of each service. The service ids were the slugs before; those URLs redirect. */
export const serviceRouteSlugs = {
  "websites-apps": "websites",
  "seo-ai-visibility": "seo",
  "paid-campaigns": "ads",
  "ai-automation": "automation",
} as const satisfies Record<ServiceId, string>;

export function isServiceId(value: string | undefined): value is ServiceId {
  return serviceOrder.some((serviceId) => serviceId === value);
}

export function getServicePath(serviceId: ServiceId, locale: Locale): string {
  return localizePath(`/services/${serviceRouteSlugs[serviceId]}`, locale);
}
