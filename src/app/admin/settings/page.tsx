'use client'

import { useEffect, useState } from 'react'
import { getSettingsAdmin, updateSettings } from '@/lib/admin-queries'
import SaveButton from '@/components/admin/SaveButton'

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [settingsId, setSettingsId] = useState('')
  const [form, setForm] = useState({
    hotel_name: '', hotel_subtitle: '', address: '', phone: '', email: '',
    reservation_url: '', facebook_url: '', instagram_url: '', twitter_url: '',
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      const d = await getSettingsAdmin()
      setSettingsId(d.id)
      setForm({
        hotel_name: d.hotel_name || '', hotel_subtitle: d.hotel_subtitle || '',
        address: d.address || '', phone: d.phone || '', email: d.email || '',
        reservation_url: d.reservation_url || '',
        facebook_url: d.facebook_url || '', instagram_url: d.instagram_url || '', twitter_url: d.twitter_url || '',
      })
      setFetching(false)
    }
    load()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true)
    await updateSettings(settingsId, form)
    setLoading(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (fetching) return <div className="text-gray-500">Yükleniyor...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Genel Ayarlar</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 max-w-3xl space-y-5">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Otel Bilgileri</h2>
        {[
          { label: 'Otel Adı', key: 'hotel_name' },
          { label: 'Alt Başlık', key: 'hotel_subtitle' },
          { label: 'Adres', key: 'address' },
          { label: 'Telefon', key: 'phone' },
          { label: 'E-posta', key: 'email' },
        ].map(({ label, key }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input type="text" value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
        ))}

        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 pt-4">Rezervasyon & Sosyal Medya</h2>
        {[
          { label: 'Rezervasyon URL', key: 'reservation_url' },
          { label: 'Facebook URL', key: 'facebook_url' },
          { label: 'Instagram URL', key: 'instagram_url' },
          { label: 'Twitter / X URL', key: 'twitter_url' },
        ].map(({ label, key }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input type="text" value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
        ))}

        <div className="flex items-center gap-3">
          <SaveButton loading={loading} />
          {saved && <span className="text-sm text-green-600">Kaydedildi!</span>}
        </div>
      </form>
    </div>
  )
}
