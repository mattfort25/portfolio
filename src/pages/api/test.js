import { NextRequest } from 'next/server';

export default async function handler(req, res) {
    const response = await fetch('https://api.fortitudenorth.com/stocks/info/1', {
        // Optional: forward some headers, add auth tokens, etc.
    });
 
    // Transform or forward the response
    const data = await response.json();
    
    res.status(200).json(data);
}
