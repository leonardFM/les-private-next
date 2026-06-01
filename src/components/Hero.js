'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Text Column */}
          <div className={styles.content}>
            <div className={styles.tagline}>
              <span className={styles.taglineDot}></span>
              <span>Tersedia Kelas Online & Offline</span>
            </div>
            <h1 className={styles.title}>
              Belajar Bahasa Inggris dengan <span className={styles.highlight}>Mudah dan Menyenangkan</span>
            </h1>
            <p className={styles.description}>
              Kelas online dan offline untuk anak, remaja, mahasiswa, dan profesional. Kuasai komunikasi bahasa Inggris, bangun kepercayaan diri akademis, dan tingkatkan prospek karier global Anda bersama pengajar bersertifikasi.
            </p>
            <div className={styles.actions}>
              <Link href="/programs" className="btn btn-primary">
                Daftar Sekarang
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Hubungi Kami
              </Link>
            </div>
          </div>

          {/* Right Illustration Column */}
          <div className={styles.illustrationArea}>
            <div className={styles.visualWrapper}>
              <div className={styles.visualContent}>
                <h3 className={styles.visualTitle}>Pembelajaran Interaktif</h3>
                <p className={styles.visualSub}>Meningkatkan rasa percaya diri berbahasa setiap hari</p>
              </div>
            </div>

            {/* Floating Stats Badge 1 */}
            <div className={`${styles.floatingCard} ${styles.floatingCard1}`}>
              <div className={styles.statIcon}>★</div>
              <div className={styles.statInfo}>
                <span className={styles.statNum}>4.9 / 5.0</span>
                <span className={styles.statText}>Rating Siswa</span>
              </div>
            </div>

            {/* Floating Stats Badge 2 */}
            <div className={`${styles.floatingCard} ${styles.floatingCard2}`}>
              <div className={styles.statIcon}>👥</div>
              <div className={styles.statInfo}>
                <span className={styles.statNum}>15.000+</span>
                <span className={styles.statText}>Siswa Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
