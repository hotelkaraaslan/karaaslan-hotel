'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getVenueById, updateVenue } from '@/lib/admin-queries'
import MultiLangInput from '@/components/admin/MultiLangInput'
import MultiLangTextarea from '@/components/admin/MultiLangTextarea'
import ImageUploader from '@/components/admin/ImageUploader'
import MultiImageUploader from '@/components/admin/MultiImageUploader'
import SaveButton from '@/components/admin/SaveButton'

export default function EditVenuePage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [form, setForm] = useState({
    title: { tr: '', en: '', de: '' }, slug: '',
    description: { tr: '', en: '', de: '' }, short_description: { tr: '', en: '', de: '' },
    image_url: '', gallery_images: [] as string[], is_active: true,
  })

  useEffect(() => {
    async function load() {
      const d = await getVenueById(params.id as string)
      setForm({
        title: { tr: d.title || '', en: d.title_en || '', de: d.title_de || '' }, slug: d.slug || '',
        description: { tr: d.description || '', en: d.description_en || '', de: d.description_de || '' },
        short_description: { tr: d.short_description || '', en: d.short_description_en || '', de: d.short_description_de || '' },
        image_url: d.image_url || '', gallery_images: d.gallery_images || [], is_active: d.is_active,
      })
      setFetching(false)
    }
    load()
  }, [params.id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    await updateVenue(params.id as string, {
      title: form.title.tr, title_en: form.title.en, title_de: form.title.de, slug: form.slug,
      description: form.description.tr, description_en: form.description.en, description_de: form.description.de,
      short_description: form.short_description.tr, short_description_en: form.short_description.en, short_description_de: form.short_description.de,
      image_url: form.image_url, gallery_images: form.gallery_images, is_active: form.is_active,
    })
    router.push('/admin/venues')
  }

  if (fetching) return <div className="text-gray-500">Yükleniyor...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Mekan Düzenle</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 max-w-3xl space-y-5">
        <MultiLangInput label="Mekan Adı" values={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
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
