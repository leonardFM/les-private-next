import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decrypt } from './session';
import { get } from './db';

export async function verifySession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session')?.value;

  if (!cookie) {
    redirect('/admin/login');
  }

  const payload = await decrypt(cookie);

  if (!payload?.userId) {
    redirect('/admin/login');
  }

  const user = await get('SELECT id, name, email FROM users WHERE id = $1', [payload.userId]);

  if (!user) {
    redirect('/admin/login');
  }

  return user;
}
