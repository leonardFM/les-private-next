'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn } from './FadeIn';
import styles from './LearningJourneySection.module.css';

export default function LearningJourneySection({ tag, title, sub, steps, images }) {
  return (
    <FadeIn>
      <section className={styles.sec}>
        <div className="container">
          <div className={styles.head}>
            <span className={styles.tag}>{tag}</span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.sub}>{sub}</p>
          </div>
          <div className={styles.flow}>
            {steps.map((s, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.imgCol}>
                  <div className={styles.imgWrap}>
                    <Image src={images[i]} alt={s.title} fill sizes="100px" />
                    <div className={styles.num}>{s.num}</div>
                  </div>
                  {i < steps.length - 1 && <div className={styles.line} />}
                </div>
                <div className={styles.content}>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
