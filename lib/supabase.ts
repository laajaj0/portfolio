/// <reference types="vite/client" />

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.error('URGENT: Missing Supabase environment variables. The app will load but data fetching will fail.');
    console.error('Please check your .env.local file or Vercel project settings.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
