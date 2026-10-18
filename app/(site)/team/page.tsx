import { team } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Team",
  description: "The people who run Plinth Construction in Nairobi — directors, site leads and the commercial desk.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
      <p className="eyebrow">Team</p>
      <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.04em]">
        The people who answer the phone know the site.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
        The site crews are larger than this list. What matters is that a foreman stays with a job from setting out to handover, and that the person you call can tell you what happened on Friday.
      </p>
      <ul className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((person) => (
          <li key={person.name} className="border-t border-line pt-6">
            <p className="font-display text-5xl tracking-tight text-ink/80" aria-hidden>
              {person.initials}
            </p>
            <h2 className="mt-8 font-display text-3xl tracking-tight">{person.name}</h2>
            <p className="mt-1 text-sm text-accent">{person.role}</p>
            <p className="mt-4 leading-relaxed text-ink-soft">{person.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
