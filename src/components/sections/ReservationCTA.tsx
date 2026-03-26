import ScrollReveal from "@/components/ui/ScrollReveal";

interface ReservationCTAProps {
  reservationUrl: string;
}

export default function ReservationCTA({ reservationUrl }: ReservationCTAProps) {
  return (
    <section
      className="relative py-32 lg:py-36 bg-cover bg-center bg-fixed max-md:bg-scroll text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80')",
        backgroundColor: "#1a3a4a",
      }}
    >
      <div className="absolute inset-0 bg-[rgba(20,40,50,0.55)]" />
      <ScrollReveal className="relative z-10 text-white px-8">
        <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">
          Rezervasyon
        </span>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-white mb-6">
          Hayalinizdeki Tatil
          <br />
          Bir Tık Uzağınızda
        </h2>
        <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
        <p className="text-white/80 text-base leading-8 max-w-[650px] mx-auto mb-10">
          Kuşadası&apos;nın kalbinde, denizin ve tarihin buluştuğu noktada sizi
          ağırlamaktan mutluluk duyacağız. Hemen rezervasyon yapın, ayrıcalıklı
          fiyatlardan yararlanın.
        </p>
        <a
          href={reservationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-accent text-white text-xs font-semibold tracking-[3px] uppercase hover:bg-accent-dark hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(201,169,110,0.35)] transition-all"
        >
          Online Rezervasyon
        </a>
      </ScrollReveal>
    </section>
  );
}
