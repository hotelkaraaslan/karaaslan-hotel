import { supabase } from "./supabase";
import type { Slider, Room, Venue, GalleryImage, Place, Settings } from "./types";

export async function getSliders(): Promise<Slider[]> {
  const { data, error } = await supabase
    .from("sliders")
    .select("*")
    .eq("is_active", true)
    .order("display_order");
  if (error) throw error;
  return data ?? [];
}

export async function getRooms(): Promise<Room[]> {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("is_active", true)
    .order("display_order");
  if (error) throw error;
  return data ?? [];
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

export async function getVenues(): Promise<Venue[]> {
  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .eq("is_active", true)
    .order("display_order");
  if (error) throw error;
  return data ?? [];
}

export async function getVenueBySlug(slug: string): Promise<Venue | null> {
  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

export async function getGallery(): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("is_active", true)
    .order("display_order");
  if (error) throw error;
  return data ?? [];
}

export async function getPlaces(): Promise<Place[]> {
  const { data, error } = await supabase
    .from("places")
    .select("*")
    .eq("is_active", true)
    .order("display_order");
  if (error) throw error;
  return data ?? [];
}

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function getTrackingCodes() {
  const { data, error } = await supabase
    .from("tracking_codes")
    .select("*")
    .eq("is_active", true)
    .order("display_order");
  if (error) return [];
  return data ?? [];
}

export async function getDocuments() {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("is_active", true)
    .order("display_order");
  if (error) return [];
  return data ?? [];
}

export async function getPageMeta(slug: string, lang: string, fallback: { title: string; description: string }) {
  const seo = await getSeoBySlug(slug)
  const title =
    lang === 'en' ? (seo?.meta_title_en || seo?.meta_title || fallback.title) :
    lang === 'de' ? (seo?.meta_title_de || seo?.meta_title || fallback.title) :
    (seo?.meta_title || fallback.title)
  const description =
    lang === 'en' ? (seo?.meta_description_en || seo?.meta_description || fallback.description) :
    lang === 'de' ? (seo?.meta_description_de || seo?.meta_description || fallback.description) :
    (seo?.meta_description || fallback.description)
  return {
    title,
    description,
    ...(seo?.og_image ? { openGraph: { images: [seo.og_image] } } : {}),
  }
}

export async function getSeoBySlug(slug: string) {
  const { data, error } = await supabase
    .from("seo_settings")
    .select("*")
    .eq("page_slug", slug)
    .single();
  if (error) return null;
  return data;
}

export async function getBlogPosts() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image, published_at")
    .eq("is_active", true)
    .order("published_at", { ascending: false });
  if (error) return [];
  return data ?? [];
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  if (error) return null;
  return data;
}

export async function getCertificates() {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("is_active", true)
    .order("display_order");
  if (error) return [];
  return data ?? [];
}

export async function getPageHeroImage(pageSlug: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("seo_settings")
    .select("hero_image")
    .eq("page_slug", pageSlug)
    .single();
  if (error || !data?.hero_image) return null;
  return data.hero_image;
}
