import { notFound } from 'next/navigation';
import { initDb } from '@/lib/db';
import { getScheduleById, getStudentPackagesSelect } from '@/lib/modules/schedules/data';
import { getTeachers } from '@/lib/modules/teachers/data';
import { getMeetingByScheduleId } from '@/lib/modules/meetings/data';
import ScheduleForm from '../ScheduleForm';

export default async function ScheduleDetailPage({ params }) {
  await initDb();
  const { id } = await params;
  const [schedule, teachers, packages, meeting] = await Promise.all([
    getScheduleById(id),
    getTeachers(),
    getStudentPackagesSelect(),
    getMeetingByScheduleId(id),
  ]);

  if (!schedule) notFound();

  return <ScheduleForm schedule={schedule} teachers={teachers} packages={packages} meeting={meeting} />;
}
