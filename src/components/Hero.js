import React from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

const features = [
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    iconClass: 'featureIconAmber',
    text: 'Pengajar native dan lokal tersertifikasi internasional',
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V11a2 2 0 012-2h1.065M12 21a9 9 0 100-18 9 9 0 000 18z" />
      </svg>
    ),
    iconClass: 'featureIconIndigo',
    text: 'Kurikulum baru berstandar internasional',
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0V7m4 4v10" />
      </svg>
    ),
    iconClass: 'featureIconAmber',
    text: 'Fasilitas kelas modern terintegrasi teknologi',
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconClass: 'featureIconAmber',
    text: 'Metode belajar interaktif dan menyenangkan',
  },
];

export default function HeroSection() {
  return (
    <div className={styles.hero}>
      {/* Banner Utama */}
      <div className={styles.banner}>
        <div className={styles.grid}>
          {/* Kolom Kiri: Teks & CTA */}
          <div className={styles.content}>

            {/* Headline */}
            <h1 className={styles.title}>
              Kursus Bahasa Inggris dengan{' '}
              <br></br>
              <span className={styles.titleHighlight}>Program Sesuai Jenjang Usia</span>
            </h1>

            {/* Sub-headline */}
            <p className={styles.subtitle}>
              Kelas bahasa Inggris online dan offline untuk anak, remaja, dan dewasa. Kembangkan kemampuan berkomunikasi, bangun kepercayaan diri, dan tingkatkan keterampilan bahasa Inggris melalui pembelajaran yang terstruktur, interaktif, dan sesuai dengan kebutuhan belajar Anda.


            </p>

            {/* Tombol CTA */}
            <div className={styles.ctaRow}>
              <a href="https://wa.me/6281234567890?text=Halo!%20Saya%20ingin%20konsultasi%20tentang%20program%20bahasa%20Inggris%20di%20EL%27s%20Corner." className={styles.ctaPrimary} target="_blank" rel="noopener noreferrer">
                Konsultasi via WhatsApp
              </a>
              <a href="/contact" className={styles.ctaSecondary}>
                Hubungi Kami
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Bento Grid Foto */}
          <div className={styles.gallery}>
            <div className={`${styles.galleryItem} ${styles.galleryFirst}`}>
              <Image
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80"
                alt="Siswa sedang belajar bahasa Inggris di kelas yang interaktif"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.galleryImg}
                priority
              />
            </div>
            <div className={styles.galleryItem}>
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80"
                alt="Diskusi kelompok di kelas bahasa Inggris"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className={styles.galleryImg}
              />
            </div>
            <div className={styles.galleryItem}>
              <Image
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80"
                alt="Pengajar native bahasa Inggris mengajar"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className={styles.galleryImg}
              />
            </div>
            <div className={`${styles.galleryItem} ${styles.galleryWide}`}>
              <Image
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
                alt="Fasilitas tablet dan kelas interaktif"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.galleryImg}
              />
            </div>
            <div className={`${styles.galleryItem} ${styles.galleryLast}`}>
              <Image
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80"
                alt="Anak-anak belajar bahasa Inggris dengan menyenangkan"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.galleryImg}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Barisan 4 Kartu Fitur di Bawah */}
      <div className="container">
        <div className={styles.features}>
          {features.map((item, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles[item.iconClass]}`}>{item.icon}</div>
              <p className={styles.featureText}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Button "TANYA KONSULTAN" */}
      
    </div>
  );
}
