'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPlace } from '@/lib/admin-queries'
import MultiLangInput from '@/components/admin/MultiLangInput'
import MultiLangTextarea from '@/components/admin/MultiLangTextarea'
import ImageUploader from '@/components/admin/ImageUploader'
import SaveButton from '@/components/admin/SaveButton'

export default function NewPlacePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: { tr: '', en: '', de: '' },
    description: { tr: '', en: '', de: '' },
    distance: { tr: '', en: '', de: '' },
    image_url: '', is_active: true,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    await createPlace({
      title: form.title.tr, title_en: form.title.en, title_de: form.title.de,
      description: form.description.tr, description_en: form.description.en, description_de: form.description.de,
      distance: form.distance.tr, distance_en: form.distance.en, distance_de: form.distance.de,
      image_url: form.image_url, is_active: form.is_active,
    })
    router.push('/admin/places')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Yeni Yer Ekle</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 max-w-3xl space-y-5">
        <MultiLangInput label="Yer Adı" values={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
        <MultiLangTextarea label="Açıklama" values={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={2} />
        <MultiLangInput label="Mesafe" values={form.distance} onChange={(v) => setForm({ ...form, distance: v })} />
        <ImageUploader value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} folder="places" />
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 text-amber-700 rounded" /><span className="text-sm text-gray-700">Aktif</span></label>
        <div className="flex gap-3"><SaveButton loading={loading} /><button type="button" onClick={() => router.back()} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">İptal</button></div>
      </form>
    </div>
  )
}
