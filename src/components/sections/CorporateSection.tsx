import ScrollReveal from '@/components/ui/ScrollReveal'
import { Briefcase, Users, FileText, Wifi, Car, Coffee, Presentation, Clock } from 'lucide-react'

const features = [
  { icon: Presentation, text: '40 Kişilik Toplantı & Seminer Salonu' },
  { icon: Users, text: 'Grup Konaklama & Özel Fiyatlandırma' },
  { icon: FileText, text: 'Kurumsal e-Fatura' },
  { icon: Wifi, text: 'Yüksek Hızlı Wi-Fi' },
  { icon: Car, text: 'Ücretsiz Otopark' },
  { icon: Coffee, text: 'Kahvaltı Dahil Seçenekler' },
  { icon: Clock, text: 'Uzun Süreli Konaklama Oranları' },
  { icon: Briefcase, text: 'Çalışma Dostu Oda Düzeni' },
]

interface Props { lang: string }

export default function CorporateSection({ lang }: Props) {
  const lp = lang === 'tr' ? '' : `/${lang}`

  return (
    <section className="py-24 lg:py-32 bg-primary">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Sol: Metin */}
          <ScrollReveal direction="left">
            <span className="text-xs font-semibold tracking-[4px] uppercase text-accent mb-4 block">Kurumsal Çözümler</span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-semibold text-white leading-tight mb-6">
              İş Seyahatleriniz İçin<br />Doğru Adres
            </h2>
            <div className="w-16 h-0.5 bg-accent mb-8" />
            <p className="text-white/70 text-base leading-8 mb-10">
              Satış ekipleri, ilaç mümessilleri ve kurumsal profesyoneller için özel konaklama çözümleri. 40 kişilik toplantı salonumuz, kurumsal fatura imkânımız ve iş dostu ortamımızla yanınızdayız.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {features.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-accent">
                    <Icon size={18} />
                  </div>
                  <span className="text-sm text-white/75">{text}</span>
                </div>
              ))}
            </div>
            <a
              href="https://kurumsal.karaaslanhotels.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white text-xs font-semibold tracking-[3px] uppercase hover:bg-accent-dark transition-all hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(201,169,110,0.35)]"
            >
              Kurumsal Teklif Alın
            </a>
          </ScrollReveal>

          {/* Sağ: Stat kartları */}
          <ScrollReveal direction="right">
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '40', label: 'Kişilik Toplantı Salonu' },
                { num: '7/24', label: 'Resepsiyon Desteği' },
                { num: '100+', label: 'Kurumsal Müşteri' },
                { num: '15+', label: 'Yıllık Tecrübe' },
              ].map(({ num, label }) => (
                <div key={label} className="bg-white/5 border border-white/10 p-8 text-center hover:bg-white/10 transition-colors">
                  <p className="font-[family-name:var(--font-heading)] text-4xl font-semibold text-accent mb-2">{num}</p>
                  <p className="text-xs text-white/60 uppercase tracking-[1px]">{label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
