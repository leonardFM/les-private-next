import { initDb, get, all } from '@/lib/db';

export async function getSchedules({ status, studentId, teacherId, date } = {}) {
  await initDb();
  let sql = `SELECT s.*,
    t.name AS teacher_name,
    st.name AS student_name,
    sp.package_name,
    sp.total_sessions, sp.remaining_sessions
    FROM schedules s
    LEFT JOIN teachers t ON t.id = s.teacher_id
    LEFT JOIN students st ON st.id = s.student_id
    LEFT JOIN student_packages sp ON sp.id = s.student_package_id
    WHERE 1=1`;
  const params = [];

  if (status) {
    sql += ' AND s.status = $' + (params.length + 1);
    params.push(status);
  }
  if (studentId) {
    sql += ' AND s.student_id = $' + (params.length + 1);
    params.push(studentId);
  }
  if (teacherId) {
    sql += ' AND s.teacher_id = $' + (params.length + 1);
    params.push(teacherId);
  }
  if (date) {
    sql += ' AND s.date = $' + (params.length + 1);
    params.push(date);
  }

  sql += ' ORDER BY s.date DESC, s.start_time ASC';
  return all(sql, params);
}

export async function getScheduleById(id) {
  await initDb();
  return get(`SELECT s.*,
    t.name AS teacher_name, t.email AS teacher_email, t.phone AS teacher_phone,
    st.name AS student_name, st.email AS student_email, st.phone AS student_phone,
    sp.package_name, sp.total_sessions, sp.remaining_sessions
    FROM schedules s
    LEFT JOIN teachers t ON t.id = s.teacher_id
    LEFT JOIN students st ON st.id = s.student_id
    LEFT JOIN student_packages sp ON sp.id = s.student_package_id
    WHERE s.id = $1`, [id]);
}

export async function getStudentPackagesSelect() {
  await initDb();
  return all(`SELECT sp.id, sp.package_name, s.name AS student_name
    FROM student_packages sp
    JOIN students s ON s.id = sp.student_id
    WHERE sp.status = 'active'
    ORDER BY s.name, sp.package_name`);
}
