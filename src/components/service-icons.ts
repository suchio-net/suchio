import { AppWindow, Monitor, RadioTower, Search, Workflow } from "@lucide/astro";
import type { ServiceId } from "@/i18n/services";

// The contact form island keeps a matching lucide-react map.
export const serviceIcons = {
  "websites-apps": Monitor,
  apps: AppWindow,
  "seo-ai-visibility": Search,
  "paid-campaigns": RadioTower,
  "ai-automation": Workflow,
} satisfies Record<ServiceId, unknown>;
