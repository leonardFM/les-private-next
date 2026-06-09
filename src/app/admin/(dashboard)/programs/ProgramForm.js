'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { saveProgram } from '@/lib/actions';
import { j } from '@/lib/utils';
import FormActions from '../_components/FormActions';
import LanguageSection from '../_components/LanguageSection';
import styles from '../admin.module.css';

const categories = ['General', 'Academic', 'Professional', 'Young Learners', 'Kids'];

export default function ProgramForm({ program }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const t = (f) => program ? j(program[f]) : { id: '', en: '' };

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    const form = new FormData(e.target);

    ['title', 'description', 'format', 'level', 'price'].forEach(f => {
      const idVal = form.get(`${f}_id`);
      const enVal = form.get(`${f}_en`);
      form.set(f, JSON.stringify({ id: idVal || '', en: enVal || '' }));
      form.delete(`${f}_id`);
      form.delete(`${f}_en`);
    });

    form.set('category', form.get('category'));
    form.set('duration', form.get('duration'));
    form.set('icon', form.get('icon'));
    if (program) form.set('id', program.id);

    await saveProgram(form);
    setPending(false);
    router.push('/admin/programs');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formCard}>
      <LanguageSection lang="id">
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Title (ID)</label>
          <input name="title_id" className={styles.formInput} defaultValue={t('title').id} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Description (ID)</label>
          <textarea name="description_id" className={styles.formTextarea} defaultValue={t('description').id} required />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Format (ID)</label>
            <input name="format_id" className={styles.formInput} defaultValue={t('format').id} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Level (ID)</label>
            <input name="level_id" className={styles.formInput} defaultValue={t('level').id} />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Price (ID)</label>
            <input name="price_id" className={styles.formInput} defaultValue={t('price').id} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Category</label>
            <select name="category" className={styles.formSelect} defaultValue={program?.category || 'General'}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </LanguageSection>

      <LanguageSection lang="en">
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Title (EN)</label>
          <input name="title_en" className={styles.formInput} defaultValue={t('title').en} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Description (EN)</label>
          <textarea name="description_en" className={styles.formTextarea} defaultValue={t('description').en} required />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Format (EN)</label>
            <input name="format_en" className={styles.formInput} defaultValue={t('format').en} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Level (EN)</label>
            <input name="level_en" className={styles.formInput} defaultValue={t('level').en} />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Price (EN)</label>
            <input name="price_en" className={styles.formInput} defaultValue={t('price').en} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Duration</label>
            <input name="duration" className={styles.formInput} defaultValue={program?.duration || ''} />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Icon (emoji)</label>
          <input name="icon" className={styles.formInput} defaultValue={program?.icon || '📖'} />
        </div>
      </LanguageSection>

      <FormActions submitLabel={program ? 'Update Program' : 'Create Program'} cancelHref="/admin/programs" pending={pending} />
    </form>
  );
}
