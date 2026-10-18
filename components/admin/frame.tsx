import { logout } from "@/lib/actions/admin";
import { AdminNav } from "@/components/admin/nav";
import { countNewEnquiries, dataMode } from "@/lib/data";
import { assertAdmin } from "@/lib/session";

export async function AdminFrame({ children }: { children: React.ReactNode }) {
  await assertAdmin();
  const fresh = await countNewEnquiries();

  return (
    <div className="min-h-screen bg-paper md:grid md:grid-cols-[240px_1fr]">
      <aside className="flex flex-col justify-between border-b border-line md:min-h-screen md:border-r md:border-b-0">
        <AdminNav fresh={fresh} mode={dataMode()} />
        <form action={logout} className="px-5 pb-6">
          <button className="text-sm text-muted" type="submit">
            Sign out
          </button>
        </form>
      </aside>
      <div className="px-5 py-8 md:px-10 md:py-12">{children}</div>
    </div>
  );
}
