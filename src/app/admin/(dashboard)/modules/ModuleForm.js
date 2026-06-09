import { saveModule } from '@/lib/modules/materials/actions';
import AdminPageHeader from '../_components/AdminPageHeader';
import FormActions from '../_components/FormActions';
import styles from '../admin.module.css';

export default function ModuleForm({ packages, module: mod }) {
  const isEdit = !!mod;

  return (
    <div>
      <AdminPageHeader title={isEdit ? 'Edit Module' : 'New Module'} subtitle={isEdit ? `Editing: ${mod.title}` : 'Create a new learning module'} />

      <div className={styles.formCard}>
        <form action={saveModule}>
          {isEdit && <input type="hidden" name="id" value={mod.id} />}

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Package *</label>
            <select name="package_id" className={styles.formSelect} defaultValue={mod?.package_id || ''} required>
              <option value="">Select a package...</option>
              {packages.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Module Title *</label>
            <input type="text" name="title" className={styles.formInput} defaultValue={mod?.title || ''} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description</label>
            <textarea name="description" className={styles.formTextarea} defaultValue={mod?.description || ''} rows={3} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Sort Order</label>
            <input type="number" name="sort_order" className={styles.formInput} defaultValue={mod?.sort_order || 0} min="0" />
          </div>

          <FormActions cancelHref="/admin/modules" submitLabel={isEdit ? 'Update Module' : 'Create Module'} />
        </form>
      </div>
    </div>
  );
}
