-- Hackathon Registration Database Schema

CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  team_name VARCHAR(100) NOT NULL,
  leader_name VARCHAR(100) NOT NULL,
  leader_email VARCHAR(255) UNIQUE NOT NULL,
  leader_phone VARCHAR(20) NOT NULL,
  team_size INTEGER NOT NULL CHECK (team_size BETWEEN 1 AND 5),
  members JSONB,
  project_idea TEXT NOT NULL,
  tech_stack VARCHAR(255) NOT NULL,
  experience_level VARCHAR(50) NOT NULL CHECK (experience_level IN ('Beginner', 'Intermediate', 'Advanced')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(leader_email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);
