
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zhxzyeyivamyerztlfzj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_AU5XC6W5XmgfQTBFJXDKMg_UsM76Scz';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkPersonalInfo() {
    const { data, error } = await supabase
        .from('personal_info')
        .select('lang, avatar_url');

    if (error) {
        console.error('Error:', error.message);
        return;
    }

    console.log('--- DB STATE ---');
    data.forEach(r => {
        console.log(`Lang: ${r.lang} | Avatar: ${r.avatar_url}`);
    });
    console.log('----------------');
}

checkPersonalInfo();
