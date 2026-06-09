'use client';

import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';

export default function FormActions({ submitLabel, cancelHref, pending }) {
  const router = useRouter();

  return (
    <div className={styles.formActions}>
      <button type="submit" className={styles.submitBtn} disabled={pending}>
        {pending ? 'Saving...' : submitLabel || 'Save'}
      </button>
      {cancelHref && (
        <button type="button" onClick={() => router.push(cancelHref)} className={styles.cancelBtn}>
          Cancel
        </button>
      )}
    </div>
  );
}
