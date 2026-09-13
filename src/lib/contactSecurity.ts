import type { ContactFields } from "@/lib/contactValidation";

export { validateContactInput } from "@/lib/contactValidation";
export type { ContactFields } from "@/lib/contactValidation";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_PER_CLIENT = 5;
const RATE_LIMIT_GLOBAL = 50;
const MAX_RATE_LIMIT_BUCKETS = 5_000;

type RateLimitBucket = {
  timestamps: number[];
};

type ContactRateLimitStore = Map<string, RateLimitBucket>;

const globalForContactRateLimit = globalThis as unknown as {
  contactRateLimitStore?: ContactRateLimitStore;
};

const rateLimitStore =
  globalForContactRateLimit.contactRateLimitStore ?? new Map<string, RateLimitBucket>();

if (process.env.NODE_ENV !== "production") {
  globalForContactRateLimit.contactRateLimitStore = rateLimitStore;
}

export const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]!,
  );

export const formatContactEmailHtml = ({ name, address, message }: ContactFields) =>
  `<p><strong>Jméno:</strong> ${escapeHtml(name)}</p>` +
  `<p><strong>Email:</strong> ${escapeHtml(address)}</p>` +
  `<p><strong>Zpráva:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`;

export const getContactClientKey = (headers: Headers) => {
  const forwardedFor = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const candidate = headers.get("x-real-ip")?.trim() || forwardedFor || "unknown";

  if (candidate.length > 64 || !/^[a-fA-F0-9:.\[\]-]+$/.test(candidate)) {
    return "unknown";
  }

  return candidate;
};

const consumeRateLimit = (key: string, limit: number, now: number) => {
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (rateLimitStore.get(key)?.timestamps ?? []).filter(
    (timestamp) => timestamp > cutoff,
  );

  if (timestamps.length >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((timestamps[0] + RATE_LIMIT_WINDOW_MS - now) / 1000)),
    };
  }

  timestamps.push(now);
  rateLimitStore.set(key, { timestamps });

  if (rateLimitStore.size > MAX_RATE_LIMIT_BUCKETS) {
    for (const [bucketKey, bucket] of rateLimitStore) {
      if (bucket.timestamps.every((timestamp) => timestamp <= cutoff)) {
        rateLimitStore.delete(bucketKey);
      }
    }

    while (rateLimitStore.size > MAX_RATE_LIMIT_BUCKETS) {
      const oldestKey = rateLimitStore.keys().next().value;
      if (typeof oldestKey !== "string") break;
      rateLimitStore.delete(oldestKey);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
};

export const checkContactRateLimit = (clientKey: string, now = Date.now()) => {
  const globalResult = consumeRateLimit("contact:global", RATE_LIMIT_GLOBAL, now);
  if (!globalResult.allowed) return globalResult;

  if (clientKey === "unknown") return globalResult;

  return consumeRateLimit(`contact:client:${clientKey}`, RATE_LIMIT_PER_CLIENT, now);
};
