import { updateEnquiryStatus } from "@/lib/actions/admin";
import { getEnquiries } from "@/lib/data";
import { formatWhen } from "@/lib/utils";

export const metadata = { title: "Enquiries" };

export default async function EnquiriesPage() {
  const items = await getEnquiries();

  return (
    <div className="max-w-3xl">
      <p className="eyebrow">Enquiries</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">Messages</h1>
      <p className="mt-4 max-w-xl text-ink-soft">
        Quote requests and contact notes land here. If email is connected, a copy is also sent to the studio inbox.
      </p>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {items.length === 0 ? <li className="py-8 text-muted">No messages yet.</li> : null}
        {items.map((item) => (
          <li key={item.id} className="py-6">
            <details>
              <summary className="cursor-pointer list-none">
                <span className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="font-medium">
                    {item.name}
                    <span className="ml-2 text-sm font-normal text-muted">
                      {item.type === "quote" ? "Quote" : "Message"}
                      {item.status === "new" ? " · New" : ""}
                      {item.status === "archived" ? " · Archived" : ""}
                    </span>
                  </span>
                  <span className="text-sm text-muted">{formatWhen(item.createdAt)}</span>
                </span>
              </summary>
              <div className="mt-4 space-y-2 text-sm leading-relaxed">
                <p><a className="underline" href={`mailto:${item.email}`}>{item.email}</a></p>
                {item.phone ? <p>{item.phone}</p> : null}
                {item.county ? <p>{item.county}</p> : null}
                {item.projectType ? <p>{item.projectType}</p> : null}
                {item.budget ? <p>{item.budget}</p> : null}
                {item.timeline ? <p>{item.timeline}</p> : null}
                <p className="max-w-2xl whitespace-pre-wrap pt-2 text-base">{item.message}</p>
                {!item.notified ? (
                  <p className="text-muted">Saved here. An email was not sent — add RESEND_API_KEY and NOTIFY_EMAIL when you want that.</p>
                ) : null}
                <div className="flex gap-3 pt-3">
                  {item.status !== "read" ? (
                    <form action={updateEnquiryStatus}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="status" value="read" />
                      <button className="text-sm underline-offset-4 hover:underline" type="submit">Mark read</button>
                    </form>
                  ) : null}
                  {item.status !== "archived" ? (
                    <form action={updateEnquiryStatus}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="status" value="archived" />
                      <button className="text-sm text-muted underline-offset-4 hover:underline" type="submit">Archive</button>
                    </form>
                  ) : null}
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
