-- Add hero_image column to seo_settings table
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS hero_image TEXT DEFAULT '';
