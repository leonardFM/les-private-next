'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from '@/i18n';
import { getWhatsAppUrl } from '@/lib/constants';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className={styles.hero}>
      {/* Floating Decorative Elements — Brand Theme */}
      <div className={styles.floatingElem + ' ' + styles.star1}>⭐</div>
      <div className={styles.floatingElem + ' ' + styles.star2}>✨</div>
      <div className={styles.floatingElem + ' ' + styles.star3}>🌟</div>
      <div className={styles.floatingElem + ' ' + styles.globe}>🌍</div>
      <div className={styles.floatingElem + ' ' + styles.gradCap}>🎓</div>
      <div className={styles.floatingElem + ' ' + styles.book}>📚</div>
      <div className={styles.floatingElem + ' ' + styles.sparkle}>✨</div>

      <div className="container">
        <div className={styles.grid}>
          <div className={styles.content}>
            <div className={styles.tagline}>
              <span className={styles.taglineDot}></span>
              <span>{t('hero.tagline')}</span>
            </div>
            <h1 className={styles.title}>
              {t('hero.titlePrefix')}<span className={styles.highlight}>{t('hero.titleHighlight')}</span>
            </h1>
            <p className={styles.description}>{t('hero.description')}</p>
            <div className={styles.actions}>
              <a href={getWhatsAppUrl(t('hero.whatsappMsg'))} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{t('hero.btnPrimary')}</a>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-accent">{t('hero.btnSecondary')}</a>
            </div>
          </div>

          <div className={styles.illustrationArea}>
            <div className={styles.visualWrapper}>
              <div className={styles.visualContent}>
                <Image
                  src="/logo/logo-png.png"
                  alt="El's Corner"
                  width={100}
                  height={100}
                  className={styles.heroLogo}
                />
                <h3 className={styles.visualTitle}>EL'S CORNER</h3>
                <p className={styles.visualSub}>English Learning Corner</p>
              </div>
            </div>

            <div className={`${styles.floatingCard} ${styles.floatingCard1}`}>
              <div className={styles.statIcon}>⭐</div>
              <div className={styles.statInfo}>
                <span className={styles.statNum}>{t('hero.stat1Value')}</span>
                <span className={styles.statText}>{t('hero.stat1Label')}</span>
              </div>
            </div>

            <div className={`${styles.floatingCard} ${styles.floatingCard2}`}>
              <div className={styles.statIcon}>🎓</div>
              <div className={styles.statInfo}>
                <span className={styles.statNum}>{t('hero.stat2Value')}</span>
                <span className={styles.statText}>{t('hero.stat2Label')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
