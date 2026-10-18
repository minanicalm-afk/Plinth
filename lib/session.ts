import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth-token";

export async function isAdmin() {
  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE)?.value, process.env.ADMIN_SECRET);
}

export async function assertAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
