import { getPrograms } from '@/lib/data';
import { cookies } from 'next/headers';
import ProgramsClient from './ProgramsClient';

export const metadata = {
  title: "English Programs & Courses | El's Corner",
  description: "Browse our general English, academic preparation (IELTS/TOEFL), professional business English, and kids programs.",
};

export default async function Programs() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'id';
  const programs = await getPrograms(locale);

  return <ProgramsClient programs={programs} />;
}
