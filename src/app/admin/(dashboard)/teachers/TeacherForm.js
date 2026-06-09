import { saveTeacher } from '@/lib/modules/teachers/actions';
import AdminPageHeader from '../_components/AdminPageHeader';
import FormActions from '../_components/FormActions';
import styles from '../admin.module.css';

export default function TeacherForm({ teacher }) {
  const isEdit = !!teacher;

  return (
    <div>
      <AdminPageHeader title={isEdit ? 'Edit Teacher' : 'Add Teacher'} subtitle={isEdit ? `Editing ${teacher.name}` : 'Create a new teacher profile'} />

      <div className={styles.formCard}>
        <form action={saveTeacher}>
          {isEdit && <input type="hidden" name="id" value={teacher.id} />}

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name *</label>
            <input type="text" name="name" className={styles.formInput} defaultValue={teacher?.name || ''} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email *</label>
            <input type="email" name="email" className={styles.formInput} defaultValue={teacher?.email || ''} required />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Phone</label>
              <input type="text" name="phone" className={styles.formInput} defaultValue={teacher?.phone || ''} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Specialization</label>
              <input type="text" name="specialization" className={styles.formInput} defaultValue={teacher?.specialization || ''} placeholder="e.g. Math, English, Science" />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Bio</label>
            <textarea name="bio" className={styles.formTextarea} defaultValue={teacher?.bio || ''} rows={3} />
          </div>

          <FormActions cancelHref="/admin/teachers" />
        </form>
      </div>
    </div>
  );
}
