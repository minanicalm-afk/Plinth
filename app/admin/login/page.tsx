import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";
import { safeAdminPath } from "@/lib/auth-token";

export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
          <p className="font-display tracking-[0.2em]">PLINTH</p>
        </main>
      }
    >
      <LoginGate searchParams={searchParams} />
    </Suspense>
  );
}

async function LoginGate({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const params = await searchParams;
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-16">
      <Link href="/" className="font-display tracking-[0.2em]">
        PLINTH
      </Link>
      <h1 className="mt-10 font-display text-4xl tracking-tight">Studio door</h1>
      <p className="mt-3 text-ink-soft">For the people who keep the project list. Everyone else can stay on the site.</p>
      <LoginForm from={safeAdminPath(params.from ?? "/admin")} />
    </main>
  );
}
