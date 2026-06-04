import React from 'react';
import ContactClient from './ContactClient';

export const metadata = {
  title: "Contact Us | El's Corner",
  description: "Get in touch with the admissions team at El's Corner.",
};

export default function Contact() {
  return (
    <div>
      <ContactClient />
    </div>
  );
}
