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
