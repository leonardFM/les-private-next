import { all } from '@/lib/db';
import { j } from '@/lib/utils';
import SettingsForm from './SettingsForm';
import styles from '../admin.module.css';

async function getSettings() {
  const rows = await all('SELECT * FROM settings');
  const settings = {};
  rows.forEach(r => {
    if (['site_name', 'site_description', 'address'].includes(r.key)) {
      settings[r.key] = j(r.value);
    } else {
      settings[r.key] = r.value;
    }
  });
  return settings;
}

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className={styles.pageTitle} style={{ marginBottom: 24 }}>Settings</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
