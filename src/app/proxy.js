import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';

const protectedRoutes = ['/admin', '/student', '/student/dashboard', '/student/packages', '/student/my-packages', '/student/payments', '/student/profile'];
const protectedPrefixes = ['/admin/leads', '/admin/programs', '/admin/testimonials', '/admin/faqs', '/admin/settings', '/admin/payments', '/admin/students'];
const authRoutes = ['/admin/login', '/student/login', '/student/register'];

export default async function proxy(req) {
  const path = req.nextUrl.pathname;

  const isProtected = protectedRoutes.includes(path) || protectedPrefixes.some(p => path.startsWith(p));
  const isAuthRoute = authRoutes.includes(path);

  const cookie = req.cookies.get('session')?.value;
  const session = cookie ? await decrypt(cookie) : null;
  const isAuthenticated = !!session?.userId;

  if (isProtected && !isAuthenticated) {
    if (path.startsWith('/student')) {
      const loginUrl = new URL('/student/login', req.nextUrl);
      loginUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(loginUrl);
    }
    const loginUrl = new URL('/admin/login', req.nextUrl);
    loginUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    if (path.startsWith('/student')) {
      return NextResponse.redirect(new URL('/student/dashboard', req.nextUrl));
    }
    return NextResponse.redirect(new URL('/admin', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/student/:path*'],
};
