const hitMap = new Map<string, { count: number; ts: number }>();

export function checkRateLimit(key: string, max = 60, windowMs = 60_000) {
  const now = Date.now();
  const existing = hitMap.get(key);
  if (!existing || now - existing.ts > windowMs) {
    hitMap.set(key, { count: 1, ts: now });
    return true;
  }
  if (existing.count >= max) return false;
  existing.count += 1;
  return true;
}
