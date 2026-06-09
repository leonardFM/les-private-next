'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { recordSession, deleteSession } from '@/lib/actions';
import FormActions from '../_components/FormActions';
import styles from '../admin.module.css';

export default function SessionForm({ studentId, packages }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const activePkgs = packages.filter(p => p.status === 'active' && p.remaining_sessions > 0);

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    const form = new FormData(e.target);
    form.set('student_id', studentId);
    const result = await recordSession(form);
    if (result.error) {
      alert(result.error);
      setPending(false);
      return;
    }
    setPending(false);
    router.refresh();
  }

  async function handleDelete(sessionId) {
    if (!confirm('Delete this session? This will restore the session count.')) return;
    const form = new FormData();
    form.set('id', sessionId);
    form.set('student_id', studentId);
    await deleteSession(form);
    router.refresh();
  }

  return (
    <div>
      {activePkgs.length > 0 && (
        <form onSubmit={handleSubmit} className={styles.formCard} style={{ marginTop: 24 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700 }}>Record Session</h3>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Package</label>
            <select name="student_package_id" className={styles.formSelect} required>
              <option value="">Select package...</option>
              {activePkgs.map(p => (
                <option key={p.id} value={p.id}>
                  {p.package_name} ({p.remaining_sessions} sessions left)
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Session Date</label>
            <input name="session_date" type="date" className={styles.formInput} defaultValue={new Date().toISOString().slice(0, 10)} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Notes</label>
            <textarea name="notes" className={styles.formTextarea} placeholder="What was covered in this session?" />
          </div>

          <FormActions submitLabel="Record Session" pending={pending} />
        </form>
      )}

      {packages.map(pkg => {
        if (!pkg.sessions || pkg.sessions.length === 0) return null;
        return (
          <div key={pkg.id} className={styles.tableWrapper} style={{ marginTop: 24 }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pkg.sessions.map(s => (
                    <tr key={s.id}>
                      <td>{new Date(s.session_date).toLocaleDateString()}</td>
                      <td>{s.notes || '-'}</td>
                      <td>
                        <button onClick={() => handleDelete(s.id)} className={`${styles.actionBtn} ${styles.actionDanger}`}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
