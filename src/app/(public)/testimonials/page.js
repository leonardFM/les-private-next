import { getTestimonials } from '@/lib/data';
import TestimonialsClient from './TestimonialsClient';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: "Testimoni Siswa & Kisah Sukses | El's Corner",
  description: "Baca kisah sukses siswa yang meraih skor IELTS/TOEFL tinggi di El's Corner.",
  openGraph: {
    title: "Testimoni Siswa & Kisah Sukses | El's Corner",
    description: "Baca kisah sukses siswa yang meraih skor IELTS/TOEFL tinggi di El's Corner.",
    url: 'https://elscorner.com/testimonials',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Testimoni Siswa & Kisah Sukses | El's Corner",
    description: "Baca kisah sukses siswa yang meraih skor IELTS/TOEFL tinggi di El's Corner.",
    images: ['/og-default.png'],
  },
  alternates: {
    canonical: 'https://elscorner.com/testimonials',
  },
};

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: "EL's Corner",
  url: 'https://elscorner.com',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '50',
    bestRating: '5',
    worstRating: '1',
  },
};

export default async function Testimonials() {
  const testimonials = await getTestimonials('id');

  return (
    <>
      <JsonLd data={reviewSchema} />
      <TestimonialsClient testimonials={testimonials} />
    </>
  );
}
