'use client';

import React from 'react';
import Link from 'next/link';
import styles from './CTASection.module.css';

export default function CTASection({
  title = 'Ready to Speak English Confidently?',
  description = 'Join thousands of successful graduates who have achieved language proficiency with Lexicon English Academy. Sign up today and get a free placement assessment and demo session.',
  primaryActionText = 'Book Placement Test',
  primaryActionUrl = '/contact',
  secondaryActionText = 'Browse Programs',
  secondaryActionUrl = '/programs'
}) {
  return (
    <section className={styles.section}>
      <div className={styles.bgDecoration} style={{ top: '-100px', left: '-100px' }}></div>
      <div className={styles.bgDecoration} style={{ bottom: '-100px', right: '-100px' }}></div>

      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.desc}>{description}</p>
        <div className={styles.actions}>
          <Link href={primaryActionUrl} className="btn btn-accent">
            {primaryActionText}
          </Link>
          <Link href={secondaryActionUrl} className="btn btn-secondary" style={{ color: '#ffffff', borderColor: '#ffffff' }}>
            {secondaryActionText}
          </Link>
        </div>
      </div>
    </section>
  );
}
