import React from 'react';
import ProgramsClient from './ProgramsClient';

export const metadata = {
  title: "English Programs & Courses | Lexicon English Academy",
  description: "Browse our general English, academic preparation (IELTS/TOEFL), professional business English, and kids programs.",
};

export default function Programs() {
  return (
    <div>
      {/* Page Header */}
      <section className="section" style={{ backgroundColor: 'var(--primary-soft)', padding: '60px 0', borderBottom: '1px solid var(--border-color)', marginBottom: '40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag">Academic Pathways</span>
          <h1 className="section-title" style={{ margin: 0 }}>Courses and Programs</h1>
          <p className="section-subtitle" style={{ marginTop: '12px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Find the course that matches your target learning speed, background level, and scheduling constraints.
          </p>
        </div>
      </section>

      {/* Programs List & Filter Section */}
      <ProgramsClient />
    </div>
  );
}
