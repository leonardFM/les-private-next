import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decrypt } from './session';
import { getDb } from './db';

export async function verifySession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  const session = await decrypt(sessionCookie);

  if (!session?.userId) {
    redirect('/admin/login');
  }

  const db = getDb();
  const user = db.prepare('SELECT id, email, name FROM users WHERE id = ?').get(session.userId);
  if (!user) {
    redirect('/admin/login');
  }

  return { isAuth: true, userId: user.id, email: user.email, name: user.name };
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  const session = await decrypt(sessionCookie);
  if (!session?.userId) return null;
  return session;
}
