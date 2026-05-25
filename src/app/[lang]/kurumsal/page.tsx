import { notFound } from 'next/navigation'
import { hasLocale } from '@/dictionaries'
import PageHero from '@/components/ui/PageHero'
import ScrollReveal from '@/components/ui/ScrollReveal'
import CorporateContactForm from '@/components/sections/CorporateContactForm'
import { getSettings, getPageHeroImage } from '@/lib/queries'
import { Presentation, Users, FileText, Wifi, Car, Coffee, Clock, Briefcase, MapPin, Phone } from 'lucide-react'

export const revalidate = 60

export async function generateMetadata() {
  return {
    title: 'Kurumsal Konaklama | Hotel By Karaaslan Inn Kuşadası',
    description: 'Satış ekipleri, ilaç mümessilleri ve kurumsal profesyoneller için özel konaklama çözümleri. 40 kişilik toplantı salonu, kurumsal fatura, grup fiyatları.',
  }
}

const services = [
  { icon: Presentation, title: '40 Kişilik Toplantı Salonu', desc: 'Seminer, eğitim ve iş toplantıları için tam donanımlı salon. Projeksiyon, whiteboard ve ikram hizmetleri mevcut.' },
  { icon: Users, title: 'Grup Konaklama', desc: 'Satış ekipleri ve şirket grupları için özel fiyatlandırma. Aynı katta yan yana oda tahsisi imkânı.' },
  { icon: FileText, title: 'Kurumsal Fatura', desc: 'e-Fatura ve e-Arşiv fatura kesimi. Muhasebe süreçlerinizi kolaylaştıran düzenli faturalama.' },
  { icon: Wifi, title: 'Yüksek Hızlı İnternet', desc: 'Tüm odalarda ve toplantı salonunda kesintisiz fiber internet bağlantısı.' },
  { icon: Car, title: 'Ücretsiz Otopark', desc: 'Araçlı seyahat eden sahalar için güvenli ve ücretsiz kapalı otopark.' },
  { icon: Coffee, title: 'Kahvaltı & İkram', desc: 'Açık büfe kahvaltı dahil seçenekler. Toplantı aralarında çay/kahve ikram servisi.' },
  { icon: Clock, title: 'Uzun Dönem Fiyatları', desc: 'Haftalık ve aylık konaklama için özel indirimli kurumsal oran anlaşması.' },
  { icon: Briefcase, title: 'Çalışma Alanı', desc: 'Her odada geniş çalışma masası ve ergonomik sandalye. Laptop ve ekipman için güvenli alan.' },
]

export default async function KurumsalPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const [settings, heroImage] = await Promise.all([getSettings(), getPageHeroImage('kurumsal')])

  return (
    <main>
      <PageHero
        title="Kurumsal Konaklama"
        subtitle="İş seyahatleriniz için profesyonel çözümler"
        imageUrl={heroImage || settings.about_image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80'}
      />

      {/* Giriş */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <ScrollReveal>
              <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">Neden Hotel By Karaaslan Inn?</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-primary mb-6 leading-tight">
                Kuşadası ve Çevresindeki Kurumsal Profesyonellerin Tercihi
              </h2>
              <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />
              <p className="text-text-light leading-8">
                İlaç mümessilleri, satış temsilcileri, bölge müdürleri ve şirket ekipleri için merkezi konumumuz, tam donanımlı toplantı salonumuz ve kurumsal hizmet anlayışımızla yanınızdayız. Özellikle kış sezonunda avantajlı kurumsal tariflerimizden yararlanın.
              </p>
            </ScrollReveal>
          </div>

          {/* Hizmet kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <ScrollReveal key={s.title} delay={i * 60} className="h-full">
                  <div className="bg-cream p-6 hover:-translate-y-1 hover:shadow-lg transition-all h-full">
                    <div className="w-12 h-12 flex items-center justify-center bg-white text-accent mb-4">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-[1px] text-primary mb-2">{s.title}</h3>
                    <p className="text-sm text-text-light leading-6">{s.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Toplantı salonu vurgu */}
      <section className="py-16 bg-primary">
        <div className="max-w-[1200px] mx-auto px-8">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row items-center gap-10 text-center lg:text-left">
              <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center bg-white/10 text-accent">
                <Presentation size={44} />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-semibold text-white mb-3">
                  40 Kişilik Toplantı & Seminer Salonu
                </h2>
                <p className="text-white/70 leading-7 max-w-2xl">
                  Projeksiyon sistemi, klima, doğal aydınlatma ve ikram hizmetiyle donatılmış toplantı salonumuz; eğitimler, satış toplantıları, ürün lansmanları ve seminerler için idealdir. Kapasite ve kurulum seçenekleri için bizimle iletişime geçin.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* İletişim formu */}
      <section className="py-24 bg-white" id="teklif">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="left">
              <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">İletişim</span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold text-primary mb-6">Kurumsal Teklif Alın</h2>
              <div className="w-16 h-0.5 bg-accent mb-8" />
              <p className="text-text-light leading-8 mb-8">
                Firmanıza özel konaklama paketi, toplantı salonu rezervasyonu veya uzun dönem anlaşma için aşağıdaki formu doldurun. 24 saat içinde size özel teklifimizi ileteceğiz.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone size={16} className="text-accent flex-shrink-0" />
                  <a href={`tel:${settings.phone}`} className="text-sm text-text-light hover:text-accent transition-colors">{settings.phone}</a>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin size={16} className="text-accent flex-shrink-0" />
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
  )
}
