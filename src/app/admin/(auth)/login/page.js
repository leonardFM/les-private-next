'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/actions';
import styles from './login.module.css';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    setError('');

    const form = new FormData(e.target);
    const result = await login(form);

    if (result?.error) {
      setError(result.error);
      setPending(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Admin Login</h1>
          <p className={styles.subtitle}>El's Corner CMS</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input id="email" name="email" type="email" className={styles.input} required placeholder="admin@els-corner.com" />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input id="password" name="password" type="password" className={styles.input} required placeholder="••••••••" />
          </div>

          <button type="submit" className={styles.button} disabled={pending}>
            {pending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
