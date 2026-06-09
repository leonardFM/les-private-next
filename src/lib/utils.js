export function j(val) {
  if (!val) return { id: '', en: '' };
  try { return JSON.parse(val); } catch { return { id: val, en: val }; }
}
