import React from 'react';
import CTASection from '@/components/CTASection';
import styles from './about.module.css';

export const metadata = {
  title: "About Us | Lexicon English Academy",
  description: "Learn about the mission, values, campuses, and certified teaching staff of Lexicon English Academy.",
};

export default function About() {
  const values = [
  {
    icon: '🎯',
    title: 'Kurikulum Berorientasi Tujuan',
    desc: 'Setiap program pembelajaran dirancang untuk mencapai target kemampuan bahasa yang jelas, sesuai standar CEFR maupun persiapan IELTS dan TOEFL.'
  },
  {
    icon: '🤝',
    title: 'Lingkungan Belajar Interaktif',
    desc: 'Kami menciptakan suasana belajar yang aktif dan komunikatif, baik dalam kelas online maupun tatap muka, sehingga siswa terbiasa menggunakan bahasa Inggris dalam kehidupan nyata.'
  },
  {
    icon: '📈',
    title: 'Pemantauan Kemajuan Berkala',
    desc: 'Evaluasi rutin dan laporan perkembangan membantu memantau peningkatan kemampuan berbicara, tata bahasa, pelafalan, serta kosakata setiap siswa.'
  }
];

  const teachers = [
  {
    initials: 'AB',
    name: 'Arthur Pendelton',
    role: 'Pelatih IELTS & Tutor Native',
    bio: 'Arthur memiliki gelar Magister Linguistik Terapan dari Oxford dan lebih dari 8 tahun pengalaman membimbing siswa mencapai skor IELTS 8.0 ke atas.'
  },
  {
    initials: 'MJ',
    name: 'Maria Jenkins',
    role: 'Konsultan Bahasa Inggris Bisnis',
    bio: 'Spesialis Bahasa Inggris untuk dunia profesional. Berpengalaman melatih tim manajemen di sektor teknologi, keuangan, dan manufaktur.'
  },
  {
    initials: 'DK',
    name: 'David Kim',
    role: 'Spesialis TOEFL iBT',
    bio: 'Mantan penguji TOEFL yang berfokus pada strategi speaking dan writing untuk membantu siswa meningkatkan skor secara efektif.'
  },
  {
    initials: 'SH',
    name: 'Sophia Hernandez',
    role: 'Instruktur Bahasa Inggris Anak',
    bio: 'Bersertifikat TEFL dengan spesialisasi pembelajaran anak. Ahli dalam menciptakan kelas online yang menyenangkan dan interaktif.'
  }
];

  const campuses = [
  {
    icon: '🏢',
    name: 'Kampus Pusat Kota',
    desc: 'Cabang utama kami dengan 12 ruang kelas multimedia, area belajar nyaman, laboratorium bahasa, dan akses transportasi yang mudah.'
  },
  {
    icon: '🏫',
    name: 'Kampus Utara',
    desc: 'Lingkungan belajar yang luas dan ramah keluarga, dilengkapi zona khusus anak dan teknologi pembelajaran interaktif.'
  },
  {
    icon: '💻',
    name: 'Kampus Virtual',
    desc: 'Platform pembelajaran online modern yang mendukung kelas langsung, ruang diskusi interaktif, dan materi digital lengkap.'
  }
];

  return (
  <div>
    {/* Header Halaman */}
    <section
      className="section"
      style={{
        backgroundColor: 'var(--primary-soft)',
        padding: '60px 0',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="section-tag">Tentang Kami</span>
        <h1 className="section-title" style={{ margin: 0 }}>
          Membantu Anda Menguasai Bahasa Inggris
        </h1>
        <p
          className="section-subtitle"
          style={{
            marginTop: '12px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Kami membantu mengatasi hambatan bahasa melalui pendidikan bahasa Inggris
          yang modern, efektif, dan dapat diakses baik secara online maupun tatap muka.
        </p>
      </div>
    </section>

    {/* Cerita Kami */}
    <section className="section">
      <div className="container">
        <div className={styles.storyRow}>
          <div className={styles.storyContent}>
            <h2 style={{ fontSize: '28px', color: 'var(--foreground)' }}>
              Cerita dan Misi Kami
            </h2>

            <p style={{ color: 'var(--foreground-muted)' }}>
              Berdiri sejak tahun 2012, Lexicon English Academy memulai
              perjalanan dengan satu ruang kelas dan sebuah keyakinan bahwa
              belajar bahasa tidak seharusnya hanya menghafal aturan tata bahasa.
              Belajar bahasa harus menjadi pengalaman yang aktif, menyenangkan,
              dan relevan dengan kehidupan nyata.
            </p>

            <p style={{ color: 'var(--foreground-muted)' }}>
              Saat ini, Lexicon mengoperasikan beberapa pusat pembelajaran serta
              platform kelas online modern yang melayani siswa dari berbagai
              daerah dan latar belakang, mulai dari pelajar hingga profesional.
            </p>

            <p style={{ color: 'var(--foreground-muted)' }}>
              Misi kami tetap sama: memberikan pendidikan bahasa Inggris yang
              praktis, berkualitas tinggi, dan membantu setiap siswa berbicara
              dengan percaya diri, jelas, dan efektif.
            </p>
          </div>

          <div className={styles.visualPane}>
            <h3 className={styles.visualPaneTitle}>Sejak 2012</h3>
            <p className={styles.visualPaneDesc}>
              Lebih dari satu dekade menghadirkan pendidikan bahasa Inggris
              berkualitas.
            </p>
          </div>
        </div>

        {/* Nilai-Nilai Kami */}
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <h2 className="section-title" style={{ fontSize: '26px' }}>
            Nilai-Nilai Kami
          </h2>
        </div>

        <div className={styles.valuesGrid}>
          {values.map((val, idx) => (
            <div key={idx} className={styles.valueCard}>
              <span className={styles.valueIcon}>{val.icon}</span>
              <h3 className={styles.valueTitle}>{val.title}</h3>
              <p className={styles.valueDesc}>{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Fasilitas */}
    <section className={`${styles.campusSection} section`}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Fasilitas Belajar</span>
          <h2 className="section-title">Tempat Belajar yang Nyaman</h2>
          <p className="section-subtitle">
            Nikmati fasilitas pembelajaran modern baik saat belajar langsung di
            kelas maupun secara online dari rumah.
          </p>
        </div>

        <div className={styles.campusGrid}>
          {campuses.map((camp, idx) => (
            <div key={idx} className={styles.campusCard}>
              <div className={styles.campusImagePlaceholder}>{camp.icon}</div>
              <div className={styles.campusInfo}>
                <h3 className={styles.campusName}>{camp.name}</h3>
                <p className={styles.campusDesc}>{camp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Pengajar */}
    <section className={`${styles.teachersSection} section`}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Tim Pengajar</span>
          <h2 className="section-title">Kenali Para Pengajar Kami</h2>
          <p className="section-subtitle">
            Belajar bersama instruktur berpengalaman yang berkomitmen membantu
            Anda mencapai kemampuan bahasa Inggris terbaik.
          </p>
        </div>

        <div className={styles.teachersGrid}>
          {teachers.map((teach, idx) => (
            <div key={idx} className={styles.teacherCard}>
              <div className={styles.teacherImagePlaceholder}>
                {teach.initials}
              </div>

              <div className={styles.teacherInfo}>
                <h3 className={styles.teacherName}>{teach.name}</h3>
                <span className={styles.teacherRole}>{teach.role}</span>
                <p className={styles.teacherBio}>{teach.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <div className="container">
      <CTASection
        title="Siap Memulai Perjalanan Belajar Anda?"
        description="Hubungi konsultan kami hari ini dan temukan program belajar yang paling sesuai dengan kebutuhan Anda."
      />
    </div>
  </div>
);
}
