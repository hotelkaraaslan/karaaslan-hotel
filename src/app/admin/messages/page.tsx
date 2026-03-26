'use client'

import { useEffect, useState } from 'react'
import { createBrowserSupabase } from '@/lib/supabase-browser'
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog'

interface Message {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Message | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const supabase = createBrowserSupabase()

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
    setMessages(data ?? [])
    setLoading(false)
  }

  async function markAsRead(msg: Message) {
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', msg.id)
    setSelected({ ...msg, is_read: true })
    setMessages(messages.map(m => m.id === msg.id ? { ...m, is_read: true } : m))
  }

  async function handleDelete() {
    if (!deleteId) return
    await supabase.from('contact_messages').delete().eq('id', deleteId)
    setDeleteId(null)
    if (selected?.id === deleteId) setSelected(null)
    load()
  }

  const unreadCount = messages.filter(m => !m.is_read).length

  if (loading) return <div className="text-gray-500">Yükleniyor...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mesajlar</h1>
          {unreadCount > 0 && <p className="text-sm text-amber-700 mt-1">{unreadCount} okunmamış mesaj</p>}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Messages List */}
        <div className="w-96 shrink-0 space-y-2 max-h-[70vh] overflow-y-auto">
          {messages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => { setSelected(msg); if (!msg.is_read) markAsRead(msg) }}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selected?.id === msg.id
                  ? 'border-amber-400 bg-amber-50'
                  : msg.is_read
                  ? 'border-gray-200 bg-white hover:border-gray-300'
                  : 'border-amber-200 bg-amber-50/50 hover:border-amber-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {!msg.is_read && <span className="w-2 h-2 bg-amber-500 rounded-full" />}
                  <span className={`text-sm ${msg.is_read ? 'text-gray-700' : 'font-semibold text-gray-900'}`}>{msg.name}</span>
                </div>
                <span className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleDateString('tr-TR')}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">{msg.subject || msg.message.substring(0, 50)}</p>
            </button>
          ))}
          {messages.length === 0 && <p className="text-center py-12 text-gray-500 text-sm">Henüz mesaj yok.</p>}
        </div>

        {/* Message Detail */}
        <div className="flex-1">
          {selected ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{selected.name}</h2>
                  <div className="flex items-center gap-4 mt-1">
                    <a href={`mailto:${selected.email}`} className="text-sm text-amber-700 hover:underline">{selected.email}</a>
                    {selected.phone && <span className="text-sm text-gray-500">{selected.phone}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {new Date(selected.created_at).toLocaleString('tr-TR')}
                  </span>
                  <button onClick={() => setDeleteId(selected.id)} className="text-red-500 hover:text-red-600 text-sm ml-2">Sil</button>
                </div>
              </div>

              {selected.subject && (
                <div className="mb-4">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Konu</span>
                  <p className="text-sm text-gray-900 mt-1">{selected.subject}</p>
                </div>
              )}

              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Mesaj</span>
                <p className="text-sm text-gray-700 mt-1 leading-7 whitespace-pre-wrap">{selected.message}</p>
              </div>

              <div className="mt-6 pt-4 border-t">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'İletişim Formu'}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  E-posta ile Yanıtla
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
              Okumak istediğiniz mesajı sol listeden seçin.
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} />
    </div>
  )
}
