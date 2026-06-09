'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { getDb, initDb } from './db';
import { encrypt, decrypt } from './session';
import { revalidatePath } from 'next/cache';

initDb();

export async function login(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user) {
    return { error: 'Invalid email or password.' };
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return { error: 'Invalid email or password.' };
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId: user.id, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  redirect('/admin');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/admin/login');
}

export async function createLead(formData) {
  const db = getDb();
  const data = Object.fromEntries(formData);
  db.prepare('INSERT INTO leads (name, email, phone, program, format, message) VALUES (?, ?, ?, ?, ?, ?)').run(
    data.name, data.email, data.phone || null, data.program || null, data.format || null, data.message || null
  );
  revalidatePath('/admin/leads');
  return { success: true };
}

export async function updateLeadStatus(id, status) {
  const db = getDb();
  db.prepare('UPDATE leads SET status = ? WHERE id = ?').run(status, id);
  revalidatePath('/admin/leads');
  return { success: true };
}

export async function deleteLead(id) {
  const db = getDb();
  db.prepare('DELETE FROM leads WHERE id = ?').run(id);
  revalidatePath('/admin/leads');
  return { success: true };
}

export async function saveProgram(formData) {
  const db = getDb();
  const data = Object.fromEntries(formData);
  if (data.id) {
    db.prepare('UPDATE programs SET title=?, description=?, category=?, format=?, level=?, duration=?, price=?, icon=?, updated_at=datetime(\'now\') WHERE id=?').run(
      data.title, data.description, data.category, data.format, data.level, data.duration, data.price, data.icon, data.id
    );
  } else {
    db.prepare('INSERT INTO programs (title, description, category, format, level, duration, price, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(
      data.title, data.description, data.category, data.format, data.level, data.duration, data.price, data.icon
    );
  }
  revalidatePath('/admin/programs');
  return { success: true };
}

export async function deleteProgram(id) {
  const db = getDb();
  db.prepare('DELETE FROM programs WHERE id = ?').run(id);
  revalidatePath('/admin/programs');
  return { success: true };
}

export async function saveTestimonial(formData) {
  const db = getDb();
  const data = Object.fromEntries(formData);
  if (data.id) {
    db.prepare('UPDATE testimonials SET name=?, course=?, rating=?, quote=?, initials=?, updated_at=datetime(\'now\') WHERE id=?').run(
      data.name, data.course, data.rating, data.quote, data.initials, data.id
    );
  } else {
    db.prepare('INSERT INTO testimonials (name, course, rating, quote, initials) VALUES (?, ?, ?, ?, ?)').run(
      data.name, data.course, data.rating, data.quote, data.initials
    );
  }
  revalidatePath('/admin/testimonials');
  return { success: true };
}

export async function deleteTestimonial(id) {
  const db = getDb();
  db.prepare('DELETE FROM testimonials WHERE id = ?').run(id);
  revalidatePath('/admin/testimonials');
  return { success: true };
}

export async function saveFaq(formData) {
  const db = getDb();
  const data = Object.fromEntries(formData);
  if (data.id) {
    db.prepare('UPDATE faqs SET question=?, answer=?, sort_order=?, updated_at=datetime(\'now\') WHERE id=?').run(
      data.question, data.answer, data.sort_order || 0, data.id
    );
  } else {
    const maxOrder = db.prepare('SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM faqs').get().next;
    db.prepare('INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)').run(
      data.question, data.answer, data.sort_order || maxOrder
    );
  }
  revalidatePath('/admin/faqs');
  return { success: true };
}

export async function deleteFaq(id) {
  const db = getDb();
  db.prepare('DELETE FROM faqs WHERE id = ?').run(id);
  revalidatePath('/admin/faqs');
  return { success: true };
}

export async function saveSetting(formData) {
  const db = getDb();
  const data = Object.fromEntries(formData);
  for (const [key, value] of Object.entries(data)) {
    db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, value);
  }
  revalidatePath('/admin/settings');
  return { success: true };
}

// --- Student Management ---

export async function createStudent(formData) {
  const db = getDb();
  const data = Object.fromEntries(formData);
  db.prepare('INSERT INTO students (name, email, phone, notes) VALUES (?, ?, ?, ?)').run(
    data.name, data.email, data.phone || null, data.notes || null
  );
  revalidatePath('/admin/students');
  return { success: true };
}

export async function updateStudent(formData) {
  const db = getDb();
  const data = Object.fromEntries(formData);
  db.prepare('UPDATE students SET name=?, email=?, phone=?, notes=? WHERE id=?').run(
    data.name, data.email, data.phone || null, data.notes || null, data.id
  );
  revalidatePath('/admin/students');
  return { success: true };
}

export async function deleteStudent(id) {
  const db = getDb();
  db.prepare('DELETE FROM students WHERE id = ?').run(id);
  revalidatePath('/admin/students');
  return { success: true };
}

export async function assignPackage(formData) {
  const db = getDb();
  const data = Object.fromEntries(formData);
  db.prepare(`INSERT INTO student_packages (student_id, package_name, total_sessions, remaining_sessions, start_date, end_date, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)`).run(
    data.student_id, data.package_name, data.total_sessions, data.total_sessions,
    data.start_date, data.end_date || null, data.status || 'active'
  );
  revalidatePath(`/admin/students/${data.student_id}`);
  return { success: true };
}

export async function updatePackageStatus(formData) {
  const db = getDb();
  const data = Object.fromEntries(formData);
  db.prepare('UPDATE student_packages SET status=?, remaining_sessions=? WHERE id=?').run(
    data.status, data.remaining_sessions, data.id
  );
  revalidatePath(`/admin/students/${data.student_id}`);
  return { success: true };
}

export async function recordSession(formData) {
  const db = getDb();
  const data = Object.fromEntries(formData);
  const pkg = db.prepare('SELECT * FROM student_packages WHERE id = ?').get(data.student_package_id);

  if (!pkg) return { error: 'Package not found' };
  if (pkg.remaining_sessions <= 0) return { error: 'No remaining sessions' };

  db.prepare('INSERT INTO session_records (student_package_id, session_date, notes) VALUES (?, ?, ?)').run(
    data.student_package_id, data.session_date, data.notes || null
  );
  db.prepare('UPDATE student_packages SET remaining_sessions = remaining_sessions - 1 WHERE id = ?').run(data.student_package_id);
  revalidatePath(`/admin/students/${data.student_id}`);
  return { success: true };
}

export async function deleteSession(formData) {
  const db = getDb();
  const data = Object.fromEntries(formData);
  const session = db.prepare('SELECT * FROM session_records WHERE id = ?').get(data.id);
  if (!session) return { error: 'Session not found' };

  db.prepare('DELETE FROM session_records WHERE id = ?').run(data.id);
  db.prepare('UPDATE student_packages SET remaining_sessions = remaining_sessions + 1 WHERE id = ?').run(session.student_package_id);
  revalidatePath(`/admin/students/${data.student_id}`);
  return { success: true };
}
