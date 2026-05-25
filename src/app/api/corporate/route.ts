import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { contact_name, company_name, phone, email, person_count, check_in, check_out, invoice_type, needs_meeting_room, notes } = body

    if (!contact_name || !company_name || !phone || !email) {
      return NextResponse.json({ error: 'Ad, firma, telefon ve e-posta zorunludur.' }, { status: 400 })
    }

    const { error } = await supabase.from('corporate_messages').insert({
      contact_name, company_name, phone, email,
      person_count: person_count || '',
      check_in: check_in || '',
      check_out: check_out || '',
      invoice_type: invoice_type || '',
      needs_meeting_room: needs_meeting_room || false,
      notes: notes || '',
    })

    if (error) return NextResponse.json({ error: 'Talep gönderilemedi.' }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Bir hata oluştu.' }, { status: 500 })
  }
}
