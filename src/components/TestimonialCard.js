'use client';

import React from 'react';
import styles from './TestimonialCard.module.css';

export default function TestimonialCard({
  name,
  course,
  rating = 5,
  quote,
  initials = 'JD'
}) {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating ? '★' : '☆');

  return (
    <div className={styles.card}>
      <span className={styles.quoteIcon}>“</span>
      
      {/* Star Rating */}
      <div className={styles.rating}>
        {stars.map((star, idx) => (
          <span key={idx}>{star}</span>
        ))}
      </div>

      {/* Review Content */}
      <p className={styles.quoteText}>&ldquo;{quote}&rdquo;</p>

      {/* Author Profile */}
      <div className={styles.author}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.meta}>
          <span className={styles.name}>{name}</span>
          <span className={styles.course}>{course}</span>
        </div>
      </div>
    </div>
  );
}
