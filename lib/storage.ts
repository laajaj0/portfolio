import { supabase } from './supabase';

/**
 * Upload an image file to Supabase Storage
 * @param file - The image file to upload
 * @param bucket - The storage bucket name (default: 'portfolio-images')
 * @param folder - Optional folder path within the bucket
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
    file: File,
    bucket: string = 'portfolio-images',
    folder: string = 'avatars'
): Promise<string> {
    try {
        // Generate a unique filename with sanitized extension
        const originalName = file.name.toLowerCase();
        const fileExt = originalName.split('.').pop() || 'png';
        // Remove special chars from filename part
        const cleanName = originalName.replace(/[^a-z0-9.]/g, '-');
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        console.log(`[Storage] Uploading image: ${fileName} (Type: ${file.type}, Size: ${file.size} bytes)`);

        // Upload the file with explicit content type
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.type || 'image/png' // Explicitly set content type
            });

        if (error) {
            console.error('[Storage] Upload error:', error);
            throw error;
        }

        console.log('[Storage] Upload successful:', data);

        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(fileName);

        console.log('[Storage] Public URL:', publicUrl);

        return publicUrl;
    } catch (error) {
        console.error('[Storage] Failed to upload image:', error);
        throw error;
    }
}

/**
 * Delete an image from Supabase Storage
 * @param url - The public URL of the image to delete
 * @param bucket - The storage bucket name
 */
export async function deleteImage(url: string, bucket: string = 'portfolio-images'): Promise<void> {
    try {
        // Extract the file path from the URL
        const urlParts = url.split(`/${bucket}/`);
        if (urlParts.length < 2) {
            console.warn('[Storage] Invalid URL format, cannot delete');
            return;
        }

        const filePath = urlParts[1];

        console.log(`[Storage] Deleting image: ${filePath}`);

        const { error } = await supabase.storage
            .from(bucket)
            .remove([filePath]);

        if (error) {
            console.error('[Storage] Delete error:', error);
            throw error;
        }

        console.log('[Storage] Delete successful');
    } catch (error) {
        console.error('[Storage] Failed to delete image:', error);
        // Don't throw - deletion failure shouldn't block the app
    }
}
