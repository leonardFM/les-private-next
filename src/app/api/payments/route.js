import { getPayments } from '@/lib/data';
import { verifySession } from '@/lib/dal';

export async function GET(request) {
  try {
    await verifySession();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const payments = await getPayments({ status, search, limit, offset });
    return Response.json(payments);
  } catch (error) {
    console.error('Payments list error:', error);
    if (error.message && error.message.includes('redirect')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return Response.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}
