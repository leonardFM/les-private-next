'use server';

import { revalidatePath } from 'next/cache';
import { query, get } from '@/lib/db';

export async function createSchedule(formData) {
  const data = Object.fromEntries(formData);
  const { id, student_package_id, teacher_id, date, start_time, end_time, notes } = data;

  if (!student_package_id || !date || !start_time || !end_time) {
    return { error: 'Student package, date, start time, and end time are required.' };
  }

  const pkg = await get('SELECT student_id FROM student_packages WHERE id = $1', [student_package_id]);
  if (!pkg) return { error: 'Student package not found.' };

  if (id) {
    await query(`UPDATE schedules SET student_package_id=$1, teacher_id=$2, student_id=$3, date=$4, start_time=$5, end_time=$6, notes=$7, updated_at=NOW() WHERE id=$8`,
      [student_package_id, teacher_id || null, pkg.student_id, date, start_time, end_time, notes || null, id]
    );
  } else {
    await query(`INSERT INTO schedules (student_package_id, teacher_id, student_id, date, start_time, end_time, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [student_package_id, teacher_id || null, pkg.student_id, date, start_time, end_time, notes || null]
    );
  }

  revalidatePath('/admin/schedules');
  return { success: true };
}

function generateMeetingUrl() {
  const id = Math.random().toString(36).substring(2, 12);
  const meetCode = `${id.substring(0, 3)}-${id.substring(3, 7)}-${id.substring(7, 11)}`;
  return { meeting_id: meetCode, join_url: `https://meet.google.com/${meetCode}`, host_url: null };
}

export async function updateScheduleStatus(formData) {
  const data = Object.fromEntries(formData);
  const { id, status } = data;

  if (!id || !status) {
    return { error: 'ID and status are required.' };
  }

  const schedule = await get('SELECT * FROM schedules WHERE id = $1', [id]);
  if (!schedule) return { error: 'Schedule not found.' };

  await query('UPDATE schedules SET status = $1, updated_at = NOW() WHERE id = $2', [status, id]);

  if (status === 'confirmed') {
    const existing = await get('SELECT id FROM meetings WHERE schedule_id = $1', [id]);
    if (!existing) {
      const { meeting_id, join_url, host_url } = generateMeetingUrl();
      await query(
        `INSERT INTO meetings (schedule_id, provider, meeting_id, join_url, host_url) VALUES ($1, $2, $3, $4, $5)`,
        [id, 'google_meet', meeting_id, join_url, host_url]
      );
    }
  }

  if (status === 'completed') {
    const record = await get(
      'SELECT * FROM session_records WHERE schedule_id = $1', [id]
    );
    if (!record) {
      await query(`INSERT INTO session_records (student_package_id, session_date, notes, schedule_id)
        VALUES ($1, $2, $3, $4)`,
        [schedule.student_package_id, schedule.date, schedule.notes, id]
      );
      await query('UPDATE student_packages SET remaining_sessions = remaining_sessions - 1 WHERE id = $1',
        [schedule.student_package_id]
      );
    }
  }

  revalidatePath('/admin/schedules');
  return { success: true };
}

export async function deleteSchedule(formData) {
  const data = Object.fromEntries(formData);
  await query('DELETE FROM schedules WHERE id = $1', [data.id]);
  revalidatePath('/admin/schedules');
  return { success: true };
}
