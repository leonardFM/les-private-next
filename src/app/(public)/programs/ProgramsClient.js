'use client';

import React, { useState } from 'react';
import ProgramCard from '@/components/ProgramCard';
import CTASection from '@/components/CTASection';
import { useTranslation } from '@/i18n';
import styles from './programs.module.css';

export default function ProgramsClient({ programs }) {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = t('programsPage.filters');

  const filteredPrograms = selectedFilter === 'All'
    ? programs
    : programs.filter(prog => prog.category === selectedFilter);

  return (
    <div>
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

          <div className={styles.grid}>
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((prog) => (
                <ProgramCard key={prog.id} {...prog} />
              ))
            ) : (
              <div className={styles.noResults}>
                <h3 className={styles.noResultsTitle}>{t('programsPage.noResultsTitle')}</h3>
                <p className={styles.noResultsDesc}>{t('programsPage.noResultsDesc')}</p>
              </div>
            )}
          </div>

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
