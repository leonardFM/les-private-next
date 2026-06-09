import { initDb, get, all } from '@/lib/db';

export async function getModules(packageId) {
  await initDb();
  const params = packageId ? [packageId] : [];
  const sql = packageId
    ? 'SELECT * FROM modules WHERE package_id = $1 ORDER BY sort_order ASC, id ASC'
    : `SELECT m.*, p.name AS package_name FROM modules m
       JOIN packages p ON p.id = m.package_id
       ORDER BY m.sort_order ASC, m.id ASC`;
  return all(sql, params);
}

export async function getModuleById(id) {
  await initDb();
  return get(`SELECT m.*, p.name AS package_name
    FROM modules m
    JOIN packages p ON p.id = m.package_id
    WHERE m.id = $1`, [id]);
}

export async function getMaterialsByModuleId(moduleId) {
  await initDb();
  return all('SELECT * FROM materials WHERE module_id = $1 ORDER BY sort_order ASC, id ASC', [moduleId]);
}

export async function getMaterialById(id) {
  await initDb();
  return get('SELECT * FROM materials WHERE id = $1', [id]);
}

export async function getStudentModules(userId) {
  await initDb();
  return all(`SELECT DISTINCT m.*, p.name AS package_name
    FROM modules m
    JOIN packages p ON p.id = m.package_id
    JOIN student_packages sp ON sp.total_sessions > 0
    JOIN students s ON s.id = sp.student_id
    WHERE s.user_id = $1
    ORDER BY m.sort_order ASC, m.id ASC`, [userId]);
}

export async function getStudentMaterials(moduleId, userId) {
  await initDb();
  return all(`SELECT mat.*
    FROM materials mat
    JOIN modules m ON m.id = mat.module_id
    JOIN packages p ON p.id = m.package_id
    JOIN student_packages sp ON sp.total_sessions > 0
    JOIN students s ON s.id = sp.student_id
    WHERE mat.module_id = $1 AND s.user_id = $2
    ORDER BY mat.sort_order ASC, mat.id ASC`, [moduleId, userId]);
}
