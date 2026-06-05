'use client';

import React from 'react';
import Image from 'next/image';
import { FadeIn } from './FadeIn';
import styles from './GallerySection.module.css';

export default function GallerySection({ tag, title, sub, images }) {
  return (
    <FadeIn>
      <section className={styles.sec}>
        <div className="container">
          <div className={styles.head}>
            <span className={styles.tag}>{tag}</span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.sub}>{sub}</p>
          </div>
          <div className={styles.grid}>
            {images.map((src, i) => (
              <div key={i} className={styles.item}>
                <Image src={src} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
