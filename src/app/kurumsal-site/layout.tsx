import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { getSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Kurumsal Konaklama | Hotel By Karaaslan Inn Kuşadası",
  description:
    "Satış ekipleri, ilaç mümessilleri ve kurumsal profesyoneller için özel konaklama çözümleri. 40 kişilik toplantı salonu, kurumsal fatura, merkezi konum.",
};

export default async function KurumsalSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center">
            <Image
              src="/logo.png"
              alt="Hotel By Karaaslan Inn"
              width={220}
              height={75}
              className="h-[4.5rem] w-auto brightness-0"
              priority
            />
            <span className="text-[9px] font-semibold tracking-[3px] uppercase text-accent mt-0.5 ml-0.5">
              Kurumsal
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${settings.phone}`}
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
            >
              <Phone size={15} />
              {settings.phone}
            </a>
            <a
              href="#teklif"
              className="px-5 py-2 bg-accent text-white text-xs font-semibold tracking-[1.5px] uppercase hover:bg-accent-dark transition-colors"
            >
              Teklif Al
            </a>
          </div>
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="bg-primary text-white/70 py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div>
            <p className="font-[family-name:var(--font-heading)] text-white font-semibold mb-1">
              Hotel By Karaaslan Inn
            </p>
            <p className="text-xs">{settings.address}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
            <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">
              {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
              {settings.email}
            </a>
            <a href="https://karaaslanhotels.com" className="hover:text-white transition-colors">
              Ana Site →
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
