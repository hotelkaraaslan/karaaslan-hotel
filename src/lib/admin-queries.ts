import { createBrowserSupabase } from './supabase-browser'

function getSupabase() {
  return createBrowserSupabase()
}

async function revalidateSite() {
  try {
    await fetch('/api/revalidate', { method: 'POST' })
  } catch {
    // silently ignore
  }
}

// ===== SLIDERS =====
export async function getSlidersAdmin() {
  const { data, error } = await getSupabase().from('sliders').select('*').order('display_order')
  if (error) throw error
  return data ?? []
}

export async function getSliderById(id: string) {
  const { data, error } = await getSupabase().from('sliders').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function createSlider(values: Record<string, unknown>) {
  const { data, error } = await getSupabase().from('sliders').insert(values).select().single()
  if (error) throw error
  await revalidateSite()
  return data
}

export async function updateSlider(id: string, values: Record<string, unknown>) {
  const { error } = await getSupabase().from('sliders').update(values).eq('id', id)
  if (error) throw error
  await revalidateSite()
}

export async function deleteSlider(id: string) {
  const { error } = await getSupabase().from('sliders').delete().eq('id', id)
  if (error) throw error
  await revalidateSite()
}

// ===== ROOMS =====
export async function getRoomsAdmin() {
  const { data, error } = await getSupabase().from('rooms').select('*').order('display_order')
  if (error) throw error
  return data ?? []
}

export async function getRoomById(id: string) {
  const { data, error } = await getSupabase().from('rooms').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function createRoom(values: Record<string, unknown>) {
  const { data, error } = await getSupabase().from('rooms').insert(values).select().single()
  if (error) throw error
  await revalidateSite()
  return data
}

export async function updateRoom(id: string, values: Record<string, unknown>) {
  const { error } = await getSupabase().from('rooms').update(values).eq('id', id)
  if (error) throw error
  await revalidateSite()
}

export async function deleteRoom(id: string) {
  const { error } = await getSupabase().from('rooms').delete().eq('id', id)
  if (error) throw error
  await revalidateSite()
}

// ===== VENUES =====
export async function getVenuesAdmin() {
  const { data, error } = await getSupabase().from('venues').select('*').order('display_order')
  if (error) throw error
  return data ?? []
}

export async function getVenueById(id: string) {
  const { data, error } = await getSupabase().from('venues').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function createVenue(values: Record<string, unknown>) {
  const { data, error } = await getSupabase().from('venues').insert(values).select().single()
  if (error) throw error
  await revalidateSite()
  return data
}

export async function updateVenue(id: string, values: Record<string, unknown>) {
  const { error } = await getSupabase().from('venues').update(values).eq('id', id)
  if (error) throw error
  await revalidateSite()
}

export async function deleteVenue(id: string) {
  const { error } = await getSupabase().from('venues').delete().eq('id', id)
  if (error) throw error
  await revalidateSite()
}

// ===== GALLERY =====
export async function getGalleryAdmin() {
  const { data, error } = await getSupabase().from('gallery').select('*').order('display_order')
  if (error) throw error
  return data ?? []
}

export async function createGalleryImage(values: Record<string, unknown>) {
  const { data, error } = await getSupabase().from('gallery').insert(values).select().single()
  if (error) throw error
  await revalidateSite()
  return data
}

export async function updateGalleryImage(id: string, values: Record<string, unknown>) {
  const { error } = await getSupabase().from('gallery').update(values).eq('id', id)
  if (error) throw error
  await revalidateSite()
}

export async function deleteGalleryImage(id: string) {
  const { error } = await getSupabase().from('gallery').delete().eq('id', id)
  if (error) throw error
  await revalidateSite()
}

// ===== PLACES =====
export async function getPlacesAdmin() {
  const { data, error } = await getSupabase().from('places').select('*').order('display_order')
  if (error) throw error
  return data ?? []
}

export async function getPlaceById(id: string) {
  const { data, error } = await getSupabase().from('places').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function createPlace(values: Record<string, unknown>) {
  const { data, error } = await getSupabase().from('places').insert(values).select().single()
  if (error) throw error
  await revalidateSite()
  return data
}

export async function updatePlace(id: string, values: Record<string, unknown>) {
  const { error } = await getSupabase().from('places').update(values).eq('id', id)
  if (error) throw error
  await revalidateSite()
}

export async function deletePlace(id: string) {
  const { error } = await getSupabase().from('places').delete().eq('id', id)
  if (error) throw error
  await revalidateSite()
}

// ===== SETTINGS =====
export async function getSettingsAdmin() {
  const { data, error } = await getSupabase().from('settings').select('*').single()
  if (error) throw error
  return data
}

export async function updateSettings(id: string, values: Record<string, unknown>) {
  const { error } = await getSupabase().from('settings').update({ ...values, updated_at: new Date().toISOString() }).eq('id', id)
  if (error) throw error
  await revalidateSite()
}

// ===== TRACKING CODES =====
export async function getTrackingCodesAdmin() {
  const { data, error } = await getSupabase().from('tracking_codes').select('*').order('display_order')
  if (error) throw error
  return data ?? []
}

export async function createTrackingCode(values: Record<string, unknown>) {
  const { data, error } = await getSupabase().from('tracking_codes').insert(values).select().single()
  if (error) throw error
  await revalidateSite()
  return data
}

export async function updateTrackingCode(id: string, values: Record<string, unknown>) {
  const { error } = await getSupabase().from('tracking_codes').update({ ...values, updated_at: new Date().toISOString() }).eq('id', id)
  if (error) throw error
  await revalidateSite()
}

export async function deleteTrackingCode(id: string) {
  const { error } = await getSupabase().from('tracking_codes').delete().eq('id', id)
  if (error) throw error
  await revalidateSite()
}

// ===== SEO SETTINGS =====
export async function getSeoSettingsAdmin() {
  const { data, error } = await getSupabase().from('seo_settings').select('*').order('page_slug')
  if (error) throw error
  return data ?? []
}

export async function updateSeoSettings(id: string, values: Record<string, unknown>) {
  const { error } = await getSupabase().from('seo_settings').update({ ...values, updated_at: new Date().toISOString() }).eq('id', id)
  if (error) throw error
  await revalidateSite()
}

// ===== REORDER =====
export async function reorderItems(table: string, items: { id: string; display_order: number }[]) {
  const supabase = getSupabase()
  for (const item of items) {
    await supabase.from(table).update({ display_order: item.display_order }).eq('id', item.id)
  }
  await revalidateSite()
}

// ===== IMAGE UPLOAD =====
export async function uploadImage(file: File, folder: string): Promise<string> {
  const supabase = getSupabase()
  const ext = file.name.split('.').pop()
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`

  const { error } = await supabase.storage.from('images').upload(fileName, file)
  if (error) throw error

  const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(fileName)
  return publicUrl
}
