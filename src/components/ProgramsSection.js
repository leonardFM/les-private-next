'use client';

import React from 'react';
import Link from 'next/link';
import ProgramCard from '@/components/ProgramCard';
import { useTranslation } from '@/i18n';
import styles from './ProgramsSection.module.css';

export default function ProgramsSection() {
  const { t } = useTranslation();
  const programs = t('home.programs.cards');

  return (
    <section className={`${styles.section} section bg-yellow`}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t('home.programs.tag')}</span>
          <h2 className="section-title">{t('home.programs.title')}</h2>
          <p className="section-subtitle">{t('home.programs.subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {programs.map((prog, index) => (
            <ProgramCard key={prog.id || prog.title || index} {...prog} />
          ))}
        </div>

        <div className={styles.action}>
          <Link href="/programs" className="btn btn-primary">
            {t('home.programs.btnText')}
          </Link>
        </div>
      </div>
    </section>
  );
}
