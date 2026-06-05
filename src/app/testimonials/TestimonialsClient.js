'use client';

import React, { useState } from 'react';
import TestimonialCard from '@/components/TestimonialCard';
import CTASection from '@/components/CTASection';
import { useTranslation } from '@/i18n';
import styles from './testimonials.module.css';

export default function TestimonialsClient() {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = t('testimonialsPage.filters');
  const testimonials = t('testimonialsPage.testimonials');
  const stats = t('testimonialsPage.stats');

  const filteredTestimonials = selectedFilter === 'All'
    ? testimonials
    : testimonials.filter(t => t.course === selectedFilter);

  return (
    <div>
      {/* Page Header */}
      <section className="section bg-yellow" style={{ padding: '60px 0', borderBottom: '1px solid var(--border-color)', marginBottom: '40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag">{t('testimonialsPage.tag')}</span>
          <h1 className="section-title" style={{ margin: 0 }}>{t('testimonialsPage.title')}</h1>
          <p className="section-subtitle" style={{ marginTop: '12px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            {t('testimonialsPage.subtitle')}
          </p>
        </div>
      </section>

      <section className="section bg-blue">
      <div className="container">
        {/* Success Metrics Summary Banner */}
        <div className={styles.statsRow}>
          <div className={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <div key={idx} className={styles.statItem}>
                <span className={styles.statVal}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filterContainer}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`${styles.filterBtn} ${selectedFilter === f ? styles.filterActive : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className={styles.grid}>
          {filteredTestimonials.map((t, idx) => (
            <TestimonialCard key={idx} {...t} />
          ))}
        </div>

        {/* CTA */}
        <CTASection 
          title={t('cta.default.title')}
          description={t('cta.default.description')}
          primaryActionText={t('cta.default.primaryText')}
        />
      </div>
    </section>
    </div>
  );
}
