'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getVenuesAdmin, deleteVenue, reorderItems } from '@/lib/admin-queries'
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog'

export default function VenuesPage() {
  const [venues, setVenues] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => { load() }, [])
  async function load() { setLoading(true); setVenues(await getVenuesAdmin()); setLoading(false) }
  async function handleDelete() { if (!deleteId) return; await deleteVenue(deleteId); setDeleteId(null); load() }
  async function moveItem(index: number, dir: 'up' | 'down') {
    const items = [...venues]; const si = dir === 'up' ? index - 1 : index + 1
    if (si < 0 || si >= items.length) return
    ;[items[index], items[si]] = [items[si], items[index]]; setVenues(items)
    await reorderItems('venues', items.map((item, i) => ({ id: item.id, display_order: i })))
  }

  if (loading) return <div className="text-gray-500">Yükleniyor...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mekanlar</h1>
        <Link href="/admin/venues/new" className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-sm font-medium">Yeni Mekan Ekle</Link>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b"><tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sıra</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Görsel</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başlık</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
          </tr></thead>
          <tbody className="divide-y">
            {venues.map((v, i) => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="px-4 py-3"><div className="flex gap-1">
                  <button onClick={() => moveItem(i, 'up')} disabled={i === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">&#9650;</button>
                  <button onClick={() => moveItem(i, 'down')} disabled={i === venues.length - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">&#9660;</button>
                </div></td>
                <td className="px-4 py-3">{v.image_url && <img src={v.image_url} alt="" className="w-20 h-12 object-cover rounded" />}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{v.title}</td>
                <td className="px-4 py-3"><span className={`inline-block px-2 py-1 text-xs rounded-full ${v.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{v.is_active ? 'Aktif' : 'Pasif'}</span></td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/venues/${v.id}`} className="text-amber-700 hover:text-amber-800 text-sm mr-3">Düzenle</Link>
                  <button onClick={() => setDeleteId(v.id)} className="text-red-500 hover:text-red-600 text-sm">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {venues.length === 0 && <p className="text-center py-8 text-gray-500 text-sm">Henüz mekan eklenmemiş.</p>}
      </div>
      <DeleteConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} />
    </div>
  )
}
