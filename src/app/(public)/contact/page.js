import { getFaqs } from '@/lib/data';
import { cookies } from 'next/headers';
import ContactClient from './ContactClient';

export const metadata = {
  title: "Contact Us | El's Corner",
  description: "Get in touch with the admissions team at El's Corner.",
};

export default async function Contact() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'id';
  const faqs = getFaqs(locale);

  return <ContactClient faqs={faqs} />;
}
