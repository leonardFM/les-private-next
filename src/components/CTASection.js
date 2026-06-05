'use client';

import React from 'react';
import Link from 'next/link';
import { getWhatsAppUrl } from '@/lib/constants';
import styles from './CTASection.module.css';

export default function CTASection({
  title = 'Ready to Speak English Confidently?',
  description = 'Join thousands of successful graduates who have achieved language proficiency with El\'s Corner. Sign up today and get a free placement assessment and demo session.',
  primaryActionText = 'Book Placement Test',
  primaryMessage = '',
  secondaryActionText = 'Browse Programs',
  secondaryActionUrl = '/programs'
}) {
  return (
    <section className={styles.section}>
      <div className={`${styles.bgDecoration} ${styles.bgDeco1}`}></div>
      <div className={`${styles.bgDecoration} ${styles.bgDeco2}`}></div>

      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.desc}>{description}</p>
        <div className={styles.actions}>
          <a href={getWhatsAppUrl(primaryMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            {primaryActionText}
          </a>
          <Link href={secondaryActionUrl} className="btn btn-accent">
            {secondaryActionText}
          </Link>
        </div>
      </div>
    </section>
  );
}
