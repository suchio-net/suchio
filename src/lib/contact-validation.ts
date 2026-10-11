export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isHttpUrl(value: string): boolean {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

/** Seconds to wait from a Retry-After header (delta seconds or HTTP date), bounded to one hour. */
export function retryAfterSeconds(value: string | null, now = Date.now()): number {
  const seconds = value && /^\d+$/.test(value.trim()) ? Number(value) : value ? (Date.parse(value) - now) / 1000 : 60;
  return Number.isFinite(seconds) ? Math.min(3600, Math.max(1, Math.ceil(seconds))) : 60;
}
