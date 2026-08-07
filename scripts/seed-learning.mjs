import 'dotenv/config';
import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function query(text, params) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

async function seed() {
  console.log('Seeding learning system demo data...\n');

  // ============================================================
  // 1. Ensure teachers table exists
  // ============================================================
  await query(`CREATE TABLE IF NOT EXISTS teachers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    bio TEXT,
    specialization TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`);

  // ============================================================
  // 2. Create student user accounts (for login)
  // ============================================================
  const hash = await bcrypt.hash('student123', 10);

  const users = [
    { name: 'Budi Santoso', email: 'budi@example.com' },
    { name: 'Siti Rahmawati', email: 'siti@example.com' },
    { name: 'David Wong', email: 'david@example.com' },
  ];

  for (const u of users) {
    const existing = await query('SELECT id FROM users WHERE email = $1', [u.email]);
    if (existing.rows.length === 0) {
      const r = await query(
        'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id',
        [u.name, u.email, hash, 'student']
      );
      u.id = r.rows[0].id;
      console.log(`  ✓ Created user: ${u.email} / student123`);
    } else {
      u.id = existing.rows[0].id;
      console.log(`  ~ User exists: ${u.email}`);
    }
  }

  // ============================================================
  // 3. Link student records to user accounts
  // ============================================================
  const linkStudent = async (email, name) => {
    const user = users.find(u => u.email === email);
    if (!user) return null;
    const student = await query('SELECT id FROM students WHERE email = $1', [email]);
    if (student.rows.length > 0) {
      await query('UPDATE students SET user_id = $1 WHERE id = $2', [user.id, student.rows[0].id]);
      console.log(`  ✓ Linked ${name} (student #${student.rows[0].id}) → user #${user.id}`);
      return student.rows[0].id;
    }
    // Create student record if doesn't exist
    const r = await query(
      'INSERT INTO students (name, email, phone, notes, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [name, email, '081234567890', 'Auto-created by seed script', user.id]
    );
    console.log(`  ✓ Created student: ${name} (id: ${r.rows[0].id})`);
    return r.rows[0].id;
  };

  const budiId = await linkStudent('budi@example.com', 'Budi Santoso');
  const sitiId = await linkStudent('siti@example.com', 'Siti Rahmawati');
  const davidId = await linkStudent('david@example.com', 'David Wong');

  // ============================================================
  // 4. Get or create student packages
  // ============================================================
  const getOrCreatePackage = async (studentId, name, total, remaining, start, end, status) => {
    const existing = await query(
      'SELECT id FROM student_packages WHERE student_id = $1 AND package_name = $2 AND status = $3 LIMIT 1',
      [studentId, name, status]
    );
    if (existing.rows.length > 0) {
      console.log(`  ~ Package exists: ${name} (id: ${existing.rows[0].id})`);
      return existing.rows[0].id;
    }
    const r = await query(
      `INSERT INTO student_packages (student_id, package_name, total_sessions, remaining_sessions, start_date, end_date, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [studentId, name, total, remaining, start, end || null, status]
    );
    console.log(`  ✓ Created package: ${name} (id: ${r.rows[0].id})`);
    return r.rows[0].id;
  };

  // Get students
  const budi = await query('SELECT id FROM students WHERE name = $1', ['Budi Santoso']);
  const siti = await query('SELECT id FROM students WHERE name = $1', ['Siti Rahmawati']);
  const david = await query('SELECT id FROM students WHERE name = $1', ['David Wong']);

  if (!budi.rows.length || !siti.rows.length || !david.rows.length) {
    console.error('Students not found. Run the base seed first: npm run seed');
    await pool.end();
    process.exit(1);
  }

  const bs = budi.rows[0].id;
  const ss = siti.rows[0].id;
  const ds = david.rows[0].id;

  const p1 = await getOrCreatePackage(bs, 'IELTS Academic Prep Boost', 8, 5, '2026-05-01', '2026-07-01', 'active');
  const p2 = await getOrCreatePackage(bs, 'General English Mastery', 12, 0, '2026-01-15', '2026-04-15', 'completed');
  const p3 = await getOrCreatePackage(ss, 'Business Communication Pro', 10, 3, '2026-04-10', null, 'active');
  const p4 = await getOrCreatePackage(ds, 'General English Mastery', 12, 1, '2026-03-01', '2026-06-01', 'active');

  // ============================================================
  // 5. Create teachers
  // ============================================================
  const teachers = [
    { name: 'Ms. Sarah Johnson', email: 'sarah@els-corner.com', phone: '081111111111', bio: 'CELTA-certified with 8 years of IELTS teaching experience.', specialization: 'IELTS Preparation' },
    { name: 'Mr. Michael Chen', email: 'michael@els-corner.com', phone: '081111111112', bio: 'Business English specialist with corporate training background.', specialization: 'Business English' },
    { name: 'Ms. Amanda Putri', email: 'amanda@els-corner.com', phone: '081111111113', bio: 'General English expert focusing on conversational fluency.', specialization: 'General English' },
  ];

  const teacherIds = [];
  for (const t of teachers) {
    const existing = await query('SELECT id FROM teachers WHERE email = $1', [t.email]);
    if (existing.rows.length > 0) {
      teacherIds.push(existing.rows[0].id);
      console.log(`  ~ Teacher exists: ${t.name}`);
    } else {
      const r = await query(
        'INSERT INTO teachers (name, email, phone, bio, specialization) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [t.name, t.email, t.phone, t.bio, t.specialization]
      );
      teacherIds.push(r.rows[0].id);
      console.log(`  ✓ Created teacher: ${t.name}`);
    }
  }

  // ============================================================
  // 6. Create schedules
  // ============================================================
  await query(`CREATE TABLE IF NOT EXISTS schedules (
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
  )`);

  const scheduleData = [
    { pkg: p1, teacher: teacherIds[0], student: bs, date: '2026-05-02', start: '09:00', end: '10:30', status: 'completed', notes: 'IELTS Speaking Part 1' },
    { pkg: p1, teacher: teacherIds[0], student: bs, date: '2026-05-09', start: '09:00', end: '10:30', status: 'completed', notes: 'IELTS Listening Strategies' },
    { pkg: p1, teacher: teacherIds[0], student: bs, date: '2026-05-16', start: '09:00', end: '10:30', status: 'confirmed', notes: 'IELTS Writing Task 1' },
    { pkg: p1, teacher: teacherIds[0], student: bs, date: '2026-05-23', start: '09:00', end: '10:30', status: 'confirmed', notes: 'IELTS Writing Task 2' },
    { pkg: p1, teacher: teacherIds[0], student: bs, date: '2026-05-30', start: '09:00', end: '10:30', status: 'scheduled', notes: 'IELTS Reading Strategies' },
    { pkg: p3, teacher: teacherIds[1], student: ss, date: '2026-05-04', start: '14:00', end: '15:30', status: 'completed', notes: 'Business Email Writing' },
    { pkg: p3, teacher: teacherIds[1], student: ss, date: '2026-05-11', start: '14:00', end: '15:30', status: 'confirmed', notes: 'Presentation Skills' },
    { pkg: p3, teacher: teacherIds[1], student: ss, date: '2026-05-18', start: '14:00', end: '15:30', status: 'scheduled', notes: 'Negotiation Techniques' },
    { pkg: p4, teacher: teacherIds[2], student: ds, date: '2026-05-03', start: '10:00', end: '11:00', status: 'completed', notes: 'Conversation Practice' },
    { pkg: p4, teacher: teacherIds[2], student: ds, date: '2026-05-10', start: '10:00', end: '11:00', status: 'confirmed', notes: 'Grammar Review' },
    { pkg: p4, teacher: teacherIds[2], student: ds, date: '2026-05-17', start: '10:00', end: '11:00', status: 'scheduled', notes: 'Vocabulary Building' },
    { pkg: p4, teacher: teacherIds[2], student: ds, date: '2026-05-24', start: '10:00', end: '11:00', status: 'scheduled', notes: 'Reading Comprehension' },
  ];

  const scheduleIds = [];
  for (const s of scheduleData) {
    const existing = await query(
      'SELECT id FROM schedules WHERE student_package_id = $1 AND date = $2 AND start_time = $3',
      [s.pkg, s.date, s.start]
    );
    if (existing.rows.length > 0) {
      scheduleIds.push(existing.rows[0].id);
      continue;
    }
    const r = await query(
      `INSERT INTO schedules (student_package_id, teacher_id, student_id, date, start_time, end_time, status, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [s.pkg, s.teacher, s.student, s.date, s.start, s.end, s.status, s.notes]
    );
    scheduleIds.push(r.rows[0].id);
  }
  console.log(`  ✓ Created ${scheduleData.length} schedules`);

  // ============================================================
  // 7. Create meetings for confirmed/completed schedules
  // ============================================================
  await query(`CREATE TABLE IF NOT EXISTS meetings (
    id SERIAL PRIMARY KEY,
    schedule_id INTEGER NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
    provider TEXT NOT NULL DEFAULT 'google_meet',
    meeting_id TEXT,
    join_url TEXT NOT NULL,
    host_url TEXT,
    password TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`);

  const confirmedSchedules = await query(
    "SELECT id FROM schedules WHERE status IN ('confirmed', 'completed')"
  );
  for (const row of confirmedSchedules.rows) {
    const existing = await query('SELECT id FROM meetings WHERE schedule_id = $1', [row.id]);
    if (existing.rows.length > 0) continue;

    const code = Math.random().toString(36).substring(2, 12);
    const meetCode = `${code.substring(0, 3)}-${code.substring(3, 7)}-${code.substring(7, 11)}`;
    await query(
      `INSERT INTO meetings (schedule_id, provider, meeting_id, join_url, host_url) VALUES ($1, 'google_meet', $2, $3, $4)`,
      [row.id, meetCode, `https://meet.google.com/${meetCode}`, null]
    );
  }
  console.log(`  ✓ Created meetings for ${confirmedSchedules.rows.length} confirmed/completed schedules`);

  // ============================================================
  // Summary
  // ============================================================
  console.log('\n═══════════════════════════════════════════');
  console.log('  ✅ Seed complete!');
  console.log('═══════════════════════════════════════════');
  console.log('\n📧  Login Credentials:');
  console.log('  ┌──────────────────────┬──────────────┬──────────────────────────────┐');
  console.log('  │ Role                 │ Email        │ Password                     │');
  console.log('  ├──────────────────────┼──────────────┼──────────────────────────────┤');
  console.log('  │ Admin                │ admin@els-corner.com │ admin123                    │');
  console.log('  │ Student (Budi)       │ budi@example.com    │ student123                  │');
  console.log('  │ Student (Siti)       │ siti@example.com    │ student123                  │');
  console.log('  │ Student (David)      │ david@example.com   │ student123                  │');
  console.log('  └──────────────────────┴──────────────┴──────────────────────────────┘');
  console.log('\n📚  What was created:');
  console.log('  • 3 teachers (Sarah, Michael, Amanda)');
  console.log('  • 12 schedules (completed, confirmed, scheduled)');
  console.log('  • Google Meet links for confirmed/completed sessions');
  console.log('\n🌐  Login URLs:');
  console.log('  Admin:  http://localhost:3000/admin/login');
  console.log('  Student: http://localhost:3000/student/login');

  await pool.end();
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
