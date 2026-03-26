-- =============================================
-- MULTILINGUAL COLUMNS MIGRATION
-- Run this in Supabase SQL Editor
-- =============================================

-- SETTINGS TABLE
ALTER TABLE settings
  ADD COLUMN IF NOT EXISTS about_title_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS about_title_de TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS about_text_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS about_text_de TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS kusadasi_text_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS kusadasi_text_de TEXT DEFAULT '';

-- ROOMS TABLE
ALTER TABLE rooms
  ADD COLUMN IF NOT EXISTS title_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS title_de TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_de TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS short_description_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS short_description_de TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS view_type_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS view_type_de TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS features_en TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS features_de TEXT[] DEFAULT '{}';

-- VENUES TABLE
ALTER TABLE venues
  ADD COLUMN IF NOT EXISTS title_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS title_de TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_de TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS short_description_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS short_description_de TEXT DEFAULT '';

-- PLACES TABLE
ALTER TABLE places
  ADD COLUMN IF NOT EXISTS title_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS title_de TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_de TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS distance_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS distance_de TEXT DEFAULT '';

-- SLIDERS TABLE
ALTER TABLE sliders
  ADD COLUMN IF NOT EXISTS subtitle_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS subtitle_de TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS button_text_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS button_text_de TEXT DEFAULT '';

-- GALLERY TABLE
ALTER TABLE gallery
  ADD COLUMN IF NOT EXISTS title_en TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS title_de TEXT DEFAULT '';

-- =============================================
-- POPULATE TRANSLATIONS
-- =============================================

-- Settings translations
UPDATE settings SET
  about_title_en = 'The Address of Serenity in the Heart of the Aegean',
  about_title_de = 'Die Adresse der Ruhe im Herzen der Ägäis',
  about_text_en = 'Hotel By Karaaslan Inn offers a unique accommodation experience combining the blue of the sea with the texture of history in the most prestigious location of Kuşadası. Our 63-room hotel blends modern comfort with the warm hospitality of the Aegean, creating unforgettable memories.',
  about_text_de = 'Hotel By Karaaslan Inn bietet ein einzigartiges Unterkunftserlebnis, das das Blau des Meeres mit der Textur der Geschichte in der prestigeträchtigsten Lage von Kuşadası verbindet. Unser 63-Zimmer-Hotel verbindet modernen Komfort mit der herzlichen Gastfreundschaft der Ägäis und schafft unvergessliche Erinnerungen.',
  kusadasi_text_en = 'Kuşadası, the pearl of the Aegean, is one of Turkey''s most popular holiday destinations with its ancient cities, turquoise sea, vibrant nightlife, and unique natural beauties.',
  kusadasi_text_de = 'Kuşadası, die Perle der Ägäis, ist mit ihren antiken Städten, dem türkisfarbenen Meer, dem lebhaften Nachtleben und einzigartigen Naturschönheiten eines der beliebtesten Urlaubsziele der Türkei.';

-- Rooms translations
UPDATE rooms SET
  title_en = 'Standard Room',
  title_de = 'Standardzimmer',
  description_en = 'Our comfortable standard rooms, equipped with air conditioning, satellite TV, safe, private bathroom, and sea view, offer everything you need for a relaxing stay. Every detail has been thoughtfully designed to make you feel the comfort of home.',
  description_de = 'Unsere komfortablen Standardzimmer, ausgestattet mit Klimaanlage, Sat-TV, Safe, eigenem Bad und Meerblick, bieten alles, was Sie für einen entspannten Aufenthalt benötigen. Jedes Detail wurde durchdacht gestaltet, damit Sie sich wie zu Hause fühlen.',
  short_description_en = 'Comfortable rooms with air conditioning, satellite TV, safe, private bathroom and sea view.',
  short_description_de = 'Komfortable Zimmer mit Klimaanlage, Sat-TV, Safe, eigenem Bad und Meerblick.',
  view_type_en = 'Sea View',
  view_type_de = 'Meerblick',
  features_en = ARRAY['Air Conditioning', 'Satellite TV', 'Safe', 'Private Bathroom', 'Hair Dryer', 'Mini Bar', 'WiFi'],
  features_de = ARRAY['Klimaanlage', 'Sat-TV', 'Safe', 'Eigenes Bad', 'Haartrockner', 'Minibar', 'WLAN']
WHERE title = 'Standart Oda';

UPDATE rooms SET
  title_en = 'Suite Room',
  title_de = 'Suite',
  description_en = 'Our suite rooms with spacious living area, panoramic sea view, and premium amenities are designed for those seeking a special vacation experience. Enjoy luxury with a separate sitting area, jacuzzi, and private balcony.',
  description_de = 'Unsere Suiten mit großzügigem Wohnbereich, Panorama-Meerblick und Premium-Ausstattung sind für diejenigen konzipiert, die ein besonderes Urlaubserlebnis suchen. Genießen Sie Luxus mit separatem Sitzbereich, Whirlpool und privatem Balkon.',
  short_description_en = 'Special rooms with spacious living area, panoramic sea view and premium amenities.',
  short_description_de = 'Besondere Zimmer mit großzügigem Wohnbereich, Panorama-Meerblick und Premium-Ausstattung.',
  view_type_en = 'Panoramic View',
  view_type_de = 'Panoramablick',
  features_en = ARRAY['Air Conditioning', 'Satellite TV', 'Safe', 'Jacuzzi', 'Private Balcony', 'Sitting Area', 'Mini Bar', 'WiFi', 'Bathrobe & Slippers'],
  features_de = ARRAY['Klimaanlage', 'Sat-TV', 'Safe', 'Whirlpool', 'Privater Balkon', 'Sitzbereich', 'Minibar', 'WLAN', 'Bademantel & Hausschuhe']
WHERE title = 'Suite Oda';

-- Venues translations
UPDATE venues SET
  title_en = 'Restaurant',
  title_de = 'Restaurant',
  description_en = 'We serve the finest flavors of Aegean cuisine with a sea view. Our menu, prepared with fresh and local ingredients, offers a variety to delight your palate. Start your day full of energy with our open buffet breakfast.',
  description_de = 'Wir servieren die feinsten Aromen der ägäischen Küche mit Meerblick. Unsere Speisekarte, zubereitet mit frischen und lokalen Zutaten, bietet eine Vielfalt, die Ihren Gaumen erfreut. Starten Sie Ihren Tag voller Energie mit unserem offenen Frühstücksbuffet.',
  short_description_en = 'The finest flavors of Aegean cuisine with a sea view.',
  short_description_de = 'Die feinsten Aromen der ägäischen Küche mit Meerblick.'
WHERE title = 'Restoran';

UPDATE venues SET
  title_en = 'Bar & Lounge',
  title_de = 'Bar & Lounge',
  description_en = 'Enjoy our refreshing drinks and special cocktails accompanied by the enchanting colors of sunset. Spend pleasant evenings with live music.',
  description_de = 'Genießen Sie unsere erfrischenden Getränke und speziellen Cocktails, begleitet von den bezaubernden Farben des Sonnenuntergangs. Verbringen Sie angenehme Abende mit Live-Musik.',
  short_description_en = 'Special cocktails and live music at sunset.',
  short_description_de = 'Spezielle Cocktails und Live-Musik bei Sonnenuntergang.'
WHERE title = 'Bar & Lounge';

-- Places translations
UPDATE places SET
  title_en = 'Ephesus Ancient City',
  title_de = 'Antike Stadt Ephesos',
  description_en = 'One of the best preserved ancient cities in the world',
  description_de = 'Eine der am besten erhaltenen antiken Städte der Welt',
  distance_en = '20 min away',
  distance_de = '20 Min. entfernt'
WHERE title = 'Efes Antik Kenti';

UPDATE places SET
  title_en = 'House of Virgin Mary',
  title_de = 'Haus der Jungfrau Maria',
  description_en = 'One of the important pilgrimage centers of Christianity',
  description_de = 'Eines der wichtigen Pilgerzentren des Christentums',
  distance_en = '25 min away',
  distance_de = '25 Min. entfernt'
WHERE title = 'Meryem Ana Evi';

UPDATE places SET
  title_en = 'Pigeon Island Castle',
  title_de = 'Taubeninsel-Festung',
  description_en = 'The symbol of Kuşadası, a historic castle',
  description_de = 'Das Wahrzeichen von Kuşadası, eine historische Festung',
  distance_en = '5 min away',
  distance_de = '5 Min. entfernt'
WHERE title = 'Güvercinada Kalesi';

-- Update remaining places (if any exist)
UPDATE places SET
  title_en = 'Dilek Peninsula',
  title_de = 'Dilek-Halbinsel',
  description_en = 'National park with pristine beaches and nature',
  description_de = 'Nationalpark mit unberührten Stränden und Natur',
  distance_en = '30 min away',
  distance_de = '30 Min. entfernt'
WHERE title LIKE '%Dilek%';

UPDATE places SET
  title_en = 'Ladies Beach',
  title_de = 'Damenstrand',
  description_en = 'Kuşadası''s most famous beach',
  description_de = 'Der berühmteste Strand von Kuşadası',
  distance_en = '10 min away',
  distance_de = '10 Min. entfernt'
WHERE title LIKE '%Kad%nlar%' OR title LIKE '%Ladies%';

UPDATE places SET
  title_en = 'Adaland Water Park',
  title_de = 'Adaland Wasserpark',
  description_en = 'One of the largest water parks in the world',
  description_de = 'Einer der größten Wasserparks der Welt',
  distance_en = '15 min away',
  distance_de = '15 Min. entfernt'
WHERE title LIKE '%Adaland%';

-- Sliders translations
UPDATE sliders SET
  subtitle_en = 'A unique accommodation experience on the enchanting shores of the Aegean, where history meets the sea.',
  subtitle_de = 'Ein einzigartiges Unterkunftserlebnis an den bezaubernden Küsten der Ägäis, wo Geschichte auf das Meer trifft.',
  button_text_en = 'Book Now',
  button_text_de = 'Jetzt Buchen'
WHERE title = 'Hotel By Karaaslan Inn';

UPDATE sliders SET
  subtitle_en = 'Experience the blue of the sea and the texture of history together.',
  subtitle_de = 'Erleben Sie das Blau des Meeres und die Textur der Geschichte gemeinsam.',
  button_text_en = 'Book Now',
  button_text_de = 'Jetzt Buchen'
WHERE title LIKE '%Huzur%' OR title LIKE '%Ku_adas%n%da Huzur%';
