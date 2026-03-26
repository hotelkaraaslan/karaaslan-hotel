'use client'

interface Props {
  loading: boolean
  text?: string
  loadingText?: string
}

export default function SaveButton({ loading, text = 'Kaydet', loadingText = 'Kaydediliyor...' }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-medium transition-colors disabled:opacity-50 text-sm"
    >
      {loading ? loadingText : text}
    </button>
  )
}
