# Debug Instructions - Avatar Not Displaying

## What I've Done

I've added console logging to track the avatar data flow. The logs will show:
- When data is fetched from Supabase
- When data is merged
- What avatar URL is being used
- When the Hero component renders

## Next Steps - Please Do This

1. **Open your browser** and navigate to `http://localhost:5173`

2. **Open the browser console** (Press F12, then click "Console" tab)

3. **Look for these log messages:**
   - `[DataContext] Initial FR data merged:` - Shows avatar URL after initial load
   - `[Hero] Rendering with avatarUrl:` - Shows what avatar the Hero component is using

4. **Go to the Dashboard** (`http://localhost:5173/admin`)

5. **Update the avatar:**
   - Go to "Images" tab
   - Either:
     - Paste a new URL (try: `https://i.pravatar.cc/300?img=12`)
     - OR upload an image file
   - Click "Save Changes"

6. **Watch the console for these messages:**
   - `[DataContext] saveToAPI called for fr:` - Should show your new avatar URL
   - `[Supabase] Saving all fr data...`
   - `[Supabase] ✅ Save successful for fr`
   - `[DataContext] Post-save FR data from DB:` - Should show avatar URL from database
   - `[DataContext] Post-save FR merged result:` - Should show final merged avatar URL

7. **Go back to home page** (`http://localhost:5173`)

8. **Check the console again:**
   - `[Hero] Rendering with avatarUrl:` - Should show your new avatar URL

## What to Report Back

Please copy and paste the console output, especially:
- The avatar URL values you see in the logs
- Any error messages (in red)
- Whether the avatar image actually displays or not

## Quick Test URLs

Try these avatar URLs to test:
- `https://i.pravatar.cc/300?img=12`
- `https://i.pravatar.cc/300?img=25`
- `https://avatars.githubusercontent.com/u/1?v=4`

## Possible Issues

If you see the avatar URL in the logs but the image doesn't display, it could be:
1. **CORS issue** - The image host blocks loading from your domain
2. **Invalid URL** - The URL is malformed
3. **Network issue** - The image can't be loaded

If the avatar URL in the logs is still the default, then:
1. The data isn't being saved to Supabase correctly
2. The data isn't being fetched from Supabase correctly
