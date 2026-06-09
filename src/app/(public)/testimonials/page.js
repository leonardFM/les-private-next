import { getTestimonials } from '@/lib/data';
import { cookies } from 'next/headers';
import TestimonialsClient from './TestimonialsClient';

export const metadata = {
  title: "Student Reviews & Stories | El's Corner",
  description: "Read success stories from students who achieved high IELTS/TOEFL scores.",
};

export default async function Testimonials() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'id';
  const testimonials = await getTestimonials(locale);

  return <TestimonialsClient testimonials={testimonials} />;
}
