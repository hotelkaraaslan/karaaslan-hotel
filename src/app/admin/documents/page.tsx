'use client'

import { useEffect, useState, useRef } from 'react'
import { createBrowserSupabase } from '@/lib/supabase-browser'
import MultiLangInput from '@/components/admin/MultiLangInput'
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog'

interface Document {
  id: string
  title: string
  title_en: string
  title_de: string
  file_url: string
  display_order: number
  is_active: boolean
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<Document | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newDoc, setNewDoc] = useState({ title: { tr: '', en: '', de: '' }, file_url: '' })
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const editFileRef = useRef<HTMLInputElement>(null)
  const supabase = createBrowserSupabase()

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('documents').select('*').order('display_order')
    setDocs(data ?? [])
    setLoading(false)
  }

  async function uploadFile(file: File): Promise<string> {
    const fileName = `documents/${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('images').upload(fileName, file)
    if (error) throw error
    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName)
    return publicUrl
  }

  async function handleAddFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadFile(file)
      setNewDoc({ ...newDoc, file_url: url })
    } catch (err: any) { alert('Yükleme hatası: ' + (err?.message || JSON.stringify(err))) }
    setUploading(false)
  }

  async function handleAdd() {
    await supabase.from('documents').insert({
      title: newDoc.title.tr, title_en: newDoc.title.en, title_de: newDoc.title.de,
      file_url: newDoc.file_url, display_order: docs.length, is_active: true,
    })
    setNewDoc({ title: { tr: '', en: '', de: '' }, file_url: '' })
    setShowAdd(false)
    load()
  }

  async function handleEditFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !editItem) return
    setUploading(true)
    try {
      const url = await uploadFile(file)
      setEditItem({ ...editItem, file_url: url })
    } catch (err: any) { alert('Yükleme hatası: ' + (err?.message || JSON.stringify(err))) }
    setUploading(false)
  }

  async function handleEditSave() {
    if (!editItem) return
    await supabase.from('documents').update({
      title: editItem.title, title_en: editItem.title_en, title_de: editItem.title_de,
      file_url: editItem.file_url, is_active: editItem.is_active,
    }).eq('id', editItem.id)
    setEditItem(null)
    load()
  }

  async function handleDelete() {
    if (!deleteId) return
    await supabase.from('documents').delete().eq('id', deleteId)
    setDeleteId(null)
    load()
  }

  async function toggleActive(doc: Document) {
    await supabase.from('documents').update({ is_active: !doc.is_active }).eq('id', doc.id)
    load()
  }

  async function moveItem(index: number, dir: 'up' | 'down') {
    const items = [...docs]
    const si = dir === 'up' ? index - 1 : index + 1
    if (si < 0 || si >= items.length) return
    ;[items[index], items[si]] = [items[si], items[index]]
    setDocs(items)
    for (let i = 0; i < items.length; i++) {
      await supabase.from('documents').update({ display_order: i }).eq('id', items[i].id)
    }
  }

  if (loading) return <div className="text-gray-500">Yükleniyor...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dökümanlar</h1>
          <p className="text-sm text-gray-500 mt-1">KVKK, gizlilik politikası ve diğer PDF dökümanlar</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-sm font-medium">Yeni Döküman Ekle</button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sıra</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başlık</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dosya</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {docs.map((doc, i) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => moveItem(i, 'up')} disabled={i === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">&#9650;</button>
                    <button onClick={() => moveItem(i, 'down')} disabled={i === docs.length - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">&#9660;</button>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{doc.title}</td>
                <td className="px-4 py-3">
                  {doc.file_url ? (
                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-800 text-sm">PDF Görüntüle</a>
                  ) : (
                    <span className="text-xs text-red-500">Dosya yüklenmemiş</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleActive(doc)} className={`inline-block px-2 py-1 text-xs rounded-full cursor-pointer ${doc.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {doc.is_active ? 'Aktif' : 'Pasif'}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditItem({ ...doc })} className="text-amber-700 hover:text-amber-800 text-sm mr-3">Düzenle</button>
                  <button onClick={() => setDeleteId(doc.id)} className="text-red-500 hover:text-red-600 text-sm">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {docs.length === 0 && <p className="text-center py-8 text-gray-500 text-sm">Henüz döküman eklenmemiş.</p>}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">Yeni Döküman</h3>
            <MultiLangInput label="Başlık" values={newDoc.title} onChange={(v) => setNewDoc({ ...newDoc, title: v })} required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PDF Dosyası</label>
              {newDoc.file_url ? (
                <div className="flex items-center gap-3">
                  <a href={newDoc.file_url} target="_blank" className="text-sm text-amber-700">Yüklendi</a>
                  <button type="button" onClick={() => setNewDoc({ ...newDoc, file_url: '' })} className="text-xs text-red-500">Kaldır</button>
                </div>
              ) : (
                <>
                  <input ref={fileRef} type="file" accept=".pdf" onChange={handleAddFileUpload} className="hidden" />
                  <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm disabled:opacity-50">
                    {uploading ? 'Yükleniyor...' : 'PDF Yükle'}
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={handleAdd} disabled={!newDoc.title.tr || !newDoc.file_url} className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-sm font-medium disabled:opacity-50">Ekle</button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">İptal</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setEditItem(null)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">Döküman Düzenle</h3>
            <MultiLangInput label="Başlık"
              values={{ tr: editItem.title || '', en: editItem.title_en || '', de: editItem.title_de || '' }}
              onChange={(v) => setEditItem({ ...editItem, title: v.tr, title_en: v.en, title_de: v.de })} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PDF Dosyası</label>
              {editItem.file_url ? (
                <div className="flex items-center gap-3">
                  <a href={editItem.file_url} target="_blank" className="text-sm text-amber-700">Mevcut Dosya</a>
                  <input ref={editFileRef} type="file" accept=".pdf" onChange={handleEditFileUpload} className="hidden" />
                  <button type="button" onClick={() => editFileRef.current?.click()} disabled={uploading} className="text-xs text-gray-500 hover:text-gray-700">
                    {uploading ? 'Yükleniyor...' : 'Değiştir'}
                  </button>
                </div>
              ) : (
                <>
                  <input ref={editFileRef} type="file" accept=".pdf" onChange={handleEditFileUpload} className="hidden" />
                  <button type="button" onClick={() => editFileRef.current?.click()} disabled={uploading} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm disabled:opacity-50">
                    {uploading ? 'Yükleniyor...' : 'PDF Yükle'}
                  </button>
                </>
              )}
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={editItem.is_active} onChange={(e) => setEditItem({ ...editItem, is_active: e.target.checked })} className="w-4 h-4 text-amber-700 rounded" />
              <span className="text-sm text-gray-700">Aktif</span>
            </label>
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
