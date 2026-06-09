import { query, get } from '@/lib/db';
import { verifySignature, mapTransactionStatus, isPaymentSuccess } from '@/lib/midtrans';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      order_id,
      transaction_status,
      payment_type,
      transaction_id,
      status_code,
      gross_amount,
      signature_key,
    } = body;

    const valid = verifySignature(order_id, status_code, gross_amount, signature_key);
    if (!valid) {
      return Response.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const payment = await get('SELECT * FROM payments WHERE order_id = $1', [order_id]);
    if (!payment) {
      return Response.json({ error: 'Payment not found' }, { status: 404 });
    }

    const paymentStatus = mapTransactionStatus(transaction_status);

    await query(`UPDATE payments SET
      payment_status = $1, transaction_status = $2, payment_type = $3,
      transaction_id = $4, updated_at = NOW()
      WHERE order_id = $5`,
      [paymentStatus, transaction_status, payment_type || null, transaction_id || null, order_id]
    );

    if (isPaymentSuccess(transaction_status)) {
      const updated = await get('SELECT * FROM payments WHERE order_id = $1', [order_id]);
      if (updated.student_package_id) {
        await query(`UPDATE student_packages SET status = 'active', remaining_sessions = total_sessions WHERE id = $1`,
          [updated.student_package_id]
        );
      } else if (updated.package_name) {
        const startDate = new Date().toISOString().split('T')[0];
        const targetStudentId = updated.student_id || (
          updated.user_id ? (await get('SELECT id FROM students WHERE user_id = $1', [updated.user_id]))?.id : null
        );
        if (targetStudentId) {
          await query(`INSERT INTO student_packages (student_id, package_name, total_sessions, remaining_sessions, start_date, status)
            VALUES ($1, $2, $3, $4, $5, 'active')`,
            [targetStudentId, updated.package_name, updated.total_sessions, updated.total_sessions, startDate]
          );
          const newPkg = await get('SELECT id FROM student_packages WHERE student_id = $1 ORDER BY created_at DESC LIMIT 1', [targetStudentId]);
          if (newPkg) {
            await query('UPDATE payments SET student_package_id = $1 WHERE id = $2', [newPkg.id, updated.id]);
          }
        }
      }
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
