import Link from "next/link";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { deleteTestimonial } from "@/lib/actions/admin";
import { getAllTestimonials } from "@/lib/data";

export const metadata = { title: "Testimonials" };

export default async function TestimonialsAdminPage() {
  const items = await getAllTestimonials();

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Testimonials</p>
          <h1 className="mt-3 font-display text-5xl tracking-tight">What clients said</h1>
        </div>
        <Link href="/admin/testimonials/new" className="btn btn-accent">
          Add one
        </Link>
      </div>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <li key={item.id} className="py-5">
            <p className="text-lg leading-relaxed">“{item.quote}”</p>
            <p className="mt-2 text-sm text-muted">
              {item.name}, {item.role}
              {item.published ? "" : " · Hidden"}
            </p>
            <div className="mt-3 flex gap-4">
              <Link href={`/admin/testimonials/${item.id}`} className="text-sm underline-offset-4 hover:underline">
                Edit
              </Link>
              <ConfirmSubmit action={deleteTestimonial} id={item.id} label="Delete" confirm="Delete this testimonial?" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
