-- ============================================================================
-- ANAS AL-QURAN ACADEMY — ADMIN DASHBOARD & STORAGE MIGRATION SQL
-- ============================================================================

-- 1. STORAGE BUCKET CREATION FOR MEDIA LIBRARY
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'public-assets',
    'public-assets',
    TRUE,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET public = TRUE;

-- Storage Bucket Policies
CREATE POLICY "Public Read Assets" ON storage.objects
    FOR SELECT USING (bucket_id = 'public-assets');

CREATE POLICY "Admin Upload Assets" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'public-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Update Assets" ON storage.objects
    FOR UPDATE USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Delete Assets" ON storage.objects
    FOR DELETE USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');


-- 2. MEDIA ASSETS METADATA TABLE
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size INT,
    mime_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Media Assets" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Admin Manage Media Assets" ON public.media_assets FOR ALL USING (auth.role() = 'authenticated');


-- 3. ADMIN PROFILES TABLE (Optional linked to auth.users)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT DEFAULT 'مدير الأكاديمية',
    role TEXT DEFAULT 'admin',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin Read Profiles" ON public.admin_profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Profiles" ON public.admin_profiles FOR ALL USING (auth.role() = 'authenticated');
