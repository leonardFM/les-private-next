'use client';

import React, { useState } from 'react';
import ProgramCard from '@/components/ProgramCard';
import CTASection from '@/components/CTASection';
import styles from './programs.module.css';

export default function ProgramsClient() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', 'General', 'Academic', 'Professional', 'Young Learners'];

  const programs = [
    {
      title: 'General English Mastery',
      description: 'Develop fluency, perfect grammar, and expand vocabulary for everyday interactions. Ideal for building fundamental communicative skills.',
      category: 'General',
      format: 'Online & Offline',
      level: 'All Levels (A1 - C2)',
      duration: '12 Weeks',
      price: '$299',
      icon: '💬'
    },
    {
      title: 'IELTS Academic Prep Boost',
      description: 'Intensive course targeting speaking, listening, reading, and writing modules. Complete with full mock tests and personalized essay feedback.',
      category: 'Academic',
      format: 'Hybrid Classroom',
      level: 'Intermediate - Advanced',
      duration: '8 Weeks',
      price: '$450',
      icon: '🎓'
    },
    {
      title: 'Business Communication Pro',
      description: 'Master negotiation patterns, professional presentations, emails, and corporate speaking etiquette to thrive in global business settings.',
      category: 'Professional',
      format: 'Online Sessions',
      level: 'Upper Intermediate+',
      duration: '10 Weeks',
      price: '$399',
      icon: '💼'
    },
    {
      title: 'TOEFL iBT Prep Strategy',
      description: 'Focused test strategy coaching targeting the computer-based format. Practice essay templates, speaking timings, and listening notes.',
      category: 'Academic',
      format: 'Online Classes',
      level: 'Intermediate - Advanced',
      duration: '10 Weeks',
      price: '$420',
      icon: '📝'
    },
    {
      title: 'Junior Speech Adventurers',
      description: 'Interactive and gamified English learning for children. Focuses on speaking confidence, spelling games, and baseline literacy.',
      category: 'Young Learners',
      format: 'Offline Campus',
      level: 'Ages 6 - 11 (Beginner)',
      duration: '16 Weeks',
      price: '$250',
      icon: '🎨'
    },
    {
      title: 'Teen Conversation Club',
      description: 'High-energy debate topics, vocabulary games, and group presentations designed to make teenager public speaking anxiety vanish.',
      category: 'Young Learners',
      format: 'Hybrid Class',
      level: 'Ages 12 - 17 (Intermediate)',
      duration: '12 Weeks',
      price: '$280',
      icon: '📣'
    }
  ];

  const filteredPrograms = selectedFilter === 'All'
    ? programs
    : programs.filter(prog => prog.category === selectedFilter);

  return (
    <section className="section">
      <div className="container">
        {/* Interactive Filters Bar */}
        <div className={styles.filterContainer}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`${styles.filterBtn} ${selectedFilter === cat ? styles.filterActive : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className={styles.grid}>
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((prog, idx) => (
              <ProgramCard key={idx} {...prog} />
            ))
          ) : (
            <div className={styles.noResults}>
              <h3 className={styles.noResultsTitle}>No programs found</h3>
              <p className={styles.noResultsDesc}>Please check back later or contact us for custom schedules.</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <CTASection 
          title="Not Sure Which Level is Yours?"
          description="Book a free 15-minute diagnostic test with our advisors. We will evaluate your grammar, speaking, and listening levels to suggest the perfect syllabus."
          primaryActionText="Schedule Free Diagnostic"
        />
      </div>
    </section>
  );
}
