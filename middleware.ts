import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, isValidLocale } from './src/lib/i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for API routes, static files, and studio
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/studio') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  
  if (potentialLocale && isValidLocale(potentialLocale)) {
    return NextResponse.next();
  }

  // Get locale from Accept-Language header or use default
  const locale = getLocaleFromRequest(request) || defaultLocale;
  
  // Redirect to localized path
  const localizedPath = `/${locale}${pathname}`;
  return NextResponse.redirect(new URL(localizedPath, request.url));
}

function getLocaleFromRequest(request: NextRequest): string | null {
  // Check for locale in cookie first
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // Parse Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return null;

  // Simple parsing of Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase());

  // Find the first supported locale
  for (const lang of languages) {
    // Check exact match
    if (isValidLocale(lang)) {
      return lang;
    }
    
    // Check language prefix (e.g., 'es-ES' -> 'es')
    const langPrefix = lang.split('-')[0];
    if (isValidLocale(langPrefix)) {
      return langPrefix;
    }
  }

  return null;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - studio (Sanity Studio)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|studio).*)',
  ],
};
