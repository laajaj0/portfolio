import { supabase } from './supabase';
import { Experience, Education, PersonalInfo, Project, SkillCategory } from '../types';

// ==================== EXPERIENCES ====================

/**
 * Fetch all experiences for a specific language
 */
export async function getExperiences(lang: string = 'en'): Promise<Experience[]> {
    const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('lang', lang)
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching experiences:', error);
        throw error;
    }

    return data || [];
}

/**
 * Insert or update an experience
 */
export async function upsertExperience(experience: Experience, lang: string = 'en') {
    const { data, error } = await supabase
        .from('experiences')
        .upsert({ ...experience, lang }, { onConflict: 'id' })
        .select();

    if (error) {
        console.error('Error upserting experience:', error);
        throw error;
    }

    return data;
}

/**
 * Delete an experience by ID
 */
export async function deleteExperience(id: number) {
    const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting experience:', error);
        throw error;
    }
}

// ==================== EDUCATION ====================

/**
 * Fetch all education entries for a specific language
 */
export async function getEducation(lang: string = 'en'): Promise<Education[]> {
    const { data, error } = await supabase
        .from('education')
        .select('*')
        .eq('lang', lang)
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching education:', error);
        throw error;
    }

    return data || [];
}

/**
 * Insert or update an education entry
 */
export async function upsertEducation(education: Education, lang: string = 'en') {
    const { data, error } = await supabase
        .from('education')
        .upsert({ ...education, lang }, { onConflict: 'id' })
        .select();

    if (error) {
        console.error('Error upserting education:', error);
        throw error;
    }

    return data;
}

/**
 * Delete an education entry by ID
 */
export async function deleteEducation(id: number) {
    const { error } = await supabase
        .from('education')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting education:', error);
        throw error;
    }
}

// ==================== PERSONAL INFO ====================

/**
 * Fetch personal info for a specific language
 */
export async function getPersonalInfo(lang: string = 'en'): Promise<PersonalInfo | null> {
    console.log(`[Supabase] Fetching personal info for: ${lang}`);
    const { data, error, status, statusText } = await supabase
        .from('personal_info')
        .select('*')
        .eq('lang', lang);

    if (error) {
        console.error(`[Supabase] Error fetching personal info (${status} ${statusText}):`, error);
        throw error;
    }

    // Map database fields (snake_case) to frontend fields (camelCase)
    if (data && data.length > 0) {
        const item = data[0];
        console.log(`[Supabase] Successfully fetched personal info for: ${lang}`, { hasAvatar: !!item.avatar_url });
        return {
            name: item.name,
            role: item.role,
            title: item.title,
            bio: item.bio,
            aboutText: item.about_text,
            email: item.email,
            phone: item.phone,
            location: item.location,
            linkedin: item.linkedin,
            github: item.github,
            avatarUrl: item.avatar_url,
            techStackIcons: item.tech_stack_icons,
            aboutImage: item.about_image,
            resumeUrl: item.resume_url
        };
    }

    console.log(`[Supabase] No personal info found for: ${lang}`);
    return null;
}

/**
 * Save personal info for a language
 */
export async function savePersonalInfo(info: PersonalInfo, lang: string = 'en') {
    const dbData = {
        lang,
        name: info.name,
        role: info.role,
        title: info.title,
        bio: info.bio,
        about_text: info.aboutText,
        email: info.email,
        phone: info.phone,
        location: info.location,
        linkedin: info.linkedin,
        github: info.github,
        avatar_url: info.avatarUrl,
        tech_stack_icons: info.techStackIcons,
        about_image: info.aboutImage,
        resume_url: info.resumeUrl,
        updated_at: new Date().toISOString()
    };

    console.log(`[Supabase] Saving personal info for ${lang}:`, { avatarUrl: info.avatarUrl, avatar_url: dbData.avatar_url });

    const { data, error } = await supabase
        .from('personal_info')
        .upsert(dbData, { onConflict: 'lang' })
        .select();

    if (error) {
        console.error('Error saving personal info:', error);
        throw error;
    }

    console.log(`[Supabase] Personal info saved successfully for ${lang}:`, { avatar_url: data?.[0]?.avatar_url });

    return data;
}

// ==================== PROJECTS ====================

/**
 * Fetch all projects for a specific language
 */
export async function getProjects(lang: string = 'en'): Promise<Project[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('lang', lang)
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }

    return data || [];
}

/**
 * Save all projects for a language
 */
export async function saveAllProjects(projects: Project[], lang: string = 'en') {
    try {
        if (projects.length === 0) {
            await supabase.from('projects').delete().eq('lang', lang);
            return [];
        }

        const projectsWithLang = projects.map(p => ({
            id: p.id,
            title: p.title,
            description: p.description,
            image: p.image,
            github: p.github,
            link: p.link,
            tags: p.tags,
            screenshots: p.screenshots,
            lang: lang,
            updated_at: new Date().toISOString()
        }));

        const { data, error } = await supabase
            .from('projects')
            .upsert(projectsWithLang, { onConflict: 'id' })
            .select();

        if (error) {
            console.error('Error saving projects:', error);
            throw error;
        }

        // Delete projects not in the new list
        const idsToKeep = projects.map(p => p.id);
        if (idsToKeep.length > 0) {
            await supabase
                .from('projects')
                .delete()
                .eq('lang', lang)
                .not('id', 'in', `(${idsToKeep.join(',')})`);
        }

        return data;
    } catch (error) {
        console.error('saveAllProjects failed:', error);
        throw error;
    }
}

// ==================== SKILLS ====================

/**
 * Fetch all skill categories for a specific language
 */
export async function getSkills(lang: string = 'en'): Promise<SkillCategory[]> {
    const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('lang', lang)
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching skills:', error);
        throw error;
    }

    if (data) {
        return data.map(item => ({
            title: item.category_title,
            icon: item.category_icon,
            skills: item.skills
        }));
    }

    return [];
}

/**
 * Save all skill categories for a language
 */
export async function saveAllSkills(skills: SkillCategory[], lang: string = 'en') {
    try {
        // Skills are small, so we can delete and re-insert for simplicity
        await supabase.from('skills').delete().eq('lang', lang);

        if (skills.length === 0) return [];

        const skillsWithLang = skills.map((cat, index) => ({
            lang,
            category_title: cat.title,
            category_icon: cat.icon,
            skills: cat.skills,
            display_order: index,
            updated_at: new Date().toISOString()
        }));

        const { data, error } = await supabase
            .from('skills')
            .insert(skillsWithLang)
            .select();

        if (error) {
            console.error('Error saving skills:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('saveAllSkills failed:', error);
        throw error;
    }
}

// ==================== BATCH OPERATIONS ====================

/**
 * Save all experiences for a language (replaces all existing)
 */
export async function saveAllExperiences(experiences: Experience[], lang: string = 'en') {
    try {
        // If no experiences to save, delete all and return
        if (experiences.length === 0) {
            await supabase.from('experiences').delete().eq('lang', lang);
            return [];
        }

        // Only include fields that exist in the database
        const experiencesWithLang = experiences.map(exp => ({
            id: exp.id,
            role: exp.role,
            company: exp.company,
            period: exp.period,
            description: exp.description,
            lang: lang
        }));

        // Use upsert to insert or update - this handles duplicates gracefully
        const { data, error } = await supabase
            .from('experiences')
            .upsert(experiencesWithLang, {
                onConflict: 'id',
                ignoreDuplicates: false
            })
            .select();

        if (error) {
            console.error('Error saving experiences:', error);
            console.error('Data being inserted:', experiencesWithLang);
            throw error;
        }

        // Delete any experience entries for this language that are NOT in the new data
        const idsToKeep = experiences.map(e => e.id);
        if (idsToKeep.length > 0) {
            await supabase
                .from('experiences')
                .delete()
                .eq('lang', lang)
                .not('id', 'in', `(${idsToKeep.join(',')})`);
        }

        return data;
    } catch (error) {
        console.error('saveAllExperiences failed:', error);
        throw error;
    }
}

/**
 * Save all education entries for a language (replaces all existing)
 */
export async function saveAllEducation(education: Education[], lang: string = 'en') {
    try {
        // If no education to save, delete all and return
        if (education.length === 0) {
            await supabase.from('education').delete().eq('lang', lang);
            return [];
        }

        // Only include fields that exist in the database
        const educationWithLang = education.map(edu => ({
            id: edu.id,
            degree: edu.degree,
            school: edu.school,
            period: edu.period,
            description: edu.description,
            lang: lang
        }));

        // Use upsert to insert or update - this handles duplicates gracefully
        const { data, error } = await supabase
            .from('education')
            .upsert(educationWithLang, {
                onConflict: 'id',
                ignoreDuplicates: false
            })
            .select();

        if (error) {
            console.error('Error saving education:', error);
            console.error('Data being inserted:', educationWithLang);
            throw error;
        }

        // Delete any education entries for this language that are NOT in the new data
        const idsToKeep = education.map(e => e.id);
        if (idsToKeep.length > 0) {
            await supabase
                .from('education')
                .delete()
                .eq('lang', lang)
                .not('id', 'in', `(${idsToKeep.join(',')})`);
        }

        return data;
    } catch (error) {
        console.error('saveAllEducation failed:', error);
        throw error;
    }
}
