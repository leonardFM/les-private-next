'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/i18n';
import styles from './PromotionalBanner.module.css';

export default function PromotionalBanner() {
  const { t } = useTranslation();
  const banner = t('home.banner');

  return (
    <section className={styles.banner}>
      <div className={styles.bgDecoration} />
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.content}>
            <h2 className={styles.title}>
              {banner.title}
            </h2>
            <p className={styles.subtitle}>{banner.subtitle}</p>
            <Link href={banner.path} className={`btn btn-accent ${styles.cta}`}>
              {banner.cta}
            </Link>
          </div>
          <div className={styles.visual}>
            <div className={styles.iconCircle}>🧒</div>
          </div>
        </div>
      </div>
    </section>
  );
}
