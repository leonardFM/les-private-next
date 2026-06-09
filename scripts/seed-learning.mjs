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
  // 8. Create modules & materials
  // ============================================================
  await query(`CREATE TABLE IF NOT EXISTS modules (
    id SERIAL PRIMARY KEY,
    package_id INTEGER NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`);

  await query(`CREATE TABLE IF NOT EXISTS materials (
    id SERIAL PRIMARY KEY,
    module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'text',
    content TEXT,
    file_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`);

  // Get package IDs from the packages catalog table
  const ieltsPkg = await query("SELECT id FROM packages WHERE name LIKE '%IELTS%' LIMIT 1");
  const businessPkg = await query("SELECT id FROM packages WHERE name LIKE '%Business%' LIMIT 1");
  const generalPkg = await query("SELECT id FROM packages WHERE name LIKE '%General English%' LIMIT 1");

  const catalogPkgIds = [];
  if (ieltsPkg.rows.length > 0) catalogPkgIds.push(ieltsPkg.rows[0].id);
  if (businessPkg.rows.length > 0) catalogPkgIds.push(businessPkg.rows[0].id);
  if (generalPkg.rows.length > 0) catalogPkgIds.push(generalPkg.rows[0].id);

  const moduleDefs = [
    { pkg: ieltsPkg.rows[0]?.id, sort: 1, title: 'IELTS Overview & Test Format', desc: 'Understanding the IELTS test structure, scoring, and strategies.', materials: [
      { title: 'IELTS Test Format Guide', type: 'link', content: 'https://www.ielts.org/about-the-test/test-format' },
      { title: 'Scoring System Explained', type: 'text', content: 'IELTS scores range from 0 to 9. Each section (Listening, Reading, Writing, Speaking) is scored individually, and the overall band score is the average.' },
      { title: 'Sample Band 9 Essay', type: 'pdf', file_url: '/uploads/sample-ielts-essay.pdf' },
    ]},
    { pkg: ieltsPkg.rows[0]?.id, sort: 2, title: 'Speaking Module', desc: 'Strategies for all three parts of the IELTS Speaking test.', materials: [
      { title: 'Speaking Part 1: Topics & Questions', type: 'link', content: 'https://www.ielts.org/speaking-part-1-topics' },
      { title: 'Speaking Part 2: Cue Card Strategies', type: 'text', content: 'Use the 1-minute preparation time wisely. Structure your response with an introduction, main points, and a conclusion. Aim to speak for the full 2 minutes.' },
      { title: 'Speaking Assessment Criteria', type: 'pdf', file_url: '/uploads/ielts-speaking-criteria.pdf' },
    ]},
    { pkg: businessPkg.rows[0]?.id, sort: 1, title: 'Business Communication Basics', desc: 'Fundamentals of professional business communication.', materials: [
      { title: 'Formal vs Informal Language', type: 'text', content: 'In business settings, use formal language: avoid contractions, use proper salutations, and maintain professional tone. Examples: "I am writing to inquire..." vs "Can I ask..."' },
      { title: 'Email Etiquette Guide', type: 'link', content: 'https://www.businessenglish.com/email-etiquette' },
      { title: 'Email Templates', type: 'document', file_url: '/uploads/business-email-templates.pdf' },
    ]},
    { pkg: businessPkg.rows[0]?.id, sort: 2, title: 'Presentations & Meetings', desc: 'How to lead and participate in business presentations and meetings.', materials: [
      { title: 'Presentation Structure', type: 'video', content: 'https://www.youtube.com/watch?v=example-presentation' },
      { title: 'Useful Phrases for Meetings', type: 'text', content: 'Opening: "Let me start by..." • Transitioning: "Moving on to..." • Closing: "To summarize..." • Action items: "Our next steps are..."' },
    ]},
    { pkg: generalPkg.rows[0]?.id, sort: 1, title: 'Everyday Conversations', desc: 'Practical English for daily interactions.', materials: [
      { title: 'Greetings & Introductions', type: 'text', content: 'Formal: "Good morning, my name is..." • Informal: "Hi, I\'m..." • Responses: "Nice to meet you" / "Pleased to meet you"' },
      { title: 'Ordering at a Restaurant', type: 'link', content: 'https://www.englishclub.com/speaking/restaurant.php' },
      { title: 'Making Phone Calls', type: 'video', content: 'https://www.youtube.com/watch?v=example-phone-calls' },
    ]},
    { pkg: generalPkg.rows[0]?.id, sort: 2, title: 'Grammar Foundations', desc: 'Essential grammar rules for clear communication.', materials: [
      { title: 'Tenses Overview', type: 'text', content: 'Present Simple: habits/facts • Present Continuous: now/temporary • Past Simple: completed • Present Perfect: experience/result • Future: will/going to' },
      { title: 'Common Grammar Mistakes', type: 'pdf', file_url: '/uploads/common-grammar-mistakes.pdf' },
    ]},
  ];

  for (const mod of moduleDefs) {
    if (!mod.pkg) continue;

    const existingMod = await query(
      'SELECT id FROM modules WHERE package_id = $1 AND title = $2',
      [mod.pkg, mod.title]
    );
    let moduleId;
    if (existingMod.rows.length > 0) {
      moduleId = existingMod.rows[0].id;
    } else {
      const r = await query(
        'INSERT INTO modules (package_id, title, description, sort_order) VALUES ($1, $2, $3, $4) RETURNING id',
        [mod.pkg, mod.title, mod.desc, mod.sort]
      );
      moduleId = r.rows[0].id;
    }

    for (const mat of mod.materials) {
      const existingMat = await query(
        'SELECT id FROM materials WHERE module_id = $1 AND title = $2',
        [moduleId, mat.title]
      );
      if (existingMat.rows.length > 0) continue;

      await query(
        'INSERT INTO materials (module_id, title, type, content, file_url) VALUES ($1, $2, $3, $4, $5)',
        [moduleId, mat.title, mat.type, mat.content || null, mat.file_url || null]
      );
    }
  }
  console.log('  ✓ Created modules & materials');

  // ============================================================
  // 9. Create homeworks with submissions & grades
  // ============================================================
  await query(`CREATE TABLE IF NOT EXISTS homeworks (
    id SERIAL PRIMARY KEY,
    module_id INTEGER REFERENCES modules(id) ON DELETE SET NULL,
    teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,
    student_package_id INTEGER NOT NULL REFERENCES student_packages(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    max_score INTEGER DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`);

  await query(`CREATE TABLE IF NOT EXISTS homework_submissions (
    id SERIAL PRIMARY KEY,
    homework_id INTEGER NOT NULL REFERENCES homeworks(id) ON DELETE CASCADE,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    content TEXT,
    file_url TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
  )`);

  await query(`CREATE TABLE IF NOT EXISTS homework_grades (
    id SERIAL PRIMARY KEY,
    homework_submission_id INTEGER NOT NULL REFERENCES homework_submissions(id) ON DELETE CASCADE,
    teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,
    score INTEGER NOT NULL,
    feedback TEXT,
    graded_at TIMESTAMPTZ DEFAULT NOW()
  )`);

  const homeworkDefs = [
    { pkg: p1, moduleTitle: 'IELTS Overview & Test Format', teacher: teacherIds[0], title: 'IELTS Diagnostic Essay', desc: 'Write a 250-word essay on the following topic: "Some people believe that unpaid community service should be a compulsory part of high school programs. To what extent do you agree or disagree?"', due: '2026-05-10', max: 100, submissions: [
      { student: bs, content: 'I strongly agree that community service should be compulsory in high school. Firstly, it teaches students valuable life skills such as teamwork and responsibility. Secondly, it helps them understand social issues better...', score: 85, feedback: 'Good structure and relevant examples. Work on vocabulary range and sentence variety.' },
    ]},
    { pkg: p1, moduleTitle: 'Speaking Module', teacher: teacherIds[0], title: 'Speaking Part 2 Practice', desc: 'Record yourself speaking for 2 minutes on this topic: "Describe a memorable vacation you have had. You should say: where you went, who you went with, what you did there, and explain why it was memorable." Submit a link to your recording.', due: '2026-05-17', max: 100, submissions: [] },
    { pkg: p3, moduleTitle: 'Business Communication Basics', teacher: teacherIds[1], title: 'Business Email Draft', desc: 'Write a professional email to a client who has missed two payment deadlines. The email should be polite but firm, clearly stating the outstanding amount and requesting immediate payment.', due: '2026-05-08', max: 100, submissions: [
      { student: ss, content: 'Subject: Payment Reminder - Outstanding Invoice #INV-2024-089\n\nDear Mr. Thompson,\n\nI hope this message finds you well. I am writing to kindly remind you that Invoice #INV-2024-089 in the amount of $5,000 remains unpaid...', score: 92, feedback: 'Excellent tone - professional yet firm. Great use of formal business language.' },
    ]},
    { pkg: p3, moduleTitle: 'Presentations & Meetings', teacher: teacherIds[1], title: 'Presentation Outline', desc: 'Create an outline for a 10-minute presentation on "The Future of Remote Work". Include: introduction, 3 main points, and conclusion with Q&A.', due: '2026-05-22', max: 100, submissions: [] },
    { pkg: p4, moduleTitle: 'Everyday Conversations', teacher: teacherIds[2], title: 'Dialogue Writing', desc: 'Write a dialogue between a customer and a waiter at a restaurant. Include: greeting, ordering food, asking about menu items, handling a complaint, and payment.', due: '2026-05-12', max: 100, submissions: [
      { student: ds, content: 'Waiter: Good evening! Welcome to Bella Italia. My name is Marco and I\'ll be your server tonight.\nCustomer: Thank you. Could you recommend a good pasta dish?\nWaiter: Certainly! Our chef\'s special tonight is the Linguine ai Frutti di Mare...', score: 78, feedback: 'Good effort! Try to use more varied expressions and include a complaint scenario as requested.' },
    ]},
  ];

  for (const hw of homeworkDefs) {
    const existingHw = await query(
      'SELECT id FROM homeworks WHERE student_package_id = $1 AND title = $2',
      [hw.pkg, hw.title]
    );
    let homeworkId;
    if (existingHw.rows.length > 0) {
      homeworkId = existingHw.rows[0].id;
    } else {
      const r = await query(
        'INSERT INTO homeworks (student_package_id, teacher_id, title, description, due_date, max_score) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [hw.pkg, hw.teacher, hw.title, hw.desc, hw.due, hw.max]
      );
      homeworkId = r.rows[0].id;
    }

    for (const sub of hw.submissions) {
      const existingSub = await query(
        'SELECT id FROM homework_submissions WHERE homework_id = $1 AND student_id = $2',
        [homeworkId, sub.student]
      );
      if (existingSub.rows.length > 0) continue;

      const r = await query(
        'INSERT INTO homework_submissions (homework_id, student_id, content) VALUES ($1, $2, $3) RETURNING id',
        [homeworkId, sub.student, sub.content]
      );
      const subId = r.rows[0].id;

      if (sub.score !== undefined) {
        await query(
          'INSERT INTO homework_grades (homework_submission_id, teacher_id, score, feedback) VALUES ($1, $2, $3, $4)',
          [subId, hw.teacher, sub.score, sub.feedback]
        );
      }
    }
  }
  console.log('  ✓ Created homeworks with submissions & grades');

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
  console.log('  • 6 modules with materials (IELTS, Business, General)');
  console.log('  • 5 homeworks (3 with submissions & grades)');
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
