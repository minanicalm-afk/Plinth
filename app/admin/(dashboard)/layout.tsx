import { Suspense } from "react";
import { AdminFrame } from "@/components/admin/frame";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <AdminFrame>{children}</AdminFrame>
    </Suspense>
  );
}
