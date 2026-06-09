'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { saveSetting } from '@/lib/actions';
import FormActions from '../_components/FormActions';
import LanguageSection from '../_components/LanguageSection';
import styles from '../admin.module.css';

export default function SettingsForm({ settings }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    const form = new FormData(e.target);

    ['site_name', 'site_description', 'address'].forEach(key => {
      const idVal = form.get(`${key}_id`);
      const enVal = form.get(`${key}_en`);
      if (idVal !== null || enVal !== null) {
        form.set(key, JSON.stringify({ id: idVal || '', en: enVal || '' }));
        form.delete(`${key}_id`);
        form.delete(`${key}_en`);
      }
    });

    await saveSetting(form);
    setPending(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    router.refresh();
  }

  const s = (key) => {
    const v = settings[key];
    if (v && typeof v === 'object') return v;
    return { id: v || '', en: v || '' };
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formCard}>
      <LanguageSection lang="id">
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Site Name (ID)</label>
          <input name="site_name_id" className={styles.formInput} defaultValue={s('site_name').id} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Site Description (ID)</label>
          <input name="site_description_id" className={styles.formInput} defaultValue={s('site_description').id} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Address (ID)</label>
          <textarea name="address_id" className={styles.formTextarea} defaultValue={s('address').id} />
        </div>
      </LanguageSection>

      <LanguageSection lang="en">
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Site Name (EN)</label>
          <input name="site_name_en" className={styles.formInput} defaultValue={s('site_name').en} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Site Description (EN)</label>
          <input name="site_description_en" className={styles.formInput} defaultValue={s('site_description').en} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Address (EN)</label>
          <textarea name="address_en" className={styles.formTextarea} defaultValue={s('address').en} />
        </div>
      </LanguageSection>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>WhatsApp Number</label>
        <input name="whatsapp_number" className={styles.formInput} defaultValue={settings.whatsapp_number || ''} />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Contact Email</label>
          <input name="contact_email" type="email" className={styles.formInput} defaultValue={settings.contact_email || ''} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Contact Phone</label>
          <input name="contact_phone" className={styles.formInput} defaultValue={settings.contact_phone || ''} />
        </div>
      </div>

      <FormActions submitLabel={saved ? 'Saved!' : 'Save Settings'} pending={pending} />
    </form>
  );
}
