-- =====================================================
-- Create Supabase Storage Bucket for Portfolio Images
-- =====================================================
-- Run this in your Supabase SQL Editor

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;

-- Allow anyone to read/view images (public access)
CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
USING ( bucket_id = 'portfolio-images' );

-- Allow anyone to upload (you can make this more restrictive later)
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'portfolio-images' );

-- Allow anyone to update (you can make this more restrictive later)
CREATE POLICY "Allow authenticated updates"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'portfolio-images' );

-- Allow anyone to delete (you can make this more restrictive later)
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
USING ( bucket_id = 'portfolio-images' );

-- Verify the bucket was created
SELECT * FROM storage.buckets WHERE id = 'portfolio-images';
