import { put, head, list } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const ADMIN_HASH = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";

interface PortfolioData {
    personalInfo: any;
    projects: any[];
    experiences: any[];
    skills: any[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { lang = 'en' } = req.query;
    const blobName = `portfolio_data_${lang}.json`;

    try {
        // GET: Fetch portfolio data from Blob storage
        if (req.method === 'GET') {
            try {
                // List all blobs and find the one we need
                const { blobs } = await list();
                const blob = blobs.find(b => b.pathname === blobName);

                if (!blob) {
                    return res.status(404).json({
                        error: 'No data found',
                        message: 'Please save data from the dashboard first'
                    });
                }

                // Fetch the blob content
                const response = await fetch(blob.url);

                if (!response.ok) {
                    return res.status(404).json({
                        error: 'No data found',
                        message: 'Failed to fetch blob data'
                    });
                }

                const data = await response.json();
                return res.status(200).json(data);
            } catch (error) {
                console.error('GET Error:', error);
                return res.status(404).json({
                    error: 'No data found',
                    message: 'Please save data from the dashboard first'
                });
            }
        }

        // POST: Update portfolio data (requires authentication)
        if (req.method === 'POST') {
            const { password, data } = req.body;

            // Verify password
            if (!password) {
                return res.status(401).json({ error: 'Password required' });
            }

            // Hash the provided password
            const encoder = new TextEncoder();
            const passwordData = encoder.encode(password);
            const hashBuffer = await crypto.subtle.digest('SHA-256', passwordData);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            if (hashHex !== ADMIN_HASH) {
                return res.status(403).json({ error: 'Invalid password' });
            }

            // Save data to Blob storage
            const blob = await put(blobName, JSON.stringify(data), {
                access: 'public',
                contentType: 'application/json',
            });

            return res.status(200).json({
                success: true,
                message: 'Data saved successfully',
                url: blob.url
            });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
