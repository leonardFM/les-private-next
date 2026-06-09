import { get, all } from '@/lib/db';

export async function getMeetingByScheduleId(scheduleId) {
  return get('SELECT * FROM meetings WHERE schedule_id = $1', [scheduleId]);
}

export async function getMeetingsByScheduleIds(scheduleIds) {
  if (!scheduleIds.length) return {};
  const placeholders = scheduleIds.map((_, i) => `$${i + 1}`).join(',');
  const rows = await all(`SELECT * FROM meetings WHERE schedule_id IN (${placeholders})`, scheduleIds);
  const map = {};
  for (const row of rows) {
    map[row.schedule_id] = row;
  }
  return map;
}
