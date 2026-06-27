'use client';

import styles from './student.module.css';

export default function StudentError({ error, reset }) {
  return (
    <div className={styles.emptyState}>
      <h3>Something went wrong</h3>
      <p>{error?.message || 'An unexpected error occurred.'}</p>
      <button onClick={() => reset()} className={styles.actionBtn} style={{ marginTop: 16 }}>
        Try Again
      </button>
    </div>
  );
}
