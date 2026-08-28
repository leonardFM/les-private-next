import AboutClient from './AboutClient';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: "Tentang Kami | EL's Corner",
  description: "Belajar bahasa Inggris dengan percaya diri melalui pendekatan yang terstruktur, interaktif, dan personal.",
  openGraph: {
    title: "Tentang Kami | EL's Corner",
    description: "Belajar bahasa Inggris dengan percaya diri melalui pendekatan yang terstruktur, interaktif, dan personal.",
    url: 'https://elscorner.com/about',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tentang Kami | EL's Corner",
    description: "Belajar bahasa Inggris dengan percaya diri melalui pendekatan yang terstruktur, interaktif, dan personal.",
    images: ['/og-default.png'],
  },
  alternates: {
    canonical: 'https://elscorner.com/about',
  },
};

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: "Tentang Kami | EL's Corner",
  description: "Belajar bahasa Inggris dengan percaya diri melalui pendekatan yang terstruktur, interaktif, dan personal.",
  url: 'https://elscorner.com/about',
  mainEntity: {
    '@type': 'Organization',
    name: "EL's Corner",
    url: 'https://elscorner.com',
  },
};

export default function About() {
  return (
    <>
      <JsonLd data={aboutPageSchema} />
      <AboutClient />
    </>
  );
}
