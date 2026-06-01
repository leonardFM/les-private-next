'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Column 1 - Brand Info */}
          <div className={styles.logoArea}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>L</div>
              <span>Lexicon<span style={{ color: 'var(--secondary-color)' }}>English</span></span>
            </div>
            <p className={styles.desc}>
              Lexicon English Academy menawarkan program kursus bahasa Inggris berkualitas premium secara online dan offline yang dirancang untuk meningkatkan kefasihan, mempersiapkan kesuksesan akademik, dan mempercepat kemajuan karier Anda.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">Fb</a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">Ig</a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">Tw</a>
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn">Ln</a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className={styles.title}>Tautan Cepat</h3>
            <ul className={styles.links}>
              <li><Link href="/" className={styles.link}>Beranda</Link></li>
              <li><Link href="/about" className={styles.link}>Tentang Kami</Link></li>
              <li><Link href="/programs" className={styles.link}>Program Kursus</Link></li>
              <li><Link href="/testimonials" className={styles.link}>Testimoni Siswa</Link></li>
              <li><Link href="/contact" className={styles.link}>Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Column 3 - Courses */}
          <div>
            <h3 className={styles.title}>Program Kami</h3>
            <ul className={styles.links}>
              <li><Link href="/programs" className={styles.link}>Bahasa Inggris Umum</Link></li>
              <li><Link href="/programs" className={styles.link}>Bahasa Inggris Bisnis</Link></li>
              <li><Link href="/programs" className={styles.link}>Persiapan IELTS</Link></li>
              <li><Link href="/programs" className={styles.link}>Persiapan TOEFL iBT</Link></li>
              <li><Link href="/programs" className={styles.link}>Bahasa Inggris Anak</Link></li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className={styles.gridColNewsletter}>
            <div className={styles.newsletterArea}>
              <h3 className={styles.title}>Tetap Terupdate</h3>
              <p className={styles.newsletterText}>
                Berlangganan newsletter kami untuk mendapatkan tips belajar, informasi pembaruan kelas, serta penawaran diskon eksklusif.
              </p>
              <form onSubmit={handleSubscribe} className={styles.form}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Alamat Email Anda" 
                  className={styles.input} 
                  required
                />
                <button type="submit" className={`btn btn-primary ${styles.newsletterBtn}`}>
                  Gabung
                </button>
              </form>
              {subscribed && (
                <p style={{ color: 'var(--accent-color)', fontSize: '13px', marginTop: '6px' }}>
                  ✓ Terima kasih! Anda telah berhasil berlangganan newsletter kami.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <p>© {currentYear} Lexicon English Academy. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className={styles.bottomLinks}>
            <Link href="#" className={styles.link}>Kebijakan Privasi</Link>
            <Link href="#" className={styles.link}>Syarat dan Ketentuan</Link>
            <Link href="#" className={styles.link}>Kebijakan Cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
