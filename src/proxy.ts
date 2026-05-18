import { NextResponse } from 'next/server';

export function proxy(request) {
  // Simple session check: Look for a cookie named "session"
  const session = request.cookies.get('session');
  
  // NOTE: Route protection is now strictly enforced!
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
