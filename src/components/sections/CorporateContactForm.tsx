'use client'

import { useState } from 'react'

export default function CorporateContactForm() {
  const [form, setForm] = useState({
    contact_name: '', company_name: '', phone: '', email: '',
    person_count: '', check_in: '', check_out: '',
    invoice_type: 'Kurumsal e-Fatura', needs_meeting_room: false, notes: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/corporate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ contact_name: '', company_name: '', phone: '', email: '', person_count: '', check_in: '', check_out: '', invoice_type: 'Kurumsal e-Fatura', needs_meeting_room: false, notes: '' })
      } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  if (status === 'sent') {
    return (
      <div className="bg-cream p-10 lg:p-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="font-[family-name:var(--font-heading)] text-2xl text-primary mb-2">Talebiniz Alındı</h3>
        <p className="text-sm text-text-light">En kısa sürede size özel teklifimizi ileteceğiz.</p>
      </div>
    )
  }

  const inputCls = "w-full px-5 py-4 bg-white border border-gray-200 text-sm text-primary outline-none focus:border-accent transition-colors placeholder:text-text-light/60"

  return (
    <div className="bg-cream p-10 lg:p-12">
      <h3 className="font-[family-name:var(--font-heading)] text-2xl text-primary mb-2">Kurumsal Teklif Alın</h3>
      <p className="text-sm text-text-light leading-7 mb-8">Firmanıza özel konaklama ve toplantı paketi için bilgilerinizi bırakın, size 24 saat içinde dönelim.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input value={form.contact_name} onChange={(e) => set('contact_name', e.target.value)} placeholder="Yetkili Adı Soyadı *" required className={inputCls} />
          <input value={form.company_name} onChange={(e) => set('company_name', e.target.value)} placeholder="Firma Adı *" required className={inputCls} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="Telefon *" required className={inputCls} />
          <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="E-posta *" required className={inputCls} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input type="number" min="1" value={form.person_count} onChange={(e) => set('person_count', e.target.value)} placeholder="Kişi Sayısı" className={inputCls} />
          <input type="date" value={form.check_in} onChange={(e) => set('check_in', e.target.value)} className={`${inputCls} text-text-light/60`} title="Giriş Tarihi" />
          <input type="date" value={form.check_out} onChange={(e) => set('check_out', e.target.value)} className={`${inputCls} text-text-light/60`} title="Çıkış Tarihi" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <select value={form.invoice_type} onChange={(e) => set('invoice_type', e.target.value)} className={inputCls}>
            <option>Kurumsal e-Fatura</option>
            <option>Bireysel Fatura</option>
            <option>Fatura Gerekmiyor</option>
          </select>
          <label className="flex items-center gap-3 px-5 py-4 bg-white border border-gray-200 cursor-pointer hover:border-accent transition-colors">
            <input type="checkbox" checked={form.needs_meeting_room} onChange={(e) => set('needs_meeting_room', e.target.checked)} className="w-4 h-4 text-accent" />
            <span className="text-sm text-primary">Toplantı salonu gerekiyor (40 kişilik)</span>
          </label>
        </div>
        <textarea rows={4} value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Özel istekler, notlar..." className={`${inputCls} resize-none`} />

        {status === 'error' && <p className="text-red-500 text-sm">Bir hata oluştu. Lütfen tekrar deneyin.</p>}

        <button type="submit" disabled={status === 'sending'} className="w-full px-10 py-4 bg-accent text-white text-xs font-semibold tracking-[3px] uppercase hover:bg-accent-dark hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(201,169,110,0.35)] transition-all disabled:opacity-50">
          {status === 'sending' ? 'Gönderiliyor...' : 'TEKLİF TALEP ET'}
        </button>
      </form>
    </div>
  )
}
