'use client';

import { useState, useEffect } from 'react';
import styles from './Timer.module.css';

export default function Timer({ duration = 30, onTimeUp, isRunning = true, onStop }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    setTimeLeft(duration);
    setIsStopped(false);
  }, [duration]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0 || isStopped) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onTimeUp, isStopped]);

  const handleStop = () => {
    setIsStopped(true);
    onStop?.(timeLeft);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / duration) * 100;
  const isLow = timeLeft <= 10;
  const isFinished = timeLeft === 0 || isStopped;

  return (
    <div className={`${styles.container} ${isLow ? styles.low : ''} ${isFinished ? styles.finished : ''}`}>
      <div className={styles.progress}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={styles.time}>
        {isStopped ? (
          <span className={styles.stopped}>Dijawab</span>
        ) : (
          `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        )}
      </div>
    </div>
  );
}
