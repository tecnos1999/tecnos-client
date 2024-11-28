import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/ui/')) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = pathname.replace('/ui', '');
    return NextResponse.rewrite(newUrl);
  }

  return NextResponse.next();
}
