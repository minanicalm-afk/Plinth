"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions/admin";
import { emptyFormState } from "@/lib/types";

export function LoginForm({ from }: { from: string }) {
  const [state, action, pending] = useActionState(login, emptyFormState);

  return (
    <form action={action} className="mt-10 space-y-5">
      <input type="hidden" name="from" value={from} />
      <label className="block">
        <span className="label">Password</span>
        <input className="field" name="password" type="password" autoComplete="current-password" required />
      </label>
      {state.message ? (
        <p className="text-sm text-accent-deep" role="alert">
          {state.message}
        </p>
      ) : null}
      <button className="btn btn-accent" type="submit" disabled={pending}>
        {pending ? "Checking…" : "Enter"}
      </button>
    </form>
  );
}
