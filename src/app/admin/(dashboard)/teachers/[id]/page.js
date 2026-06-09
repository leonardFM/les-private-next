import { notFound } from 'next/navigation';
import { initDb } from '@/lib/db';
import { getTeacherById } from '@/lib/modules/teachers/data';
import TeacherForm from '../TeacherForm';

export default async function EditTeacherPage({ params }) {
  await initDb();
  const { id } = await params;
  const teacher = await getTeacherById(id);

  if (!teacher) notFound();

  return <TeacherForm teacher={teacher} />;
}
