import ProgramsClient from './ProgramsClient';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: "Program Belajar Bahasa Inggris | EL's Corner",
  description: "Jelajahi program Kids English, Teens English, dan General English di EL's Corner.",
  openGraph: {
    title: "Program Belajar Bahasa Inggris | EL's Corner",
    description: "Jelajahi program Kids English, Teens English, dan General English di EL's Corner.",
    url: 'https://elscorner.com/programs',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Program Belajar Bahasa Inggris | EL's Corner",
    description: "Jelajahi program Kids English, Teens English, dan General English di EL's Corner.",
    images: ['/og-default.png'],
  },
  alternates: {
    canonical: 'https://elscorner.com/programs',
  },
};

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Program Belajar Bahasa Inggris | EL's Corner",
  description: "Jelajahi program Kids English, Teens English, dan General English di EL's Corner.",
  url: 'https://elscorner.com/programs',
  itemListElement: [
    {
      '@type': 'Course',
      name: 'Kids English',
      description: 'Program bahasa Inggris untuk anak-anak dengan metode belajar interaktif dan menyenangkan.',
      provider: {
        '@type': 'Organization',
        name: "EL's Corner",
      },
    },
    {
      '@type': 'Course',
      name: 'Teens English',
      description: 'Program bahasa Inggris untuk remaja dengan kurikulum berstandar internasional.',
      provider: {
        '@type': 'Organization',
        name: "EL's Corner",
      },
    },
    {
      '@type': 'Course',
      name: 'General English',
      description: 'Program bahasa Inggris umum untuk dewasa dengan fokus pada komunikasi.',
      provider: {
        '@type': 'Organization',
        name: "EL's Corner",
      },
    },
  ],
};

export default async function Programs() {
  return (
    <>
      <JsonLd data={courseSchema} />
      <ProgramsClient />
    </>
  );
}
