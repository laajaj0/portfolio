# 🚀 Vercel Deployment Setup Guide

If you are seeing a "Connection Error" or empty data on your Vercel deployment, it is because **Vercel does not know your Supabase keys**. You need to add them manually.

## ✅ How to Fix (3 Minutes)

1.  **Go to your Vercel Dashboard**
    -   Open [https://vercel.com/dashboard](https://vercel.com/dashboard)
    -   Select your project (`oussamas-portfolio` or similar)

2.  **Go to Settings**
    -   Click on the **Settings** tab at the top.
    -   Click on **Environment Variables** in the left sidebar.

3.  **Add Your Keys**
    You need to add these three variables. You can find the values in your local `.env.local` file.

    | Key | Value (Copy from your .env.local) |
    | :--- | :--- |
    | `VITE_SUPABASE_URL` | `https://zhxzyeyivamyerztlfzj.supabase.co` |
    | `VITE_SUPABASE_ANON_KEY` | `sb_publishable_...` (Use the **Publishable** key!) |
    | `BLOB_READ_WRITE_TOKEN` | `vercel_blob_rw_DfBSURzS8w1vHrMJ_...` |

    > [!CAUTION]
    > **SECURITY WARNING**: Do **NOT** use the `sb_secret_...` key (Service Role Key). It gives full administrative access to your database and should **NEVER** be used in a frontend application (Vercel).
    > Only use the key that starts with `sb_publishable_` for `VITE_SUPABASE_ANON_KEY`.

    **Steps:**
    1.  In "Key", enter `VITE_SUPABASE_URL`
    2.  In "Value", paste your URL.
    3.  Click **Save**.
    4.  Repeat for `VITE_SUPABASE_ANON_KEY` and `BLOB_READ_WRITE_TOKEN`.

4.  **Redeploy (Important!)**
    -   Adding variables does NOT update the live site instantly.
    -   Go to the **Deployments** tab.
    -   Click the **three dots (...)** on the latest deployment -> **Redeploy**.
    -   Or, just push any small change to GitHub (which we just did!).

## 🎉 Result
After the new deployment finishes, your portfolio will show valid data instead of errors!
