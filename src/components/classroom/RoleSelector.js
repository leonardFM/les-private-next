'use client';

import styles from './RoleSelector.module.css';

export default function RoleSelector({ onSelect }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Ujian Session</h1>
        <p className={styles.subtitle}>Pilih peran Anda untuk masuk ke kelas</p>
        
        <div className={styles.options}>
          <button
            className={styles.option}
            onClick={() => onSelect('teacher')}
          >
            <span className={styles.icon}>👨‍🏫</span>
            <span className={styles.label}>Teacher</span>
            <span className={styles.desc}>Share layar & beri feedback</span>
          </button>
          
          <button
            className={styles.option}
            onClick={() => onSelect('student')}
          >
            <span className={styles.icon}>👩‍🎓</span>
            <span className={styles.label}>Student</span>
            <span className={styles.desc}>Lihat soal & pilih jawaban</span>
          </button>
        </div>
      </div>
    </div>
  );
}
