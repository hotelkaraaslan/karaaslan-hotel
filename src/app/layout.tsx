import type { Metadata } from "next";
import { Playfair_Display, Raleway } from "next/font/google";
import { headers } from "next/headers";
import { getTrackingCodes } from "@/lib/queries";
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

  let trackingCodes: any[] = [];
  try {
    trackingCodes = await getTrackingCodes();
  } catch {
    // tracking codes are optional
  }

  const gtmCode = trackingCodes.find((c) => c.code_type === "gtm");
  const ga4Code = trackingCodes.find((c) => c.code_type === "ga4");
  const adsCode = trackingCodes.find((c) => c.code_type === "google_ads");
  const fbPixel = trackingCodes.find((c) => c.code_type === "facebook_pixel");
  const customHead = trackingCodes.filter((c) => c.code_type === "custom_head");
  const customBody = trackingCodes.filter((c) => c.code_type === "custom_body");

  return (
    <html lang={lang} className={`${playfair.variable} ${raleway.variable}`}>
      <head>
        {/* Google Tag Manager */}
        {gtmCode && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmCode.code_value}');`,
            }}
          />
        )}
        {/* Google Analytics 4 */}
        {ga4Code && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4Code.code_value}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Code.code_value}');`,
              }}
            />
          </>
        )}
        {/* Google Ads */}
        {adsCode && (
          <script
            dangerouslySetInnerHTML={{
              __html: `gtag('config','${adsCode.code_value}');`,
            }}
          />
        )}
        {/* Facebook Pixel */}
        {fbPixel && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${fbPixel.code_value}');fbq('track','PageView');`,
            }}
          />
        )}
        {/* Custom Head Scripts */}
        {customHead.map((code) => (
          <script key={code.id} dangerouslySetInnerHTML={{ __html: code.code_value }} />
        ))}
      </head>
      <body className="min-h-screen font-[family-name:var(--font-body)] antialiased">
        {/* GTM noscript */}
        {gtmCode && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmCode.code_value}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
        {/* Custom Body Scripts */}
        {customBody.map((code) => (
          <script key={code.id} dangerouslySetInnerHTML={{ __html: code.code_value }} />
        ))}
      </body>
    </html>
  );
}
