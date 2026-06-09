import { saveHomework } from '@/lib/modules/homeworks/actions';
import AdminPageHeader from '../_components/AdminPageHeader';
import FormActions from '../_components/FormActions';
import styles from '../admin.module.css';

export default function HomeworkForm({ teachers, packages, modules, homework }) {
  const isEdit = !!homework;

  return (
    <div>
      <AdminPageHeader title={isEdit ? 'Edit Homework' : 'New Homework'} subtitle={isEdit ? `Editing: ${homework.title}` : 'Create a new assignment'} />

      <div className={styles.formCard}>
        <form action={saveHomework}>
          {isEdit && <input type="hidden" name="id" value={homework.id} />}

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Student Package *</label>
            <select name="student_package_id" className={styles.formSelect} defaultValue={homework?.student_package_id || ''} required>
              <option value="">Select a package...</option>
              {packages.map(p => (
                <option key={p.id} value={p.id}>{p.student_name} - {p.package_name}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Title *</label>
            <input type="text" name="title" className={styles.formInput} defaultValue={homework?.title || ''} required />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Module (optional)</label>
              <select name="module_id" className={styles.formSelect} defaultValue={homework?.module_id || ''}>
                <option value="">Select module...</option>
                {modules.map(m => (
                  <option key={m.id} value={m.id}>{m.title}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Teacher (optional)</label>
              <select name="teacher_id" className={styles.formSelect} defaultValue={homework?.teacher_id || ''}>
                <option value="">Select teacher...</option>
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Due Date</label>
              <input type="date" name="due_date" className={styles.formInput} defaultValue={homework?.due_date || ''} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Max Score</label>
              <input type="number" name="max_score" className={styles.formInput} defaultValue={homework?.max_score || 100} min="1" />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description</label>
            <textarea name="description" className={styles.formTextarea} defaultValue={homework?.description || ''} rows={4} />
          </div>

          <FormActions cancelHref="/admin/homeworks" submitLabel={isEdit ? 'Update' : 'Create Homework'} />
        </form>
      </div>
    </div>
  );
}
