CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER CHECK (age >= 0),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  profile_url TEXT,
  last_request_by TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
