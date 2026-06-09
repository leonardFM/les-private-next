import { query, get } from '@/lib/db';
import { generateOrderId, createTransaction } from '@/lib/midtrans';
import { decrypt } from '@/lib/session';

export async function POST(request) {
  try {
    const body = await request.json();
    const { student_id: bodyStudentId, package_id, student_package_id, amount, package_name, total_sessions } = body;

    console.log('[Payment Create] Request body:', JSON.stringify(body));

    let userId = body.user_id;
    let studentId = bodyStudentId;

    const cookie = request.cookies.get('session')?.value;
    if (cookie) {
      const session = await decrypt(cookie);
      if (session?.userId) {
        userId = session.userId;
      }
    }

    if (!amount || amount <= 0) {
      return Response.json({ error: 'Invalid amount' }, { status: 400 });
    }

    let customer;
    if (userId) {
      customer = await get('SELECT id, name, email, phone FROM users WHERE id = $1', [userId]);
      if (!customer) {
        return Response.json({ error: 'User not found' }, { status: 404 });
      }

      const student = await get('SELECT id FROM students WHERE user_id = $1', [userId]);
      if (student) {
        studentId = student.id;
      }
    } else {
      customer = await get('SELECT * FROM students WHERE id = $1', [studentId]);
      if (!customer) {
        return Response.json({ error: 'Student not found' }, { status: 404 });
      }
    }

    if (!studentId) {
      return Response.json({ error: 'No associated student record found for this user' }, { status: 400 });
    }

    console.log('[Payment Create] Resolved:', { studentId, userId, package_id, amount });

    const orderId = generateOrderId();

    const { snapToken, redirectUrl } = await createTransaction(orderId, amount, customer);

    let finalPackageName = package_name;
    let finalTotalSessions = total_sessions;
    if (package_id) {
      const pkg = await get('SELECT * FROM packages WHERE id = $1', [package_id]);
      if (pkg) {
        finalPackageName = pkg.name;
        finalTotalSessions = pkg.total_sessions;
      }
    }

    await query(`INSERT INTO payments (order_id, student_id, user_id, package_id, student_package_id, package_name, total_sessions, amount, snap_token)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [orderId, studentId, userId || null, package_id || null, student_package_id || null, finalPackageName || null, finalTotalSessions || 0, amount, snapToken]
    );

    return Response.json({ snap_token: snapToken, redirect_url: redirectUrl, order_id: orderId });
  } catch (error) {
    console.error('[Payment Create] Error:', error);
    return Response.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
