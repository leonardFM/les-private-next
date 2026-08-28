'use client';

import { useState, useEffect } from 'react';
import { useDataChannel } from '@livekit/components-react';
import styles from './FeedbackDisplay.module.css';

export default function FeedbackDisplay({ onFeedbackReceived }) {
  const [feedback, setFeedback] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const { message } = useDataChannel('quiz', (msg) => {
    const data = JSON.parse(new TextDecoder().decode(msg.payload));
    if (data.type === 'feedback') {
      setFeedback(data);
      setIsVisible(true);
      onFeedbackReceived?.(data);
    }
  });

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setFeedback(null), 300);
  };

  useEffect(() => {
    if (feedback && isVisible) {
      const timer = setTimeout(handleClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [feedback, isVisible]);

  if (!feedback) return null;

  return (
    <div className={`${styles.overlay} ${isVisible ? styles.visible : ''}`}>
      <div className={`${styles.card} ${feedback.correct ? styles.correct : styles.incorrect} ${isVisible ? styles.cardVisible : ''}`}>
        <div className={styles.iconWrapper}>
          <div className={styles.icon}>
            {feedback.correct ? '✓' : '✗'}
          </div>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>
            {feedback.correct ? 'Benar!' : 'Salah!'}
          </h2>
          <p className={styles.subtitle}>
            {feedback.correct 
              ? 'Jawaban Anda tepat. Bagus sekali!' 
              : 'Jawaban kurang tepat. Coba lagi next time!'}
          </p>
        </div>
        <button className={styles.closeBtn} onClick={handleClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
