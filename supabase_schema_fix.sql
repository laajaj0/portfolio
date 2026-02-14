-- =====================================================
-- Supabase Schema Verification and Fix Script
-- =====================================================
-- This script ensures all required tables and columns exist
-- Run this in your Supabase SQL Editor

-- =====================================================
-- 1. PERSONAL_INFO TABLE
-- =====================================================

-- Check if personal_info table exists, if not create it
CREATE TABLE IF NOT EXISTS personal_info (
    lang TEXT PRIMARY KEY,
    name TEXT,
    role TEXT,
    title TEXT,
    bio TEXT,
    about_text TEXT,
    email TEXT,
    phone TEXT,
    location TEXT,
    linkedin TEXT,
    github TEXT,
    avatar_url TEXT,
    tech_stack_icons JSONB,
    about_image TEXT,
    resume_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns if they don't exist (safe to run multiple times)
DO $$ 
BEGIN
    -- Add avatar_url if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'personal_info' AND column_name = 'avatar_url'
    ) THEN
        ALTER TABLE personal_info ADD COLUMN avatar_url TEXT;
    END IF;

    -- Add about_image if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'personal_info' AND column_name = 'about_image'
    ) THEN
        ALTER TABLE personal_info ADD COLUMN about_image TEXT;
    END IF;

    -- Add resume_url if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'personal_info' AND column_name = 'resume_url'
    ) THEN
        ALTER TABLE personal_info ADD COLUMN resume_url TEXT;
    END IF;

    -- Add tech_stack_icons if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'personal_info' AND column_name = 'tech_stack_icons'
    ) THEN
        ALTER TABLE personal_info ADD COLUMN tech_stack_icons JSONB;
    END IF;
END $$;

-- =====================================================
-- 2. EXPERIENCES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS experiences (
    id BIGINT PRIMARY KEY,
    lang TEXT NOT NULL,
    role TEXT,
    company TEXT,
    period TEXT,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. EDUCATION TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS education (
    id BIGINT PRIMARY KEY,
    lang TEXT NOT NULL,
    degree TEXT,
    school TEXT,
    period TEXT,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. PROJECTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS projects (
    id BIGINT PRIMARY KEY,
    lang TEXT NOT NULL,
    title TEXT,
    description TEXT,
    image TEXT,
    github TEXT,
    link TEXT,
    tags JSONB,
    screenshots JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. SKILLS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS skills (
    id BIGSERIAL PRIMARY KEY,
    lang TEXT NOT NULL,
    category_title TEXT,
    category_icon TEXT,
    skills JSONB,
    display_order INTEGER,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 6. VERIFY SCHEMA
-- =====================================================

-- Check personal_info columns
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'personal_info'
ORDER BY ordinal_position;

-- Check if data exists
SELECT lang, name, avatar_url, about_image, resume_url 
FROM personal_info;
