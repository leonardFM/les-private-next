import { getPaymentById } from '@/lib/data';
import { verifySession } from '@/lib/dal';

export async function GET(request, { params }) {
  try {
    await verifySession();

    const { id } = await params;
    const payment = await getPaymentById(id);

    if (!payment) {
      return Response.json({ error: 'Payment not found' }, { status: 404 });
    }

    return Response.json(payment);
  } catch (error) {
    console.error('Payment detail error:', error);
    if (error.message && error.message.includes('redirect')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return Response.json({ error: 'Failed to fetch payment' }, { status: 500 });
  }
}
