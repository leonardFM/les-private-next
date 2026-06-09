import { getPrograms, getTestimonials } from '@/lib/data';
import { cookies } from 'next/headers';
import HomeClient from './HomeClient';

export default async function Home() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'id';

  const programs = getPrograms(locale, true);
  const testimonials = getTestimonials(locale, true);

  return <HomeClient programs={programs} testimonials={testimonials} />;
}
