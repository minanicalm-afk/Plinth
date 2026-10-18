"use server";

import { createEnquiry, markEnquiryNotified } from "@/lib/data";
import { notifyEnquiry } from "@/lib/email";
import { budgets, timelines } from "@/lib/content";
import { counties } from "@/lib/site";
import { categories, type Enquiry, type FormState } from "@/lib/types";
import { oneLine } from "@/lib/utils";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function read(formData: FormData, key: string) {
  return oneLine(String(formData.get(key) ?? ""));
}

export async function submitQuote(_prev: FormState, formData: FormData): Promise<FormState> {
  if (read(formData, "website")) return { ok: true };

  const name = read(formData, "name");
  const email = read(formData, "email");
  const phone = read(formData, "phone");
  const county = read(formData, "county");
  const projectType = read(formData, "projectType");
  const budget = read(formData, "budget");
  const timeline = read(formData, "timeline");
  const message = String(formData.get("message") ?? "").trim();
  const fieldErrors: Record<string, string> = {};

  if (name.length < 2) fieldErrors.name = "Tell us who to ask for.";
  if (!emailPattern.test(email)) fieldErrors.email = "We need an email that works.";
  if (phone.replace(/\D/g, "").length < 8) fieldErrors.phone = "Add a phone number we can call.";
  if (!counties.some((item) => item.name === county)) fieldErrors.county = "Choose a county.";
  if (![...categories, "Not sure yet"].includes(projectType)) fieldErrors.projectType = "Choose a project type.";
  if (!budgets.includes(budget)) fieldErrors.budget = "Choose a range, or say you are not sure.";
  if (!timelines.includes(timeline)) fieldErrors.timeline = "Tell us roughly when.";
  if (message.length < 10) fieldErrors.message = "A sentence or two about the site is enough.";
  if (message.length > 5000) fieldErrors.message = "Please keep the note under 5,000 characters.";

  if (Object.keys(fieldErrors).length) {
    return { ok: false, message: "Check the highlighted fields.", fieldErrors };
  }

  return saveEnquiry({
    type: "quote",
    name,
    email,
    phone,
    county,
    projectType,
    budget,
    timeline,
    message,
  });
}

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  if (read(formData, "website")) return { ok: true };

  const name = read(formData, "name");
  const email = read(formData, "email");
  const phone = read(formData, "phone");
  const message = String(formData.get("message") ?? "").trim();
  const fieldErrors: Record<string, string> = {};

  if (name.length < 2) fieldErrors.name = "Tell us who to ask for.";
  if (!emailPattern.test(email)) fieldErrors.email = "We need an email that works.";
  if (phone && phone.replace(/\D/g, "").length < 8) fieldErrors.phone = "That phone number looks short.";
  if (message.length < 10) fieldErrors.message = "Write a short note and we will reply.";
  if (message.length > 5000) fieldErrors.message = "Please keep the note under 5,000 characters.";

  if (Object.keys(fieldErrors).length) {
    return { ok: false, message: "Check the highlighted fields.", fieldErrors };
  }

  return saveEnquiry({
    type: "contact",
    name,
    email,
    phone,
    county: "",
    projectType: "",
    budget: "",
    timeline: "",
    message,
  });
}

async function saveEnquiry(input: Omit<Enquiry, "id" | "status" | "createdAt" | "notified">): Promise<FormState> {
  const enquiry: Enquiry = {
    ...input,
    id: crypto.randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
    notified: false,
  };

  try {
    await createEnquiry(enquiry);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "We could not store that message. Please call the studio.",
    };
  }

  try {
    const sent = await notifyEnquiry(enquiry);
    if (sent) await markEnquiryNotified(enquiry.id);
  } catch (error) {
    console.error(error);
  }

  return { ok: true };
}
