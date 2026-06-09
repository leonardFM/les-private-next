import { initDb } from '@/lib/db';
import { getTeachers } from '@/lib/modules/teachers/data';
import { getStudentPackagesForHomework } from '@/lib/modules/homeworks/data';
import { getModules } from '@/lib/modules/materials/data';
import HomeworkForm from '../HomeworkForm';

export default async function NewHomeworkPage() {
  await initDb();
  const [teachers, packages, modules] = await Promise.all([
    getTeachers(),
    getStudentPackagesForHomework(),
    getModules(),
  ]);

  return <HomeworkForm teachers={teachers} packages={packages} modules={modules} />;
}
