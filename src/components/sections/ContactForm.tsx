'use client'

import { useState } from 'react'

interface Props {
  labels: {
    formTitle: string
    formDesc: string
    name: string
    email: string
    phone: string
    subject: string
    message: string
    send: string
  }
}

export default function ContactForm({ labels }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="bg-cream p-10 lg:p-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-[family-name:var(--font-heading)] text-2xl text-primary mb-2">
          {labels.formTitle === 'Bize Yazın' ? 'Mesajınız Gönderildi' : labels.formTitle === 'Write to Us' ? 'Message Sent' : 'Nachricht Gesendet'}
        </h3>
        <p className="text-sm text-text-light">
          {labels.formTitle === 'Bize Yazın' ? 'En kısa sürede size dönüş yapacağız.' : labels.formTitle === 'Write to Us' ? 'We will get back to you shortly.' : 'Wir werden uns in Kürze bei Ihnen melden.'}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-cream p-10 lg:p-12">
      <h3 className="font-[family-name:var(--font-heading)] text-2xl text-primary mb-3">{labels.formTitle}</h3>
      <p className="text-sm text-text-light leading-7 mb-8">{labels.formDesc}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={labels.name}
            required
            className="w-full px-5 py-4 bg-white border border-gray-200 text-sm font-[family-name:var(--font-body)] text-primary outline-none focus:border-accent transition-colors placeholder:text-text-light/60"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder={labels.email}
            required
            className="w-full px-5 py-4 bg-white border border-gray-200 text-sm font-[family-name:var(--font-body)] text-primary outline-none focus:border-accent transition-colors placeholder:text-text-light/60"
          />
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder={labels.phone}
            className="w-full px-5 py-4 bg-white border border-gray-200 text-sm font-[family-name:var(--font-body)] text-primary outline-none focus:border-accent transition-colors placeholder:text-text-light/60"
          />
        </div>
        <div>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder={labels.subject}
            className="w-full px-5 py-4 bg-white border border-gray-200 text-sm font-[family-name:var(--font-body)] text-primary outline-none focus:border-accent transition-colors placeholder:text-text-light/60"
          />
        </div>
        <div>
          <textarea
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder={labels.message}
            required
            className="w-full px-5 py-4 bg-white border border-gray-200 text-sm font-[family-name:var(--font-body)] text-primary outline-none focus:border-accent transition-colors resize-none placeholder:text-text-light/60"
          />
        </div>

        {status === 'error' && (
          <p className="text-red-500 text-sm">
            {labels.formTitle === 'Bize Yazın' ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred. Please try again.'}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full px-10 py-4 bg-accent text-white text-xs font-semibold tracking-[3px] uppercase hover:bg-accent-dark hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(201,169,110,0.35)] transition-all cursor-pointer disabled:opacity-50"
        >
          {status === 'sending'
            ? (labels.formTitle === 'Bize Yazın' ? 'Gönderiliyor...' : labels.formTitle === 'Write to Us' ? 'Sending...' : 'Wird gesendet...')
            : labels.send}
        </button>
      </form>
    </div>
  )
}
