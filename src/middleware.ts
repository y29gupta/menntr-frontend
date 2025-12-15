import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const role = req.cookies.get('role')?.value;
  const { pathname } = req.nextUrl;

  /* =========================
     1️⃣ BLOCK LOGIN IF LOGGED IN
  ========================== */
  if (pathname.startsWith('/login') && token && role) {
    return NextResponse.redirect(
      new URL(
        role === 'superadmin' ? '/super-admin' : `/${role}`,
        req.url
      )
    );
  }

  /* =========================
     2️⃣ PROTECT DASHBOARD ROUTES
  ========================== */
  const protectedRoutes = [
    '/super-admin',
    '/admin',
    '/student',
    '/faculty',
    '/procurement-head',
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  /* =========================
     3️⃣ ROLE-BASED AUTHORIZATION
  ========================== */
  if (pathname.startsWith('/super-admin') && role !== 'superadmin') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname.startsWith('/student') && role !== 'student') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname.startsWith('/faculty') && role !== 'faculty') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (
    pathname.startsWith('/procurement-head') &&
    role !== 'procurement-head'
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/super-admin/:path*',
    '/admin/:path*',
    '/student/:path*',
    '/faculty/:path*',
    '/procurement-head/:path*',
  ],
};
