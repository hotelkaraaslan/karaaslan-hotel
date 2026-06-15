import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const locales = ["tr", "en", "de"];
const defaultLocale = "tr";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];

  // kurumsal.karaaslanhotels.com → /kurumsal-site
  if (subdomain === "kurumsal") {
    const url = request.nextUrl.clone();
    url.pathname = `/kurumsal-site${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  // eng/ger subdomains → language redirect
  if (subdomain === "eng") {
    return NextResponse.redirect(
      `https://www.karaaslanhotels.com/en${pathname === "/" ? "" : pathname}${request.nextUrl.search}`,
      301
    );
  }
  if (subdomain === "ger") {
    return NextResponse.redirect(
      `https://www.karaaslanhotels.com/de${pathname === "/" ? "" : pathname}${request.nextUrl.search}`,
      301
    );
  }

  // Skip API routes and kurumsal-site internal routes
  if (pathname.startsWith("/api") || pathname.startsWith("/kurumsal-site")) {
    return NextResponse.next();
  }

  // Admin routes - check authentication
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

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

    if (locale === defaultLocale) {
      const newPath = pathname.replace(/^\/tr/, "") || "/";
      return NextResponse.redirect(new URL(newPath, request.url));
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", locale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // No locale prefix = Turkish (default)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", defaultLocale);
  request.nextUrl.pathname = `/tr${pathname}`;
  return NextResponse.rewrite(request.nextUrl, {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/api/revalidate"],
};
