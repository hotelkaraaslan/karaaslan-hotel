-- ============================================
-- Hotel By Karaaslan Inn - Supabase Database Schema
-- Bu SQL'i Supabase Dashboard > SQL Editor'da çalıştırın
-- ============================================

-- 1. Slider Görselleri
CREATE TABLE sliders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  button_text TEXT DEFAULT 'Rezervasyon Yap',
  button_link TEXT DEFAULT 'https://by-karaaslan-inn1.rezervasyonal.com/',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Odalar
CREATE TABLE rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  image_url TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  room_count INT DEFAULT 1,
  features TEXT[] DEFAULT '{}',
  view_type TEXT DEFAULT 'Deniz Manzarası',
  size_m2 INT,
  capacity INT DEFAULT 2,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Mekanlar
CREATE TABLE venues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  image_url TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Galeri
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'genel',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Kuşadası Gezilecek Yerler
CREATE TABLE places (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  distance TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Site Ayarları (tek satır)
CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_name TEXT DEFAULT 'Hotel By Karaaslan Inn',
  hotel_subtitle TEXT DEFAULT 'Kuşadası',
  about_title TEXT DEFAULT 'Ege''nin Kalbinde Huzurun Adresi',
  about_text TEXT DEFAULT '',
  about_image TEXT DEFAULT '',
  address TEXT DEFAULT 'Marina Karşısı, Kuşadası / Aydın',
  phone TEXT DEFAULT '+90 256 212 12 34',
  email TEXT DEFAULT 'info@karaaslanhotels.com',
  reservation_url TEXT DEFAULT 'https://by-karaaslan-inn1.rezervasyonal.com/',
  facebook_url TEXT DEFAULT '',
  instagram_url TEXT DEFAULT '',
  twitter_url TEXT DEFAULT '',
  kusadasi_title TEXT DEFAULT 'Kuşadası',
  kusadasi_text TEXT DEFAULT '',
  kusadasi_image TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Sayfa İçerikleri
CREATE TABLE pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  meta_description TEXT,
  hero_image TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Başlangıç Verileri
-- ============================================

-- Slider verileri
INSERT INTO sliders (title, subtitle, image_url, display_order) VALUES
('Hotel By Karaaslan Inn', 'Ege''nin büyüleyici kıyılarında, tarihin ve denizin buluştuğu eşsiz bir konaklama deneyimi.', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80', 1),
('Kuşadası''nda Huzur', 'Denizin mavisi ile tarihin dokusunu bir arada yaşayın.', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80', 2),
('Eşsiz Deneyim', 'Modern konfor ile Ege''nin sıcak misafirperverliğini keşfedin.', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80', 3),
('Unutulmaz Anılar', 'Aileniz ve sevdiklerinizle birlikte tatilin keyfini çıkarın.', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80', 4);

-- Oda verileri
INSERT INTO rooms (title, slug, description, short_description, image_url, room_count, features, view_type, display_order) VALUES
('Standart Oda', 'standart-oda', 'Klimalı, uydu TV, kasa, özel banyo ve deniz manzarası ile donatılmış konforlu standart odalarımız, rahat bir konaklama için ihtiyacınız olan her şeyi sunar. Her detayı düşünülerek tasarlanan odalarımızda, evinizin konforunu hissedeceksiniz.', 'Klimalı, uydu TV, kasa, özel banyo ve deniz manzarası ile donatılmış konforlu odalar.', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', 58, ARRAY['Klima', 'Uydu TV', 'Kasa', 'Özel Banyo', 'Saç Kurutma Makinesi', 'Mini Bar', 'Wifi'], 'Deniz Manzarası', 1),
('Suite Oda', 'suite-oda', 'Geniş yaşam alanı, panoramik deniz manzarası ve premium donanıma sahip suite odalarımız, özel bir tatil deneyimi arayanlar için tasarlanmıştır. Ayrı oturma alanı, jakuzi ve özel balkon ile lüksün tadını çıkarın.', 'Geniş yaşam alanı, panoramik deniz manzarası ve premium donanıma sahip özel odalar.', 'https://images.unsplash.com/photo-1590490360182-c33d955d4c47?w=800&q=80', 5, ARRAY['Klima', 'Uydu TV', 'Kasa', 'Jakuzi', 'Özel Balkon', 'Oturma Alanı', 'Mini Bar', 'Wifi', 'Bornoz & Terlik'], 'Panoramik Manzara', 2);

-- Mekan verileri
INSERT INTO venues (title, slug, description, short_description, image_url, display_order) VALUES
('Restoran', 'restoran', 'Ege mutfağının en seçkin lezzetlerini, deniz manzarası eşliğinde sunuyoruz. Taze ve yerel malzemelerle hazırlanan menümüz, damak zevkinize hitap edecek çeşitlilikte. Açık büfe kahvaltımız ile güne enerji dolu başlayın.', 'Ege mutfağının en seçkin lezzetleri, deniz manzarası eşliğinde.', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80', 1),
('Bar & Lounge', 'bar-lounge', 'Gün batımının büyüleyici renkleri eşliğinde serinletici içeceklerimizin ve özel kokteyllerimizin tadını çıkarın. Canlı müzik eşliğinde keyifli akşamlar geçirin.', 'Gün batımı eşliğinde özel kokteyller ve canlı müzik.', 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=80', 2),
('Havuz & Plaj', 'havuz-plaj', 'Açık havuzumuzda serinleyin veya özel plajımızda Ege''nin berrak sularının keyfini çıkarın. Şezlong ve şemsiye hizmetimizle güneşin tadını çıkarırken, havuz barımızdan serinletici içeceklerinizi sipariş edebilirsiniz.', 'Açık havuz ve özel plajda Ege''nin keyfini çıkarın.', 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=900&q=80', 3);

-- Galeri verileri
INSERT INTO gallery (title, image_url, category, display_order) VALUES
('Otel Genel Görünüm', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=80', 'genel', 1),
('Oda İç Mekan', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&q=80', 'odalar', 2),
('Havuz Alanı', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500&q=80', 'mekanlar', 3),
('Lobi', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500&q=80', 'genel', 4),
('Restoran', 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500&q=80', 'mekanlar', 5);

-- Kuşadası gezilecek yerler
INSERT INTO places (title, description, distance, display_order) VALUES
('Efes Antik Kenti', 'Dünyanın en iyi korunmuş antik kentlerinden biri', '20 dk mesafede', 1),
('Meryem Ana Evi', 'Hristiyanlığın önemli hac merkezlerinden', '25 dk mesafede', 2),
('Güvercinada Kalesi', 'Kuşadası''nın simgesi, tarihi kale', '5 dk mesafede', 3),
('Dilek Yarımadası', 'Milli park, doğa yürüyüşleri ve plajlar', '30 dk mesafede', 4),
('Ladies Beach', 'Kuşadası''nın en ünlü plajı', '10 dk mesafede', 5),
('Adaland Aquapark', 'Avrupa''nın en büyük su parkı', '15 dk mesafede', 6);

-- Site ayarları (başlangıç)
INSERT INTO settings (about_title, about_text, kusadasi_text) VALUES
('Ege''nin Kalbinde Huzurun Adresi', 'Hotel By Karaaslan Inn, Kuşadası''nın en gözde lokasyonunda, denizin mavisi ile tarihin dokusunu bir arada sunan benzersiz bir konaklama deneyimi sunmaktadır. 63 odalı otelimiz, modern konfor ile Ege''nin sıcak misafirperverliğini harmanlayarak unutulmaz anılar biriktirmenizi sağlar.', 'Ege''nin incisi Kuşadası, antik kentleri, turkuaz denizi, canlı gece hayatı ve eşsiz doğal güzellikleri ile Türkiye''nin en gözde tatil destinasyonlarından biridir.');

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Tüm tablolar için RLS etkinleştir
ALTER TABLE sliders ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Herkese okuma izni (public site için)
CREATE POLICY "Public read sliders" ON sliders FOR SELECT USING (is_active = true);
CREATE POLICY "Public read rooms" ON rooms FOR SELECT USING (is_active = true);
CREATE POLICY "Public read venues" ON venues FOR SELECT USING (is_active = true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (is_active = true);
CREATE POLICY "Public read places" ON places FOR SELECT USING (is_active = true);
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public read pages" ON pages FOR SELECT USING (is_active = true);

-- Admin (authenticated) için tam yetki
CREATE POLICY "Admin full access sliders" ON sliders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access rooms" ON rooms FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access venues" ON venues FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access places" ON places FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access settings" ON settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access pages" ON pages FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- Storage Bucket (görseller için)
-- ============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Admin upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin update images" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin delete images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
