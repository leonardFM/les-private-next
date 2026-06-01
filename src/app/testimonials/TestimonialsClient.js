'use client';

import React, { useState } from 'react';
import TestimonialCard from '@/components/TestimonialCard';
import CTASection from '@/components/CTASection';
import styles from './testimonials.module.css';

export default function TestimonialsClient() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'IELTS Prep', 'Business English', 'General English', 'Kids & Teens'];

  const testimonials = [
    {
      name: 'Sarah Connor',
      course: 'IELTS Prep',
      rating: 5,
      quote: 'Lexicon completely changed my prep method. I scored an 8.0 overall band score! The tutors gave incredible writing suggestions and guided me on managing time.',
      initials: 'SC'
    },
    {
      name: 'Kenji Sato',
      course: 'Business English',
      rating: 5,
      quote: 'My confidence presenting to global clients has grown tenfold. The business vocabulary lists and simulated negotiations were highly practical and immediately usable.',
      initials: 'KS'
    },
    {
      name: 'Elena Rostova',
      course: 'General English',
      rating: 5,
      quote: 'The hybrid classroom structure matches my hectic itinerary. Lessons are engaging, interactive, and never boring. My speaking speed improved massively.',
      initials: 'ER'
    },
    {
      name: 'Ahmed Al-Mansoori',
      course: 'IELTS Prep',
      rating: 5,
      quote: 'I needed a 7.5 to get into my masters program in the UK. The teachers pinpointed my listening and writing gaps and helped me reach a 7.5 within just six weeks.',
      initials: 'AA'
    },
    {
      name: 'Linda Schmidt',
      course: 'Business English',
      rating: 4,
      quote: 'Excellent material for email etiquette and negotiations. We practiced business emails and vocabulary that were highly contextualized to corporate needs.',
      initials: 'LS'
    },
    {
      name: 'Toby Miller',
      course: 'Kids & Teens',
      rating: 5,
      quote: 'Our son loves the offline games and speaking challenges. He used to be shy, but now he chats in English without hesitation! Best decision we made.',
      initials: 'TM'
    }
  ];

  const filteredTestimonials = selectedFilter === 'All'
    ? testimonials
    : testimonials.filter(t => t.course === selectedFilter);

  return (
    <section className="section">
      <div className="container">
        {/* Success Metrics Summary Banner */}
        <div className={styles.statsRow}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statVal}>8.2 Avg.</span>
              <span className={styles.statLabel}>IELTS Student Score</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>94%</span>
              <span className={styles.statLabel}>Pass Rate (First Attempt)</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>4.9/5</span>
              <span className={styles.statLabel}>Average Student Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filterContainer}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`${styles.filterBtn} ${selectedFilter === f ? styles.filterActive : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className={styles.grid}>
          {filteredTestimonials.map((t, idx) => (
            <TestimonialCard key={idx} {...t} />
          ))}
        </div>

        {/* CTA */}
        <CTASection 
          title="Ready to Write Your Own Success Story?"
          description="Speak to our education advisors. Let us help you plan the optimal timeline to hit your goals."
          primaryActionText="Talk to an Advisor"
        />
      </div>
    </section>
  );
}
