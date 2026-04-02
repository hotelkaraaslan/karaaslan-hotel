import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/dictionaries";
import { getSettings, getDocuments } from "@/lib/queries";
import { getReservationUrl } from "@/lib/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/ui/CookieConsent";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

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
        reservationUrl={getReservationUrl(settings.reservation_url, lang)}
        phone={settings.phone}
      />
      {children}
      <Footer dict={dict.footer} navDict={dict.nav} settings={settings} lang={lang} documents={documents} />
      <WhatsAppButton />
      <CookieConsent dict={dict.cookie} documents={documents} lang={lang} />
    </>
  );
}
