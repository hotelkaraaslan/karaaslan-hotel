import type { Metadata } from "next";
import { Playfair_Display, Raleway } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotel By Karaaslan Inn | Kuşadası",
  description:
    "Hotel By Karaaslan Inn - Kuşadası'nda deniz manzaralı lüks konaklama deneyimi.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const lang = headersList.get("x-locale") || "tr";

  return (
    <html lang={lang} className={`${playfair.variable} ${raleway.variable}`}>
      <body className="min-h-screen font-[family-name:var(--font-body)] antialiased">
        {children}
      </body>
    </html>
  );
}
