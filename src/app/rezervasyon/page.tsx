import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Rezervasyon | Hotel By Karaaslan Inn",
};

export default async function ReservasyonPage() {
  const settings = await getSettings();
  redirect(settings.reservation_url);
}
