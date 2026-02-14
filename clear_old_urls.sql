-- =====================================================
-- Clear Old Google Drive URLs from Database
-- =====================================================
-- Run this in your Supabase SQL Editor to remove the old Google Drive URLs
-- This will allow the new defaults (or uploaded images) to be used

-- Update English personal info - set avatar_url to NULL (will use default)
UPDATE personal_info
SET avatar_url = NULL,
    about_image = NULL
WHERE lang = 'en' 
  AND (avatar_url LIKE '%drive.google.com%' OR about_image LIKE '%drive.google.com%');

-- Update French personal info - set avatar_url to NULL (will use default)
UPDATE personal_info
SET avatar_url = NULL,
    about_image = NULL
WHERE lang = 'fr' 
  AND (avatar_url LIKE '%drive.google.com%' OR about_image LIKE '%drive.google.com%');

-- Verify the update
SELECT lang, avatar_url, about_image FROM personal_info;
