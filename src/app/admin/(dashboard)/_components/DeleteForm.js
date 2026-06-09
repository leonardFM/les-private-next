'use client';

import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';

export default function DeleteForm({ action, id, redirectHref, children }) {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) return;
    const form = new FormData();
    form.set('id', id);
    const result = await action(form);
    if (redirectHref) router.push(redirectHref);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      {children || (
        <button type="submit" className={`${styles.actionBtn} ${styles.actionDanger}`}>Delete</button>
      )}
    </form>
  );
}
