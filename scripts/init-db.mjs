// Run: node scripts/init-db.mjs
// This ensures all tables exist without needing to load a page

import '../src/lib/db.js';

// The initDb is called when the module is loaded via page access.
// This standalone script uses the query function directly to run schema SQL.
import { Pool } from 'pg';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL || DATABASE_URL.includes('placeholder')) {
  console.error('DATABASE_URL not set or is placeholder');
  process.exit(1);
}

const pool = new Pool({ connectionString: DATABASE_URL });

async function run(sql) {
  try {
    await pool.query(sql);
    console.log('  ✓', sql.split('\n')[0].slice(0, 70).trim());
  } catch (err) {
    console.warn('  ⚠', err.message.slice(0, 80));
  }
}

async function main() {
  console.log('Running database migration...\n');

  const statements = [
    // Core tables
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      phone TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS programs (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL DEFAULT '{}',
      description TEXT DEFAULT '{}',
      category TEXT DEFAULT '',
      format TEXT DEFAULT '{}',
      level TEXT DEFAULT '{}',
      duration TEXT DEFAULT '',
      price TEXT DEFAULT '{}',
      icon TEXT DEFAULT E'📖',
      active INTEGER DEFAULT 1,
      featured INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS testimonials (
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
    )`,

    `CREATE TABLE IF NOT EXISTS faqs (
      id SERIAL PRIMARY KEY,
      question TEXT NOT NULL DEFAULT '{}',
      answer TEXT NOT NULL DEFAULT '{}',
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    )`,

    `CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS packages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      total_sessions INTEGER NOT NULL DEFAULT 0,
      price INTEGER NOT NULL DEFAULT 0,
      active INTEGER DEFAULT 1,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS student_packages (
      id SERIAL PRIMARY KEY,
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      package_name TEXT NOT NULL,
      total_sessions INTEGER NOT NULL DEFAULT 0,
      remaining_sessions INTEGER NOT NULL DEFAULT 0,
      start_date TEXT NOT NULL,
      end_date TEXT,
      status TEXT DEFAULT 'active',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS session_records (
      id SERIAL PRIMARY KEY,
      student_package_id INTEGER NOT NULL REFERENCES student_packages(id) ON DELETE CASCADE,
      session_date TEXT NOT NULL,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS payments (
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
    )`,

    `CREATE TABLE IF NOT EXISTS teachers (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      bio TEXT,
      specialization TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS schedules (
      id SERIAL PRIMARY KEY,
      student_package_id INTEGER NOT NULL REFERENCES student_packages(id) ON DELETE CASCADE,
      teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      date DATE NOT NULL,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL,
      status TEXT DEFAULT 'scheduled',
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS meetings (
      id SERIAL PRIMARY KEY,
      schedule_id INTEGER NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
      provider TEXT NOT NULL DEFAULT 'none',
      meeting_id TEXT,
      join_url TEXT NOT NULL,
      host_url TEXT,
      password TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,
  ];

  for (const sql of statements) {
    await run(sql);
  }

  // Indexes
  console.log('\nCreating indexes...');
  const indexes = [
    'CREATE INDEX IF NOT EXISTS idx_session_records_package_id ON session_records(student_package_id)',
    'CREATE INDEX IF NOT EXISTS idx_student_packages_student_id ON student_packages(student_id)',
    'CREATE INDEX IF NOT EXISTS idx_student_packages_status ON student_packages(status)',
    'CREATE INDEX IF NOT EXISTS idx_students_created_at ON students(created_at DESC)',
    'CREATE INDEX IF NOT EXISTS idx_programs_active ON programs(active)',
    'CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(active)',
    'CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id)',
    'CREATE INDEX IF NOT EXISTS idx_payments_payment_status ON payments(payment_status)',
    'CREATE INDEX IF NOT EXISTS idx_payments_student_id ON payments(student_id)',
    'CREATE INDEX IF NOT EXISTS idx_schedules_student_package_id ON schedules(student_package_id)',
    'CREATE INDEX IF NOT EXISTS idx_schedules_student_id ON schedules(student_id)',
    'CREATE INDEX IF NOT EXISTS idx_schedules_teacher_id ON schedules(teacher_id)',
    'CREATE INDEX IF NOT EXISTS idx_schedules_date ON schedules(date)',
    'CREATE UNIQUE INDEX IF NOT EXISTS idx_meetings_schedule_id ON meetings(schedule_id)',
  ];
  for (const sql of indexes) {
    await run(sql);
  }

  // ALTER TABLE migrations
  console.log('\nRunning ALTER TABLE migrations...');
  const alters = [
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'admin'`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT`,
    `ALTER TABLE payments ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE SET NULL`,
    `ALTER TABLE payments ADD COLUMN IF NOT EXISTS package_id INTEGER REFERENCES packages(id) ON DELETE SET NULL`,
    `ALTER TABLE students ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE SET NULL`,
    `ALTER TABLE session_records ADD COLUMN IF NOT EXISTS schedule_id INTEGER REFERENCES schedules(id) ON DELETE SET NULL`,
  ];
  for (const sql of alters) {
    await run(sql);
  }

  await pool.end();
  console.log('\nMigration complete.');
}

main().catch(err => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
