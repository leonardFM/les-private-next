import { initDb, getDb } from './db';

initDb();

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

export function getPrograms(locale = 'id', featuredOnly = false) {
  const db = getDb();
  let sql = 'SELECT * FROM programs WHERE active = 1';
  const params = [];
  if (featuredOnly) {
    sql += ' AND featured = 1';
  }
  sql += ' ORDER BY id ASC';
  const rows = db.prepare(sql).all(...params);
  return rows.map(r => parseRow(r, locale, ['title', 'description', 'format', 'level', 'price']));
}

export function getProgramById(id, locale = 'id') {
  const db = getDb();
  const row = db.prepare('SELECT * FROM programs WHERE id = ?').get(id);
  return parseRow(row, locale, ['title', 'description', 'format', 'level', 'price']);
}

export function getTestimonials(locale = 'id', featuredOnly = false) {
  const db = getDb();
  let sql = 'SELECT * FROM testimonials WHERE active = 1';
  const params = [];
  if (featuredOnly) {
    sql += ' AND featured = 1';
  }
  sql += ' ORDER BY id ASC';
  const rows = db.prepare(sql).all(...params);
  return rows.map(r => parseRow(r, locale, ['name', 'course', 'quote']));
}

export function getTestimonialById(id, locale = 'id') {
  const db = getDb();
  const row = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(id);
  return parseRow(row, locale, ['name', 'course', 'quote']);
}

export function getFaqs(locale = 'id') {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM faqs ORDER BY sort_order ASC, id ASC').all();
  return rows.map(r => parseRow(r, locale, ['question', 'answer']));
}

const BILINGUAL_SETTINGS = ['site_name', 'site_description', 'address'];

export function getSetting(key, locale = 'id') {
  const db = getDb();
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
  if (!row) return null;
  if (BILINGUAL_SETTINGS.includes(key)) {
    return t(row.value, locale);
  }
  return row.value;
}

export function getAllSettings(locale = 'id') {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM settings').all();
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

export function getStudents() {
  const db = getDb();
  return db.prepare('SELECT * FROM students ORDER BY created_at DESC').all();
}

export function getStudentById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM students WHERE id = ?').get(id);
}

export function getStudentPackages(studentId) {
  const db = getDb();
  return db.prepare('SELECT * FROM student_packages WHERE student_id = ? ORDER BY created_at DESC').all(studentId);
}

export function getPackageSessions(packageId) {
  const db = getDb();
  return db.prepare('SELECT * FROM session_records WHERE student_package_id = ? ORDER BY session_date DESC').all(packageId);
}

export function getActivePackages() {
  const db = getDb();
  return db.prepare(`SELECT sp.*, s.name AS student_name FROM student_packages sp
    JOIN students s ON s.id = sp.student_id
    WHERE sp.status = 'active' ORDER BY sp.created_at DESC`).all();
}

export function getExpiringPackages(days = 30) {
  const db = getDb();
  return db.prepare(`SELECT sp.*, s.name AS student_name FROM student_packages sp
    JOIN students s ON s.id = sp.student_id
    WHERE sp.status = 'active' AND sp.remaining_sessions <= ?
    ORDER BY sp.remaining_sessions ASC`).all(days);
}

export function getStats() {
  const db = getDb();
  return {
    totalLeads: db.prepare('SELECT COUNT(*) AS count FROM leads').get().count,
    newLeads: db.prepare("SELECT COUNT(*) AS count FROM leads WHERE status = 'new'").get().count,
    totalPrograms: db.prepare('SELECT COUNT(*) AS count FROM programs').get().count,
    totalTestimonials: db.prepare('SELECT COUNT(*) AS count FROM testimonials').get().count,
    totalStudents: db.prepare('SELECT COUNT(*) AS count FROM students').get().count,
    activePackages: db.prepare("SELECT COUNT(*) AS count FROM student_packages WHERE status = 'active'").get().count,
    expiringPackages: db.prepare("SELECT COUNT(*) AS count FROM student_packages WHERE status = 'active' AND remaining_sessions <= 3").get().count,
  };
}
