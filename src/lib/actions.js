'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { get, query } from './db';
import { encrypt, decrypt } from './session';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function login(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const user = await get('SELECT * FROM users WHERE email = $1', [email]);

  if (!user) {
    return { error: 'Invalid email or password.' };
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return { error: 'Invalid email or password.' };
  }

  if (user.role !== 'admin') {
    return { error: 'Access denied. Admin only.' };
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

export async function saveProgram(formData) {
  const data = Object.fromEntries(formData);
  if (data.id) {
    await query('UPDATE programs SET title=$1, description=$2, category=$3, format=$4, level=$5, duration=$6, price=$7, icon=$8, updated_at=NOW() WHERE id=$9',
      [data.title, data.description, data.category, data.format, data.level, data.duration, data.price, data.icon, data.id]
    );
  } else {
    await query('INSERT INTO programs (title, description, category, format, level, duration, price, icon) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [data.title, data.description, data.category, data.format, data.level, data.duration, data.price, data.icon]
    );
  }
  revalidatePath('/admin/programs');
  revalidateTag('programs');
  return { success: true };
}

export async function deleteProgram(formData) {
  const data = Object.fromEntries(formData);
  await query('DELETE FROM programs WHERE id = $1', [data.id]);
  revalidatePath('/admin/programs');
  revalidateTag('programs');
  return { success: true };
}

export async function saveTestimonial(formData) {
  const data = Object.fromEntries(formData);
  if (data.id) {
    await query('UPDATE testimonials SET name=$1, course=$2, rating=$3, quote=$4, initials=$5, updated_at=NOW() WHERE id=$6',
      [data.name, data.course, data.rating, data.quote, data.initials, data.id]
    );
  } else {
    await query('INSERT INTO testimonials (name, course, rating, quote, initials) VALUES ($1, $2, $3, $4, $5)',
      [data.name, data.course, data.rating, data.quote, data.initials]
    );
  }
  revalidatePath('/admin/testimonials');
  revalidateTag('testimonials');
  return { success: true };
}

export async function deleteTestimonial(formData) {
  const data = Object.fromEntries(formData);
  await query('DELETE FROM testimonials WHERE id = $1', [data.id]);
  revalidatePath('/admin/testimonials');
  revalidateTag('testimonials');
  return { success: true };
}

export async function saveFaq(formData) {
  const data = Object.fromEntries(formData);
  if (data.id) {
    await query('UPDATE faqs SET question=$1, answer=$2, sort_order=$3, updated_at=NOW() WHERE id=$4',
      [data.question, data.answer, data.sort_order || 0, data.id]
    );
  } else {
    const maxOrder = await get('SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM faqs');
    await query('INSERT INTO faqs (question, answer, sort_order) VALUES ($1, $2, $3)',
      [data.question, data.answer, data.sort_order || Number(maxOrder.next)]
    );
  }
  revalidatePath('/admin/faqs');
  revalidateTag('faqs');
  return { success: true };
}

export async function deleteFaq(formData) {
  const data = Object.fromEntries(formData);
  await query('DELETE FROM faqs WHERE id = $1', [data.id]);
  revalidatePath('/admin/faqs');
  revalidateTag('faqs');
  return { success: true };
}

export async function saveSetting(formData) {
  const data = Object.fromEntries(formData);
  for (const [key, value] of Object.entries(data)) {
    await query(
      'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value',
      [key, value]
    );
  }
  revalidatePath('/admin/settings');
  revalidateTag('settings');
  return { success: true };
}

// --- Student Management ---

export async function createStudent(formData) {
  const data = Object.fromEntries(formData);
  await query('INSERT INTO students (name, email, phone, notes) VALUES ($1, $2, $3, $4)',
    [data.name, data.email, data.phone || null, data.notes || null]
  );
  revalidatePath('/admin/students');
  return { success: true };
}

export async function updateStudent(formData) {
  const data = Object.fromEntries(formData);
  await query('UPDATE students SET name=$1, email=$2, phone=$3, notes=$4 WHERE id=$5',
    [data.name, data.email, data.phone || null, data.notes || null, data.id]
  );
  revalidatePath('/admin/students');
  return { success: true };
}

export async function deleteStudent(formData) {
  const data = Object.fromEntries(formData);
  await query('DELETE FROM students WHERE id = $1', [data.id]);
  revalidatePath('/admin/students');
  return { success: true };
}

export async function assignPackage(formData) {
  const data = Object.fromEntries(formData);
  await query('INSERT INTO student_packages (student_id, package_name, total_sessions, remaining_sessions, start_date, end_date, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [data.student_id, data.package_name, data.total_sessions, data.total_sessions, data.start_date, data.end_date || null, data.status || 'active']
  );
  revalidatePath(`/admin/students/${data.student_id}`);
  return { success: true };
}

export async function updatePackageStatus(formData) {
  const data = Object.fromEntries(formData);
  await query('UPDATE student_packages SET status=$1, remaining_sessions=$2 WHERE id=$3',
    [data.status, data.remaining_sessions, data.id]
  );
  revalidatePath(`/admin/students/${data.student_id}`);
  return { success: true };
}

export async function recordSession(formData) {
  const data = Object.fromEntries(formData);
  const pkg = await get('SELECT * FROM student_packages WHERE id = $1', [data.student_package_id]);

  if (!pkg) return { error: 'Package not found' };
  if (pkg.remaining_sessions <= 0) return { error: 'No remaining sessions' };

  await query('INSERT INTO session_records (student_package_id, session_date, notes) VALUES ($1, $2, $3)',
    [data.student_package_id, data.session_date, data.notes || null]
  );
  await query('UPDATE student_packages SET remaining_sessions = remaining_sessions - 1 WHERE id = $1', [data.student_package_id]);
  revalidatePath(`/admin/students/${data.student_id}`);
  return { success: true };
}

export async function deleteSession(formData) {
  const data = Object.fromEntries(formData);
  const session = await get('SELECT * FROM session_records WHERE id = $1', [data.id]);
  if (!session) return { error: 'Session not found' };

  await query('DELETE FROM session_records WHERE id = $1', [data.id]);
  await query('UPDATE student_packages SET remaining_sessions = remaining_sessions + 1 WHERE id = $1', [session.student_package_id]);
  revalidatePath(`/admin/students/${data.student_id}`);
  return { success: true };
}

// --- Student Auth ---

export async function studentRegister(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const password = formData.get('password');

  if (!name || !email || !password) {
    return { error: 'Name, email, and password are required.' };
  }

  const existing = await get('SELECT id FROM users WHERE email = $1', [email]);
  if (existing) {
    return { error: 'Email already registered.' };
  }

  const password_hash = await bcrypt.hash(password, 12);

  const user = await query(
    'INSERT INTO users (name, email, password_hash, role, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [name, email, password_hash, 'student', phone || null]
  );

  const userId = user.rows[0].id;

  await query('INSERT INTO students (name, email, phone, user_id) VALUES ($1, $2, $3, $4)',
    [name, email, phone || null, userId]
  );

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  redirect('/student/dashboard');
}

export async function studentLogin(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const user = await get('SELECT * FROM users WHERE email = $1 AND role = $2', [email, 'student']);

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

  redirect('/student/dashboard');
}
