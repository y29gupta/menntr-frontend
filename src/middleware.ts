import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getRoleFromToken(token: string): string | null {
  try {
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(
      Buffer.from(payloadBase64, 'base64').toString()
    );
    return payload?.roles?.[0] ?? null;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  
  const token = req.cookies.get('auth_token')?.value;


  if (!token) {
    return NextResponse.redirect(new URL(`/`, req.url));
  }
 
  const role = getRoleFromToken(token);
  const pathname = req.nextUrl.pathname;


  if (pathname.startsWith('/super-admin') && role !== 'Super Admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }
  
 if (pathname.startsWith('/admin') && role !== 'Institution Admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (pathname.startsWith('/admin/dashboard') && role !== 'Institution Admin') {
    return NextResponse.redirect(new URL('/login?role=Institution Admin', req.url));
  }

  if (pathname.startsWith('/student') && role !== 'Student') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (pathname.startsWith('/faculty') && role !== 'Faculty') {
    return NextResponse.redirect(new URL('/', req.url));
  }


  if (
    pathname.startsWith('/procurement-head') &&
    role !== 'Procurement Head'
  ) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/super-admin/:path*',
    '/admin/:path*',
    '/student/:path*',
    '/faculty/:path*',
    '/procurement-head/:path*',
    '/admin'
  ],
};
