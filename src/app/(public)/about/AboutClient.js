'use client';

import React from 'react';
import CTASection from '@/components/CTASection';
import { useTranslation } from '@/i18n';
import { getWhatsAppUrl } from '@/lib/constants';
import styles from './about.module.css';

export default function AboutClient() {
  const { t } = useTranslation();
  const values = t('about.values');
  const campuses = t('about.campuses');

  return (
  <div>
    <section
      className="section bg-yellow"
      style={{
        padding: '60px 0',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="section-tag">{t('about.tag')}</span>
        <h1 className="section-title" style={{ margin: 0 }}>
          {t('about.title')}
        </h1>
        <p
          className="section-subtitle"
          style={{
            marginTop: '12px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {t('about.subtitle')}
        </p>
      </div>
    </section>

    <section className="section bg-blue">
      <div className="container">
        <div className={styles.storyRow}>
            <div className={styles.storyContent}>
              <h2 style={{ fontSize: '28px' }}>
                {t('about.storyTitle')}
              </h2>
              {t('about.storyParagraphs').map((p, i) => (
                <p key={i} style={{ opacity: 0.85 }}>{p}</p>
              ))}
          </div>

          <div className={styles.visualPane}>
            <h3 className={styles.visualPaneTitle}>{t('about.visualPaneTitle')}</h3>
            <p className={styles.visualPaneDesc}>
              {t('about.visualPaneDesc')}
            </p>
          </div>
        </div>

        <div className="section-header" style={{ marginBottom: '40px' }}>
          <h2 className="section-title" style={{ fontSize: '26px' }}>
            {t('about.valuesTitle')}
          </h2>
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
      </div>
    </section>

    <section className={`${styles.campusSection} section bg-yellow`}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t('about.campusTag')}</span>
          <h2 className="section-title">{t('about.campusTitle')}</h2>
          <p className="section-subtitle">
            {t('about.campusSubtitle')}
          </p>
        </div>

        <div className={styles.campusGrid}>
          {campuses.map((camp, idx) => (
            <div key={idx} className={styles.campusCard}>
              <div className={styles.campusImagePlaceholder}>{camp.icon}</div>
              <div className={styles.campusInfo}>
                <h3 className={styles.campusName}>{camp.name}</h3>
                <p className={styles.campusDesc}>{camp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className={`${styles.teachersSection} section bg-blue`}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: 0 }}>
          <h2 className="section-title">{t('about.teachersTitle')}</h2>
          <p className="section-subtitle" style={{ maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>
            {t('about.teachersSubtitle')}
          </p>
        </div>
      </div>
    </section>

      <div className="container">
        <CTASection
          title={t('cta.about.title')}
          description={t('cta.about.description')}
          primaryMessage={`Halo! Saya ingin konsultasi tentang program les di El's Corner. Mohon informasinya.`}
        />
      </div>
  </div>
);
}
