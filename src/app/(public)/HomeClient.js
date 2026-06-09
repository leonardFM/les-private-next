'use client';

import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import PromotionalBanner from '@/components/PromotionalBanner';
import ProgramCard from '@/components/ProgramCard';
import TestimonialCard from '@/components/TestimonialCard';
import CTASection from '@/components/CTASection';
import { useTranslation } from '@/i18n';
import styles from './page.module.css';

export default function HomeClient({ programs, testimonials }) {
  const { t } = useTranslation();
  const coreFeatures = t('home.features.cards');
  const stats = t('home.stats');

  return (
    <div>
      <Hero />
      <PromotionalBanner />

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

      <section className="section bg-blue">
        <div className={styles.blobBlue1} />
        <div className={styles.blobBlue2} />
        <div className={styles.floatGlobe}>🌍</div>
        <div className={styles.floatGradCap}>🎓</div>

        <div className="container">
          <div className="section-header">
            <span className="section-tag">{t('home.programs.tag')}</span>
            <h2 className="section-title">{t('home.programs.title')}</h2>
            <p className="section-subtitle">{t('home.programs.subtitle')}</p>
          </div>

          <div className={styles.programsGrid}>
            {programs.map((prog) => (
              <ProgramCard key={prog.id} {...prog} />
            ))}
          </div>

          <div className={styles.programsAction}>
            <Link href="/programs" className="btn btn-secondary">
              {t('home.programs.btnText')}
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.stats} bg-yellow`}>
        <div className={styles.blobYellow3} />
        <div className={styles.blobYellow4} />
        <div className={styles.floatStar2}>✨</div>
        <div className={styles.floatSpeech}>💬</div>

        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <span className={styles.statVal}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-blue">
        <div className={styles.blobBlue3} />
        <div className={styles.blobBlue4} />
        <div className={styles.floatStar3}>🌟</div>
        <div className={styles.floatBook2}>📖</div>

        <div className="container">
          <div className="section-header">
            <span className="section-tag">{t('home.testimonials.tag')}</span>
            <h2 className="section-title">{t('home.testimonials.title')}</h2>
            <p className="section-subtitle">{t('home.testimonials.subtitle')}</p>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((test) => (
              <TestimonialCard key={test.id} {...test} />
            ))}
          </div>

          <div className={styles.programsAction}>
            <Link href="/testimonials" className="btn btn-secondary">
              {t('home.testimonials.btnText')}
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
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
