'use server';

import { revalidatePath } from 'next/cache';
import { query, get } from '@/lib/db';

export async function saveHomework(formData) {
  const data = Object.fromEntries(formData);
  const { id, module_id, teacher_id, student_package_id, title, description, due_date, max_score } = data;

  if (!student_package_id || !title) {
    return { error: 'Student package and title are required.' };
  }

  if (id) {
    await query(`UPDATE homeworks SET module_id=$1, teacher_id=$2, student_package_id=$3, title=$4, description=$5, due_date=$6, max_score=$7, updated_at=NOW() WHERE id=$8`,
      [module_id || null, teacher_id || null, student_package_id, title, description || null, due_date || null, max_score || 100, id]
    );
  } else {
    await query(`INSERT INTO homeworks (module_id, teacher_id, student_package_id, title, description, due_date, max_score) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [module_id || null, teacher_id || null, student_package_id, title, description || null, due_date || null, max_score || 100]
    );
  }

  revalidatePath('/admin/homeworks');
  return { success: true };
}

export async function deleteHomework(formData) {
  const data = Object.fromEntries(formData);
  await query('DELETE FROM homeworks WHERE id = $1', [data.id]);
  revalidatePath('/admin/homeworks');
  return { success: true };
}

export async function submitHomework(formData) {
  const data = Object.fromEntries(formData);
  const { homework_id, student_id, content, file_url } = data;

  if (!homework_id || !student_id) {
    return { error: 'Homework ID and student ID are required.' };
  }

  const existing = await get('SELECT id FROM homework_submissions WHERE homework_id = $1 AND student_id = $2', [homework_id, student_id]);
  if (existing) return { error: 'You have already submitted this homework.' };

  await query('INSERT INTO homework_submissions (homework_id, student_id, content, file_url) VALUES ($1, $2, $3, $4)',
    [homework_id, student_id, content || null, file_url || null]
  );

  revalidatePath(`/student/homeworks/${homework_id}`);
  revalidatePath('/admin/homeworks');
  return { success: true };
}

export async function gradeSubmission(formData) {
  const data = Object.fromEntries(formData);
  const { submission_id, homework_id, teacher_id, score, feedback } = data;

  if (!submission_id || score === undefined || score === '') {
    return { error: 'Submission ID and score are required.' };
  }

  const existing = await get('SELECT id FROM homework_grades WHERE homework_submission_id = $1', [submission_id]);
  if (existing) {
    await query('UPDATE homework_grades SET score=$1, feedback=$2, teacher_id=$3, graded_at=NOW() WHERE homework_submission_id=$4',
      [score, feedback || null, teacher_id || null, submission_id]
    );
  } else {
    await query('INSERT INTO homework_grades (homework_submission_id, teacher_id, score, feedback) VALUES ($1, $2, $3, $4)',
      [submission_id, teacher_id || null, score, feedback || null]
    );
  }

  revalidatePath(`/admin/homeworks/${homework_id}`);
  return { success: true };
}
