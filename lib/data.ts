import "server-only";

import { neon } from "@neondatabase/serverless";
import { cacheLife, cacheTag } from "next/cache";
import { seedProjects, seedTestimonials } from "@/lib/seed";
import { assertAdmin } from "@/lib/session";
import {
  localEnquiries,
  localProjects,
  localTestimonials,
  saveLocalEnquiries,
  saveLocalProjects,
  saveLocalTestimonials,
} from "@/lib/store";
import type {
  Enquiry,
  EnquiryStatus,
  Project,
  ProjectImage,
  Testimonial,
} from "@/lib/types";

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  category: Project["category"];
  location: string;
  county: string;
  year: number | string;
  duration: string;
  client_type: string;
  scope: string;
  outcome: string;
  summary: string;
  body: string;
  hero_image: string;
  hero_alt: string;
  before_image: string;
  before_alt: string;
  after_image: string;
  after_alt: string;
  gallery: unknown;
  featured: boolean | string;
  published: boolean | string;
  sort_order: number | string;
};

type TestimonialRow = {
  id: string;
  quote: string;
  name: string;
  role: string;
  project_title: string;
  published: boolean | string;
  sort_order: number | string;
};

type EnquiryRow = {
  id: string;
  type: Enquiry["type"];
  name: string;
  email: string;
  phone: string;
  county: string;
  project_type: string;
  budget: string;
  timeline: string;
  message: string;
  status: EnquiryStatus;
  created_at: string | Date;
  notified: boolean | string;
};

function db() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

export function dataMode(): "neon" | "local" {
  return process.env.DATABASE_URL ? "neon" : "local";
}

function flag(value: boolean | string) {
  return value === true || value === "t" || value === "true";
}

function asGallery(value: unknown): ProjectImage[] {
  const source = typeof value === "string" ? safeJson(value) : value;
  if (!Array.isArray(source)) return [];
  return source.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as { url?: unknown; alt?: unknown };
    if (typeof record.url !== "string") return [];
    return [{ url: record.url, alt: typeof record.alt === "string" ? record.alt : "" }];
  });
}

function safeJson(value: string) {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return [];
  }
}

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    location: row.location,
    county: row.county,
    year: Number(row.year),
    duration: row.duration,
    clientType: row.client_type,
    scope: row.scope,
    outcome: row.outcome,
    summary: row.summary,
    body: row.body,
    heroImage: row.hero_image,
    heroAlt: row.hero_alt,
    beforeImage: row.before_image,
    beforeAlt: row.before_alt,
    afterImage: row.after_image,
    afterAlt: row.after_alt,
    gallery: asGallery(row.gallery),
    featured: flag(row.featured),
    published: flag(row.published),
    sortOrder: Number(row.sort_order),
  };
}

function mapTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    quote: row.quote,
    name: row.name,
    role: row.role,
    projectTitle: row.project_title,
    published: flag(row.published),
    sortOrder: Number(row.sort_order),
  };
}

function mapEnquiry(row: EnquiryRow): Enquiry {
  const created = row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at);
  return {
    id: row.id,
    type: row.type,
    name: row.name,
    email: row.email,
    phone: row.phone,
    county: row.county,
    projectType: row.project_type,
    budget: row.budget,
    timeline: row.timeline,
    message: row.message,
    status: row.status,
    createdAt: created,
    notified: flag(row.notified),
  };
}

function sortProjects(projects: Project[]) {
  return [...projects].sort((a, b) => a.sortOrder - b.sortOrder || b.year - a.year);
}

async function readProjects(kind: "public" | "admin") {
  const sql = db();
  if (!sql) return localProjects();
  try {
    const rows = (await sql`SELECT * FROM projects ORDER BY sort_order ASC, year DESC`) as ProjectRow[];
    return rows.map(mapProject);
  } catch (error) {
    if (kind === "admin") {
      throw new Error(
        "Could not read projects from Neon. Check DATABASE_URL, then run npm run db:setup.",
      );
    }
    console.error(error);
    return seedProjects;
  }
}

export async function getPublishedProjects() {
  "use cache";
  cacheLife("hours");
  cacheTag("projects");
  const projects = await readProjects("public");
  return sortProjects(projects.filter((project) => project.published));
}

export async function getPublishedProject(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("projects", `project-${slug}`);
  const projects = await getPublishedProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getPublishedTestimonials() {
  "use cache";
  cacheLife("hours");
  cacheTag("testimonials");
  const items = await readTestimonials("public");
  return items.filter((item) => item.published).sort((a, b) => a.sortOrder - b.sortOrder);
}

async function readTestimonials(kind: "public" | "admin") {
  const sql = db();
  if (!sql) return localTestimonials();
  try {
    const rows = (await sql`SELECT * FROM testimonials ORDER BY sort_order ASC`) as TestimonialRow[];
    return rows.map(mapTestimonial);
  } catch (error) {
    if (kind === "admin") {
      throw new Error("Could not read testimonials from Neon. Run npm run db:setup if this is a new database.");
    }
    console.error(error);
    return seedTestimonials;
  }
}

export async function getAllProjects() {
  await assertAdmin();
  return sortProjects(await readProjects("admin"));
}

export async function getProjectById(id: string) {
  const projects = await getAllProjects();
  return projects.find((project) => project.id === id) ?? null;
}

export async function getAllTestimonials() {
  await assertAdmin();
  const items = await readTestimonials("admin");
  return items.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getTestimonialById(id: string) {
  const items = await getAllTestimonials();
  return items.find((item) => item.id === id) ?? null;
}

const projectValues = (project: Project) => [
  project.id,
  project.slug,
  project.title,
  project.category,
  project.location,
  project.county,
  project.year,
  project.duration,
  project.clientType,
  project.scope,
  project.outcome,
  project.summary,
  project.body,
  project.heroImage,
  project.heroAlt,
  project.beforeImage,
  project.beforeAlt,
  project.afterImage,
  project.afterAlt,
  JSON.stringify(project.gallery),
  project.featured,
  project.published,
  project.sortOrder,
];

export async function upsertProject(project: Project) {
  await assertAdmin();
  const sql = db();
  if (!sql) {
    const projects = await localProjects();
    if (projects.some((item) => item.slug === project.slug && item.id !== project.id)) {
      throw new Error("Another project already uses this URL.");
    }
    const next = projects.some((item) => item.id === project.id)
      ? projects.map((item) => (item.id === project.id ? project : item))
      : [...projects, project];
    await saveLocalProjects(next);
    return project.id;
  }

  const clash = (await sql`SELECT id FROM projects WHERE slug = ${project.slug} AND id <> ${project.id}`) as Array<{
    id: string;
  }>;
  if (clash.length) throw new Error("Another project already uses this URL.");

  const existing = (await sql`SELECT id FROM projects WHERE id = ${project.id}`) as Array<{ id: string }>;
  const values = projectValues(project);
  if (existing.length) {
    await sql.query(
      `UPDATE projects SET
        slug = $2, title = $3, category = $4, location = $5, county = $6, year = $7,
        duration = $8, client_type = $9, scope = $10, outcome = $11, summary = $12, body = $13,
        hero_image = $14, hero_alt = $15, before_image = $16, before_alt = $17,
        after_image = $18, after_alt = $19, gallery = $20::jsonb, featured = $21,
        published = $22, sort_order = $23, updated_at = now()
      WHERE id = $1`,
      values,
    );
  } else {
    await sql.query(
      `INSERT INTO projects (
        id, slug, title, category, location, county, year, duration, client_type,
        scope, outcome, summary, body, hero_image, hero_alt, before_image, before_alt,
        after_image, after_alt, gallery, featured, published, sort_order
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20::jsonb,$21,$22,$23
      )`,
      values,
    );
  }
  return project.id;
}

export async function removeProject(id: string) {
  await assertAdmin();
  const sql = db();
  if (!sql) {
    const projects = await localProjects();
    const current = projects.find((project) => project.id === id);
    await saveLocalProjects(projects.filter((project) => project.id !== id));
    return current?.slug ?? null;
  }
  const rows = (await sql`DELETE FROM projects WHERE id = ${id} RETURNING slug`) as Array<{ slug: string }>;
  return rows[0]?.slug ?? null;
}

export async function upsertTestimonial(item: Testimonial) {
  await assertAdmin();
  const sql = db();
  if (!sql) {
    const items = await localTestimonials();
    const next = items.some((entry) => entry.id === item.id)
      ? items.map((entry) => (entry.id === item.id ? item : entry))
      : [...items, item];
    await saveLocalTestimonials(next);
    return item.id;
  }
  const existing = (await sql`SELECT id FROM testimonials WHERE id = ${item.id}`) as Array<{ id: string }>;
  if (existing.length) {
    await sql`UPDATE testimonials SET
      quote = ${item.quote},
      name = ${item.name},
      role = ${item.role},
      project_title = ${item.projectTitle},
      published = ${item.published},
      sort_order = ${item.sortOrder}
    WHERE id = ${item.id}`;
  } else {
    await sql`INSERT INTO testimonials (id, quote, name, role, project_title, published, sort_order)
      VALUES (${item.id}, ${item.quote}, ${item.name}, ${item.role}, ${item.projectTitle}, ${item.published}, ${item.sortOrder})`;
  }
  return item.id;
}

export async function removeTestimonial(id: string) {
  await assertAdmin();
  const sql = db();
  if (!sql) {
    const items = await localTestimonials();
    await saveLocalTestimonials(items.filter((item) => item.id !== id));
    return;
  }
  await sql`DELETE FROM testimonials WHERE id = ${id}`;
}

export async function getEnquiries() {
  await assertAdmin();
  const sql = db();
  if (!sql) {
    const items = await localEnquiries();
    return items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }
  const rows = (await sql`SELECT * FROM enquiries ORDER BY created_at DESC`) as EnquiryRow[];
  return rows.map(mapEnquiry);
}

export async function countNewEnquiries() {
  const items = await getEnquiries();
  return items.filter((item) => item.status === "new").length;
}

export async function createEnquiry(enquiry: Enquiry) {
  const sql = db();
  if (!sql) {
    if (process.env.VERCEL) {
      throw new Error("The studio inbox is not connected yet. Please call or WhatsApp, and we will pick it up.");
    }
    const items = await localEnquiries();
    await saveLocalEnquiries([enquiry, ...items]);
    return;
  }
  await sql`INSERT INTO enquiries (
    id, type, name, email, phone, county, project_type, budget, timeline, message, status, notified
  ) VALUES (
    ${enquiry.id}, ${enquiry.type}, ${enquiry.name}, ${enquiry.email}, ${enquiry.phone},
    ${enquiry.county}, ${enquiry.projectType}, ${enquiry.budget}, ${enquiry.timeline},
    ${enquiry.message}, ${enquiry.status}, ${enquiry.notified}
  )`;
}

export async function markEnquiryNotified(id: string) {
  const sql = db();
  if (!sql) {
    const items = await localEnquiries();
    await saveLocalEnquiries(items.map((item) => (item.id === id ? { ...item, notified: true } : item)));
    return;
  }
  await sql`UPDATE enquiries SET notified = true WHERE id = ${id}`;
}

export async function setEnquiryStatus(id: string, status: EnquiryStatus) {
  await assertAdmin();
  const sql = db();
  if (!sql) {
    const items = await localEnquiries();
    await saveLocalEnquiries(items.map((item) => (item.id === id ? { ...item, status } : item)));
    return;
  }
  await sql`UPDATE enquiries SET status = ${status} WHERE id = ${id}`;
}
