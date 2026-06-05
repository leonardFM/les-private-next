'use client';

import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import styles from './FAQSection.module.css';

export default function FAQSection({ tag, title, sub, items }) {
  const [open, setOpen] = useState(null);

  return (
    <FadeIn>
      <section className={styles.sec}>
        <div className="container">
          <div className={styles.head}>
            <span className={styles.tag}>{tag}</span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.sub}>{sub}</p>
          </div>
          <div className={styles.list}>
            {items.map((item, i) => (
              <div key={i} className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}>
                <button
                  className={styles.question}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span>{item.q}</span>
                  <span className={styles.icon}>{open === i ? '−' : '+'}</span>
                </button>
                <div className={styles.answer} role="region">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
