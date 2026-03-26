import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const locales = ["tr", "en", "de"];
const defaultLocale = "tr";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes - check authentication
  if (pathname.startsWith("/admin")) {
    // Allow login page without auth
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check auth for all other admin routes
    let response = NextResponse.next({
      request: { headers: request.headers },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return response;
  }

  // Public routes - locale handling
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
    // Match all paths except _next, api, and static files
    "/((?!_next|api|.*\\..*).*)",
  ],
};
