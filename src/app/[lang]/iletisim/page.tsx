import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/dictionaries";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ContactForm from "@/components/sections/ContactForm";
import { getSettings, getPageHeroImage } from "@/lib/queries";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: dict.meta.contactTitle, description: dict.meta.contactDesc };
}

export default async function IletisimPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, settings, heroImage] = await Promise.all([getDictionary(lang as Locale), getSettings(), getPageHeroImage('contact')]);
  const ct = dict.contact;

  return (
    <main>
      <PageHero
        title={ct.title}
        subtitle={ct.subtitle}
        imageUrl={heroImage || "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80"}
      />

      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Contact Info */}
            <ScrollReveal direction="left">
              <div>
                <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">
                  {ct.info}
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-primary leading-tight mb-6">
                  Hotel By Karaaslan Inn
                </h2>
                <div className="w-16 h-0.5 bg-accent mb-8" />
                <p className="text-text-light text-base leading-8 mb-10">
                  {ct.infoDesc}
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 min-w-[3rem] flex items-center justify-center bg-cream text-accent">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-[1px] text-primary mb-1">{ct.address}</h4>
                      <p className="text-sm text-text-light leading-6">{settings.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 min-w-[3rem] flex items-center justify-center bg-cream text-accent">
                      <Phone size={22} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-[1px] text-primary mb-1">{ct.phone}</h4>
                      <a href={`tel:${settings.phone}`} onClick={() => (window as any).gtag?.('event', 'conversion', { send_to: 'AW-1206137271/PHONE_CALL_LEAD' })} className="text-sm text-text-light hover:text-accent transition-colors block">{settings.phone}</a>
                      <a href="tel:+905439579009" className="text-sm text-text-light hover:text-accent transition-colors block mt-1">+90 543 957 90 09</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 min-w-[3rem] flex items-center justify-center bg-cream text-accent">
                      <Mail size={22} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-[1px] text-primary mb-1">{ct.email}</h4>
                      <a href={`mailto:${settings.email}`} className="text-sm text-text-light hover:text-accent transition-colors">{settings.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 min-w-[3rem] flex items-center justify-center bg-cream text-accent">
                      <Clock size={22} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-[1px] text-primary mb-1">
                        {lang === "de" ? "Rezeption" : lang === "en" ? "Reception" : "Resepsiyon"}
                      </h4>
                      <p className="text-sm text-text-light">24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal direction="right">
              <ContactForm labels={{
                formTitle: ct.formTitle,
                formDesc: ct.formDesc,
                name: ct.name,
                email: ct.email,
                phone: ct.phone,
                subject: ct.subject,
                message: ct.message,
                send: ct.send,
              }} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-cream">
        <div className="max-w-[1200px] mx-auto px-8 py-16">
          <ScrollReveal>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl text-primary mb-8 text-center">{ct.mapTitle}</h3>
            <div className="w-full h-[400px] bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3147.8!2d27.2605!3d37.8575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b92b0a1a7e9c35%3A0x!2sKu%C5%9Fadas%C4%B1!5e0!3m2!1str!2str!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel By Karaaslan Inn - Kuşadası"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
