'use client'

import { useState, useRef } from 'react'
import { createBrowserSupabase } from '@/lib/supabase-browser'

interface Props {
  value: string
  onChange: (url: string) => void
  folder?: string
  label?: string
}

export default function ImageUploader({ value, onChange, folder = 'general', label = 'Görsel' }: Props) {
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const supabase = createBrowserSupabase()

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const ext = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`

    const { error } = await supabase.storage
      .from('images')
      .upload(fileName, file)

    if (error) {
      alert('Yükleme hatası: ' + error.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(fileName)

    onChange(publicUrl)
    setUploading(false)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-start gap-4">
        {value && (
          <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-gray-200">
            <img src={value} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
            >
              x
            </button>
          </div>
        )}
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            {uploading ? 'Yükleniyor...' : value ? 'Değiştir' : 'Görsel Yükle'}
          </button>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP</p>
        </div>
      </div>
    </div>
  )
}
