'use client';

import React, { useState } from 'react';
import ProgramCard from '@/components/ProgramCard';
import CTASection from '@/components/CTASection';
import { useTranslation } from '@/i18n';
import styles from './programs.module.css';

export default function ProgramsClient() {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = t('programsPage.filters');
  const programs = t('programsPage.programs');

  const filteredPrograms = selectedFilter === 'All'
    ? programs
    : programs.filter(prog => prog.category === selectedFilter);

  return (
    <div>
      {/* Page Header */}
      <section className="section bg-yellow" style={{ padding: '60px 0', borderBottom: '1px solid var(--border-color)', marginBottom: '40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag">{t('programsPage.tag')}</span>
          <h1 className="section-title" style={{ margin: 0 }}>{t('programsPage.title')}</h1>
          <p className="section-subtitle" style={{ marginTop: '12px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            {t('programsPage.subtitle')}
          </p>
        </div>
      </section>

      <section className="section bg-blue">
      <div className="container">
        {/* Interactive Filters Bar */}
        <div className={styles.filterContainer}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`${styles.filterBtn} ${selectedFilter === cat ? styles.filterActive : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className={styles.grid}>
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((prog, idx) => (
              <ProgramCard key={idx} {...prog} />
            ))
          ) : (
            <div className={styles.noResults}>
              <h3 className={styles.noResultsTitle}>{t('programsPage.noResultsTitle')}</h3>
              <p className={styles.noResultsDesc}>{t('programsPage.noResultsDesc')}</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
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
