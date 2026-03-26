'use client'

import { useEffect, useState, useRef } from 'react'
import { getGalleryAdmin, createGalleryImage, updateGalleryImage, deleteGalleryImage, reorderItems } from '@/lib/admin-queries'
import { createBrowserSupabase } from '@/lib/supabase-browser'
import MultiLangInput from '@/components/admin/MultiLangInput'
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog'

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<any | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const supabase = createBrowserSupabase()

  useEffect(() => { load() }, [])
  async function load() { setLoading(true); setImages(await getGalleryAdmin()); setLoading(false) }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop()
      const fileName = `gallery/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`
      const { error } = await supabase.storage.from('images').upload(fileName, file)
      if (!error) {
        const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName)
        await createGalleryImage({ image_url: publicUrl, title: '', category: 'genel', display_order: images.length, is_active: true })
      }
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
    load()
  }

  async function handleDelete() {
    if (!deleteId) return
    await deleteGalleryImage(deleteId)
    setDeleteId(null)
    load()
  }

  async function handleEditSave() {
    if (!editItem) return
    await updateGalleryImage(editItem.id, {
      title: editItem.title, title_en: editItem.title_en, title_de: editItem.title_de,
      category: editItem.category, is_active: editItem.is_active,
    })
    setEditItem(null)
    load()
  }

  if (loading) return <div className="text-gray-500">Yükleniyor...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Galeri</h1>
        <div>
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
          <button onClick={() => fileRef.current?.click()} disabled={uploading} className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-sm font-medium disabled:opacity-50">
            {uploading ? 'Yükleniyor...' : 'Görsel Yükle'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className={`relative group rounded-xl overflow-hidden border ${img.is_active ? 'border-gray-200' : 'border-red-200 opacity-60'}`}>
            <img src={img.image_url} alt="" className="w-full aspect-video object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button onClick={() => setEditItem({ ...img })} className="px-3 py-1.5 bg-white rounded-lg text-xs font-medium">Düzenle</button>
              <button onClick={() => setDeleteId(img.id)} className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium">Sil</button>
            </div>
            <div className="p-2">
              <p className="text-xs text-gray-700 truncate">{img.title || 'Başlıksız'}</p>
              <p className="text-xs text-gray-400">{img.category}</p>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && <p className="text-center py-12 text-gray-500">Henüz görsel eklenmemiş.</p>}

      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setEditItem(null)}>
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">Görsel Düzenle</h3>
            <MultiLangInput label="Başlık" values={{ tr: editItem.title || '', en: editItem.title_en || '', de: editItem.title_de || '' }}
              onChange={(v) => setEditItem({ ...editItem, title: v.tr, title_en: v.en, title_de: v.de })} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select value={editItem.category} onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500">
                <option value="genel">Genel</option>
                <option value="odalar">Odalar</option>
                <option value="restoran">Restoran</option>
                <option value="havuz">Havuz</option>
                <option value="lobi">Lobi</option>
                <option value="dis-mekan">Dış Mekan</option>
              </select>
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
