import Image from "next/image";
import { getSettings, getPageHeroImage } from "@/lib/queries";
import CorporateContactForm from "@/components/sections/CorporateContactForm";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  Presentation,
  Users,
  FileText,
  Wifi,
  Car,
  Coffee,
  Clock,
  Briefcase,
  Phone,
  MapPin,
  CheckCircle,
  Star,
  Printer,
  Flame,
} from "lucide-react";

export const revalidate = 60;

const services = [
  { icon: Presentation, title: "40 Kişilik Toplantı Salonu", desc: "Projeksiyon, whiteboard ve ikram dahil. Eğitim, satış toplantısı ve ürün lansmanları için." },
  { icon: Users, title: "Grup Konaklama", desc: "Satış ekipleri için özel fiyatlandırma ve aynı katta yan yana oda tahsisi." },
  { icon: FileText, title: "Kurumsal Fatura", desc: "e-Fatura ve e-Arşiv. Muhasebe süreçlerinizi kolaylaştıran düzenli faturalama." },
  { icon: Wifi, title: "Kesintisiz İnternet", desc: "Tüm odalarda ve toplantı salonunda yüksek hızlı fiber internet." },
  { icon: Car, title: "Ücretsiz Otopark", desc: "Araçlı sahalar için güvenli kapalı otopark imkânı." },
  { icon: Coffee, title: "Kahvaltı & İkram", desc: "Açık büfe kahvaltı dahil. Toplantı aralarında çay/kahve ikram servisi." },
  { icon: Clock, title: "Uzun Dönem Tarifeleri", desc: "Haftalık ve aylık konaklama için özel indirimli kurumsal oran anlaşması." },
  { icon: Briefcase, title: "Çalışma Alanı", desc: "Her odada ergonomik çalışma masası. Laptop ve ekipman için güvenli ortam." },
];

const stats = [
  { value: "15+", label: "Yıllık Deneyim" },
  { value: "100+", label: "Kurumsal Müşteri" },
  { value: "40", label: "Kişilik Toplantı Salonu" },
  { value: "7/24", label: "Resepsiyon Hizmeti" },
];

const reasons = [
  "Kuşadası merkezde, her noktaya kolay erişim",
  "Tüm büyük şirketlerle protokol anlaşması yapılabilir",
  "Kış sezonu kurumsal indirimleri",
  "Grup rezervasyonlarında esnek iptal koşulları",
];

export default async function KurumsalSitePage() {
  const [settings, heroImage] = await Promise.all([
    getSettings(),
    getPageHeroImage("kurumsal"),
  ]);

  const whatsappNumber = "905439579009";
  const whatsappMsg = encodeURIComponent("Merhaba, kurumsal konaklama hakkında bilgi almak istiyorum.");

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[560px] lg:min-h-[640px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={heroImage || settings.about_image || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"}
            alt="Hotel By Karaaslan Inn Kurumsal"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-5 block">
              Kuşadası Merkez — Kurumsal Konaklama
            </span>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl">
              İş Seyahatleriniz İçin <span className="text-accent">Profesyonel</span> Çözümler
            </h1>
            <p className="text-white/80 text-lg leading-8 mb-10 max-w-xl">
              Satış ekipleri, ilaç mümessilleri ve kurumsal profesyoneller için merkezi konumumuz,
              toplantı salonumuz ve kurumsal fatura hizmetimizle yanınızdayız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#teklif"
                className="inline-block px-8 py-4 bg-accent text-white text-sm font-semibold tracking-[2px] uppercase hover:bg-accent-dark transition-colors text-center"
              >
                Kurumsal Teklif Al
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/40 text-white text-sm font-semibold tracking-[2px] uppercase hover:bg-white/10 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp ile Yazın
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-accent py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-bold text-white mb-1">
                  {s.value}
                </div>
                <div className="text-xs font-semibold tracking-[2px] uppercase text-white/80">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neden Biz */}
      <section className="py-20 bg-cream">
        <div className="max-w-[1200px] mx-auto px-6">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">
                  Neden Hotel By Karaaslan Inn?
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-primary mb-6 leading-tight">
                  Kuşadası ve Çevresindeki Kurumsal Profesyonellerin Tercihi
                </h2>
                <div className="w-16 h-0.5 bg-accent mb-8" />
                <p className="text-text-light leading-8 mb-8">
                  İlaç mümessilleri, satış temsilcileri, bölge müdürleri ve şirket ekipleri için
                  merkezi konumumuz, tam donanımlı toplantı salonumuz ve kurumsal hizmet
                  anlayışımızla her zaman yanınızdayız.
                </p>
                <ul className="space-y-3">
                  {reasons.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm text-text-light">
                      <CheckCircle size={16} className="text-accent flex-shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[380px] lg:h-[450px]">
                <Image
                  src={settings.about_image || "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80"}
                  alt="Hotel By Karaaslan Inn"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Hizmetler */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">
                Kurumsal Hizmetler
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-primary">
                İş Seyahatinizi Kolaylaştıran Her Şey
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <ScrollReveal key={s.title} delay={i * 60} className="h-full">
                  <div className="bg-cream p-6 hover:-translate-y-1 hover:shadow-lg transition-all h-full">
                    <div className="w-11 h-11 flex items-center justify-center bg-white text-accent mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-[1px] text-primary mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-text-light leading-6">{s.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Toplantı Salonu */}
      <section className="py-16 bg-primary">
        <div className="max-w-[1200px] mx-auto px-6">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row items-center gap-10 text-center lg:text-left">
              <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-white/10 text-accent">
                <Presentation size={40} />
              </div>
              <div className="flex-1">
                <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-semibold text-white mb-3">
                  40 Kişilik Toplantı & Seminer Salonu
                </h2>
                <p className="text-white/70 leading-7 max-w-2xl">
                  Projeksiyon sistemi, klima, doğal aydınlatma ve ikram hizmetiyle donatılmış
                  toplantı salonumuz; eğitimler, satış toplantıları, ürün lansmanları ve seminerler
                  için idealdir.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="#teklif"
                  className="inline-block px-8 py-3 bg-accent text-white text-xs font-semibold tracking-[2px] uppercase hover:bg-accent-dark transition-colors"
                >
                  Rezervasyon Yap
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Çalışma Alanı */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">
                Günübirlik & Kış Sezonu
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-primary mb-6 leading-tight">
                Ofisten Uzakta, <br />Verimlilik Yerinde
              </h2>
              <div className="w-16 h-0.5 bg-accent mb-8" />
              <p className="text-text-light leading-8 mb-8">
                Kuşadası merkezde, Didim, Söke ve Efes gibi önemli noktalara kolay erişim
                mesafesinde bir çalışma alanı. Özellikle kış aylarında sakin ve konsantre
                bir ortamda çalışmak isteyenler için günübirlik masa kiralama imkânı sunuyoruz.
                Şöminenin yanında kahvenizi içerken işlerinizi halledin.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Wifi, label: "Yüksek Hızlı Fiber İnternet" },
                  { icon: Coffee, label: "Kahve & Çay Servisi" },
                  { icon: MapPin, label: "Merkezi Konum" },
                  { icon: Briefcase, label: "Günübirlik Masa Kiralama" },
                  { icon: Printer, label: "Print & Tarama Hizmeti" },
                  { icon: Flame, label: "Şömineli Lounge Alan" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 bg-cream px-4 py-3">
                      <Icon size={16} className="text-accent flex-shrink-0" />
                      <span className="text-sm text-primary font-medium">{item.label}</span>
                    </div>
                  );
                })}
              </div>
              <a
                href="#teklif"
                className="inline-block mt-8 px-8 py-3 bg-accent text-white text-xs font-semibold tracking-[2px] uppercase hover:bg-accent-dark transition-colors"
              >
                Bilgi & Rezervasyon
              </a>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="bg-primary p-10 text-white">
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-6">
                  Neden Kuşadası'nda Çalışırsınız?
                </h3>
                <ul className="space-y-4 text-white/80 text-sm leading-7">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={15} className="text-accent flex-shrink-0 mt-1" />
                    Didim, Söke ve Efes gibi Ege'nin önemli ticaret ve turizm merkezlerine 30–45 dakika mesafe
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={15} className="text-accent flex-shrink-0 mt-1" />
                    Kış aylarında şehrin sessizliğinde konsantre çalışma ortamı
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={15} className="text-accent flex-shrink-0 mt-1" />
                    Günübirlik kullanım veya haftalık / aylık düzenlemeler
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={15} className="text-accent flex-shrink-0 mt-1" />
                    Gerektiğinde aynı gün odaya geçiş imkânı
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={15} className="text-accent flex-shrink-0 mt-1" />
                    Konaklama + çalışma alanını birleştiren paket tarifeler
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Görüş / Trust */}
      <section className="py-16 bg-cream">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="flex justify-center gap-1 mb-6">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} size={18} className="fill-accent text-accent" />
              ))}
            </div>
            <blockquote className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl text-primary italic leading-relaxed mb-6">
              "Satış ekibimizle yılda birkaç kez Kuşadası'na geliyoruz. Kurumsal fatura,
              toplantı salonu ve merkezi konum açısından bölgedeki en iyi tercihimiz."
            </blockquote>
            <p className="text-sm text-text-light font-semibold">Bölge Müdürü, İzmir</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Teklif Formu */}
      <section className="py-24 bg-white" id="teklif">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="left">
              <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">
                İletişim
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold text-primary mb-6">
                Kurumsal Teklif Alın
              </h2>
              <div className="w-16 h-0.5 bg-accent mb-8" />
              <p className="text-text-light leading-8 mb-8">
                Firmanıza özel konaklama paketi, toplantı salonu rezervasyonu veya uzun dönem
                anlaşma için formu doldurun. 24 saat içinde size özel teklifimizi ileteceğiz.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone size={15} className="text-accent flex-shrink-0" />
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-sm text-text-light hover:text-accent transition-colors"
                  >
                    {settings.phone}
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-accent flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-light hover:text-accent transition-colors"
                  >
                    WhatsApp ile yazın
                  </a>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin size={15} className="text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-text-light">{settings.address}</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <CorporateContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
