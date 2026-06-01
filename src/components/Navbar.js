'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/about' },
    { name: 'Program', path: '/programs' },
    { name: 'Testimoni', path: '/testimonials' },
    { name: 'Kontak', path: '/contact' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <div className={styles.logoIcon}>L</div>
          <span>El`s <span style={{ color: 'var(--secondary-color)' }}>Corner</span></span>
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
            <Link 
              href="/contact" 
              className="btn btn-primary btn-sm ctaBtn" 
              style={{ padding: '8px 18px', fontSize: '14px' }}
              onClick={closeMenu}
            >
              Daftar Sekarang
            </Link>
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
