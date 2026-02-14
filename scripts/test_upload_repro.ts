
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zhxzyeyivamyerztlfzj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_AU5XC6W5XmgfQTBFJXDKMg_UsM76Scz';

console.error('Initializing Supabase client...');
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testUpload() {
    console.error('Testing Supabase Storage Upload...');

    const buffer = Buffer.from('fake image content', 'utf-8');
    const fileName = `test_upload_${Date.now()}.png`;

    try {
        console.error(`Uploading ${fileName}...`);
        const { data, error } = await supabase.storage
            .from('portfolio-images')
            .upload(fileName, buffer, {
                contentType: 'image/png',
                upsert: false
            });

        if (error) {
            console.error('Upload Error:', JSON.stringify(error, null, 2));
            return;
        }

        console.error('Upload Success:', JSON.stringify(data, null, 2));

        const { data: { publicUrl } } = supabase.storage
            .from('portfolio-images')
            .getPublicUrl(fileName);

        console.error('Public URL:', publicUrl);

        console.error('Verifying access...');
        // Use native fetch
        const res = await fetch(publicUrl);
        console.error(`Fetch status: ${res.status}`);

        if (res.status === 200) {
            console.error('✅ File is publicly accessible');
        } else {
            console.error('❌ File is NOT accessible via public URL');
        }

        console.error('Cleaning up...');
        await supabase.storage.from('portfolio-images').remove([fileName]);
        console.error('Cleanup complete');

    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

testUpload().catch(err => console.error('Top level error:', err));
