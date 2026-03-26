export interface Slider {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  button_text: string;
  button_link: string;
  display_order: number;
  is_active: boolean;
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
}

export interface GalleryImage {
  id: string;
  title: string | null;
  image_url: string;
  category: string;
  display_order: number;
  is_active: boolean;
}

export interface Place {
  id: string;
  title: string;
  description: string | null;
  distance: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
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
