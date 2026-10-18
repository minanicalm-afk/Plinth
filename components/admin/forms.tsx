"use client";

import { useActionState } from "react";
import { saveProject, saveTestimonial } from "@/lib/actions/admin";
import { counties } from "@/lib/site";
import { categories, emptyFormState, type Project, type Testimonial } from "@/lib/types";

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block" htmlFor={name}>
      <span className="label">{label}</span>
      {children}
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}

export function ProjectForm({ project }: { project?: Project }) {
  const [state, action, pending] = useActionState(saveProject, emptyFormState);
  const errors = state.fieldErrors ?? {};
  const gallery = project?.gallery.map((image) => (image.alt ? `${image.url} | ${image.alt}` : image.url)).join("\n") ?? "";

  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="id" value={project?.id ?? ""} />
      {state.message ? <p className="text-sm text-accent-deep" role="alert">{state.message}</p> : null}

      <section className="space-y-5">
        <h2 className="font-display text-2xl">The job</h2>
        <Field label="Title" name="title" error={errors.title}>
          <input className="field" id="title" name="title" defaultValue={project?.title ?? ""} required />
        </Field>
        <Field label="URL" name="slug" error={errors.slug}>
          <input className="field" id="slug" name="slug" defaultValue={project?.slug ?? ""} placeholder="Left blank, it is made from the title" />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Category" name="category" error={errors.category}>
            <select className="select" id="category" name="category" defaultValue={project?.category ?? "Residential"}>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </Field>
          <Field label="Year" name="year" error={errors.year}>
            <input className="field" id="year" name="year" inputMode="numeric" defaultValue={project?.year ?? ""} required />
          </Field>
          <Field label="Location" name="location" error={errors.location}>
            <input className="field" id="location" name="location" defaultValue={project?.location ?? ""} placeholder="Karen, Nairobi" required />
          </Field>
          <Field label="County" name="county" error={errors.county}>
            <select className="select" id="county" name="county" defaultValue={project?.county ?? "Nairobi"}>
              {counties.map((county) => (
                <option key={county.slug}>{county.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Duration" name="duration" error={errors.duration}>
            <input className="field" id="duration" name="duration" defaultValue={project?.duration ?? ""} placeholder="14 months" required />
          </Field>
          <Field label="Client type" name="clientType" error={errors.clientType}>
            <input className="field" id="clientType" name="clientType" defaultValue={project?.clientType ?? ""} placeholder="Private client" required />
          </Field>
          <Field label="Order" name="sortOrder" error={errors.sortOrder}>
            <input className="field" id="sortOrder" name="sortOrder" inputMode="numeric" defaultValue={project?.sortOrder ?? 0} />
          </Field>
        </div>
        <Field label="Scope" name="scope" error={errors.scope}>
          <textarea className="textarea" id="scope" name="scope" defaultValue={project?.scope ?? ""} required />
        </Field>
        <Field label="Outcome" name="outcome" error={errors.outcome}>
          <textarea className="textarea" id="outcome" name="outcome" defaultValue={project?.outcome ?? ""} required />
        </Field>
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-2xl">The story</h2>
        <Field label="Summary" name="summary" error={errors.summary}>
          <textarea className="textarea" id="summary" name="summary" defaultValue={project?.summary ?? ""} required />
        </Field>
        <Field label="Case study" name="body" error={errors.body}>
          <textarea className="textarea min-h-56" id="body" name="body" defaultValue={project?.body ?? ""} required />
        </Field>
        <p className="text-sm text-muted">Leave a blank line between paragraphs.</p>
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-2xl">Photographs</h2>
        <p className="text-sm text-muted">Paste a full https address. Unsplash addresses are optimised automatically. Other https hosts still show.</p>
        <Field label="Main photograph" name="heroImage" error={errors.heroImage}>
          <input className="field" id="heroImage" name="heroImage" defaultValue={project?.heroImage ?? ""} required />
        </Field>
        <Field label="Main photograph description" name="heroAlt" error={errors.heroAlt}>
          <input className="field" id="heroAlt" name="heroAlt" defaultValue={project?.heroAlt ?? ""} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Before" name="beforeImage" error={errors.beforeImage}>
            <input className="field" id="beforeImage" name="beforeImage" defaultValue={project?.beforeImage ?? ""} required />
          </Field>
          <Field label="Before description" name="beforeAlt" error={errors.beforeAlt}>
            <input className="field" id="beforeAlt" name="beforeAlt" defaultValue={project?.beforeAlt ?? ""} />
          </Field>
          <Field label="After" name="afterImage" error={errors.afterImage}>
            <input className="field" id="afterImage" name="afterImage" defaultValue={project?.afterImage ?? ""} required />
          </Field>
          <Field label="After description" name="afterAlt" error={errors.afterAlt}>
            <input className="field" id="afterAlt" name="afterAlt" defaultValue={project?.afterAlt ?? ""} />
          </Field>
        </div>
        <Field label="Gallery" name="gallery" error={errors.gallery}>
          <textarea className="textarea min-h-40" id="gallery" name="gallery" defaultValue={gallery} placeholder={"https://… | A courtyard in the afternoon\nhttps://… | The kitchen"} />
        </Field>
      </section>

      <div className="flex flex-wrap gap-6 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="published" defaultChecked={project?.published ?? true} />
          Published
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" defaultChecked={project?.featured ?? false} />
          Show on the home page
        </label>
      </div>

      <div className="sticky bottom-0 -mx-5 flex items-center justify-between border-t border-line bg-paper/95 px-5 py-4 backdrop-blur md:-mx-10 md:px-10">
        <p className="text-sm text-muted">{pending ? "Saving…" : "Changes appear on the site immediately."}</p>
        <button className="btn btn-accent" type="submit" disabled={pending}>
          Save project
        </button>
      </div>
    </form>
  );
}

export function TestimonialForm({ item }: { item?: Testimonial }) {
  const [state, action, pending] = useActionState(saveTestimonial, emptyFormState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <input type="hidden" name="id" value={item?.id ?? ""} />
      {state.message ? <p className="text-sm text-accent-deep" role="alert">{state.message}</p> : null}
      <label className="block" htmlFor="quote">
        <span className="label">Quotation</span>
        <textarea className="textarea" id="quote" name="quote" defaultValue={item?.quote ?? ""} required />
        {errors.quote ? <span className="field-error">{errors.quote}</span> : null}
      </label>
      <label className="block" htmlFor="name">
        <span className="label">Name</span>
        <input className="field" id="name" name="name" defaultValue={item?.name ?? ""} required />
        {errors.name ? <span className="field-error">{errors.name}</span> : null}
      </label>
      <label className="block" htmlFor="role">
        <span className="label">Role</span>
        <input className="field" id="role" name="role" defaultValue={item?.role ?? ""} required />
        {errors.role ? <span className="field-error">{errors.role}</span> : null}
      </label>
      <label className="block" htmlFor="projectTitle">
        <span className="label">Project</span>
        <input className="field" id="projectTitle" name="projectTitle" defaultValue={item?.projectTitle ?? ""} />
      </label>
      <label className="block" htmlFor="sortOrder">
        <span className="label">Order</span>
        <input className="field" id="sortOrder" name="sortOrder" defaultValue={item?.sortOrder ?? 0} />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={item?.published ?? true} />
        Published
      </label>
      <button className="btn btn-accent" type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save testimonial"}
      </button>
    </form>
  );
}
