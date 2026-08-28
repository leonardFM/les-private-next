'use client';

import React from 'react';
import { getWhatsAppUrl } from '@/lib/constants';
import { useTranslation } from '@/i18n';
import styles from './ProgramCard.module.css';

export default function ProgramCard({
  title,
  description,
  category,
  format,
  level,
  duration,
  price,
  originalPrice,
  icon = '📖'
}) {
  const { t } = useTranslation();
  const whatsappMsg = `Halo! Saya tertarik dengan program privat *${title}* (${format}). Mohon informasinya lebih lanjut.`;
  return (
    <div className={styles.card}>
      <div className={styles.oneOnOneBadge}>1:1</div>
      <div className={styles.imagePlaceholder}>
        <div className={styles.icon}>{icon}</div>
        <span className={styles.badge}>{format}</span>
      </div>

      <div className={styles.body}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>

        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Tingkat</span>
            <span className={styles.metaVal}>{level}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Durasi</span>
            <span className={styles.metaVal}>{duration}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.priceWrapper}>
            <span className={styles.priceLabel}>Mulai dari</span>
            {originalPrice ? <span className={styles.priceOriginal}>{originalPrice}</span> : null}
            <span className={styles.priceVal}>{price}</span>
          </div>
          <a href={getWhatsAppUrl(whatsappMsg)} target="_blank" rel="noopener noreferrer" className={`btn btn-primary btn-sm ${styles.enrollBtn}`} style={{ padding: '10px 16px', fontSize: '13px' }}>
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  );
}
