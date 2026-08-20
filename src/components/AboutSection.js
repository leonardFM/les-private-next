'use client';

import React from 'react';
import { useTranslation } from '@/i18n';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const { t } = useTranslation();
  const storyParagraphs = t('about.storyParagraphs');
  const values = t('about.values');
  const learningModes = t('about.campuses');

  return (
    <section className="section bg-blue">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t('about.tag')}</span>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-subtitle">{t('about.subtitle')}</p>
        </div>

        <div className={styles.storyRow}>
          <div className={styles.storyContent}>
            <h3 style={{ fontSize: '28px' }}>{t('about.storyTitle')}</h3>
            {storyParagraphs.map((p, i) => (
              <p key={i} style={{ opacity: 0.85 }}>{p}</p>
            ))}
          </div>

          <div className={styles.visualPane}>
            <h3 className={styles.visualPaneTitle}>{t('about.visualPaneTitle')}</h3>
            <p className={styles.visualPaneDesc}>{t('about.visualPaneDesc')}</p>
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title" style={{ fontSize: '26px' }}>{t('about.valuesTitle')}</h2>
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

        <div className="section-header" style={{ marginTop: '60px' }}>
          <span className="section-tag">{t('about.campusTag')}</span>
          <h2 className="section-title">{t('about.campusTitle')}</h2>
          <p className="section-subtitle">{t('about.campusSubtitle')}</p>
        </div>

        <div className={styles.campusGrid}>
          {learningModes.map((item, idx) => (
            <div key={idx} className={styles.campusCard}>
              <div className={styles.campusImagePlaceholder}>{item.icon}</div>
              <div className={styles.campusInfo}>
                <h3 className={styles.campusName}>{item.name}</h3>
                <p className={styles.campusDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
