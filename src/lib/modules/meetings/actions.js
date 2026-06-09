'use server';

import { revalidatePath } from 'next/cache';
import { query, get } from '@/lib/db';

function generateJoinUrl(provider) {
  const id = Math.random().toString(36).substring(2, 12);
  if (provider === 'zoom') {
    return { meeting_id: id, join_url: `https://zoom.us/j/${id}`, host_url: `https://zoom.us/j/${id}?pwd=host` };
  }
  if (provider === 'google_meet') {
    const meetCode = `${id.substring(0, 3)}-${id.substring(3, 7)}-${id.substring(7, 11)}`;
    return { meeting_id: meetCode, join_url: `https://meet.google.com/${meetCode}`, host_url: null };
  }
  return { meeting_id: null, join_url: null, host_url: null };
}

export async function createMeeting(formData) {
  const data = Object.fromEntries(formData);
  const { schedule_id, provider } = data;

  if (!schedule_id || !provider) {
    return { error: 'Schedule ID and provider are required.' };
  }

  const schedule = await get('SELECT * FROM schedules WHERE id = $1', [schedule_id]);
  if (!schedule) return { error: 'Schedule not found.' };

  const existing = await get('SELECT id FROM meetings WHERE schedule_id = $1', [schedule_id]);
  if (existing) return { error: 'Meeting already exists for this schedule.' };

  const { meeting_id, join_url, host_url } = generateJoinUrl(provider);

  if (!join_url) return { error: 'Invalid provider. Use zoom or google_meet.' };

  await query(
    `INSERT INTO meetings (schedule_id, provider, meeting_id, join_url, host_url) VALUES ($1, $2, $3, $4, $5)`,
    [schedule_id, provider, meeting_id, join_url, host_url]
  );

  revalidatePath(`/admin/schedules/${schedule_id}`);
  return { success: true, join_url, host_url };
}

export async function removeMeeting(formData) {
  const data = Object.fromEntries(formData);
  const { id, schedule_id } = data;

  await query('DELETE FROM meetings WHERE id = $1', [id]);

  if (schedule_id) {
    revalidatePath(`/admin/schedules/${schedule_id}`);
  }
  revalidatePath('/admin/schedules');
  return { success: true };
}
