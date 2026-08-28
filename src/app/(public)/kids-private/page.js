import KidsPrivateClient from './KidsPrivateClient';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: 'Kids Private Learning | Les Privat Interaktif untuk Anak | El\'s Corner',
  description: 'Les privat interaktif untuk anak. Tingkatkan fokus, kreativitas, dan percaya diri anak dengan metode belajar yang menyenangkan.',
  keywords: ['les privat anak', 'les privat interaktif', 'kids private learning', 'les anak sd', 'bimbingan belajar anak', 'tutor anak'],
  openGraph: {
    title: 'Kids Private Learning | Les Privat Interaktif untuk Anak | El\'s Corner',
    description: 'Les privat interaktif untuk anak. Tingkatkan fokus, kreativitas, dan percaya diri anak dengan metode belajar yang menyenangkan.',
    url: 'https://elscorner.com/kids-private',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kids Private Learning | Les Privat Interaktif untuk Anak | El\'s Corner',
    description: 'Les privat interaktif untuk anak. Tingkatkan fokus, kreativitas, dan percaya diri anak dengan metode belajar yang menyenangkan.',
    images: ['/og-default.png'],
  },
  alternates: {
    canonical: 'https://elscorner.com/kids-private',
  },
};

const kidsPrivateSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Kids Private Learning - Les Privat Interaktif untuk Anak',
  description: 'Les privat interaktif untuk anak usia 4-12 tahun. Tingkatkan fokus, kreativitas, dan percaya diri anak dengan metode belajar yang menyenangkan.',
  url: 'https://elscorner.com/kids-private',
  provider: {
    '@type': 'Organization',
    name: "EL's Corner",
    url: 'https://elscorner.com',
  },
  courseMode: ['onsite', 'online'],
  educationalLevel: 'Beginner',
  inLanguage: 'id',
};

export default function KidsPrivatePage() {
  return (
    <>
      <JsonLd data={kidsPrivateSchema} />
      <KidsPrivateClient />
    </>
  );
}
