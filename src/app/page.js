import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import ProgramCard from '@/components/ProgramCard';
import TestimonialCard from '@/components/TestimonialCard';
import CTASection from '@/components/CTASection';
import styles from './page.module.css';

export default function Home() {
  const previewPrograms = [
    {
      title: 'Bahasa Inggris Anak',
      description: 'Program interaktif dan menyenangkan untuk membangun kosakata dasar, pelafalan, dan kepercayaan diri berbicara sejak usia dini.',
      category: 'Anak & Remaja',
      format: 'Offline di Kelas',
      level: 'Usia 6 - 11 Tahun (Pemula)',
      duration: '16 Minggu',
      price: 'Rp 3.500.000',
      icon: '🎨'
    },
    {
      title: 'Bahasa Inggris Remaja',
      description: 'Kelas diskusi interaktif dengan topik seru dan latihan presentasi untuk mengikis rasa cemas serta meningkatkan kelancaran berbicara remaja.',
      category: 'Anak & Remaja',
      format: 'Kelas Hybrid',
      level: 'Usia 12 - 17 Tahun (Menengah)',
      duration: '12 Minggu',
      price: 'Rp 3.900.000',
      icon: '📣'
    },
    {
      title: 'Persiapan TOEFL iBT',
      description: 'Strategi intensif menghadapi tes TOEFL berbasis komputer. Pembahasan lengkap templates writing, teknik speaking, dan kunci sukses listening.',
      category: 'Akademik',
      format: 'Kelas Online',
      level: 'Menengah - Lanjut',
      duration: '10 Minggu',
      price: 'Rp 5.900.000',
      icon: '📝'
    }
  ];

  const coreFeatures = [
    {
      icon: '👨‍🏫',
      title: 'Pengajar Native & Lokal Terbaik',
      desc: 'Seluruh instruktur kami memiliki sertifikasi pengajaran bahasa Inggris internasional (CELTA/TEFL) dengan pengalaman mengajar rata-rata di atas 5 tahun.'
    },
    {
      icon: '⏰',
      title: 'Jadwal Kelas Sangat Fleksibel',
      desc: 'Pilih jadwal belajar yang paling sesuai dengan aktivitas harian Anda, mulai dari kelas malam hari biasa hingga kelas intensif di akhir pekan.'
    },
    {
      icon: '💻',
      title: 'Metode Hybrid Blended Learning',
      desc: 'Hadir langsung di ruang kelas modern kami di pusat kota, atau bergabunglah secara live streaming interaktif dari mana saja.'
    }
  ];

  const featuredTestimonials = [
    {
      name: 'Budi Santoso',
      course: 'Persiapan IELTS',
      rating: 5,
      quote: 'Belajar di Lexicon benar-benar mengubah cara saya mempersiapkan tes. Saya berhasil mendapatkan skor band 8.0! Masukan dari para pengajar sangat mendalam.',
      initials: 'BS'
    },
    {
      name: 'Fitriani',
      course: 'Komunikasi Bisnis Profesional',
      rating: 5,
      quote: 'Kepercayaan diri saya saat melakukan presentasi di depan klien asing meningkat drastis. Latihan kosa kata bisnis di sini sangat aplikatif.',
      initials: 'FT'
    },
    {
      name: 'Rian Hidayat',
      course: 'Bahasa Inggris Dewasa',
      rating: 5,
      quote: 'Jadwal kelas hybrid sangat memudahkan saya yang sibuk bekerja. Pembelajaran di kelas aktif, menarik, dan sama sekali tidak membosankan.',
      initials: 'RH'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Why Choose Us Features */}
      <section className={`${styles.features} section`}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Keunggulan Kami</span>
            <h2 className="section-title">Metode Efektif untuk Fasih</h2>
            <p className="section-subtitle">
              Kami memadukan kurikulum berstandar internasional, pengajar ahli bersertifikasi, dan lingkungan belajar interaktif untuk menjamin peningkatan kemampuan berbahasa Anda.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {coreFeatures.map((feat, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feat.icon}</div>
                <h3 className={styles.featureTitle}>{feat.title}</h3>
                <p className={styles.featureDesc}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs Preview */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Program Populer</span>
            <h2 className="section-title">Pilih Kelas yang Tepat</h2>
            <p className="section-subtitle">
              Temukan program kursus terbaik yang dirancang khusus untuk memenuhi kebutuhan pengembangan diri, akademik, maupun karier profesional Anda.
            </p>
          </div>

          <div className={styles.programsGrid}>
            {previewPrograms.map((prog, index) => (
              <ProgramCard key={index} {...prog} />
            ))}
          </div>

          <div className={styles.programsAction}>
            <Link href="/programs" className="btn btn-secondary">
              Lihat Semua Program Kelas
            </Link>
          </div>
        </div>
      </section>

      {/* Highlight Stats Banner */}
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statVal}>98%</span>
              <span className={styles.statLabel}>Tingkat Kelulusan</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>120+</span>
              <span className={styles.statLabel}>Pengajar Bersertifikat</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>15.000+</span>
              <span className={styles.statLabel}>Alumni Sukses</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>15+</span>
              <span className={styles.statLabel}>Tahun Pengalaman</span>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Testimonials */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Testimoni Siswa</span>
            <h2 className="section-title">Cerita Sukses Alumni Kami</h2>
            <p className="section-subtitle">
              Bergabunglah dengan ribuan siswa yang telah berhasil meraih cita-cita dan kemajuan karier bersama Lexicon English Academy.
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            {featuredTestimonials.map((test, index) => (
              <TestimonialCard key={index} {...test} />
            ))}
          </div>

          <div className={styles.programsAction}>
            <Link href="/testimonials" className="btn btn-secondary">
              Lihat Semua Ulasan Siswa
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="container">
        <CTASection 
          title="Siap Berbicara Bahasa Inggris dengan Percaya Diri?"
          description="Bergabunglah dengan program kelas kami sekarang juga. Dapatkan tes penempatan kemampuan (diagnostic test) secara gratis serta sesi kelas uji coba (trial session)."
          primaryActionText="Konsultasi Kelas Gratis"
          secondaryActionText="Lihat Semua Program"
        />
      </div>
    </div>
  );
}
