"use client";

export function ConfirmSubmit({
  action,
  label,
  confirm,
  id,
}: {
  action: (formData: FormData) => void;
  label: string;
  confirm: string;
  id: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirm)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-sm text-accent">
        {label}
      </button>
    </form>
  );
}
