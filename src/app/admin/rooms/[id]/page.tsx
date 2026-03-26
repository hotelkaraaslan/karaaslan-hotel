'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getRoomById, updateRoom } from '@/lib/admin-queries'
import MultiLangInput from '@/components/admin/MultiLangInput'
import MultiLangTextarea from '@/components/admin/MultiLangTextarea'
import ImageUploader from '@/components/admin/ImageUploader'
import MultiImageUploader from '@/components/admin/MultiImageUploader'
import SaveButton from '@/components/admin/SaveButton'

export default function EditRoomPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [form, setForm] = useState({
    title: { tr: '', en: '', de: '' },
    slug: '',
    description: { tr: '', en: '', de: '' },
    short_description: { tr: '', en: '', de: '' },
    view_type: { tr: '', en: '', de: '' },
    features: { tr: '', en: '', de: '' },
    image_url: '',
    gallery_images: [] as string[],
    room_count: 1,
    capacity: 2,
    size_m2: '' as string | number,
    is_active: true,
  })

  useEffect(() => {
    async function load() {
      const d = await getRoomById(params.id as string)
      setForm({
        title: { tr: d.title || '', en: d.title_en || '', de: d.title_de || '' },
        slug: d.slug || '',
        description: { tr: d.description || '', en: d.description_en || '', de: d.description_de || '' },
        short_description: { tr: d.short_description || '', en: d.short_description_en || '', de: d.short_description_de || '' },
        view_type: { tr: d.view_type || '', en: d.view_type_en || '', de: d.view_type_de || '' },
        features: { tr: (d.features || []).join(', '), en: (d.features_en || []).join(', '), de: (d.features_de || []).join(', ') },
        image_url: d.image_url || '',
        gallery_images: d.gallery_images || [],
        room_count: d.room_count || 1,
        capacity: d.capacity || 2,
        size_m2: d.size_m2 || '',
        is_active: d.is_active,
      })
      setFetching(false)
    }
    load()
  }, [params.id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await updateRoom(params.id as string, {
      title: form.title.tr, title_en: form.title.en, title_de: form.title.de,
      slug: form.slug,
      description: form.description.tr, description_en: form.description.en, description_de: form.description.de,
      short_description: form.short_description.tr, short_description_en: form.short_description.en, short_description_de: form.short_description.de,
      view_type: form.view_type.tr, view_type_en: form.view_type.en, view_type_de: form.view_type.de,
      features: form.features.tr.split(',').map(s => s.trim()).filter(Boolean),
      features_en: form.features.en.split(',').map(s => s.trim()).filter(Boolean),
      features_de: form.features.de.split(',').map(s => s.trim()).filter(Boolean),
      image_url: form.image_url,
      gallery_images: form.gallery_images,
      room_count: form.room_count,
      capacity: form.capacity,
      size_m2: form.size_m2 ? Number(form.size_m2) : null,
      is_active: form.is_active,
    })
    router.push('/admin/rooms')
  }

  if (fetching) return <div className="text-gray-500">Yükleniyor...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Oda Düzenle</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 max-w-3xl space-y-5">
        <MultiLangInput label="Oda Adı" values={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
          <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
        <MultiLangTextarea label="Açıklama" values={form.description} onChange={(v) => setForm({ ...form, description: v })} />
        <MultiLangTextarea label="Kısa Açıklama" values={form.short_description} onChange={(v) => setForm({ ...form, short_description: v })} rows={2} />
        <MultiLangInput label="Manzara Tipi" values={form.view_type} onChange={(v) => setForm({ ...form, view_type: v })} />
        <MultiLangInput label="Özellikler (virgülle ayırın)" values={form.features} onChange={(v) => setForm({ ...form, features: v })} />
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Oda Sayısı</label>
            <input type="number" value={form.room_count} onChange={(e) => setForm({ ...form, room_count: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kapasite</label>
            <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alan (m2)</label>
            <input type="number" value={form.size_m2} onChange={(e) => setForm({ ...form, size_m2: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
        </div>
        <ImageUploader value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} folder="rooms" label="Ana Görsel" />
        <MultiImageUploader values={form.gallery_images} onChange={(v) => setForm({ ...form, gallery_images: v })} folder="rooms" />
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
