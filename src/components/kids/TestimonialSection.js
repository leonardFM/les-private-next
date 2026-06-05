'use client';

import React from 'react';
import { FadeIn } from './FadeIn';
import styles from './TestimonialSection.module.css';

export default function TestimonialSection({ tag, title, sub, cards }) {
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
            {cards.map((t, i) => (
              <div key={i} className={`${styles.card} ${i === 0 ? styles.featured : ''}`}>
                <div className={styles.cardAccent} />
                <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
                <div className={styles.author}>
                  <strong>{t.name}</strong>
                  <span>{t.child}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
