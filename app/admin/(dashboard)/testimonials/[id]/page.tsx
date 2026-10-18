import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/forms";
import { getTestimonialById } from "@/lib/data";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> };

export default async function EditTestimonialPage({ params, searchParams }: Props) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const item = await getTestimonialById(id);
  if (!item) notFound();

  return (
    <div>
      <p className="eyebrow">Testimonials</p>
      <h1 className="mt-3 mb-8 font-display text-5xl tracking-tight">Edit</h1>
      {query.saved ? <p className="mb-6 border border-line bg-white px-4 py-3 text-sm">Saved.</p> : null}
      <TestimonialForm item={item} />
    </div>
  );
}
