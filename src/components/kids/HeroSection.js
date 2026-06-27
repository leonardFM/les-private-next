'use client';

import React from 'react';
import Image from 'next/image';
import { getWhatsAppUrl } from '@/lib/constants';
import styles from './HeroSection.module.css';

export default function HeroSection({
  tag, title, titleHighlight, desc,
  btnWA, btnTrial, msgWA, msgTrial,
  metric1, metric1Val, metric2, metric2Val, metric2Icon,
  metric3, metric3Val,
  heroBg, funImg
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroDeco1} />
      <div className={styles.heroDeco2} />
      <Image src={heroBg} alt="" className={styles.heroBg} fill sizes="100vw" />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <div className={styles.heroTag}>{tag}</div>
        <h1 className={styles.heroTitle}>
          {title}<span className={styles.heroGrad}>{titleHighlight}</span>
        </h1>
        <p className={styles.heroP}>{desc}</p>
        <div className={styles.heroActions}>
          <a href={getWhatsAppUrl(msgWA)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            {btnWA}
          </a>
          <a href={getWhatsAppUrl(msgTrial)} target="_blank" rel="noopener noreferrer" className={styles.heroBtnOutline}>
            {btnTrial}
          </a>
        </div>
        <div className={styles.heroMetrics}>
          <span><strong>{metric1Val}</strong> {metric1}</span>
          <span><strong>{metric2Val}</strong> {metric2Icon} {metric2}</span>
          <span><strong>{metric3Val}</strong> {metric3}</span>
        </div>
      </div>
     
    </section>
  );
}
