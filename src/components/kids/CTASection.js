'use client';

import React from 'react';
import Image from 'next/image';
import { getWhatsAppUrl } from '@/lib/constants';
import { FadeIn } from './FadeIn';
import styles from './CTASection.module.css';

export default function KidsCTASection({ tag, title, desc, btn, msgWA, bgImg, funImg }) {
  return (
    <FadeIn>
      <section className={styles.sec}>
        <Image src={bgImg} alt="Latar belakang program kids EL's Corner" className={styles.bg} fill sizes="100vw" />
        <div className={styles.overlay} />
        <div className="container">
          <div className={styles.inner}>
            <div className={styles.card}>
              <span className={styles.tag}>{tag}</span>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.p}>{desc}</p>
              <a href={getWhatsAppUrl(msgWA)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                {btn}
              </a>
            </div>
            <div className={styles.visual}>
              <Image src={funImg} alt="Ilustrasi program kids EL's Corner" width={240} height={290} className={styles.img} />
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
