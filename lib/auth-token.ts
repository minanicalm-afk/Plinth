import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "plinth_session";
const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;

export function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  const length = Math.max(left.length, right.length, 1);
  const aBuf = Buffer.alloc(length);
  const bBuf = Buffer.alloc(length);
  left.copy(aBuf);
  right.copy(bBuf);
  return timingSafeEqual(aBuf, bBuf) && left.length === right.length;
}

export function signSession(secret: string) {
  const exp = Date.now() + FOURTEEN_DAYS;
  const payload = `v1.${exp}`;
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined, secret: string | undefined) {
  if (!token || !secret) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [version, exp, sig] = parts;
  if (version !== "v1" || !/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const expected = createHmac("sha256", secret).update(`${version}.${exp}`).digest("hex");
  return safeEqual(expected, sig);
}

export function safeAdminPath(value: string) {
  if (!value.startsWith("/admin") || value.startsWith("//") || value.includes("\\")) {
    return "/admin";
  }
  if (value.startsWith("/admin/login")) return "/admin";
  return value;
}

export const sessionMaxAge = FOURTEEN_DAYS / 1000;
