import React from 'react';
import ContactClient from './ContactClient';

export const metadata = {
  title: "Contact Us | Lexicon English Academy",
  description: "Get in touch with the admissions team at Lexicon English Academy. Request fee tables, campus tours, or book your free level diagnostic.",
};

export default function Contact() {
  return (
    <div>
      {/* Page Header */}
      <section className="section" style={{ backgroundColor: 'var(--primary-soft)', padding: '60px 0', borderBottom: '1px solid var(--border-color)', marginBottom: '40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag">Get In Touch</span>
          <h1 className="section-title" style={{ margin: 0 }}>Contact Our Academy</h1>
          <p className="section-subtitle" style={{ marginTop: '12px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Ready to enhance your English language capabilities? Drop us a line below or request a counselor callback.
          </p>
        </div>
      </section>

      {/* Main Contact Content Client */}
      <ContactClient />
    </div>
  );
}
