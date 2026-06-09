import { initDb, get, all } from './db';

function t(val, locale) {
  if (!val) return '';
  try {
    const parsed = JSON.parse(val);
    return parsed[locale] || parsed.id || parsed.en || val;
  } catch {
    return val;
  }
}

function parseRow(row, locale, fields) {
  if (!row) return null;
  const result = { ...row };
  for (const field of fields) {
    result[field] = t(row[field], locale);
  }
  return result;
}

export async function getPrograms(locale = 'id', featuredOnly = false) {
  let sql = 'SELECT * FROM programs WHERE active = 1';
  const params = [];
  if (featuredOnly) {
    sql += ' AND featured = 1';
  }
  sql += ' ORDER BY id ASC';
  const rows = await all(sql, params);
  return rows.map(r => parseRow(r, locale, ['title', 'description', 'format', 'level', 'price']));
}

export async function getProgramById(id, locale = 'id') {
  const row = await get('SELECT * FROM programs WHERE id = $1', [id]);
  return parseRow(row, locale, ['title', 'description', 'format', 'level', 'price']);
}

export async function getTestimonials(locale = 'id', featuredOnly = false) {
  let sql = 'SELECT * FROM testimonials WHERE active = 1';
  const params = [];
  if (featuredOnly) {
    sql += ' AND featured = 1';
  }
  sql += ' ORDER BY id ASC';
  const rows = await all(sql, params);
  return rows.map(r => parseRow(r, locale, ['name', 'course', 'quote']));
}

export async function getTestimonialById(id, locale = 'id') {
  const row = await get('SELECT * FROM testimonials WHERE id = $1', [id]);
  return parseRow(row, locale, ['name', 'course', 'quote']);
}

export async function getFaqs(locale = 'id') {
  const rows = await all('SELECT * FROM faqs ORDER BY sort_order ASC, id ASC');
  return rows.map(r => parseRow(r, locale, ['question', 'answer']));
}

const BILINGUAL_SETTINGS = ['site_name', 'site_description', 'address'];

export async function getSetting(key, locale = 'id') {
  const row = await get('SELECT value FROM settings WHERE key = $1', [key]);
  if (!row) return null;
  if (BILINGUAL_SETTINGS.includes(key)) {
    return t(row.value, locale);
  }
  return row.value;
}

export async function getAllSettings(locale = 'id') {
  const rows = await all('SELECT * FROM settings');
  const settings = {};
  rows.forEach(r => {
    if (BILINGUAL_SETTINGS.includes(r.key)) {
      settings[r.key] = t(r.value, locale);
    } else {
      settings[r.key] = r.value;
    }
  });
  return settings;
}

export async function getStudents() {
  return all(`SELECT s.*,
    (SELECT COUNT(*) FROM student_packages WHERE student_id = s.id AND status = 'active') AS active_packages
    FROM students s ORDER BY s.created_at DESC`);
}

export async function getStudentById(id) {
  return get('SELECT * FROM students WHERE id = $1', [id]);
}

export async function getStudentPackages(studentId) {
  return all('SELECT * FROM student_packages WHERE student_id = $1 ORDER BY created_at DESC', [studentId]);
}

export async function getPackageSessions(packageId) {
  return all('SELECT * FROM session_records WHERE student_package_id = $1 ORDER BY session_date DESC', [packageId]);
}

export async function getActivePackages() {
  return all(`SELECT sp.*, s.name AS student_name FROM student_packages sp
    JOIN students s ON s.id = sp.student_id
    WHERE sp.status = 'active' ORDER BY sp.created_at DESC`);
}

export async function getExpiringPackages(days = 30) {
  return all(`SELECT sp.*, s.name AS student_name FROM student_packages sp
    JOIN students s ON s.id = sp.student_id
    WHERE sp.status = 'active' AND sp.remaining_sessions <= $1
    ORDER BY sp.remaining_sessions ASC`, [days]);
}

export async function getStats() {
  const [totalLeads, newLeads, totalPrograms, totalTestimonials, totalStudents, activePackages, expiringPackages] = await Promise.all([
    get('SELECT COUNT(*) AS count FROM leads'),
    get("SELECT COUNT(*) AS count FROM leads WHERE status = 'new'"),
    get('SELECT COUNT(*) AS count FROM programs'),
    get('SELECT COUNT(*) AS count FROM testimonials'),
    get('SELECT COUNT(*) AS count FROM students'),
    get("SELECT COUNT(*) AS count FROM student_packages WHERE status = 'active'"),
    get("SELECT COUNT(*) AS count FROM student_packages WHERE status = 'active' AND remaining_sessions <= 3"),
  ]);
  return {
    totalLeads: Number(totalLeads.count),
    newLeads: Number(newLeads.count),
    totalPrograms: Number(totalPrograms.count),
    totalTestimonials: Number(totalTestimonials.count),
    totalStudents: Number(totalStudents.count),
    activePackages: Number(activePackages.count),
    expiringPackages: Number(expiringPackages.count),
  };
}
