'use client'

import { useEffect, useState } from 'react'
import { getSettingsAdmin, updateSettings } from '@/lib/admin-queries'
import MultiLangInput from '@/components/admin/MultiLangInput'
import MultiLangTextarea from '@/components/admin/MultiLangTextarea'
import ImageUploader from '@/components/admin/ImageUploader'
import SaveButton from '@/components/admin/SaveButton'

export default function AboutEditorPage() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [settingsId, setSettingsId] = useState('')
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    about_title: { tr: '', en: '', de: '' },
    about_text: { tr: '', en: '', de: '' },
    about_image: '',
  })

  useEffect(() => {
    async function load() {
      const d = await getSettingsAdmin()
      setSettingsId(d.id)
      setForm({
        about_title: { tr: d.about_title || '', en: d.about_title_en || '', de: d.about_title_de || '' },
        about_text: { tr: d.about_text || '', en: d.about_text_en || '', de: d.about_text_de || '' },
        about_image: d.about_image || '',
      })
      setFetching(false)
    }
    load()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    await updateSettings(settingsId, {
      about_title: form.about_title.tr, about_title_en: form.about_title.en, about_title_de: form.about_title.de,
      about_text: form.about_text.tr, about_text_en: form.about_text.en, about_text_de: form.about_text.de,
      about_image: form.about_image,
    })
    setLoading(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (fetching) return <div className="text-gray-500">Yükleniyor...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Hakkımızda Sayfası</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 max-w-3xl space-y-5">
        <MultiLangInput label="Başlık" values={form.about_title} onChange={(v) => setForm({ ...form, about_title: v })} />
        <MultiLangTextarea label="İçerik" values={form.about_text} onChange={(v) => setForm({ ...form, about_text: v })} rows={8} />
        <ImageUploader value={form.about_image} onChange={(v) => setForm({ ...form, about_image: v })} folder="settings" label="Hakkımızda Görseli" />
        <div className="flex items-center gap-3">
          <SaveButton loading={loading} />
          {saved && <span className="text-sm text-green-600">Kaydedildi!</span>}
        </div>
      </form>
    </div>
  )
}
