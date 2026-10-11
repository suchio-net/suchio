/** Applies the shared per-IP rate limiter to one purpose; true when the request may proceed. */
export async function withinRateLimit(request: Request, limiter: RateLimit, purpose: string) {
  const ip = request.headers.get("cf-connecting-ip") ?? "local";
  const { success } = await limiter.limit({ key: `suchio:${purpose}:${ip}` });
  return success;
}
