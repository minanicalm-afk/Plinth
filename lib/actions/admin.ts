"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import {
  SESSION_COOKIE,
  safeAdminPath,
  safeEqual,
  sessionMaxAge,
  signSession,
} from "@/lib/auth-token";
import {
  removeProject,
  removeTestimonial,
  setEnquiryStatus,
  upsertProject,
  upsertTestimonial,
} from "@/lib/data";
import { assertAdmin } from "@/lib/session";
import { counties } from "@/lib/site";
import {
  isCategory,
  type EnquiryStatus,
  type FormState,
  type Project,
  type ProjectImage,
  type Testimonial,
} from "@/lib/types";
import { isHttpsUrl, oneLine, slugify } from "@/lib/utils";

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.ADMIN_SECRET ?? "";
  if (!expected || !secret) {
    return {
      ok: false,
      message: "The studio door is not configured. Set ADMIN_PASSWORD and ADMIN_SECRET in the environment.",
    };
  }
  if (!safeEqual(password, expected)) {
    return { ok: false, message: "That password is not the one we have." };
  }

  const jar = await cookies();
  jar.set(SESSION_COOKIE, signSession(secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAge,
  });
  redirect(safeAdminPath(String(formData.get("from") ?? "/admin")));
}

export async function logout() {
  await assertAdmin();
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

function text(formData: FormData, key: string) {
  return oneLine(String(formData.get(key) ?? ""));
}

function parseGallery(raw: string, fallback: string): { images: ProjectImage[]; error?: string } {
  const images: ProjectImage[] = [];
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const [urlPart, ...altParts] = trimmed.split("|");
    const url = urlPart.trim();
    if (!isHttpsUrl(url)) {
      return { images: [], error: "Each photograph needs a full https address, one per line." };
    }
    images.push({ url, alt: altParts.join("|").trim() || fallback });
  }
  return { images };
}

export async function saveProject(_prev: FormState, formData: FormData): Promise<FormState> {
  await assertAdmin();
  const title = text(formData, "title");
  const fieldErrors: Record<string, string> = {};
  const slug = slugify(text(formData, "slug") || title);
  const category = text(formData, "category");
  const location = text(formData, "location");
  const county = text(formData, "county");
  const year = Number(text(formData, "year"));
  const duration = text(formData, "duration");
  const clientType = text(formData, "clientType");
  const scope = text(formData, "scope");
  const outcome = text(formData, "outcome");
  const summary = text(formData, "summary");
  const body = String(formData.get("body") ?? "").trim();
  const heroImage = text(formData, "heroImage");
  const heroAlt = text(formData, "heroAlt");
  const beforeImage = text(formData, "beforeImage");
  const beforeAlt = text(formData, "beforeAlt");
  const afterImage = text(formData, "afterImage");
  const afterAlt = text(formData, "afterAlt");
  const sortOrder = Number(text(formData, "sortOrder") || "0");
  const gallery = parseGallery(String(formData.get("gallery") ?? ""), title);

  if (title.length < 3) fieldErrors.title = "Give the project a name.";
  if (!slug) fieldErrors.slug = "The URL needs a few letters or numbers.";
  if (!isCategory(category)) fieldErrors.category = "Choose a category.";
  if (location.length < 2) fieldErrors.location = "Where is it?";
  if (!counties.some((item) => item.name === county)) fieldErrors.county = "Choose a county.";
  if (!Number.isInteger(year) || year < 1990 || year > 2100) fieldErrors.year = "Enter the year it was completed.";
  if (duration.length < 2) fieldErrors.duration = "How long did it take?";
  if (clientType.length < 2) fieldErrors.clientType = "Who was it for?";
  if (scope.length < 8) fieldErrors.scope = "Say what the job included.";
  if (outcome.length < 8) fieldErrors.outcome = "Say how it ended.";
  if (summary.length < 20) fieldErrors.summary = "Write a short summary, at least a sentence.";
  if (body.length < 40) fieldErrors.body = "The case study needs a short account of the work.";
  if (!isHttpsUrl(heroImage)) fieldErrors.heroImage = "The main photograph needs an https address.";
  if (!isHttpsUrl(beforeImage)) fieldErrors.beforeImage = "The before photograph needs an https address.";
  if (!isHttpsUrl(afterImage)) fieldErrors.afterImage = "The after photograph needs an https address.";
  if (gallery.error) fieldErrors.gallery = gallery.error;
  if (!Number.isFinite(sortOrder)) fieldErrors.sortOrder = "Order should be a number.";

  if (Object.keys(fieldErrors).length || !isCategory(category)) {
    return { ok: false, message: "Check the highlighted fields.", fieldErrors };
  }

  const project: Project = {
    id: text(formData, "id") || crypto.randomUUID(),
    slug,
    title,
    category,
    location,
    county,
    year,
    duration,
    clientType,
    scope,
    outcome,
    summary,
    body,
    heroImage,
    heroAlt: heroAlt || title,
    beforeImage,
    beforeAlt: beforeAlt || `Before: ${title}`,
    afterImage,
    afterAlt: afterAlt || `After: ${title}`,
    gallery: gallery.images,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    sortOrder,
  };

  try {
    await upsertProject(project);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save the project.",
    };
  }

  updateTag("projects");
  updateTag(`project-${project.slug}`);
  redirect(`/admin/projects/${project.id}?saved=1`);
}

export async function deleteProject(formData: FormData) {
  await assertAdmin();
  const id = text(formData, "id");
  const slug = await removeProject(id);
  updateTag("projects");
  if (slug) updateTag(`project-${slug}`);
  redirect("/admin/projects");
}

export async function saveTestimonial(_prev: FormState, formData: FormData): Promise<FormState> {
  await assertAdmin();
  const quote = String(formData.get("quote") ?? "").trim();
  const name = text(formData, "name");
  const role = text(formData, "role");
  const projectTitle = text(formData, "projectTitle");
  const sortOrder = Number(text(formData, "sortOrder") || "0");
  const fieldErrors: Record<string, string> = {};

  if (quote.length < 12) fieldErrors.quote = "The quotation is too short.";
  if (name.length < 2) fieldErrors.name = "Who said it?";
  if (role.length < 2) fieldErrors.role = "What is their role?";
  if (!Number.isFinite(sortOrder)) fieldErrors.sortOrder = "Order should be a number.";

  if (Object.keys(fieldErrors).length) {
    return { ok: false, message: "Check the highlighted fields.", fieldErrors };
  }

  const item: Testimonial = {
    id: text(formData, "id") || crypto.randomUUID(),
    quote,
    name,
    role,
    projectTitle,
    published: formData.get("published") === "on",
    sortOrder,
  };

  try {
    await upsertTestimonial(item);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save the testimonial.",
    };
  }

  updateTag("testimonials");
  redirect(`/admin/testimonials/${item.id}?saved=1`);
}

export async function deleteTestimonial(formData: FormData) {
  await assertAdmin();
  await removeTestimonial(text(formData, "id"));
  updateTag("testimonials");
  redirect("/admin/testimonials");
}

export async function updateEnquiryStatus(formData: FormData) {
  await assertAdmin();
  const id = text(formData, "id");
  const status = text(formData, "status");
  if (status === "new" || status === "read" || status === "archived") {
    await setEnquiryStatus(id, status as EnquiryStatus);
  }
}
