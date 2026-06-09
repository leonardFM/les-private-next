import { initDb, getDb } from '@/lib/db';
import { verifySession } from '@/lib/dal';
import SettingsForm from './SettingsForm';

initDb();

function j(val) {
  if (!val) return { id: '', en: '' };
  try { return JSON.parse(val); } catch { return { id: val, en: val }; }
}

async function getSettings() {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM settings').all();
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
  await verifySession();
  const settings = await getSettings();

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--foreground)', margin: '0 0 24px' }}>Settings</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
