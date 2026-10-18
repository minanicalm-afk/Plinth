import "server-only";

import type { Enquiry } from "@/lib/types";

export async function notifyEnquiry(enquiry: Enquiry) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return false;

  const from = process.env.EMAIL_FROM || "Plinth <onboarding@resend.dev>";
  const subject =
    enquiry.type === "quote"
      ? `Quote request from ${enquiry.name}`
      : `Message from ${enquiry.name}`;
  const lines = [
    `${enquiry.name} sent a ${enquiry.type === "quote" ? "quote request" : "message"} from the website.`,
    "",
    `Email: ${enquiry.email}`,
    enquiry.phone ? `Phone: ${enquiry.phone}` : "",
    enquiry.county ? `County: ${enquiry.county}` : "",
    enquiry.projectType ? `Project: ${enquiry.projectType}` : "",
    enquiry.budget ? `Budget: ${enquiry.budget}` : "",
    enquiry.timeline ? `Timing: ${enquiry.timeline}` : "",
    "",
    enquiry.message,
  ].filter((line) => line !== "");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: enquiry.email,
      subject,
      text: lines.join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("Email notification failed", await response.text());
    return false;
  }
  return true;
}
