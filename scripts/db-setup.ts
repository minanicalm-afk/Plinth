import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";
import { seedProjects, seedTestimonials } from "../lib/seed";

function loadEnvFile() {
  if (process.env.DATABASE_URL) return;
  try {
    const raw = readFileSync(".env.local", "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const index = trimmed.indexOf("=");
      if (index === -1) continue;
      const key = trimmed.slice(0, index).trim();
      let value = trimmed.slice(index + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // The script reports a missing URL below.
  }
}

async function main() {
  loadEnvFile();
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("Add DATABASE_URL to .env.local, then run this again.");
    process.exit(1);
  }

  const sql = neon(url);
  const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8");
  const statements = schema
    .split(";")
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await sql.query(statement);
  }

  for (const project of seedProjects) {
    await sql.query(
      `INSERT INTO projects (
        id, slug, title, category, location, county, year, duration, client_type,
        scope, outcome, summary, body, hero_image, hero_alt, before_image, before_alt,
        after_image, after_alt, gallery, featured, published, sort_order
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20::jsonb,$21,$22,$23
      ) ON CONFLICT (slug) DO NOTHING`,
      [
        project.id,
        project.slug,
        project.title,
        project.category,
        project.location,
        project.county,
        project.year,
        project.duration,
        project.clientType,
        project.scope,
        project.outcome,
        project.summary,
        project.body,
        project.heroImage,
        project.heroAlt,
        project.beforeImage,
        project.beforeAlt,
        project.afterImage,
        project.afterAlt,
        JSON.stringify(project.gallery),
        project.featured,
        project.published,
        project.sortOrder,
      ],
    );
  }

  for (const item of seedTestimonials) {
    await sql.query(
      `INSERT INTO testimonials (id, quote, name, role, project_title, published, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (id) DO NOTHING`,
      [item.id, item.quote, item.name, item.role, item.projectTitle, item.published, item.sortOrder],
    );
  }

  console.log("Neon is ready. Sample projects and testimonials are in place if they were not already.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
