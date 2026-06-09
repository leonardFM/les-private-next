import { Pool } from 'pg';

let pool;

function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
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
      role TEXT DEFAULT 'admin',
      phone TEXT,
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

    CREATE INDEX IF NOT EXISTS idx_session_records_package_id ON session_records(student_package_id);

    CREATE INDEX IF NOT EXISTS idx_student_packages_student_id ON student_packages(student_id);
    CREATE INDEX IF NOT EXISTS idx_student_packages_status ON student_packages(status);
    CREATE INDEX IF NOT EXISTS idx_students_created_at ON students(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_programs_active ON programs(active);
    CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(active);
    CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
    CREATE INDEX IF NOT EXISTS idx_payments_payment_status ON payments(payment_status);
    CREATE INDEX IF NOT EXISTS idx_payments_student_id ON payments(student_id);

    CREATE TABLE IF NOT EXISTS packages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      total_sessions INTEGER NOT NULL DEFAULT 0,
      price INTEGER NOT NULL DEFAULT 0,
      active INTEGER DEFAULT 1,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      order_id TEXT UNIQUE NOT NULL,
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      student_package_id INTEGER REFERENCES student_packages(id) ON DELETE SET NULL,
      package_name TEXT,
      total_sessions INTEGER DEFAULT 0,
      amount INTEGER NOT NULL,
      payment_status TEXT DEFAULT 'pending',
      transaction_status TEXT,
      payment_type TEXT,
      transaction_id TEXT,
      snap_token TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'admin';
    ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT;
    ALTER TABLE payments ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;
    ALTER TABLE payments ADD COLUMN IF NOT EXISTS package_id INTEGER REFERENCES packages(id) ON DELETE SET NULL;
    ALTER TABLE students ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;
  `);
  } catch (err) {
    console.warn('initDb skipped:', err.message);
  }
}
