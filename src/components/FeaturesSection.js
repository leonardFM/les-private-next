'use client';

import React from 'react';
import { useTranslation } from '@/i18n';
import styles from './FeaturesSection.module.css';

export default function FeaturesSection() {
  const { t } = useTranslation();
  const coreFeatures = t('home.features.cards');

  return (
    <section className={`${styles.section} section bg-yellow`}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t('home.features.tag')}</span>
          <h2 className="section-title">{t('home.features.title')}</h2>
          <p className="section-subtitle">{t('home.features.subtitle')}</p>
        </div>

        <div className="section-header" style={{ marginBottom: '36px' }}>
          <h3 className="section-title" style={{ fontSize: '28px' }}>{t('home.features.activeTitle')}</h3>
          <p className="section-subtitle" style={{ maxWidth: '780px' }}>{t('home.features.activeDesc')}</p>
        </div>

        <div className={styles.grid}>
          {coreFeatures.map((feat, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{feat.icon}</div>
              <h3 className={styles.title}>{feat.title}</h3>
              <p className={styles.desc}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
