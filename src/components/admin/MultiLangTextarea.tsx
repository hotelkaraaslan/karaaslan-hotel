'use client'

import { useState } from 'react'

interface Props {
  label: string
  values: { tr: string; en: string; de: string }
  onChange: (values: { tr: string; en: string; de: string }) => void
  rows?: number
  required?: boolean
}

const tabs = [
  { key: 'tr' as const, label: 'TR' },
  { key: 'en' as const, label: 'EN' },
  { key: 'de' as const, label: 'DE' },
]

export default function MultiLangTextarea({ label, values, onChange, rows = 4, required }: Props) {
  const [activeTab, setActiveTab] = useState<'tr' | 'en' | 'de'>('tr')

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex gap-1 mb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1 text-xs rounded-t font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-amber-700 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {tab.label}
            {values[tab.key] ? '' : ' *'}
          </button>
        ))}
      </div>
      <textarea
        value={values[activeTab]}
        onChange={(e) => onChange({ ...values, [activeTab]: e.target.value })}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm resize-y"
        required={required && activeTab === 'tr'}
      />
    </div>
  )
}
