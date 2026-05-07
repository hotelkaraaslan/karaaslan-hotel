'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { createBrowserSupabase } from '@/lib/supabase-browser'
import { createBlogPost, updateBlogPost } from '@/lib/admin-queries'

const TiptapEditor = dynamic(() => import('./TiptapEditor'), { ssr: false, loading: () => <div className="h-64 border border-gray-300 rounded-lg bg-gray-50 animate-pulse" /> })

interface BlogPost {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  is_active: boolean
  published_at: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function sanitizeFilename(name: string): string {
  return name
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[ğĞüÜşŞıİöÖçÇ]/g, (c) => ({ ğ:'g',Ğ:'G',ü:'u',Ü:'U',ş:'s',Ş:'S',ı:'i',İ:'I',ö:'o',Ö:'O',ç:'c',Ç:'C' }[c] || c))
    .replace(/[^a-zA-Z0-9._-]/g, '_')
}

export default function BlogForm({ initial }: { initial?: BlogPost }) {
  const router = useRouter()
  const supabase = createBrowserSupabase()
  const fileRef = useRef<HTMLInputElement>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [slugEdited, setSlugEdited] = useState(!!initial?.id)

  const [form, setForm] = useState<BlogPost>({
    title: initial?.title ?? '',
    slug: initial?.slug ?? '',
    excerpt: initial?.excerpt ?? '',
    content: initial?.content ?? '',
    cover_image: initial?.cover_image ?? '',
    is_active: initial?.is_active ?? true,
    published_at: initial?.published_at ? new Date(initial.published_at).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
  })

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, ...(!slugEdited ? { slug: slugify(title) } : {}) }))
  }

  const handleContentChange = useCallback((html: string) => {
    setForm((f) => ({ ...f, content: html }))
  }, [])

  async function uploadCover(file: File) {
    setUploading(true)
    try {
      const safe = sanitizeFilename(file.name)
      const path = `blog/${Date.now()}-${safe}`
      const { error } = await supabase.storage.from('images').upload(path, file)
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(path)
      setForm((f) => ({ ...f, cover_image: publicUrl }))
    } catch (err: any) { alert('Yükleme hatası: ' + (err?.message || JSON.stringify(err))) }
    setUploading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.slug) { alert('Başlık ve slug zorunludur.'); return }
    setSaving(true)
    try {
      const payload = { ...form, published_at: new Date(form.published_at).toISOString() }
      if (initial?.id) {
        await updateBlogPost(initial.id, payload)
      } else {
        await createBlogPost(payload)
      }
      router.push('/admin/blog')
    } catch (err: any) { alert('Kaydetme hatası: ' + (err?.message || JSON.stringify(err))) }
    setSaving(false)
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      {/* Başlık */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Temel Bilgiler</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Başlık *</label>
          <input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Blog yazısı başlığı" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">/blog/</span>
            <input value={form.slug} onChange={(e) => { setSlugEdited(true); setForm((f) => ({ ...f, slug: e.target.value })) }} required className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono" placeholder="blog-yazisi-basligi" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Özet (SEO açıklaması)</label>
          <textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Kısa bir özet... (arama motorlarında ve liste sayfasında görünür)" />
        </div>
        <div className="flex gap-4 flex-wrap">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Yayın Tarihi</label>
            <input type="date" value={form.published_at} onChange={(e) => setForm((f) => ({ ...f, published_at: e.target.value }))} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))} className="w-4 h-4 text-amber-700 rounded" />
              <span className="text-sm text-gray-700">Yayında (aktif)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Kapak Fotoğrafı */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Kapak Fotoğrafı</h2>
        {form.cover_image ? (
          <div className="flex items-start gap-4">
            <img src={form.cover_image} alt="Kapak" className="h-32 w-48 object-cover rounded-lg border border-gray-200" />
            <div className="space-y-2">
              <input ref={fileRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])} className="hidden" />
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="block px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded text-gray-700">{uploading ? 'Yükleniyor...' : 'Değiştir'}</button>
              <button type="button" onClick={() => setForm((f) => ({ ...f, cover_image: '' }))} className="block px-3 py-1.5 text-xs text-red-500 hover:text-red-600">Kaldır</button>
            </div>
          </div>
        ) : (
          <>
            <input ref={fileRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])} className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm disabled:opacity-50">
              {uploading ? 'Yükleniyor...' : '+ Kapak Fotoğrafı Yükle'}
            </button>
          </>
        )}
      </div>

      {/* İçerik */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">İçerik</h2>
        <TiptapEditor content={form.content} onChange={handleContentChange} />
      </div>

      {/* Kaydet */}
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {saving ? 'Kaydediliyor...' : initial?.id ? 'Güncelle' : 'Yayınla'}
        </button>
        <button type="button" onClick={() => router.push('/admin/blog')} className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm">İptal</button>
      </div>
    </form>
  )
}
