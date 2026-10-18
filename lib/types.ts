export const categories = [
  "Residential",
  "Commercial",
  "Industrial",
  "Infrastructure",
  "Renovation",
] as const;

export type Category = (typeof categories)[number];

export function isCategory(value: string): value is Category {
  return (categories as readonly string[]).includes(value);
}

export type ProjectImage = {
  url: string;
  alt: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: Category;
  location: string;
  county: string;
  year: number;
  duration: string;
  clientType: string;
  scope: string;
  outcome: string;
  summary: string;
  body: string;
  heroImage: string;
  heroAlt: string;
  beforeImage: string;
  beforeAlt: string;
  afterImage: string;
  afterAlt: string;
  gallery: ProjectImage[];
  featured: boolean;
  published: boolean;
  sortOrder: number;
};

export type ProjectCard = {
  slug: string;
  title: string;
  category: Category;
  location: string;
  year: number;
  heroImage: string;
  heroAlt: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  projectTitle: string;
  published: boolean;
  sortOrder: number;
};

export type EnquiryType = "quote" | "contact";
export type EnquiryStatus = "new" | "read" | "archived";

export type Enquiry = {
  id: string;
  type: EnquiryType;
  name: string;
  email: string;
  phone: string;
  county: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  notified: boolean;
};

export type FormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

export const emptyFormState: FormState = { ok: false };

export function toCard(project: Project): ProjectCard {
  return {
    slug: project.slug,
    title: project.title,
    category: project.category,
    location: project.location,
    year: project.year,
    heroImage: project.heroImage,
    heroAlt: project.heroAlt,
  };
}
