import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(
      `DELETE FROM payments
       WHERE payment_status = 'pending'
         AND created_at < NOW() - INTERVAL '1 hour'`
    );

    return Response.json({
      ok: true,
      deleted: result.rowCount,
    });
  } catch (error) {
    console.error('[Cleanup Pending Payments] Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
