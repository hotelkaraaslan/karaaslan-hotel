'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSlider } from '@/lib/admin-queries'
import MultiLangInput from '@/components/admin/MultiLangInput'
import MultiLangTextarea from '@/components/admin/MultiLangTextarea'
import ImageUploader from '@/components/admin/ImageUploader'
import SaveButton from '@/components/admin/SaveButton'

export default function NewSliderPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    subtitle: { tr: '', en: '', de: '' },
    button_text: { tr: 'Rezervasyon Yap', en: 'Book Now', de: 'Jetzt Buchen' },
    button_link: '',
    image_url: '',
    is_active: true,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await createSlider({
      title: form.title,
      subtitle: form.subtitle.tr,
      subtitle_en: form.subtitle.en,
      subtitle_de: form.subtitle.de,
      button_text: form.button_text.tr,
      button_text_en: form.button_text.en,
      button_text_de: form.button_text.de,
      button_link: form.button_link,
      image_url: form.image_url,
      is_active: form.is_active,
    })
    router.push('/admin/sliders')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Yeni Slider</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 max-w-3xl space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
          <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm" required />
        </div>
        <MultiLangTextarea label="Alt Başlık" values={form.subtitle} onChange={(v) => setForm({ ...form, subtitle: v })} rows={2} />
        <MultiLangInput label="Buton Metni" values={form.button_text} onChange={(v) => setForm({ ...form, button_text: v })} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Buton Linki</label>
          <input type="text" value={form.button_link} onChange={(e) => setForm({ ...form, button_link: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm" />
        </div>
        <ImageUploader value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} folder="sliders" label="Slider Görseli" />
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 text-amber-700 rounded" />
          <span className="text-sm text-gray-700">Aktif</span>
        </label>
        <div className="flex gap-3">
          <SaveButton loading={loading} />
          <button type="button" onClick={() => router.back()} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">İptal</button>
        </div>
      </form>
    </div>
  )
}
