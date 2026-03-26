interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

export default function PageHero({ title, subtitle, imageUrl }: PageHeroProps) {
  return (
    <section
      className="relative h-[50vh] min-h-[400px] flex items-center justify-center"
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#1a3a4a",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,30,40,0.5)] to-[rgba(10,30,40,0.7)]" />
      <div className="relative z-10 text-center text-white px-8">
        <span className="text-xs font-semibold tracking-[5px] uppercase text-accent block mb-4">
          Hotel By Karaaslan Inn
        </span>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-white/80 max-w-xl mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
