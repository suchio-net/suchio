/// <reference types="astro/client" />
/// <reference types="@astrojs/cloudflare" />

declare module "virtual:suchio/audit-reports" {
  const reports: readonly import("./server/audit-measurement").AuditReport[];
  export default reports;
}
