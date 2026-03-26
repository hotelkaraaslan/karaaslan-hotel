import { redirect } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/dictionaries";
import { getSettings } from "@/lib/queries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: dict.meta.reservationTitle };
}

export default async function ReservasyonPage() {
  const settings = await getSettings();
  redirect(settings.reservation_url);
}
