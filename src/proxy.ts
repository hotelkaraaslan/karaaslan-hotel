import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["tr", "en", "de"];
const defaultLocale = "tr";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferred = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim().toLowerCase());

  for (const lang of preferred) {
    const short = lang.substring(0, 2);
    if (locales.includes(short)) return short;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const locale = pathname.split("/")[1];

    // If Turkish (default), redirect to unprefixed URL for SEO
    if (locale === defaultLocale) {
      const newPath = pathname.replace(/^\/tr/, "") || "/";
      return NextResponse.redirect(new URL(newPath, request.url));
    }

    // For en/de, set locale header and pass through
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", locale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // No locale prefix = default language (Turkish)
  // Rewrite internally to /tr/ path but keep clean URL
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", defaultLocale);
  request.nextUrl.pathname = `/tr${pathname}`;
  return NextResponse.rewrite(request.nextUrl, {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    // Match all paths except _next, admin, api, and static files
    "/((?!_next|admin|api|.*\\..*).*)",
  ],
};
