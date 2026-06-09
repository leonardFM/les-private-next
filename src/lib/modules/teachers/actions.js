'use server';

import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';

export async function saveTeacher(formData) {
  const data = Object.fromEntries(formData);
  const { id, name, email, phone, bio, specialization } = data;

  if (!name || !email) {
    return { error: 'Name and email are required.' };
  }

  if (id) {
    await query(`UPDATE teachers SET name=$1, email=$2, phone=$3, bio=$4, specialization=$5 WHERE id=$6`,
      [name, email, phone || null, bio || null, specialization || null, id]
    );
  } else {
    await query(`INSERT INTO teachers (name, email, phone, bio, specialization) VALUES ($1, $2, $3, $4, $5)`,
      [name, email, phone || null, bio || null, specialization || null]
    );
  }

  revalidatePath('/admin/teachers');
  return { success: true };
}

export async function deleteTeacher(formData) {
  const data = Object.fromEntries(formData);
  await query('DELETE FROM teachers WHERE id = $1', [data.id]);
  revalidatePath('/admin/teachers');
  return { success: true };
}
