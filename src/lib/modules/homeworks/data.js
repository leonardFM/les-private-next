import { initDb, get, all } from '@/lib/db';

export async function getHomeworks() {
  await initDb();
  return all(`SELECT h.*,
    t.name AS teacher_name,
    sp.package_name, sp.remaining_sessions,
    s.name AS student_name,
    m.title AS module_title
    FROM homeworks h
    LEFT JOIN teachers t ON t.id = h.teacher_id
    LEFT JOIN student_packages sp ON sp.id = h.student_package_id
    LEFT JOIN students s ON s.id = sp.student_id
    LEFT JOIN modules m ON m.id = h.module_id
    ORDER BY h.created_at DESC`);
}

export async function getHomeworkById(id) {
  await initDb();
  return get(`SELECT h.*,
    t.name AS teacher_name,
    sp.package_name, sp.total_sessions, sp.remaining_sessions,
    s.id AS student_id, s.name AS student_name,
    m.title AS module_title
    FROM homeworks h
    LEFT JOIN teachers t ON t.id = h.teacher_id
    LEFT JOIN student_packages sp ON sp.id = h.student_package_id
    LEFT JOIN students s ON s.id = sp.student_id
    LEFT JOIN modules m ON m.id = h.module_id
    WHERE h.id = $1`, [id]);
}

export async function getSubmissionsByHomeworkId(homeworkId) {
  await initDb();
  return all(`SELECT hs.*,
    s.name AS student_name,
    hg.score, hg.feedback, hg.graded_at, hg.id AS grade_id, hg.teacher_id AS grade_teacher_id
    FROM homework_submissions hs
    JOIN students s ON s.id = hs.student_id
    LEFT JOIN homework_grades hg ON hg.homework_submission_id = hs.id
    WHERE hs.homework_id = $1
    ORDER BY hs.submitted_at DESC`, [homeworkId]);
}

export async function getStudentHomeworks(studentId) {
  await initDb();
  return all(`SELECT h.*,
    m.title AS module_title,
    hs.id AS submission_id, hs.submitted_at,
    hg.score, hg.feedback, hg.graded_at
    FROM homeworks h
    JOIN student_packages sp ON sp.id = h.student_package_id
    LEFT JOIN modules m ON m.id = h.module_id
    LEFT JOIN homework_submissions hs ON hs.homework_id = h.id AND hs.student_id = $1
    LEFT JOIN homework_grades hg ON hg.homework_submission_id = hs.id
    WHERE sp.student_id = $1
    ORDER BY h.created_at DESC`, [studentId]);
}

export async function getStudentHomeworkById(homeworkId, studentId) {
  await initDb();
  return get(`SELECT h.*,
    m.title AS module_title,
    sp.package_name,
    hs.id AS submission_id, hs.content AS submission_content, hs.file_url AS submission_file_url, hs.submitted_at,
    hg.score, hg.feedback, hg.graded_at
    FROM homeworks h
    JOIN student_packages sp ON sp.id = h.student_package_id
    LEFT JOIN modules m ON m.id = h.module_id
    LEFT JOIN homework_submissions hs ON hs.homework_id = h.id AND hs.student_id = $2
    LEFT JOIN homework_grades hg ON hg.homework_submission_id = hs.id
    WHERE h.id = $1 AND sp.student_id = $2`, [homeworkId, studentId]);
}

export async function getStudentPackagesForHomework() {
  await initDb();
  return all(`SELECT sp.id, sp.package_name, s.name AS student_name
    FROM student_packages sp
    JOIN students s ON s.id = sp.student_id
    WHERE sp.status = 'active'
    ORDER BY s.name, sp.package_name`);
}

export async function getModules() {
  await initDb();
  return all('SELECT * FROM modules ORDER BY sort_order ASC, id ASC');
}
