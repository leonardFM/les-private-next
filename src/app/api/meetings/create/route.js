import { query } from '@/lib/db';
import { initDb } from '@/lib/db';

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

export async function POST(request) {
  try {
    await initDb();
    const body = await request.json();
    const { schedule_id, provider } = body;

    if (!schedule_id || !provider) {
      return Response.json({ error: 'Schedule ID and provider are required.' }, { status: 400 });
    }

    const { rows } = await query('SELECT id FROM meetings WHERE schedule_id = $1', [schedule_id]);
    if (rows.length > 0) {
      return Response.json({ error: 'Meeting already exists for this schedule.' }, { status: 409 });
    }

    const { meeting_id, join_url, host_url } = generateJoinUrl(provider);

    if (!join_url) {
      return Response.json({ error: 'Invalid provider. Use zoom or google_meet.' }, { status: 400 });
    }

    await query(
      `INSERT INTO meetings (schedule_id, provider, meeting_id, join_url, host_url) VALUES ($1, $2, $3, $4, $5)`,
      [schedule_id, provider, meeting_id, join_url, host_url]
    );

    return Response.json({ ok: true, meeting_id, join_url, host_url });
  } catch (error) {
    console.error('[Create Meeting] Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
