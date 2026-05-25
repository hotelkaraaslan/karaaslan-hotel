'use client'

import { useEffect, useState } from 'react'
import { getCorporateMessages, markCorporateAsRead, deleteCorporateMessage } from '@/lib/admin-queries'
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog'

interface CorporateMessage {
  id: string
  contact_name: string
  company_name: string
  phone: string
  email: string
  person_count: string
  check_in: string
  check_out: string
  invoice_type: string
  needs_meeting_room: boolean
  notes: string
  is_read: boolean
  created_at: string
}

export default function CorporatePage() {
  const [messages, setMessages] = useState<CorporateMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<CorporateMessage | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    setMessages(await getCorporateMessages())
    setLoading(false)
  }

  async function handleOpen(msg: CorporateMessage) {
    setSelected(msg)
    if (!msg.is_read) {
      await markCorporateAsRead(msg.id)
      setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, is_read: true } : m))
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    await deleteCorporateMessage(deleteId)
    setDeleteId(null)
    if (selected?.id === deleteId) setSelected(null)
    load()
  }

  const unread = messages.filter((m) => !m.is_read).length

  if (loading) return <div className="text-gray-500">Yükleniyor...</div>

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kurumsal Talepler</h1>
        <p className="text-sm text-gray-500 mt-1">
          {messages.length} talep{unread > 0 && <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">{unread} okunmamış</span>}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste */}
        <div className="lg:col-span-1 space-y-2">
          {messages.length === 0 && <p className="text-sm text-gray-400 py-8 text-center">Henüz talep yok.</p>}
          {messages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => handleOpen(msg)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id === msg.id ? 'border-amber-700 bg-amber-50' : 'border-gray-200 bg-white hover:border-amber-300'}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className={`text-sm truncate ${!msg.is_read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{msg.company_name}</p>
                  <p className="text-xs text-gray-500 truncate">{msg.contact_name}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(msg.created_at).toLocaleDateString('tr-TR')}</p>
                </div>
                {!msg.is_read && <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 flex-shrink-0" />}
              </div>
              {msg.person_count && <p className="text-xs text-gray-400 mt-1">{msg.person_count} kişi</p>}
            </button>
          ))}
        </div>

        {/* Detay */}
        <div className="lg:col-span-2">
          {!selected ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm">Detayları görmek için bir talep seçin</div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{selected.company_name}</h2>
                  <p className="text-sm text-gray-500">{new Date(selected.created_at).toLocaleString('tr-TR')}</p>
                </div>
                <button onClick={() => setDeleteId(selected.id)} className="text-red-400 hover:text-red-600 text-sm">Sil</button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Yetkili" value={selected.contact_name} />
                <Field label="Telefon" value={<a href={`tel:${selected.phone}`} className="text-amber-700 hover:underline">{selected.phone}</a>} />
                <Field label="E-posta" value={<a href={`mailto:${selected.email}`} className="text-amber-700 hover:underline">{selected.email}</a>} />
                <Field label="Kişi Sayısı" value={selected.person_count || '—'} />
                <Field label="Giriş Tarihi" value={selected.check_in || '—'} />
                <Field label="Çıkış Tarihi" value={selected.check_out || '—'} />
                <Field label="Fatura Türü" value={selected.invoice_type || '—'} />
                <Field label="Toplantı Salonu" value={selected.needs_meeting_room ? '✓ Gerekli' : 'Gerekmiyor'} />
              </div>

              {selected.notes && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Notlar / Özel İstekler</p>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 leading-6">{selected.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <a href={`tel:${selected.phone}`} className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-sm font-medium">Ara</a>
                <a href={`mailto:${selected.email}`} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm">E-posta Gönder</a>
              </div>
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} />
    </div>
  )
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm text-gray-800">{value}</p>
    </div>
  )
}
