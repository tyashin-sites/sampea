import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * PREVIEW NOINDEX GUARD — host-conditional. Preview hosts get
 * `X-Robots-Tag: noindex, nofollow`; the customer's own domain is never stamped.
 */
const PREVIEW_HOST_SUFFIXES = ['.workers.dev', '.sites.tyashin.com'];

export function middleware(request: NextRequest) {
  const host = (
    request.headers.get('x-forwarded-host') ??
    request.headers.get('host') ??
    ''
  ).toLowerCase();
  const response = NextResponse.next();
  if (PREVIEW_HOST_SUFFIXES.some((s) => host.endsWith(s))) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon|og/|images/).*)'],
};
