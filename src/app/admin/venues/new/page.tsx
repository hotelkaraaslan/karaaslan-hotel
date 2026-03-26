'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createVenue } from '@/lib/admin-queries'
import MultiLangInput from '@/components/admin/MultiLangInput'
import MultiLangTextarea from '@/components/admin/MultiLangTextarea'
import ImageUploader from '@/components/admin/ImageUploader'
import MultiImageUploader from '@/components/admin/MultiImageUploader'
import SaveButton from '@/components/admin/SaveButton'

function generateSlug(t: string) { return t.toLowerCase().replace(/[ğ]/g,'g').replace(/[ü]/g,'u').replace(/[ş]/g,'s').replace(/[ı]/g,'i').replace(/[ö]/g,'o').replace(/[ç]/g,'c').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') }

export default function NewVenuePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: { tr: '', en: '', de: '' }, slug: '',
    description: { tr: '', en: '', de: '' }, short_description: { tr: '', en: '', de: '' },
    image_url: '', gallery_images: [] as string[], is_active: true,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    await createVenue({
      title: form.title.tr, title_en: form.title.en, title_de: form.title.de,
      slug: form.slug || generateSlug(form.title.tr),
      description: form.description.tr, description_en: form.description.en, description_de: form.description.de,
      short_description: form.short_description.tr, short_description_en: form.short_description.en, short_description_de: form.short_description.de,
      image_url: form.image_url, gallery_images: form.gallery_images, is_active: form.is_active,
    })
    router.push('/admin/venues')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Yeni Mekan</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 max-w-3xl space-y-5">
        <MultiLangInput label="Mekan Adı" values={form.title} onChange={(v) => setForm({ ...form, title: v, slug: generateSlug(v.tr) })} required />
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Slug</label><input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500" /></div>
        <MultiLangTextarea label="Açıklama" values={form.description} onChange={(v) => setForm({ ...form, description: v })} />
        <MultiLangTextarea label="Kısa Açıklama" values={form.short_description} onChange={(v) => setForm({ ...form, short_description: v })} rows={2} />
        <ImageUploader value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} folder="venues" label="Ana Görsel" />
        <MultiImageUploader values={form.gallery_images} onChange={(v) => setForm({ ...form, gallery_images: v })} folder="venues" />
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 text-amber-700 rounded" /><span className="text-sm text-gray-700">Aktif</span></label>
        <div className="flex gap-3"><SaveButton loading={loading} /><button type="button" onClick={() => router.back()} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">İptal</button></div>
      </form>
    </div>
  )
}
