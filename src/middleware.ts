import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;

  if ((path.startsWith('/admin') && path !== '/admin/login') || path.startsWith('/api/admin')) {
    if (!token) {
      const login = new URL('/admin/login', req.url);
      return NextResponse.redirect(login);
    }
    if (!['OWNER', 'MANAGER', 'STAFF'].includes(String(token.role))) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
};
