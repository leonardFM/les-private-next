import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';

const protectedRoutes = ['/admin'];
const protectedPrefixes = ['/admin/leads', '/admin/programs', '/admin/testimonials', '/admin/faqs', '/admin/settings'];
const authRoutes = ['/admin/login'];

export default async function proxy(req) {
  const path = req.nextUrl.pathname;

  const isProtected = protectedRoutes.includes(path) || protectedPrefixes.some(p => path.startsWith(p));
  const isAuthRoute = authRoutes.includes(path);

  const cookie = req.cookies.get('session')?.value;
  const session = cookie ? await decrypt(cookie) : null;
  const isAuthenticated = !!session?.userId;

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL('/admin/login', req.nextUrl);
    loginUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
