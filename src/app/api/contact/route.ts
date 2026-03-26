import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Ad, e-posta ve mesaj zorunludur.' }, { status: 400 })
    }

    const { error } = await supabase
      .from('contact_messages')
      .insert({ name, email, phone: phone || '', subject: subject || '', message })

    if (error) {
      return NextResponse.json({ error: 'Mesaj gönderilemedi.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Bir hata oluştu.' }, { status: 500 })
  }
}
