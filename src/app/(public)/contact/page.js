import { getFaqs } from '@/lib/data';
import ContactClient from './ContactClient';
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: "Hubungi Kami | El's Corner",
  description: "Hubungi tim admissions El's Corner untuk informasi program belajar bahasa Inggris.",
  openGraph: {
    title: "Hubungi Kami | El's Corner",
    description: "Hubungi tim admissions El's Corner untuk informasi program belajar bahasa Inggris.",
    url: 'https://elscorner.com/contact',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hubungi Kami | El's Corner",
    description: "Hubungi tim admissions El's Corner untuk informasi program belajar bahasa Inggris.",
    images: ['/og-default.png'],
  },
  alternates: {
    canonical: 'https://elscorner.com/contact',
  },
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: "Hubungi Kami | El's Corner",
  description: "Hubungi tim admissions El's Corner untuk informasi program belajar bahasa Inggris.",
  url: 'https://elscorner.com/contact',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: "EL's Corner",
  url: 'https://elscorner.com',
  logo: 'https://elscorner.com/logo/logo-png.png',
  description: "Program belajar bahasa Inggris untuk anak, remaja, dan dewasa.",
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ID',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'admissions',
    availableLanguage: ['Indonesian'],
  },
};

export default async function Contact() {
  const faqs = await getFaqs('id');

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (faqs || []).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={contactPageSchema} />
      <JsonLd data={localBusinessSchema} />
      {faqs && faqs.length > 0 && <JsonLd data={faqSchema} />}
      <ContactClient faqs={faqs} />
    </>
  );
}
