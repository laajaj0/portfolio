# URGENT: Set Up Supabase Storage

## Problem
Google Drive URLs don't work for embedding images. We need to use Supabase Storage instead.

## Quick Setup (2 minutes)

### Step 1: Create Storage Bucket
1. Go to your Supabase dashboard: https://zhxzyeyivamyerztlfzj.supabase.co
2. Click **Storage** in the left sidebar
3. Click **"New bucket"**
4. Enter bucket name: `portfolio-images`
5. Make it **PUBLIC** (toggle the switch)
6. Click **"Create bucket"**

### Step 2: Set Storage Policies (IMPORTANT!)
1. In Supabase, go to **SQL Editor**
2. Copy and paste the entire contents of `supabase_storage_setup.sql`
3. Click **Run**

This will allow:
- ✅ Anyone to view images (public read)
- ✅ You to upload/update/delete images when logged in

## After Setup

Once you've completed these steps:
1. Go back to your dashboard
2. Go to the "Images" tab
3. Click "Upload File" and select an image
4. The image will now upload to Supabase Storage
5. You'll get a public URL that works everywhere!

## Why This Is Better

- ✅ **Reliable**: Images are hosted on Supabase's CDN
- ✅ **Fast**: Images load quickly
- ✅ **No limits**: Unlike Google Drive
- ✅ **Professional**: Proper image hosting solution
