'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { saveFaq } from '@/lib/actions';
import { j } from '@/lib/utils';
import FormActions from '../_components/FormActions';
import LanguageSection from '../_components/LanguageSection';
import styles from '../admin.module.css';

export default function FaqForm({ faq }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const q = faq ? j(faq.question) : { id: '', en: '' };
  const a = faq ? j(faq.answer) : { id: '', en: '' };

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    const form = new FormData(e.target);

    const question = JSON.stringify({ id: form.get('question_id') || '', en: form.get('question_en') || '' });
    const answer = JSON.stringify({ id: form.get('answer_id') || '', en: form.get('answer_en') || '' });
    form.set('question', question);
    form.set('answer', answer);
    form.delete('question_id');
    form.delete('question_en');
    form.delete('answer_id');
    form.delete('answer_en');

    if (faq) form.set('id', faq.id);
    await saveFaq(form);
    setPending(false);
    router.push('/admin/faqs');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formCard}>
      <LanguageSection lang="id">
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Question (ID)</label>
          <input name="question_id" className={styles.formInput} defaultValue={q.id} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Answer (ID)</label>
          <textarea name="answer_id" className={styles.formTextarea} defaultValue={a.id} required />
        </div>
      </LanguageSection>

      <LanguageSection lang="en">
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Question (EN)</label>
          <input name="question_en" className={styles.formInput} defaultValue={q.en} required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Answer (EN)</label>
          <textarea name="answer_en" className={styles.formTextarea} defaultValue={a.en} required />
        </div>
      </LanguageSection>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Sort Order</label>
        <input name="sort_order" type="number" className={styles.formInput} defaultValue={faq?.sort_order || 0} />
      </div>

      <FormActions submitLabel={faq ? 'Update FAQ' : 'Create FAQ'} cancelHref="/admin/faqs" pending={pending} />
    </form>
  );
}
