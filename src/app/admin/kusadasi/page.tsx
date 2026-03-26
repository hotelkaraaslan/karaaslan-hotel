'use client'

import { useEffect, useState } from 'react'
import { getSettingsAdmin, updateSettings } from '@/lib/admin-queries'
import MultiLangTextarea from '@/components/admin/MultiLangTextarea'
import ImageUploader from '@/components/admin/ImageUploader'
import SaveButton from '@/components/admin/SaveButton'

export default function KusadasiEditorPage() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [settingsId, setSettingsId] = useState('')
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    kusadasi_text: { tr: '', en: '', de: '' },
    kusadasi_image: '',
  })

  useEffect(() => {
    async function load() {
      const d = await getSettingsAdmin()
      setSettingsId(d.id)
      setForm({
        kusadasi_text: { tr: d.kusadasi_text || '', en: d.kusadasi_text_en || '', de: d.kusadasi_text_de || '' },
        kusadasi_image: d.kusadasi_image || '',
      })
      setFetching(false)
    }
    load()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    await updateSettings(settingsId, {
      kusadasi_text: form.kusadasi_text.tr, kusadasi_text_en: form.kusadasi_text.en, kusadasi_text_de: form.kusadasi_text.de,
      kusadasi_image: form.kusadasi_image,
    })
    setLoading(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (fetching) return <div className="text-gray-500">Yükleniyor...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Kuşadası Sayfası</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 max-w-3xl space-y-5">
        <MultiLangTextarea label="Kuşadası Tanıtım Metni" values={form.kusadasi_text} onChange={(v) => setForm({ ...form, kusadasi_text: v })} rows={8} />
        <ImageUploader value={form.kusadasi_image} onChange={(v) => setForm({ ...form, kusadasi_image: v })} folder="settings" label="Kuşadası Görseli" />
        <div className="flex items-center gap-3">
          <SaveButton loading={loading} />
          {saved && <span className="text-sm text-green-600">Kaydedildi!</span>}
        </div>
      </form>
    </div>
  )
}
