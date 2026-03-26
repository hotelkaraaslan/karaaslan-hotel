'use client'

import { useEffect, useState } from 'react'
import { getSeoSettingsAdmin, updateSeoSettings } from '@/lib/admin-queries'
import MultiLangInput from '@/components/admin/MultiLangInput'
import MultiLangTextarea from '@/components/admin/MultiLangTextarea'
import ImageUploader from '@/components/admin/ImageUploader'
import SaveButton from '@/components/admin/SaveButton'

const pageLabels: Record<string, string> = {
  home: 'Ana Sayfa', rooms: 'Odalar', venues: 'Mekanlar', gallery: 'Galeri',
  kusadasi: 'Kuşadası', about: 'Hakkımızda', contact: 'İletişim', reservation: 'Rezervasyon',
}

export default function SeoPage() {
  const [pages, setPages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => { load() }, [])
  async function load() { setLoading(true); setPages(await getSeoSettingsAdmin()); setLoading(false) }

  const activePage = pages.find(p => p.page_slug === activeSlug)

  async function handleSave(page: any) {
    setSaving(true)
    await updateSeoSettings(page.id, {
      meta_title: page.meta_title, meta_title_en: page.meta_title_en, meta_title_de: page.meta_title_de,
      meta_description: page.meta_description, meta_description_en: page.meta_description_en, meta_description_de: page.meta_description_de,
      og_image: page.og_image,
    })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) return <div className="text-gray-500">Yükleniyor...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">SEO Ayarları</h1>
      <div className="flex gap-6">
        <div className="w-48 shrink-0">
          <nav className="space-y-1">
            {pages.map((page) => (
              <button key={page.page_slug} onClick={() => setActiveSlug(page.page_slug)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeSlug === page.page_slug ? 'bg-amber-700 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                {pageLabels[page.page_slug] || page.page_slug}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          {activePage ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <h2 className="text-lg font-semibold text-gray-800">{pageLabels[activePage.page_slug]} - SEO</h2>
              <MultiLangInput label="Meta Başlık (Title)" values={{ tr: activePage.meta_title || '', en: activePage.meta_title_en || '', de: activePage.meta_title_de || '' }}
                onChange={(v) => { const updated = pages.map(p => p.page_slug === activeSlug ? { ...p, meta_title: v.tr, meta_title_en: v.en, meta_title_de: v.de } : p); setPages(updated) }} />
              <MultiLangTextarea label="Meta Açıklama (Description)" rows={3}
                values={{ tr: activePage.meta_description || '', en: activePage.meta_description_en || '', de: activePage.meta_description_de || '' }}
                onChange={(v) => { const updated = pages.map(p => p.page_slug === activeSlug ? { ...p, meta_description: v.tr, meta_description_en: v.en, meta_description_de: v.de } : p); setPages(updated) }} />
              <ImageUploader value={activePage.og_image || ''} onChange={(v) => { const updated = pages.map(p => p.page_slug === activeSlug ? { ...p, og_image: v } : p); setPages(updated) }} folder="seo" label="OG Image (Sosyal Medya Görseli)" />
              <div className="flex items-center gap-3">
                <SaveButton loading={saving} />
                {saved && <span className="text-sm text-green-600">Kaydedildi!</span>}
                <button type="button" onClick={() => handleSave(activePage)} className="hidden">save</button>
              </div>
              <div className="text-right">
                <button onClick={() => handleSave(activePage)} disabled={saving} className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-medium transition-colors disabled:opacity-50 text-sm">
                  {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
              Düzenlemek istediğiniz sayfayı sol menüden seçin.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
