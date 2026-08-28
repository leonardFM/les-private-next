import HomeClient from './HomeClient';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: "Kursus Bahasa Inggris Online & Offline | EL's Corner",
  description: "Kursus bahasa Inggris untuk anak, remaja, dan dewasa. Kelas online dan offline dengan pengajar native dan kurikulum internasional.",
  openGraph: {
    title: "Kursus Bahasa Inggris Online & Offline | EL's Corner",
    description: "Kursus bahasa Inggris untuk anak, remaja, dan dewasa. Kelas online dan offline dengan pengajar native dan kurikulum internasional.",
    url: 'https://elscorner.com',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kursus Bahasa Inggris Online & Offline | EL's Corner",
    description: "Kursus bahasa Inggris untuk anak, remaja, dan dewasa. Kelas online dan offline dengan pengajar native dan kurikulum internasional.",
    images: ['/og-default.png'],
  },
  alternates: {
    canonical: 'https://elscorner.com',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: "EL's Corner",
  url: 'https://elscorner.com',
  logo: 'https://elscorner.com/logo/logo-png.png',
  description: "Program belajar bahasa Inggris untuk anak, remaja, dan dewasa melalui kelas online dan offline yang terstruktur, interaktif, dan personal.",
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Indonesian'],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: "EL's Corner",
  url: 'https://elscorner.com',
};

export default async function Home() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <HomeClient />
    </>
  );
}
