import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decrypt } from './session';
import { get } from './db';

export async function verifyStudentSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session')?.value;

  if (!cookie) {
    redirect('/student/login');
  }

  const payload = await decrypt(cookie);

  if (!payload?.userId) {
    redirect('/student/login');
  }

  const user = await get('SELECT id, name, email, role, phone FROM users WHERE id = $1', [payload.userId]);

  if (!user || user.role !== 'student') {
    redirect('/student/login');
  }

  return user;
}
