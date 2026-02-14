import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Helper to load env vars manually
function loadEnv() {
    try {
        const envLocalPath = path.resolve(process.cwd(), '.env.local');
        const envPath = path.resolve(process.cwd(), '.env');

        let envFile = null;
        if (fs.existsSync(envLocalPath)) {
            envFile = envLocalPath;
            console.log('Loading .env.local');
        } else if (fs.existsSync(envPath)) {
            envFile = envPath;
            console.log('Loading .env');
        }

        if (envFile) {
            const envConfig = fs.readFileSync(envFile, 'utf8');
            envConfig.split('\n').forEach(line => {
                const [key, value] = line.split('=');
                if (key && value) {
                    // Remove quotes if present
                    const cleanValue = value.trim().replace(/^["'](.*)["']$/, '$1');
                    process.env[key.trim()] = cleanValue;
                }
            });
        } else {
            console.log('No .env file found');
        }
    } catch (e) {
        console.log('Error loading .env file', e);
    }
}

loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Supabase credentials not found in env.');
    console.log('URL:', supabaseUrl ? 'Found' : 'Missing');
    console.log('Key:', supabaseKey ? 'Found' : 'Missing');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateImages() {
    const avatarUrl = 'https://drive.google.com/uc?export=view&id=1GlYf6P51QYAKOeq49ZZJ47L1ii6aXk22';
    const aboutImage = 'https://drive.google.com/uc?export=view&id=1GkYflTpAP59WdSkLGx1HcSboCmbk1wqB';
    const resumeUrl = '/resume.pdf';

    console.log('Updating personal info with new images...');

    const { data, error } = await supabase
        .from('personal_info')
        .update({
            avatar_url: avatarUrl,
            about_image: aboutImage,
            resume_url: resumeUrl,
            updated_at: new Date().toISOString()
        })
        .in('lang', ['en', 'fr'])
        .select();

    if (error) {
        console.error('Error updating images:', error);
    } else {
        console.log('✅ Successfully updated images in Supabase!');
        console.log('Updated rows:', data ? data.length : 0);
    }
}

updateImages();
