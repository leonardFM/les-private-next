'use client';

import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';

export default function DeleteButton({ action, id, label, redirectHref }) {
  const router = useRouter();

  async function handleClick() {
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) return;
    const form = new FormData();
    form.set('id', id);
    await action(form);
    if (redirectHref) router.push(redirectHref);
    router.refresh();
  }

  return (
    <button onClick={handleClick} className={`${styles.actionBtn} ${styles.actionDanger}`}>
      {label || 'Delete'}
    </button>
  );
}
