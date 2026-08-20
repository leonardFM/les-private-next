'use client';

import React from 'react';
import { useTranslation } from '@/i18n';
import styles from './TeachersSection.module.css';

export default function TeachersSection() {
  const { t } = useTranslation();

  return (
    <section className={`${styles.section} section bg-yellow`}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: 0 }}>
          <h2 className="section-title">{t('about.teachersTitle')}</h2>
          <p className="section-subtitle" style={{ maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>
            {t('about.teachersSubtitle')}
          </p>
        </div>
      </div>
    </section>
  );
}
