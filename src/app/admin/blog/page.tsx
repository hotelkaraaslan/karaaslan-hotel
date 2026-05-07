'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getBlogPostsAdmin, deleteBlogPost, updateBlogPost } from '@/lib/admin-queries'
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  cover_image: string
  published_at: string
  is_active: boolean
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    setPosts(await getBlogPostsAdmin())
    setLoading(false)
  }

  async function handleDelete() {
    if (!deleteId) return
    await deleteBlogPost(deleteId)
    setDeleteId(null)
    load()
  }

  async function toggleActive(post: BlogPost) {
    await updateBlogPost(post.id, { is_active: !post.is_active })
    load()
  }

  if (loading) return <div className="text-gray-500">Yükleniyor...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Yazıları</h1>
          <p className="text-sm text-gray-500 mt-1">{posts.length} yazı</p>
        </div>
        <Link href="/admin/blog/new" className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-sm font-medium">
          + Yeni Yazı
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kapak</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başlık</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {post.cover_image ? (
                    <img src={post.cover_image} alt="" className="h-12 w-20 object-cover rounded" />
                  ) : (
                    <div className="h-12 w-20 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">Yok</div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">{post.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">/blog/{post.slug}</p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {new Date(post.published_at).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleActive(post)} className={`inline-block px-2 py-1 text-xs rounded-full cursor-pointer ${post.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {post.is_active ? 'Yayında' : 'Taslak'}
                  </button>
                </td>
                <td className="px-4 py-3 text-right flex items-center justify-end gap-3">
                  <a href={`/blog/${post.slug}`} target="_blank" className="text-gray-400 hover:text-gray-600 text-sm">Görüntüle</a>
                  <Link href={`/admin/blog/${post.id}`} className="text-amber-700 hover:text-amber-800 text-sm">Düzenle</Link>
                  <button onClick={() => setDeleteId(post.id)} className="text-red-500 hover:text-red-600 text-sm">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <p className="text-center py-12 text-gray-500 text-sm">Henüz blog yazısı eklenmemiş.</p>}
      </div>

      <DeleteConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} />
    </div>
  )
}
