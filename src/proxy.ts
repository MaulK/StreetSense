import { NextResponse } from 'next/server';

export function proxy(request) {
  // Simple session check: Look for a cookie named "session"
  const session = request.cookies.get('session');
  
  // NOTE: For the MVP presentation, the redirect is temporarily bypassed 
  // so you can actually view the dashboard without a login system in place.
  // Uncomment the following lines to enforce the strict protection:
  
  /*
  if (!session) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
