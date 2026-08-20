'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/i18n';
import { getWhatsAppUrl } from '@/lib/constants';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t, locale, toggleLocale } = useTranslation();

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const linkNames = t('nav.links');
  const linkPaths = t('nav.paths');
  const navLinks = linkNames.map((name, i) => ({ name, path: linkPaths[i] }));

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src="/logo/logo-png.png"
            alt="El's Corner"
            width={48}
            height={48}
            className={styles.logoImg}
            priority
          />
          <span className={styles.logoText}>{t('nav.brand')}</span>
        </Link>

        {/* Backdrop for mobile drawer */}
        <div 
          className={`${styles.menuOverlay} ${isMenuOpen ? styles.menuOverlayOpen : ''}`} 
          onClick={closeMenu}
        />

        {/* Navigation Menu */}
        <ul className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuOpen : ''}`}>
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <li key={link.name}>
                <Link 
                  href={link.path} 
                  className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={toggleLocale}
              className={`${styles.langToggle} btn`}
              style={{ padding: '8px 14px', fontSize: '13px', fontWeight: 700, minWidth: '44px' }}
            >
              {t('nav.langToggle')}
            </button>
          </li>
          <li>
            <a 
              href={getWhatsAppUrl(t('nav.whatsappMsg'))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent btn-sm ctaBtn" 
              style={{ padding: '8px 18px', fontSize: '14px', fontWeight: 700 }}
              onClick={closeMenu}
            >
              {t('nav.cta')}
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button 
          className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>
    </header>
  );
}
