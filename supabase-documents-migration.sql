-- DOCUMENTS TABLE (Footer PDF links)
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT DEFAULT '',
  title_de TEXT DEFAULT '',
  file_url TEXT NOT NULL DEFAULT '',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active documents" ON documents FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access documents" ON documents FOR ALL USING (auth.role() = 'authenticated');

-- Seed with existing documents (update file_url after uploading PDFs)
INSERT INTO documents (title, title_en, title_de, display_order) VALUES
  ('KVKK Başvuru Formu', 'KVKK Application Form', 'KVKK-Antragsformular', 0),
  ('Gizlilik ve Çerez Politikası', 'Privacy and Cookie Policy', 'Datenschutz- und Cookie-Richtlinie', 1),
  ('Kişisel Verileri Koruma Saklama ve İmha Politikası', 'Personal Data Protection and Destruction Policy', 'Richtlinie zum Schutz und zur Vernichtung personenbezogener Daten', 2),
  ('Aydınlatma Metni', 'Clarification Text', 'Aufklärungstext', 3),
  ('Sürdürülebilirlik Politikaları', 'Sustainability Policies', 'Nachhaltigkeitsrichtlinien', 4),
  ('Sürdürülebilirlik Raporu', 'Sustainability Report', 'Nachhaltigkeitsbericht', 5);
