-- Basic schema for Astra backend (run once)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  password_hash text,
  role text NOT NULL DEFAULT 'member',
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  parent_id uuid REFERENCES teams(id)
);

CREATE TABLE IF NOT EXISTS team_members (
  team_id uuid REFERENCES teams(id),
  user_id uuid REFERENCES users(id),
  role text,
  PRIMARY KEY(team_id, user_id)
);

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  created_by uuid REFERENCES users(id),
  assigned_to uuid REFERENCES users(id),
  status text DEFAULT 'open',
  due_date date,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS daily_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  team_id uuid REFERENCES teams(id),
  text text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  team_id uuid REFERENCES teams(id),
  s3_key text,
  original_name text,
  mime_type text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faults (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reported_by uuid REFERENCES users(id),
  team_id uuid REFERENCES teams(id),
  description text,
  status text DEFAULT 'open',
  created_at timestamptz DEFAULT now()
);
