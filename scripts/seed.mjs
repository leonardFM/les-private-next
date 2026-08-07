import 'dotenv/config';
import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function query(text, params) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

async function seed() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
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

  const existing = await query('SELECT id FROM users LIMIT 1');
  if (existing.rows.length > 0) {
    console.log('Database already seeded.');
    await pool.end();
    process.exit(0);
  }

  const hash = await bcrypt.hash('admin123', 10);
  await query('INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3)', ['admin@els-corner.com', hash, 'Admin']);

  const insertProgram = async (title, description, category, format, level, duration, price, icon, featured) => {
    await query(
      'INSERT INTO programs (title, description, category, format, level, duration, price, icon, featured) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      [title, description, category, format, level, duration, price, icon, featured]
    );
  };

  await insertProgram(
    JSON.stringify({ id: 'General English Mastery', en: 'General English Mastery' }),
    JSON.stringify({ id: 'Kembangkan kefasihan, sempurnakan tata bahasa, dan perluas kosakata untuk interaksi sehari-hari.', en: 'Develop fluency, perfect grammar, and expand vocabulary for daily interactions.' }),
    'General',
    JSON.stringify({ id: 'Online & Offline', en: 'Online & Offline' }),
    JSON.stringify({ id: 'Semua Level (A1 - C2)', en: 'All Levels (A1 - C2)' }),
    '12 Weeks',
    JSON.stringify({ id: 'Rp 4.500.000', en: 'USD 300' }),
    '💬', 1
  );
  await insertProgram(
    JSON.stringify({ id: 'IELTS Academic Prep Boost', en: 'IELTS Academic Prep Boost' }),
    JSON.stringify({ id: 'Kursus intensif yang berfokus pada modul speaking, listening, reading, dan writing.', en: 'Intensive course targeting speaking, listening, reading, and writing modules.' }),
    'Academic',
    JSON.stringify({ id: 'Hybrid Classroom', en: 'Hybrid Classroom' }),
    JSON.stringify({ id: 'Intermediate - Advanced', en: 'Intermediate - Advanced' }),
    '8 Weeks',
    JSON.stringify({ id: 'Rp 6.500.000', en: 'USD 430' }),
    '🎓', 1
  );
  await insertProgram(
    JSON.stringify({ id: 'Business Communication Pro', en: 'Business Communication Pro' }),
    JSON.stringify({ id: 'Kuasai pola negosiasi, presentasi profesional, dan etika berbicara di dunia korporat.', en: 'Master negotiation patterns, professional presentations, and corporate speaking etiquette.' }),
    'Professional',
    JSON.stringify({ id: 'Online Sessions', en: 'Online Sessions' }),
    JSON.stringify({ id: 'Upper Intermediate+', en: 'Upper Intermediate+' }),
    '10 Weeks',
    JSON.stringify({ id: 'Rp 5.500.000', en: 'USD 370' }),
    '💼', 1
  );
  await insertProgram(
    JSON.stringify({ id: 'TOEFL iBT Prep Strategy', en: 'TOEFL iBT Prep Strategy' }),
    JSON.stringify({ id: 'Pelatihan strategi tes terfokus untuk format berbasis komputer.', en: 'Focused test strategy training targeting computer-based format.' }),
    'Academic',
    JSON.stringify({ id: 'Online Class', en: 'Online Class' }),
    JSON.stringify({ id: 'Intermediate - Advanced', en: 'Intermediate - Advanced' }),
    '10 Weeks',
    JSON.stringify({ id: 'Rp 6.000.000', en: 'USD 400' }),
    '📝', 0
  );
  await insertProgram(
    JSON.stringify({ id: 'Junior Speech Adventurers', en: 'Junior Speech Adventurers' }),
    JSON.stringify({ id: 'Pembelajaran bahasa Inggris interaktif berbasis game untuk anak-anak.', en: 'Interactive gamified English learning for children.' }),
    'Young Learners',
    JSON.stringify({ id: 'Offline Campus', en: 'Offline Campus' }),
    JSON.stringify({ id: 'Usia 6 - 11 (Pemula)', en: 'Ages 6 - 11 (Beginner)' }),
    '16 Weeks',
    JSON.stringify({ id: 'Rp 3.800.000', en: 'USD 250' }),
    '🎨', 1
  );
  await insertProgram(
    JSON.stringify({ id: 'Teen Conversation Club', en: 'Teen Conversation Club' }),
    JSON.stringify({ id: 'Topik debat berenergi tinggi, permainan kosakata, dan presentasi kelompok.', en: 'High-energy debate topics, vocabulary games, and group presentations.' }),
    'Young Learners',
    JSON.stringify({ id: 'Hybrid Class', en: 'Hybrid Class' }),
    JSON.stringify({ id: 'Usia 12 - 17 (Intermediate)', en: 'Ages 12 - 17 (Intermediate)' }),
    '12 Weeks',
    JSON.stringify({ id: 'Rp 4.200.000', en: 'USD 280' }),
    '📣', 1
  );
  await insertProgram(
    JSON.stringify({ id: 'English for Kids', en: 'English for Kids' }),
    JSON.stringify({ id: 'Program belajar menyenangkan untuk anak usia 4-12 dengan metode gamifikasi.', en: 'Fun learning program for kids aged 4-12 with gamification methods.' }),
    'Kids',
    JSON.stringify({ id: 'Online & Offline', en: 'Online & Offline' }),
    JSON.stringify({ id: 'Usia 4 - 12', en: 'Ages 4 - 12' }),
    '16 Weeks',
    JSON.stringify({ id: 'Rp 3.500.000', en: 'USD 230' }),
    '👶', 1
  );

  const insertTestimonial = async (name, course, rating, quote, initials, featured) => {
    await query(
      'INSERT INTO testimonials (name, course, rating, quote, initials, featured) VALUES ($1,$2,$3,$4,$5,$6)',
      [name, course, rating, quote, initials, featured]
    );
  };

  await insertTestimonial(
    JSON.stringify({ id: 'Sarah Connor', en: 'Sarah Connor' }),
    JSON.stringify({ id: 'IELTS Prep', en: 'IELTS Prep' }),
    5,
    JSON.stringify({ id: 'El\'s Corner benar-benar mengubah cara saya mempersiapkan tes. Saya berhasil mencapai band score 8.0!', en: 'El\'s Corner truly changed how I prepare for tests. I managed to get a band score of 8.0!' }),
    'SC', 1
  );
  await insertTestimonial(
    JSON.stringify({ id: 'Kenji Sato', en: 'Kenji Sato' }),
    JSON.stringify({ id: 'Business English', en: 'Business English' }),
    5,
    JSON.stringify({ id: 'Kepercayaan diri saya saat presentasi dengan klien global meningkat sepuluh kali lipat.', en: 'My confidence when presenting to global clients increased tenfold.' }),
    'KS', 1
  );
  await insertTestimonial(
    JSON.stringify({ id: 'Elena Rostova', en: 'Elena Rostova' }),
    JSON.stringify({ id: 'General English', en: 'General English' }),
    5,
    JSON.stringify({ id: 'Struktur hybrid classroom sangat cocok dengan jadwal sibuk saya.', en: 'The hybrid classroom structure fits perfectly with my busy schedule.' }),
    'ER', 1
  );
  await insertTestimonial(
    JSON.stringify({ id: 'Ahmed Al-Mansoori', en: 'Ahmed Al-Mansoori' }),
    JSON.stringify({ id: 'IELTS Prep', en: 'IELTS Prep' }),
    5,
    JSON.stringify({ id: 'Para guru mengidentifikasi kelemahan saya di listening dan writing dan membantu saya mencapai 7.5 hanya dalam enam minggu.', en: 'The teachers identified my weaknesses in listening and writing and helped me achieve 7.5 in just six weeks.' }),
    'AA', 1
  );
  await insertTestimonial(
    JSON.stringify({ id: 'Linda Schmidt', en: 'Linda Schmidt' }),
    JSON.stringify({ id: 'Business English', en: 'Business English' }),
    4,
    JSON.stringify({ id: 'Materi yang sangat baik untuk etika email dan negosiasi.', en: 'Excellent material for email etiquette and negotiations.' }),
    'LS', 0
  );
  await insertTestimonial(
    JSON.stringify({ id: 'Toby Miller', en: 'Toby Miller' }),
    JSON.stringify({ id: 'Kids & Teens', en: 'Kids & Teens' }),
    5,
    JSON.stringify({ id: 'Anak kami menyukai permainan offline dan tantangan berbicara. Dulu dia pemalu, sekarang dia berbicara bahasa Inggris dengan percaya diri!', en: 'Our son loves the offline games and speaking challenges. He used to be shy, now he speaks English confidently!' }),
    'TM', 1
  );

  const insertFaq = async (question, answer, sort_order) => {
    await query('INSERT INTO faqs (question, answer, sort_order) VALUES ($1, $2, $3)', [question, answer, sort_order]);
  };

  await insertFaq(
    JSON.stringify({ id: 'Bisakah saya berpindah antara kelas online dan offline?', en: 'Can I switch between online and offline classes?' }),
    JSON.stringify({ id: 'Ya! Pengaturan Hybrid Classroom kami memungkinkan Anda berpindah kehadiran setiap minggu tanpa biaya tambahan.', en: 'Yes! Our Hybrid Classroom setup allows you to switch attendance each week at no extra cost.' }),
    1
  );
  await insertFaq(
    JSON.stringify({ id: 'Apakah semua guru bersertifikat ESL?', en: 'Are all teachers ESL certified?' }),
    JSON.stringify({ id: 'Ya, 100% instruktur akademik kami memiliki sertifikasi CELTA, DELTA, atau TEFL.', en: 'Yes, 100% of our academic instructors hold CELTA, DELTA, or TEFL certifications.' }),
    2
  );
  await insertFaq(
    JSON.stringify({ id: 'Apakah ada tes penempatan sebelum pendaftaran?', en: 'Is there a placement test before enrollment?' }),
    JSON.stringify({ id: 'Ya! Kami mewajibkan semua calon siswa untuk mengikuti diagnostik komprehensif selama 15 menit.', en: 'Yes! We require all prospective students to take a comprehensive 15-minute diagnostic.' }),
    3
  );
  await insertFaq(
    JSON.stringify({ id: 'Bagaimana cara pembayaran cicilan?', en: 'How does the installment payment work?' }),
    JSON.stringify({ id: 'Kami menawarkan skema pembayaran fleksibel di mana biaya pendidikan dapat dibagi menjadi tiga cicilan bulanan.', en: 'We offer flexible payment schemes where tuition can be split into three monthly installments.' }),
    4
  );

  const insertSetting = async (key, value) => {
    await query(
      'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value',
      [key, value]
    );
  };

  await insertSetting('whatsapp_number', '+62895613163308');
  await insertSetting('site_name', JSON.stringify({ id: "El's Corner", en: "El's Corner" }));
  await insertSetting('site_description', JSON.stringify({ id: 'Penyedia kursus bahasa Inggris', en: 'English language course provider' }));
  await insertSetting('contact_email', 'info@els-corner.com');
  await insertSetting('contact_phone', '(021) 1234-5678');
  await insertSetting('address', JSON.stringify({ id: "El's Corner Tower, Lantai 4\nJl. Pendidikan No. 10\nJakarta Pusat 10110", en: "El's Corner Tower, 4th Floor\nJl. Pendidikan No. 10\nCentral Jakarta 10110" }));

  const sResult = await query('INSERT INTO students (name, email, phone, notes) VALUES ($1, $2, $3, $4) RETURNING id',
    ['Budi Santoso', 'budi@example.com', '081234567890', 'IELTS target band 7.5. Prefers morning sessions.']
  );
  const s1 = sResult.rows[0].id;
  const sResult2 = await query('INSERT INTO students (name, email, phone, notes) VALUES ($1, $2, $3, $4) RETURNING id',
    ['Siti Rahmawati', 'siti@example.com', '081298765432', 'Business English for corporate presentations.']
  );
  const s2 = sResult2.rows[0].id;
  const sResult3 = await query('INSERT INTO students (name, email, phone, notes) VALUES ($1, $2, $3, $4) RETURNING id',
    ['David Wong', 'david@example.com', '087812345678', 'General English, intermediate level.']
  );
  const s3 = sResult3.rows[0].id;

  const insertPkg = async (student_id, package_name, total, remaining, start, end, status) => {
    const r = await query(
      'INSERT INTO student_packages (student_id, package_name, total_sessions, remaining_sessions, start_date, end_date, status) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id',
      [student_id, package_name, total, remaining, start, end, status]
    );
    return r.rows[0].id;
  };

  const p1 = await insertPkg(s1, 'IELTS Academic Prep Boost', 8, 5, '2026-05-01', '2026-07-01', 'active');
  const p2 = await insertPkg(s1, 'General English Mastery', 12, 0, '2026-01-15', '2026-04-15', 'completed');
  const p3 = await insertPkg(s2, 'Business Communication Pro', 10, 3, '2026-04-10', null, 'active');
  const p4 = await insertPkg(s3, 'General English Mastery', 12, 1, '2026-03-01', '2026-06-01', 'active');

  const insertSession = async (pkg_id, date, notes) => {
    await query('INSERT INTO session_records (student_package_id, session_date, notes) VALUES ($1, $2, $3)', [pkg_id, date, notes]);
  };

  await insertSession(p1, '2026-05-02', 'Introduction to IELTS format. Speaking Part 1 practice.');
  await insertSession(p1, '2026-05-09', 'Listening Section 1 & 2 strategies. Map labeling.');
  await insertSession(p1, '2026-05-16', 'Writing Task 1 - Line graphs and bar charts.');

  for (let i = 0; i < 12; i++) {
    await insertSession(p2, `2026-0${1 + Math.floor(i/4)}-${String(5 + (i % 4) * 7).padStart(2, '0')}`, `Session ${i + 1} - General English`);
  }

  await insertSession(p3, '2026-04-12', 'Business email etiquette and formal writing.');
  await insertSession(p3, '2026-04-19', 'Presentation structure and signposting language.');
  await insertSession(p3, '2026-04-26', 'Negotiation phrases and roleplay.');
  await insertSession(p3, '2026-05-03', 'Telephone and video call communication.');
  await insertSession(p3, '2026-05-10', 'Cross-cultural communication differences.');
  await insertSession(p3, '2026-05-17', 'Report writing and data analysis.');
  await insertSession(p3, '2026-05-24', 'Mock presentation with feedback.');

  for (let i = 0; i < 11; i++) {
    await insertSession(p4, `2026-0${3 + Math.floor(i/4)}-${String(1 + (i % 4) * 7).padStart(2, '0')}`, `Session ${i + 1} - General English`);
  }

  console.log('Database seeded successfully!');
  console.log('Admin login: admin@els-corner.com / admin123');
  await pool.end();
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
