'use client';

import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import PromotionalBanner from '@/components/PromotionalBanner';
import ProgramCard from '@/components/ProgramCard';
import CTASection from '@/components/CTASection';
import { useTranslation } from '@/i18n';
import styles from './page.module.css';
import aboutStyles from './about/about.module.css';

export default function HomeClient() {
  const { t } = useTranslation();
  const coreFeatures = t('home.features.cards');
  const programs = t('home.programs.cards');
  const storyParagraphs = t('about.storyParagraphs');
  const values = t('about.values');
  const learningModes = t('about.campuses');

  return (
    <div>
      <Hero />
      <PromotionalBanner />

      {/* Keunggulan Kami */}
      <section className={`${styles.features} section bg-yellow`}>
        <div className={styles.blobYellow1} />
        <div className={styles.blobYellow2} />
        <div className={styles.floatStar1}>⭐</div>
        <div className={styles.floatBook1}>📚</div>

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

          <div className={styles.featuresGrid}>
            {coreFeatures.map((feat, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feat.icon}</div>
                <h3 className={styles.featureTitle}>{feat.title}</h3>
                <p className={styles.featureDesc}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className={`${styles.programs} section bg-yellow`}>
        <div className={styles.blobYellow3} />
        <div className={styles.blobYellow4} />
        <div className={styles.floatStar2}>✨</div>
        <div className={styles.floatSpeech}>💬</div>

        <div className="container">
          <div className="section-header">
            <span className="section-tag">{t('home.programs.tag')}</span>
            <h2 className="section-title">{t('home.programs.title')}</h2>
            <p className="section-subtitle">{t('home.programs.subtitle')}</p>
          </div>

          <div className={styles.programsGrid}>
            {programs.map((prog, index) => (
              <ProgramCard key={prog.id || prog.title || index} {...prog} />
            ))}
          </div>

          <div className={styles.programsAction}>
            <Link href="/programs" className="btn btn-primary">
              {t('home.programs.btnText')}
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section bg-blue">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{t('about.tag')}</span>
            <h2 className="section-title">{t('about.title')}</h2>
            <p className="section-subtitle">{t('about.subtitle')}</p>
          </div>

          <div className={aboutStyles.storyRow}>
            <div className={aboutStyles.storyContent}>
              <h3 style={{ fontSize: '28px' }}>{t('about.storyTitle')}</h3>
              {storyParagraphs.map((p, i) => (
                <p key={i} style={{ opacity: 0.85 }}>{p}</p>
              ))}
            </div>

            <div className={aboutStyles.visualPane}>
              <h3 className={aboutStyles.visualPaneTitle}>{t('about.visualPaneTitle')}</h3>
              <p className={aboutStyles.visualPaneDesc}>{t('about.visualPaneDesc')}</p>
            </div>
          </div>

          <div className="section-header" style={{ marginBottom: '40px' }}>
            <h2 className="section-title" style={{ fontSize: '26px' }}>{t('about.valuesTitle')}</h2>
          </div>

          <div className={aboutStyles.valuesGrid}>
            {values.map((val, idx) => (
              <div key={idx} className={aboutStyles.valueCard}>
                <span className={aboutStyles.valueIcon}>{val.icon}</span>
                <h3 className={aboutStyles.valueTitle}>{val.title}</h3>
                <p className={aboutStyles.valueDesc}>{val.desc}</p>
              </div>
            ))}
          </div>

          <div className="section-header" style={{ marginTop: '60px', marginBottom: '40px' }}>
            <span className="section-tag">{t('about.campusTag')}</span>
            <h2 className="section-title">{t('about.campusTitle')}</h2>
            <p className="section-subtitle">{t('about.campusSubtitle')}</p>
          </div>

          <div className={aboutStyles.campusGrid}>
            {learningModes.map((item, idx) => (
              <div key={idx} className={aboutStyles.campusCard}>
                <div className={aboutStyles.campusImagePlaceholder}>{item.icon}</div>
                <div className={aboutStyles.campusInfo}>
                  <h3 className={aboutStyles.campusName}>{item.name}</h3>
                  <p className={aboutStyles.campusDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className={`${aboutStyles.teachersSection} section bg-yellow`}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <h2 className="section-title">{t('about.teachersTitle')}</h2>
            <p className="section-subtitle" style={{ maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>
              {t('about.teachersSubtitle')}
            </p>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <CTASection
          title={t('cta.default.title')}
          description={t('cta.default.description')}
          primaryActionText={t('cta.default.primaryText')}
          secondaryActionText={t('cta.default.secondaryText')}
        />
      </div>
    </div>
  );
}
