'use client'

import { useEffect, useState } from 'react'
import { getTrackingCodesAdmin, createTrackingCode, updateTrackingCode, deleteTrackingCode } from '@/lib/admin-queries'
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog'

const codeTypes = [
  { value: 'gtm', label: 'Google Tag Manager', placeholder: 'GTM-XXXXXXX' },
  { value: 'ga4', label: 'Google Analytics 4', placeholder: 'G-XXXXXXXXXX' },
  { value: 'google_ads', label: 'Google Ads', placeholder: 'AW-XXXXXXXXX' },
  { value: 'facebook_pixel', label: 'Facebook Pixel', placeholder: 'Pixel ID' },
  { value: 'custom_head', label: 'Özel Kod (Head)', placeholder: '<script>...</script>' },
  { value: 'custom_body', label: 'Özel Kod (Body)', placeholder: '<script>...</script>' },
]

export default function TrackingPage() {
  const [codes, setCodes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [editItem, setEditItem] = useState<any | null>(null)
  const [newCode, setNewCode] = useState({ name: '', code_type: 'gtm', code_value: '', is_active: true })

  useEffect(() => { load() }, [])
  async function load() { setLoading(true); setCodes(await getTrackingCodesAdmin()); setLoading(false) }

  async function handleAdd() {
    await createTrackingCode(newCode)
    setNewCode({ name: '', code_type: 'gtm', code_value: '', is_active: true })
    setShowAdd(false)
    load()
  }

  async function handleEditSave() {
    if (!editItem) return
    await updateTrackingCode(editItem.id, { name: editItem.name, code_type: editItem.code_type, code_value: editItem.code_value, is_active: editItem.is_active })
    setEditItem(null)
    load()
  }

  async function handleDelete() {
    if (!deleteId) return
    await deleteTrackingCode(deleteId)
    setDeleteId(null)
    load()
  }

  async function toggleActive(item: any) {
    await updateTrackingCode(item.id, { is_active: !item.is_active })
    load()
  }

  if (loading) return <div className="text-gray-500">Yükleniyor...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tracking Kodları</h1>
          <p className="text-sm text-gray-500 mt-1">Google Ads, Analytics, Tag Manager ve özel scriptler</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-sm font-medium">Yeni Kod Ekle</button>
      </div>

      <div className="space-y-3">
        {codes.map((code) => (
          <div key={code.id} className={`bg-white rounded-xl border p-4 flex items-center justify-between ${code.is_active ? 'border-gray-200' : 'border-gray-200 opacity-60'}`}>
            <div className="flex items-center gap-4">
              <button onClick={() => toggleActive(code)} className={`w-10 h-6 rounded-full transition-colors relative ${code.is_active ? 'bg-green-500' : 'bg-gray-300'}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${code.is_active ? 'right-1' : 'left-1'}`} />
              </button>
              <div>
                <p className="font-medium text-gray-900 text-sm">{code.name}</p>
                <p className="text-xs text-gray-500">{codeTypes.find(t => t.value === code.code_type)?.label} &middot; <code className="bg-gray-100 px-1 rounded">{code.code_value.substring(0, 40)}{code.code_value.length > 40 ? '...' : ''}</code></p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditItem({ ...code })} className="text-amber-700 hover:text-amber-800 text-sm">Düzenle</button>
              <button onClick={() => setDeleteId(code.id)} className="text-red-500 hover:text-red-600 text-sm">Sil</button>
            </div>
          </div>
        ))}
        {codes.length === 0 && <p className="text-center py-12 text-gray-500">Henüz tracking kodu eklenmemiş.</p>}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">Yeni Tracking Kodu</h3>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
              <input type="text" value={newCode.name} onChange={(e) => setNewCode({ ...newCode, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500" placeholder="Örn: Google Analytics" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Tip</label>
              <select value={newCode.code_type} onChange={(e) => setNewCode({ ...newCode, code_type: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500">
                {codeTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Kod / ID</label>
              {newCode.code_type.startsWith('custom') ? (
                <textarea value={newCode.code_value} onChange={(e) => setNewCode({ ...newCode, code_value: e.target.value })} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500 font-mono" placeholder={codeTypes.find(t => t.value === newCode.code_type)?.placeholder} />
              ) : (
                <input type="text" value={newCode.code_value} onChange={(e) => setNewCode({ ...newCode, code_value: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500 font-mono" placeholder={codeTypes.find(t => t.value === newCode.code_type)?.placeholder} />
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={handleAdd} className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-sm font-medium">Ekle</button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">İptal</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setEditItem(null)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">Tracking Kodu Düzenle</h3>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
              <input type="text" value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Tip</label>
              <select value={editItem.code_type} onChange={(e) => setEditItem({ ...editItem, code_type: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500">
                {codeTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Kod / ID</label>
              {editItem.code_type.startsWith('custom') ? (
                <textarea value={editItem.code_value} onChange={(e) => setEditItem({ ...editItem, code_value: e.target.value })} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500 font-mono" />
              ) : (
                <input type="text" value={editItem.code_value} onChange={(e) => setEditItem({ ...editItem, code_value: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500 font-mono" />
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={handleEditSave} className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-sm font-medium">Kaydet</button>
              <button onClick={() => setEditItem(null)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">İptal</button>
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} />
    </div>
  )
}
