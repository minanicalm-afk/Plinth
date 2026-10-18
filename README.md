# Plinth Construction

A portfolio site for a Nairobi building contractor. Sample projects, testimonials and copy are already in place so the site can be shown before a database is connected. Replace them with the company's own work before it goes live.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The studio dashboard is at [http://localhost:3000/admin](http://localhost:3000/admin). The local password is in `.env.local` (`ADMIN_PASSWORD`).

## Change the company

Edit `lib/site.ts`. Name, phone, email, address, NCA category and the years in business all live there. The phone number in the sample is a placeholder. Replace it before anyone uses WhatsApp or Call.

Services, the team and the way a job is described are in `lib/content.ts`.

## Projects, testimonials and messages

Without `DATABASE_URL`, the site shows the sample projects and saves new messages and edits on this computer, in `.data/`. That is enough for a local demonstration.

For the live site, use Neon:

1. Create a project at [neon.tech](https://neon.tech) and copy the pooled connection string.
2. Put it in `.env.local` as `DATABASE_URL`.
3. Run `npm run db:setup`.

That creates the tables and inserts the sample projects once. Later edits in the dashboard are kept. Running setup again does not overwrite them.

On Vercel, add the same `DATABASE_URL` before the first deploy, and run `npm run db:setup` once from your computer.

## Email

Quote requests and contact notes are always stored. To also email the studio, add these to the environment:

- `RESEND_API_KEY` from [resend.com](https://resend.com)
- `NOTIFY_EMAIL` — the inbox that should receive the lead
- `EMAIL_FROM` — a sender Resend has verified, for example `Plinth <hello@yourdomain.co.ke>`

Until those are set, the message still appears in the dashboard under Enquiries.

## Deploy

The site is a Next.js app. Import the repository in Vercel, set the environment variables from `.env.example`, and deploy. Set `NEXT_PUBLIC_SITE_URL` to the real address so the canonical links and the sitemap point at the company, not the sample domain.

## Before it is public

- Replace the phone number, email and street address.
- Replace the sample projects, or unpublish them, and add the company's own photographs.
- Replace the team names.
- Confirm the NCA category is the one the company actually holds.
- Change `ADMIN_PASSWORD` and `ADMIN_SECRET`.
# Plith
