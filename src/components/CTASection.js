'use client';

import React from 'react';
import Link from 'next/link';
import { getWhatsAppUrl } from '@/lib/constants';
import styles from './CTASection.module.css';

export default function CTASection({
  title = 'Siap Memulai Perjalanan Belajar Anda?',
  description = 'Temukan program yang sesuai dengan kebutuhan Anda dan mulai tingkatkan kemampuan bahasa Inggris dengan lebih percaya diri.',
  primaryActionText = 'Lihat Program',
  primaryMessage = '',
  secondaryActionText = 'Hubungi Kami',
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
