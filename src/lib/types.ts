export interface Slider {
  id: string;
  title: string;
  title_en?: string;
  title_de?: string;
  subtitle: string | null;
  image_url: string;
  button_text: string;
  button_link: string;
  display_order: number;
  is_active: boolean;
  subtitle_en?: string;
  subtitle_de?: string;
  button_text_en?: string;
  button_text_de?: string;
}

export interface Room {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  image_url: string;
  gallery_images: string[];
  room_count: number;
  features: string[];
  view_type: string;
  size_m2: number | null;
  capacity: number;
  display_order: number;
  is_active: boolean;
  title_en?: string;
  title_de?: string;
  description_en?: string;
  description_de?: string;
  short_description_en?: string;
  short_description_de?: string;
  view_type_en?: string;
  view_type_de?: string;
  features_en?: string[];
  features_de?: string[];
}

export interface Venue {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  image_url: string;
  gallery_images: string[];
  display_order: number;
  is_active: boolean;
  title_en?: string;
  title_de?: string;
  description_en?: string;
  description_de?: string;
  short_description_en?: string;
  short_description_de?: string;
}

export interface GalleryImage {
  id: string;
  title: string | null;
  image_url: string;
  category: string;
  display_order: number;
  is_active: boolean;
  title_en?: string;
  title_de?: string;
}

export interface Place {
  id: string;
  title: string;
  description: string | null;
  distance: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  title_en?: string;
  title_de?: string;
  description_en?: string;
  description_de?: string;
  distance_en?: string;
  distance_de?: string;
}

export interface Settings {
  id: string;
  hotel_name: string;
  hotel_subtitle: string;
  about_title: string;
  about_text: string;
  about_image: string;
  address: string;
  phone: string;
  email: string;
  reservation_url: string;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  kusadasi_title: string;
  kusadasi_text: string;
  kusadasi_image: string;
  about_title_en?: string;
  about_title_de?: string;
  about_text_en?: string;
  about_text_de?: string;
  kusadasi_text_en?: string;
  kusadasi_text_de?: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  meta_description: string | null;
  hero_image: string | null;
  is_active: boolean;
}

export interface TrackingCode {
  id: string;
  name: string;
  code_type: 'gtm' | 'ga4' | 'google_ads' | 'facebook_pixel' | 'custom_head' | 'custom_body';
  code_value: string;
  is_active: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface SeoSettings {
  id: string;
  page_slug: string;
  meta_title: string;
  meta_title_en: string;
  meta_title_de: string;
  meta_description: string;
  meta_description_en: string;
  meta_description_de: string;
  og_image: string;
}
