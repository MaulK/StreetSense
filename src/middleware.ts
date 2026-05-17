import { NextResponse } from 'next/server';

export function middleware(request) {
  // Simple session check: Look for a cookie named "session"
  // For MVP purposes, if there is no session cookie, redirect to login or home
  // (Assuming /auth/login doesn't exist yet, we'll redirect to /)
  
  const session = request.cookies.get('session');
  
  if (!session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
