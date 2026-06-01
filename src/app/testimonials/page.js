import React from 'react';
import TestimonialsClient from './TestimonialsClient';

export const metadata = {
  title: "Student Reviews & Stories | Lexicon English Academy",
  description: "Read success stories from students who achieved high IELTS/TOEFL scores, unlocked corporate promotion, and mastered conversation fluency.",
};

export default function Testimonials() {
  return (
    <div>
      {/* Page Header */}
      <section className="section" style={{ backgroundColor: 'var(--primary-soft)', padding: '60px 0', borderBottom: '1px solid var(--border-color)', marginBottom: '40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag">Student Success</span>
          <h1 className="section-title" style={{ margin: 0 }}>Student Testimonials</h1>
          <p className="section-subtitle" style={{ marginTop: '12px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Hear from our graduates worldwide who achieved their target band scores and career transitions.
          </p>
        </div>
      </section>

      {/* Testimonials Main Interface */}
      <TestimonialsClient />
    </div>
  );
}
