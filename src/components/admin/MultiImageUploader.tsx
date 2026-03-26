'use client'

import { useState, useRef } from 'react'
import { createBrowserSupabase } from '@/lib/supabase-browser'

interface Props {
  values: string[]
  onChange: (urls: string[]) => void
  folder?: string
  label?: string
}

export default function MultiImageUploader({ values, onChange, folder = 'general', label = 'Galeri Görselleri' }: Props) {
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const supabase = createBrowserSupabase()

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const newUrls: string[] = []

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop()
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`

      const { error } = await supabase.storage
        .from('images')
        .upload(fileName, file)

      if (!error) {
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(fileName)
        newUrls.push(publicUrl)
      }
    }

    onChange([...values, ...newUrls])
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  function removeImage(index: number) {
    onChange(values.filter((_, i) => i !== index))
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="grid grid-cols-4 gap-3 mb-3">
        {values.map((url, i) => (
          <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
            >
              x
            </button>
          </div>
        ))}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors disabled:opacity-50"
      >
        {uploading ? 'Yükleniyor...' : 'Görsel Ekle'}
      </button>
    </div>
  )
}
