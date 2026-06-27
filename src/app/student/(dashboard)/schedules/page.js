import { initDb } from '@/lib/db';
import { verifyStudentSession } from '@/lib/student-dal';
import { getSchedules } from '@/lib/modules/schedules/data';
import { getMeetingsByScheduleIds } from '@/lib/modules/meetings/data';
import { get } from '@/lib/db';
import ScheduleClient from './ScheduleClient';

export default async function StudentSchedulesPage() {
  await initDb();
  const session = await verifyStudentSession();

  const student = await get('SELECT id FROM students WHERE user_id = $1', [session.id]);
  const schedules = student
    ? await getSchedules({ studentId: student.id })
    : [];

  const scheduleIds = schedules.map(s => s.id);
  const meetings = await getMeetingsByScheduleIds(scheduleIds);

  const schedulesWithMeeting = schedules.map(s => ({
    ...s,
    date: s.date instanceof Date ? s.date.toISOString().slice(0, 10) : String(s.date).slice(0, 10),
    meeting: meetings[s.id] || null,
  }));

  return <ScheduleClient schedules={schedulesWithMeeting} />;
}
