-- CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can INSERT (submit form), only authenticated can read/update/delete
CREATE POLICY "Public insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read contact_messages" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update contact_messages" ON contact_messages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete contact_messages" ON contact_messages FOR DELETE USING (auth.role() = 'authenticated');
