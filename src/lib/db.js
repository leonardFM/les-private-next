import { Pool } from 'pg';

let pool;

function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  return pool;
}

export async function query(text, params) {
  const client = await getPool().connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

export async function get(text, params) {
  const result = await query(text, params);
  return result.rows[0] || null;
}

export async function all(text, params) {
  const result = await query(text, params);
  return result.rows;
}

export async function initDb() {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('placeholder')) return;
  try {
    await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      program TEXT,
      format TEXT,
      message TEXT,
      status TEXT DEFAULT 'new',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS programs (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL DEFAULT '{}',
      description TEXT DEFAULT '{}',
      category TEXT DEFAULT '',
      format TEXT DEFAULT '{}',
      level TEXT DEFAULT '{}',
      duration TEXT DEFAULT '',
      price TEXT DEFAULT '{}',
      icon TEXT DEFAULT '📖',
      active INTEGER DEFAULT 1,
      featured INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL DEFAULT '{}',
      course TEXT DEFAULT '{}',
      rating INTEGER DEFAULT 5,
      quote TEXT DEFAULT '{}',
      initials TEXT DEFAULT '',
      active INTEGER DEFAULT 1,
      featured INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS faqs (
      id SERIAL PRIMARY KEY,
      question TEXT NOT NULL DEFAULT '{}',
      answer TEXT NOT NULL DEFAULT '{}',
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS student_packages (
      id SERIAL PRIMARY KEY,
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      package_name TEXT NOT NULL,
      total_sessions INTEGER NOT NULL DEFAULT 0,
      remaining_sessions INTEGER NOT NULL DEFAULT 0,
      start_date TEXT NOT NULL,
      end_date TEXT,
      status TEXT DEFAULT 'active',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS session_records (
      id SERIAL PRIMARY KEY,
      student_package_id INTEGER NOT NULL REFERENCES student_packages(id) ON DELETE CASCADE,
      session_date TEXT NOT NULL,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  } catch (err) {
    console.warn('initDb skipped:', err.message);
  }
}
