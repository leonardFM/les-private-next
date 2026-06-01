import React from 'react';
import CTASection from '@/components/CTASection';
import styles from './about.module.css';

export const metadata = {
  title: "About Us | Lexicon English Academy",
  description: "Learn about the mission, values, campuses, and certified teaching staff of Lexicon English Academy.",
};

export default function About() {
  const values = [
    {
      icon: '🎯',
      title: 'Goal-Oriented Curriculum',
      desc: 'All training is designed to hit specific language output goals mapped to CEFR or IELTS/TOEFL exam benchmarks.'
    },
    {
      icon: '🤝',
      title: 'Immersive Environment',
      desc: 'We promote dynamic speech policies in both our digital webinars and face-to-face physical classrooms.'
    },
    {
      icon: '📈',
      title: 'Continuous Tracking',
      desc: 'Weekly diagnostic tests and personal report files trace your accent, grammar accuracy, and vocabulary growth.'
    }
  ];

  const teachers = [
    {
      initials: 'AB',
      name: 'Arthur Pendelton',
      role: 'IELTS Coach & Native Tutor',
      bio: ' Arthur holds a Masters in Applied Linguistics from Oxford and has 8+ years preparing students for IELTS Band 8.0+.'
    },
    {
      initials: 'MJ',
      name: 'Maria Jenkins',
      role: 'Corporate Language Consultant',
      bio: 'Specialist in English for Business. Has trained management teams in technology, finance, and manufacturing sectors.'
    },
    {
      initials: 'DK',
      name: 'David Kim',
      role: 'TOEFL iBT Specialist',
      bio: 'Ex-TOEFL examiner. Focuses on speaking and writing response structures to maximize scores quickly.'
    },
    {
      initials: 'SH',
      name: 'Sophia Hernandez',
      role: 'English for Kids Instructor',
      bio: 'TEFL certified with specializations in young learner pedagogy. Expert at keeping remote lessons engaging.'
    }
  ];

  const campuses = [
    {
      icon: '🏢',
      name: 'Downtown Plaza Campus',
      desc: 'Our primary branch featuring 12 multimedia classrooms, a dedicated study lounge, language testing lab, and central transit access.'
    },
    {
      icon: '🏫',
      name: 'Suburban North Campus',
      desc: 'Spacious campus suited for weekend families and children, complete with kids-friendly speech zones and interactive smartboards.'
    },
    {
      icon: '💻',
      name: 'Virtual Cloud Campus',
      desc: 'High-speed remote learning infrastructure supporting live interactive webinars, collaborative digital breakout rooms, and digital materials.'
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="section" style={{ backgroundColor: 'var(--primary-soft)', padding: '60px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag">Who We Are</span>
          <h1 className="section-title" style={{ margin: 0 }}>Empowering Global Voices</h1>
          <p className="section-subtitle" style={{ marginTop: '12px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            We bridge language barriers through high-impact, modern English education suited for both online convenience and physical classroom networking.
          </p>
        </div>
      </section>

      {/* Our Story section */}
      <section className="section">
        <div className="container">
          <div className={styles.storyRow}>
            {/* Story text */}
            <div className={styles.storyContent}>
              <h2 style={{ fontSize: '28px', color: 'var(--foreground)' }}>Our Story and Mission</h2>
              <p style={{ color: 'var(--foreground-muted)' }}>
                Founded in 2012, Lexicon English Academy started with a single physical classroom and a clear philosophy: language learning shouldn&apos;t feel like memorizing dry grammatical rules. It should be an active, immersive experience that prepares you to navigate the real world.
              </p>
              <p style={{ color: 'var(--foreground-muted)' }}>
                Today, Lexicon operates two central physical campuses alongside a custom remote-class platform. We serve students worldwide, from ambitious students preparing for foreign university admissions to executives polishing their communications for international boardrooms.
              </p>
              <p style={{ color: 'var(--foreground-muted)' }}>
                Our mission remains unchanged: to provide students with the highest-standard, most practical language coaching possible, ensuring they speak English with absolute confidence, clarity, and precision.
              </p>
            </div>
            
            {/* Graphic placeholder */}
            <div className={styles.visualPane}>
              <h3 className={styles.visualPaneTitle}>Est. 2012</h3>
              <p className={styles.visualPaneDesc}>
                Over a decade of academic excellence and classroom innovation.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="section-header" style={{ marginBottom: '40px' }}>
            <h2 className="section-title" style={{ fontSize: '26px' }}>Our Core Pillars</h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((val, idx) => (
              <div key={idx} className={styles.valueCard}>
                <span className={styles.valueIcon}>{val.icon}</span>
                <h3 className={styles.valueTitle}>{val.title}</h3>
                <p className={styles.valueDesc}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus/Facilities Section */}
      <section className={`${styles.campusSection} section`}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Learning Spaces</span>
            <h2 className="section-title">Where Learning Happens</h2>
            <p className="section-subtitle">
              Enjoy state-of-the-art learning facilities whether you join us in-person or from the comfort of your own desk.
            </p>
          </div>
          <div className={styles.campusGrid}>
            {campuses.map((camp, idx) => (
              <div key={idx} className={styles.campusCard}>
                <div className={styles.campusImagePlaceholder}>{camp.icon}</div>
                <div className={styles.campusInfo}>
                  <h3 className={styles.campusName}>{camp.name}</h3>
                  <p className={styles.campusDesc}>{camp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers / Educators Section */}
      <section className={`${styles.teachersSection} section`}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Faculty</span>
            <h2 className="section-title">Meet Our Academic Mentors</h2>
            <p className="section-subtitle">
              Learn from certified language experts who are deeply passionate about communicative success and test strategy.
            </p>
          </div>

          <div className={styles.teachersGrid}>
            {teachers.map((teach, idx) => (
              <div key={idx} className={styles.teacherCard}>
                <div className={styles.teacherImagePlaceholder}>{teach.initials}</div>
                <div className={styles.teacherInfo}>
                  <h3 className={styles.teacherName}>{teach.name}</h3>
                  <span className={styles.teacherRole}>{teach.role}</span>
                  <p className={styles.teacherBio}>{teach.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <div className="container">
        <CTASection 
          title="Ready to Start Your Journey?"
          description="Speak to our course consultants today to configure a learning timetable that matches your lifestyle."
        />
      </div>
    </div>
  );
}
