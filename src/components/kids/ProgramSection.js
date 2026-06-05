'use client';

import React from 'react';
import Image from 'next/image';
import { getWhatsAppUrl } from '@/lib/constants';
import { FadeIn } from './FadeIn';
import styles from './ProgramSection.module.css';

export default function ProgramSection({ tag, title, sub, cards, btnWA, images }) {
  const baseMsg = (t) => `Halo! Saya tertarik dengan program ${t} untuk anak saya.`;

  return (
    <FadeIn>
      <section className={styles.sec}>
        <div className={styles.deco} />
        <div className="container">
          <div className={styles.head}>
            <span className={styles.tag}>{tag}</span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.sub}>{sub}</p>
          </div>
          <div className={styles.grid}>
            {cards.map((p, i) => (
              <div key={i} className={`${styles.card} ${i === 0 ? styles.featured : ''}`}>
                <div className={styles.imgWrap}>
                  <Image src={images[i]} alt={p.title} className={styles.img} fill sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className={styles.overlay} />
                </div>
                <div className={styles.body}>
                  <span className={styles.icon}>{p.icon}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <a href={getWhatsAppUrl(baseMsg(p.title))} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.progBtn}`}>
                    {btnWA}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
