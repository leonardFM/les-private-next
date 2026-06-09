'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { assignPackage } from '@/lib/actions';
import { j } from '@/lib/utils';
import FormActions from '../_components/FormActions';
import styles from '../admin.module.css';

export default function PackageForm({ studentId, programs }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [totalSessions, setTotalSessions] = useState(8);

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    const form = new FormData(e.target);
    form.set('student_id', studentId);
    form.set('total_sessions', totalSessions);
    await assignPackage(form);
    setPending(false);
    router.refresh();
  }

  function handleProgramSelect(e) {
    const selected = programs.find(p => p.id === parseInt(e.target.value));
    if (selected) {
      try {
        const parsed = JSON.parse(selected.duration);
        const match = parsed.id.match(/\d+/);
        if (match) setTotalSessions(parseInt(match[0]));
      } catch {
        const match = selected.duration.match(/\d+/);
        if (match) setTotalSessions(parseInt(match[0]));
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formCard} style={{ marginTop: 24 }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700 }}>Assign Package</h3>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Program</label>
        <select name="package_name" className={styles.formSelect} onChange={handleProgramSelect} required>
          <option value="">Select a program...</option>
          {programs.map(p => (
            <option key={p.id} value={p.title}>{j(p.title).id}</option>
          ))}
          <option value="Custom">Custom</option>
        </select>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Total Sessions</label>
          <input type="number" className={styles.formInput} value={totalSessions} onChange={e => setTotalSessions(parseInt(e.target.value) || 0)} min={1} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Start Date</label>
          <input name="start_date" type="date" className={styles.formInput} defaultValue={new Date().toISOString().slice(0, 10)} required />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>End Date (optional)</label>
          <input name="end_date" type="date" className={styles.formInput} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Status</label>
          <select name="status" className={styles.formSelect} defaultValue="active">
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <FormActions submitLabel="Assign Package" pending={pending} />
    </form>
  );
}
