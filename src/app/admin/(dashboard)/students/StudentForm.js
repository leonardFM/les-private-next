'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createStudent, updateStudent } from '@/lib/actions';
import FormActions from '../_components/FormActions';
import styles from '../admin.module.css';

export default function StudentForm({ student }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    const form = new FormData(e.target);
    if (student) form.set('id', student.id);
    if (student) {
      await updateStudent(form);
    } else {
      await createStudent(form);
    }
    setPending(false);
    router.push('/admin/students');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formCard}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Name</label>
        <input name="name" className={styles.formInput} defaultValue={student?.name || ''} required />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Email</label>
        <input name="email" type="email" className={styles.formInput} defaultValue={student?.email || ''} required />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Phone</label>
        <input name="phone" className={styles.formInput} defaultValue={student?.phone || ''} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Notes</label>
        <textarea name="notes" className={styles.formTextarea} defaultValue={student?.notes || ''} />
      </div>

      <FormActions submitLabel={student ? 'Update Student' : 'Create Student'} cancelHref="/admin/students" pending={pending} />
    </form>
  );
}
