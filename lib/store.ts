import "server-only";

import { promises as fs } from "fs";
import path from "path";
import { seedProjects, seedTestimonials } from "@/lib/seed";
import type { Enquiry, Project, Testimonial } from "@/lib/types";

type LocalStore = {
  projects: Project[] | null;
  testimonials: Testimonial[] | null;
  enquiries: Enquiry[];
};

const file = path.join(process.cwd(), ".data", "store.json");

const empty: LocalStore = { projects: null, testimonials: null, enquiries: [] };

function cloneProjects(projects: Project[]): Project[] {
  return projects.map((project) => ({
    ...project,
    gallery: project.gallery.map((image) => ({ ...image })),
  }));
}

function cloneTestimonials(testimonials: Testimonial[]): Testimonial[] {
  return testimonials.map((item) => ({ ...item }));
}

export async function readStore(): Promise<LocalStore> {
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as Partial<LocalStore>;
    return {
      projects: parsed.projects ?? null,
      testimonials: parsed.testimonials ?? null,
      enquiries: parsed.enquiries ?? [],
    };
  } catch {
    return { ...empty, enquiries: [] };
  }
}

async function writeStore(store: LocalStore) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(store, null, 2));
}

export async function localProjects() {
  const store = await readStore();
  return store.projects ?? cloneProjects(seedProjects);
}

export async function localTestimonials() {
  const store = await readStore();
  return store.testimonials ?? cloneTestimonials(seedTestimonials);
}

export async function localEnquiries() {
  const store = await readStore();
  return store.enquiries;
}

export async function saveLocalProjects(projects: Project[]) {
  const store = await readStore();
  store.projects = projects;
  try {
    await writeStore(store);
  } catch {
    throw new Error("Could not save on this computer. Connect Neon if you want projects kept online.");
  }
}

export async function saveLocalTestimonials(testimonials: Testimonial[]) {
  const store = await readStore();
  store.testimonials = testimonials;
  try {
    await writeStore(store);
  } catch {
    throw new Error("Could not save on this computer. Connect Neon if you want testimonials kept online.");
  }
}

export async function saveLocalEnquiries(enquiries: Enquiry[]) {
  const store = await readStore();
  store.enquiries = enquiries;
  try {
    await writeStore(store);
  } catch {
    throw new Error("Could not store that message on this computer.");
  }
}
