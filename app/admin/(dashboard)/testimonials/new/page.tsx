import { TestimonialForm } from "@/components/admin/forms";

export const metadata = { title: "New testimonial" };

export default function NewTestimonialPage() {
  return (
    <div>
      <p className="eyebrow">Testimonials</p>
      <h1 className="mt-3 mb-10 font-display text-5xl tracking-tight">New testimonial</h1>
      <TestimonialForm />
    </div>
  );
}
