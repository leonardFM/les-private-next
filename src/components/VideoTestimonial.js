'use client';

import React from 'react';
import Image from 'next/image';
import styles from './VideoTestimonial.module.css';

const VIDEO_URL = 'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4';

export default function VideoTestimonial() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Lihat keseruan belajar bahasa Inggris di EL&apos;s Corner
          </h2>
        </div>

        <div className={styles.grid}>
          {/* Kolom Kiri: Video Player */}
          <div className={styles.videoPane}>
            <div className={styles.videoFrame}>
              <iframe
                src={VIDEO_URL}
                title="Video testimoni siswa EL's Corner"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Kolom Kanan: Testimoni Siswa */}
          <div className={styles.testimonial}>
            <svg className={styles.watermark} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            <blockquote className={styles.quote}>
              <p className={styles.quoteText}>
                &ldquo;Seru banget belajar di EL&apos;s Corner,{' '}
                <strong>
                  bisa interaksi sama temen-temen dari berbagai kota. Materinya gak ngebosenin
                </strong>
                , jadi aku makin semangat.&rdquo;
              </p>
            </blockquote>

            <div className={styles.profile}>
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=112&h=112&q=80"
                alt="Maharani"
                width={56}
                height={56}
                className={styles.avatar}
              />
              <div className={styles.profileMeta}>
                <span className={styles.profileName}>Maharani</span>
                <span className={styles.profileRole}>
                  <svg
                    className={styles.schoolIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 10L12 5 2 10l10 5 10-5z" />
                    <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
                  </svg>
                  Ranger (15-18 tahun)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
