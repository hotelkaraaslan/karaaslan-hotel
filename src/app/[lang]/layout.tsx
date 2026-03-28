import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/dictionaries";
import { getSettings, getDocuments } from "@/lib/queries";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/ui/CookieConsent";

export async function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }, { lang: "de" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const [dict, settings, documents] = await Promise.all([
    getDictionary(lang as Locale),
    getSettings(),
    getDocuments(),
  ]);

  return (
    <>
      <Navbar
        dict={dict.nav}
        lang={lang}
        reservationUrl={settings.reservation_url}
      />
      {children}
      <Footer dict={dict.footer} navDict={dict.nav} settings={settings} lang={lang} documents={documents} />
      <CookieConsent dict={dict.cookie} documents={documents} lang={lang} />
    </>
  );
}
