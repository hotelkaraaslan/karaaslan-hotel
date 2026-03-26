-- =============================================
-- ADMIN PANEL - NEW TABLES MIGRATION
-- Run this in Supabase SQL Editor
-- =============================================

-- TRACKING CODES TABLE (GTM, GA4, Google Ads, Custom Scripts)
CREATE TABLE IF NOT EXISTS tracking_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code_type TEXT NOT NULL CHECK (code_type IN ('gtm', 'ga4', 'google_ads', 'facebook_pixel', 'custom_head', 'custom_body')),
  code_value TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- SEO SETTINGS TABLE (per-page meta data)
CREATE TABLE IF NOT EXISTS seo_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug TEXT UNIQUE NOT NULL,
  meta_title TEXT DEFAULT '',
  meta_title_en TEXT DEFAULT '',
  meta_title_de TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  meta_description_en TEXT DEFAULT '',
  meta_description_de TEXT DEFAULT '',
  og_image TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add updated_at to settings if missing
ALTER TABLE settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE tracking_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

-- Public can read active tracking codes (needed for frontend)
CREATE POLICY "Public read active tracking_codes" ON tracking_codes FOR SELECT USING (is_active = true);
-- Authenticated users (admin) can do everything
CREATE POLICY "Admin full access tracking_codes" ON tracking_codes FOR ALL USING (auth.role() = 'authenticated');

-- Public can read SEO settings
CREATE POLICY "Public read seo_settings" ON seo_settings FOR SELECT USING (true);
CREATE POLICY "Admin full access seo_settings" ON seo_settings FOR ALL USING (auth.role() = 'authenticated');

-- Make sure existing tables allow authenticated full access
DO $$
BEGIN
  -- Settings
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'settings' AND policyname = 'Admin full access settings') THEN
    EXECUTE 'CREATE POLICY "Admin full access settings" ON settings FOR ALL USING (auth.role() = ''authenticated'')';
  END IF;
  -- Rooms
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'rooms' AND policyname = 'Admin full access rooms') THEN
    EXECUTE 'CREATE POLICY "Admin full access rooms" ON rooms FOR ALL USING (auth.role() = ''authenticated'')';
  END IF;
  -- Venues
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'venues' AND policyname = 'Admin full access venues') THEN
    EXECUTE 'CREATE POLICY "Admin full access venues" ON venues FOR ALL USING (auth.role() = ''authenticated'')';
  END IF;
  -- Gallery
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'gallery' AND policyname = 'Admin full access gallery') THEN
    EXECUTE 'CREATE POLICY "Admin full access gallery" ON gallery FOR ALL USING (auth.role() = ''authenticated'')';
  END IF;
  -- Places
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'places' AND policyname = 'Admin full access places') THEN
    EXECUTE 'CREATE POLICY "Admin full access places" ON places FOR ALL USING (auth.role() = ''authenticated'')';
  END IF;
  -- Sliders
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'sliders' AND policyname = 'Admin full access sliders') THEN
    EXECUTE 'CREATE POLICY "Admin full access sliders" ON sliders FOR ALL USING (auth.role() = ''authenticated'')';
  END IF;
END $$;

-- =============================================
-- SEED SEO SETTINGS
-- =============================================
INSERT INTO seo_settings (page_slug, meta_title, meta_title_en, meta_title_de, meta_description, meta_description_en, meta_description_de) VALUES
  ('home', 'Hotel By Karaaslan Inn | Kuşadası', 'Hotel By Karaaslan Inn | Kuşadası', 'Hotel By Karaaslan Inn | Kuşadası', 'Kuşadası''nda deniz manzaralı lüks konaklama deneyimi.', 'Luxury accommodation with sea view in Kuşadası.', 'Luxusunterkunft mit Meerblick in Kuşadası.'),
  ('rooms', 'Odalarımız | Hotel By Karaaslan Inn', 'Our Rooms | Hotel By Karaaslan Inn', 'Unsere Zimmer | Hotel By Karaaslan Inn', '', '', ''),
  ('venues', 'Mekanlar | Hotel By Karaaslan Inn', 'Venues | Hotel By Karaaslan Inn', 'Veranstaltungsorte | Hotel By Karaaslan Inn', '', '', ''),
  ('gallery', 'Galeri | Hotel By Karaaslan Inn', 'Gallery | Hotel By Karaaslan Inn', 'Galerie | Hotel By Karaaslan Inn', '', '', ''),
  ('kusadasi', 'Kuşadası | Hotel By Karaaslan Inn', 'Kuşadası | Hotel By Karaaslan Inn', 'Kuşadası | Hotel By Karaaslan Inn', '', '', ''),
  ('about', 'Hakkımızda | Hotel By Karaaslan Inn', 'About Us | Hotel By Karaaslan Inn', 'Über Uns | Hotel By Karaaslan Inn', '', '', ''),
  ('contact', 'İletişim | Hotel By Karaaslan Inn', 'Contact | Hotel By Karaaslan Inn', 'Kontakt | Hotel By Karaaslan Inn', '', '', ''),
  ('reservation', 'Rezervasyon | Hotel By Karaaslan Inn', 'Reservation | Hotel By Karaaslan Inn', 'Reservierung | Hotel By Karaaslan Inn', '', '', '')
ON CONFLICT (page_slug) DO NOTHING;

-- =============================================
-- STORAGE BUCKET FOR IMAGES
-- =============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT (id) DO NOTHING;

-- Allow public read access to images bucket
CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
-- Allow authenticated users to upload/update/delete images
CREATE POLICY "Admin upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin update images" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin delete images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- =============================================
-- CREATE ADMIN USER
-- Run this AFTER the migration, replace with your email/password
-- Or create via Supabase Dashboard > Authentication > Users > Add User
-- =============================================
-- SELECT supabase_auth.create_user('admin@karaaslanhotels.com', 'your-secure-password-here');
