'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/i18n';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation();
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
              <span>{t('footer.brand')}<span style={{ color: 'var(--secondary-color)' }}>{t('footer.brandHighlight')}</span></span>
            </div>
            <p className={styles.desc}>
              {t('footer.description')}
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon} aria-label={t('footer.socialAria.fb')}>Fb</a>
              <a href="#" className={styles.socialIcon} aria-label={t('footer.socialAria.ig')}>Ig</a>
              <a href="#" className={styles.socialIcon} aria-label={t('footer.socialAria.tw')}>Tw</a>
              <a href="#" className={styles.socialIcon} aria-label={t('footer.socialAria.ln')}>Ln</a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className={styles.title}>{t('footer.quickLinksTitle')}</h3>
            <ul className={styles.links}>
              {t('footer.quickLinks').map((link) => (
                <li key={link.name}><Link href={link.path} className={styles.link}>{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Courses */}
          <div>
            <h3 className={styles.title}>{t('footer.programsTitle')}</h3>
            <ul className={styles.links}>
              {t('footer.programLinks').map((link) => (
                <li key={link.name}><Link href={link.path} className={styles.link}>{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className={styles.gridColNewsletter}>
            <div className={styles.newsletterArea}>
              <h3 className={styles.title}>{t('footer.newsletterTitle')}</h3>
              <p className={styles.newsletterText}>
                {t('footer.newsletterText')}
              </p>
              <form onSubmit={handleSubscribe} className={styles.form}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletterPlaceholder')} 
                  className={styles.input} 
                  required
                />
                <button type="submit" className={`btn btn-primary ${styles.newsletterBtn}`}>
                  {t('footer.newsletterBtn')}
                </button>
              </form>
              {subscribed && (
                <p style={{ color: 'var(--accent-color)', fontSize: '13px', marginTop: '6px' }}>
                  {t('footer.newsletterSuccess')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <p>&copy; {currentYear} {t('footer.copyright')}</p>
          <div className={styles.bottomLinks}>
            {t('footer.bottomLinks').map((link) => (
              <Link key={link.name} href={link.path} className={styles.link}>{link.name}</Link>
            ))}
        </div>
      </div>
      </div>
    </footer>
  );
}
