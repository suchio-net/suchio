import { MonitorSmartphone, RadioTower, Search, Workflow } from "@lucide/astro";
import type { ServiceId } from "@/i18n/services";

// The contact form island keeps a matching lucide-react map.
export const serviceIcons = {
  "websites-apps": MonitorSmartphone,
  "seo-ai-visibility": Search,
  "paid-campaigns": RadioTower,
  "ai-automation": Workflow,
} satisfies Record<ServiceId, unknown>;
