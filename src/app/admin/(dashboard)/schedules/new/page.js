import { initDb } from '@/lib/db';
import { getTeachers } from '@/lib/modules/teachers/data';
import { getStudentPackagesSelect } from '@/lib/modules/schedules/data';
import ScheduleForm from '../ScheduleForm';

export default async function NewSchedulePage() {
  await initDb();
  const [teachers, packages] = await Promise.all([
    getTeachers(),
    getStudentPackagesSelect(),
  ]);

  return <ScheduleForm teachers={teachers} packages={packages} />;
}
