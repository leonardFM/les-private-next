import { initDb, get, all } from '@/lib/db';

export async function getTeachers() {
  await initDb();
  return all(`SELECT t.*, u.email AS user_email
    FROM teachers t
    LEFT JOIN users u ON u.id = t.user_id
    ORDER BY t.created_at DESC`);
}

export async function getTeacherById(id) {
  await initDb();
  return get(`SELECT t.*, u.email AS user_email
    FROM teachers t
    LEFT JOIN users u ON u.id = t.user_id
    WHERE t.id = $1`, [id]);
}
