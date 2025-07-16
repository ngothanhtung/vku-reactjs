import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  const session = await auth();

  // List of protected routes
  const protectedRoutes = ['/administration'];

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  // If it's a protected route and user is not authenticated, redirect to sign in
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (authentication routes)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
  ],
};
