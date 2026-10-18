import { site, whatsappUrl } from "@/lib/site";

export function ReachDock() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-white/10 bg-ink pb-[env(safe-area-inset-bottom)] text-paper md:hidden">
        <a
          className="flex flex-1 items-center justify-center py-3.5 text-sm font-semibold"
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <a
          className="flex flex-1 items-center justify-center border-l border-white/15 py-3.5 text-sm font-semibold"
          href={`tel:${site.phoneTel}`}
        >
          Call
        </a>
      </div>
      <div className="fixed bottom-6 right-6 z-40 hidden gap-2 md:flex">
        <a className="btn btn-ink" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <a className="btn btn-accent" href={`tel:${site.phoneTel}`}>
          Call
        </a>
      </div>
    </>
  );
}
