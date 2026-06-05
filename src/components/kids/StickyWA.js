'use client';

import React, { useState, useEffect } from 'react';
import { getWhatsAppUrl } from '@/lib/constants';
import styles from './StickyWA.module.css';

export default function StickyWA({ msg, label }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`${styles.sticky} ${show ? styles.show : ''}`}>
      <a href={getWhatsAppUrl(msg)} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.btn}`}>
        {label}
      </a>
    </div>
  );
}
