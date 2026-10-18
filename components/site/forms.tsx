"use client";

import { useActionState } from "react";
import { submitContact, submitQuote } from "@/lib/actions/enquiry";
import { budgets, timelines } from "@/lib/content";
import { counties, site } from "@/lib/site";
import { categories, emptyFormState, type FormState } from "@/lib/types";

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

function Honeypot() {
  return (
    <div className="absolute left-[-9999px] h-0 overflow-hidden" aria-hidden="true">
      <label>
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function Success({ title }: { title: string }) {
  return (
    <div className="border border-line bg-white p-8 md:p-10">
      <p className="eyebrow">Received</p>
      <h2 className="mt-3 font-display text-4xl tracking-tight">{title}</h2>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
        We reply within one working day. If it is urgent, call or WhatsApp the studio on {site.phoneDisplay}.
      </p>
    </div>
  );
}

function Notice({ state }: { state: FormState }) {
  if (!state.message || state.ok) return null;
  return (
    <p className="border border-accent/30 bg-white px-4 py-3 text-sm text-accent-deep" role="alert">
      {state.message}
    </p>
  );
}

export function QuoteForm() {
  const [state, action, pending] = useActionState(submitQuote, emptyFormState);
  if (state.ok) return <Success title="We've got the brief." />;
  const errors = state.fieldErrors ?? {};

  return (
    <form action={action} className="relative space-y-5" noValidate>
      <Honeypot />
      <Notice state={state} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name}>
          <input className="field" id="name" name="name" autoComplete="name" required />
        </Field>
        <Field label="Email" name="email" error={errors.email}>
          <input className="field" id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field label="Phone" name="phone" error={errors.phone}>
          <input className="field" id="phone" name="phone" type="tel" autoComplete="tel" required />
        </Field>
        <Field label="County" name="county" error={errors.county}>
          <select className="select" id="county" name="county" defaultValue="" required>
            <option value="" disabled>Choose</option>
            {counties.map((county) => (
              <option key={county.slug}>{county.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Project type" name="projectType" error={errors.projectType}>
          <select className="select" id="projectType" name="projectType" defaultValue="" required>
            <option value="" disabled>Choose</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
            <option>Not sure yet</option>
          </select>
        </Field>
        <Field label="Approximate budget" name="budget" error={errors.budget}>
          <select className="select" id="budget" name="budget" defaultValue="" required>
            <option value="" disabled>Choose</option>
            {budgets.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="When should it start" name="timeline" error={errors.timeline}>
        <select className="select" id="timeline" name="timeline" defaultValue="" required>
          <option value="" disabled>Choose</option>
          {timelines.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </Field>
      <Field label="The site, in a few lines" name="message" error={errors.message}>
        <textarea className="textarea" id="message" name="message" required />
      </Field>
      <button className="btn btn-accent" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Request a Quote"}
      </button>
    </form>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, emptyFormState);
  if (state.ok) return <Success title="Message received." />;
  const errors = state.fieldErrors ?? {};

  return (
    <form action={action} className="relative space-y-5" noValidate>
      <Honeypot />
      <Notice state={state} />
      <Field label="Name" name="name" error={errors.name}>
        <input className="field" id="contact-name" name="name" autoComplete="name" required />
      </Field>
      <Field label="Email" name="email" error={errors.email}>
        <input className="field" id="contact-email" name="email" type="email" autoComplete="email" required />
      </Field>
      <Field label="Phone, if you like" name="phone" error={errors.phone}>
        <input className="field" id="contact-phone" name="phone" type="tel" autoComplete="tel" />
      </Field>
      <Field label="Message" name="message" error={errors.message}>
        <textarea className="textarea" id="contact-message" name="message" required />
      </Field>
      <button className="btn btn-accent" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
