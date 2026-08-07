import { unstable_cache } from 'next/cache';
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

async function _getPrograms(locale = 'id', featuredOnly = false) {
  let sql = 'SELECT * FROM programs WHERE active = 1';
  const params = [];
  if (featuredOnly) {
    sql += ' AND featured = 1';
  }
  sql += ' ORDER BY id ASC';
  const rows = await all(sql, params);
  return rows.map(r => parseRow(r, locale, ['title', 'description', 'format', 'level', 'price']));
}

export const getPrograms = unstable_cache(
  async (locale, featuredOnly) => _getPrograms(locale, featuredOnly),
  ['get-programs'],
  { revalidate: 300, tags: ['programs'] }
);

export async function getProgramById(id, locale = 'id') {
  const row = await get('SELECT * FROM programs WHERE id = $1', [id]);
  return parseRow(row, locale, ['title', 'description', 'format', 'level', 'price']);
}

async function _getTestimonials(locale = 'id', featuredOnly = false) {
  let sql = 'SELECT * FROM testimonials WHERE active = 1';
  const params = [];
  if (featuredOnly) {
    sql += ' AND featured = 1';
  }
  sql += ' ORDER BY id ASC';
  const rows = await all(sql, params);
  return rows.map(r => parseRow(r, locale, ['name', 'course', 'quote']));
}

export const getTestimonials = unstable_cache(
  async (locale, featuredOnly) => _getTestimonials(locale, featuredOnly),
  ['get-testimonials'],
  { revalidate: 300, tags: ['testimonials'] }
);

export async function getTestimonialById(id, locale = 'id') {
  const row = await get('SELECT * FROM testimonials WHERE id = $1', [id]);
  return parseRow(row, locale, ['name', 'course', 'quote']);
}

async function _getFaqs(locale = 'id') {
  const rows = await all('SELECT * FROM faqs ORDER BY sort_order ASC, id ASC');
  return rows.map(r => parseRow(r, locale, ['question', 'answer']));
}

export const getFaqs = unstable_cache(
  async (locale) => _getFaqs(locale),
  ['get-faqs'],
  { revalidate: 300, tags: ['faqs'] }
);

const BILINGUAL_SETTINGS = ['site_name', 'site_description', 'address'];

export async function getSetting(key, locale = 'id') {
  const row = await get('SELECT value FROM settings WHERE key = $1', [key]);
  if (!row) return null;
  if (BILINGUAL_SETTINGS.includes(key)) {
    return t(row.value, locale);
  }
  return row.value;
}

async function _getAllSettings(locale = 'id') {
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

export const getAllSettings = unstable_cache(
  async (locale) => _getAllSettings(locale),
  ['get-all-settings'],
  { revalidate: 300, tags: ['settings'] }
);

export async function getStudents() {
  return all(`SELECT s.*,
    (SELECT COUNT(*) FROM student_packages WHERE student_id = s.id AND status = 'active') AS active_packages
    FROM students s ORDER BY s.created_at DESC`);
}

export async function getStudentById(id) {
  return get('SELECT * FROM students WHERE id = $1', [id]);
}

export async function getStudentPackagesByStudentId(studentId) {
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

// --- Packages ---

export async function getAllPackages() {
  return all('SELECT * FROM packages ORDER BY id ASC');
}

export async function getPackageById(id) {
  return get('SELECT * FROM packages WHERE id = $1', [id]);
}

// --- Student Portal ---

export async function getStudentPackages(userId) {
  return all(`SELECT sp.*, s.name AS student_name FROM student_packages sp
    JOIN students s ON s.id = sp.student_id
    WHERE s.user_id = $1
    ORDER BY sp.created_at DESC`, [userId]);
}

export async function getStudentProfile(userId) {
  return get(`SELECT u.id, u.name, u.email, u.phone, u.role, u.created_at,
    s.id AS student_id
    FROM users u
    LEFT JOIN students s ON s.user_id = u.id
    WHERE u.id = $1`, [userId]);
}

export async function getStats() {
  const row = await get(`
    SELECT
      (SELECT COUNT(*) FROM programs) AS total_programs,
      (SELECT COUNT(*) FROM testimonials) AS total_testimonials,
      (SELECT COUNT(*) FROM students) AS total_students,
      (SELECT COUNT(*) FROM student_packages WHERE status = 'active') AS active_packages,
      (SELECT COUNT(*) FROM student_packages WHERE status = 'active' AND remaining_sessions <= 3) AS expiring_packages
  `);
  return {
    totalPrograms: Number(row.total_programs),
    totalTestimonials: Number(row.total_testimonials),
    totalStudents: Number(row.total_students),
    activePackages: Number(row.active_packages),
    expiringPackages: Number(row.expiring_packages),
  };
}
