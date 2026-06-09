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

export async function getPayments({ status, search, limit = 50, offset = 0 } = {}) {
  let sql = `SELECT p.id, p.order_id, p.student_id, p.user_id, p.student_package_id,
    COALESCE(sp.package_name, p.package_name) AS package_name,
    p.total_sessions, p.amount, p.payment_status, p.transaction_status,
    p.payment_type, p.transaction_id, p.snap_token, p.created_at, p.updated_at,
    COALESCE(s.name, u.name) AS student_name
    FROM payments p
    LEFT JOIN students s ON s.id = p.student_id
    LEFT JOIN users u ON u.id = p.user_id
    LEFT JOIN student_packages sp ON sp.id = p.student_package_id
    WHERE 1=1`;
  const params = [];
  if (status) {
    sql += ' AND p.payment_status = $' + (params.length + 1);
    params.push(status);
  }
  if (search) {
    sql += ` AND (COALESCE(s.name, u.name) ILIKE $${params.length + 1} OR p.order_id ILIKE $${params.length + 1})`;
    params.push(`%${search}%`);
  }
  sql += ' ORDER BY p.created_at DESC';
  sql += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);
  return all(sql, params);
}

export async function getPaymentById(id) {
  return get(`SELECT p.id, p.order_id, p.student_id, p.user_id, p.student_package_id,
    COALESCE(sp.package_name, p.package_name) AS package_name,
    COALESCE(sp.total_sessions, p.total_sessions) AS total_sessions,
    p.amount, p.payment_status, p.transaction_status,
    p.payment_type, p.transaction_id, p.snap_token, p.created_at, p.updated_at,
    COALESCE(s.name, u.name) AS student_name,
    COALESCE(s.email, u.email) AS student_email,
    COALESCE(s.phone, u.phone) AS student_phone
    FROM payments p
    LEFT JOIN students s ON s.id = p.student_id
    LEFT JOIN users u ON u.id = p.user_id
    LEFT JOIN student_packages sp ON sp.id = p.student_package_id
    WHERE p.id = $1`, [id]);
}

export async function getPaymentByOrderId(orderId) {
  return get('SELECT * FROM payments WHERE order_id = $1', [orderId]);
}

// --- Packages ---

export async function getPackages() {
  return all('SELECT * FROM packages WHERE active = 1 ORDER BY price ASC');
}

export async function getAllPackages() {
  return all('SELECT * FROM packages ORDER BY id ASC');
}

export async function getPackageById(id) {
  return get('SELECT * FROM packages WHERE id = $1', [id]);
}

// --- Student Portal ---

export async function getStudentPayments(userId) {
  return all(`SELECT p.*, COALESCE(sp.package_name, p.package_name) AS package_name,
    sp.total_sessions, sp.remaining_sessions, sp.status AS package_status
    FROM payments p
    LEFT JOIN student_packages sp ON sp.id = p.student_package_id
    WHERE p.user_id = $1
    ORDER BY p.created_at DESC`, [userId]);
}

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
      (SELECT COUNT(*) FROM leads) AS total_leads,
      (SELECT COUNT(*) FROM leads WHERE status = 'new') AS new_leads,
      (SELECT COUNT(*) FROM programs) AS total_programs,
      (SELECT COUNT(*) FROM testimonials) AS total_testimonials,
      (SELECT COUNT(*) FROM students) AS total_students,
      (SELECT COUNT(*) FROM student_packages WHERE status = 'active') AS active_packages,
      (SELECT COUNT(*) FROM student_packages WHERE status = 'active' AND remaining_sessions <= 3) AS expiring_packages
  `);
  return {
    totalLeads: Number(row.total_leads),
    newLeads: Number(row.new_leads),
    totalPrograms: Number(row.total_programs),
    totalTestimonials: Number(row.total_testimonials),
    totalStudents: Number(row.total_students),
    activePackages: Number(row.active_packages),
    expiringPackages: Number(row.expiring_packages),
  };
}
