CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Renovation')),
  location text NOT NULL,
  county text NOT NULL,
  year integer NOT NULL,
  duration text NOT NULL,
  client_type text NOT NULL,
  scope text NOT NULL,
  outcome text NOT NULL,
  summary text NOT NULL,
  body text NOT NULL,
  hero_image text NOT NULL,
  hero_alt text NOT NULL DEFAULT '',
  before_image text NOT NULL,
  before_alt text NOT NULL DEFAULT '',
  after_image text NOT NULL,
  after_alt text NOT NULL DEFAULT '',
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY,
  quote text NOT NULL,
  name text NOT NULL,
  role text NOT NULL,
  project_title text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY,
  type text NOT NULL CHECK (type IN ('quote', 'contact')),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  county text NOT NULL DEFAULT '',
  project_type text NOT NULL DEFAULT '',
  budget text NOT NULL DEFAULT '',
  timeline text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  notified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS projects_published_idx ON projects (published, sort_order);
CREATE INDEX IF NOT EXISTS enquiries_created_idx ON enquiries (created_at DESC);
