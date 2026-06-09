'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { saveTestimonial } from '@/lib/actions';
import { j } from '@/lib/utils';
import FormActions from '../_components/FormActions';
import LanguageSection from '../_components/LanguageSection';
import styles from '../admin.module.css';

export default function TestimonialForm({ testimonial }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const t = (f) => testimonial ? j(testimonial[f]) : { id: '', en: '' };

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    const form = new FormData(e.target);

    ['name', 'course', 'quote'].forEach(f => {
      const idVal = form.get(`${f}_id`);
      const enVal = form.get(`${f}_en`);
      form.set(f, JSON.stringify({ id: idVal || '', en: enVal || '' }));
      form.delete(`${f}_id`);
      form.delete(`${f}_en`);
    });

    form.set('initials', form.get('initials') || '');
    form.set('rating', form.get('rating'));
    if (testimonial) form.set('id', testimonial.id);

    await saveTestimonial(form);
    setPending(false);
    router.push('/admin/testimonials');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formCard}>
      <LanguageSection lang="id">
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name (ID)</label>
            <input name="name_id" className={styles.formInput} defaultValue={t('name').id} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Course (ID)</label>
            <input name="course_id" className={styles.formInput} defaultValue={t('course').id} />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Quote (ID)</label>
          <textarea name="quote_id" className={styles.formTextarea} defaultValue={t('quote').id} required />
        </div>
      </LanguageSection>

      <LanguageSection lang="en">
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name (EN)</label>
            <input name="name_en" className={styles.formInput} defaultValue={t('name').en} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Course (EN)</label>
            <input name="course_en" className={styles.formInput} defaultValue={t('course').en} />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Quote (EN)</label>
          <textarea name="quote_en" className={styles.formTextarea} defaultValue={t('quote').en} required />
        </div>
      </LanguageSection>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Rating (1-5)</label>
          <select name="rating" className={styles.formSelect} defaultValue={testimonial?.rating || 5}>
            {[1,2,3,4,5].map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Initials</label>
          <input name="initials" className={styles.formInput} defaultValue={testimonial?.initials || ''} placeholder="Auto" />
        </div>
      </div>

      <FormActions submitLabel={testimonial ? 'Update Testimonial' : 'Create Testimonial'} cancelHref="/admin/testimonials" pending={pending} />
    </form>
  );
}
