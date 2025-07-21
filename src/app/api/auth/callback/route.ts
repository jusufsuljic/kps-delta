// app/api/auth/callback/route.ts
import { getOAuthClient } from '@/app/lib/google';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
    }

    const oauth2Client = getOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);

    // --- THIS IS THE IMPORTANT PART ---
    console.log("!!! YOUR GOOGLE TOKENS (COPY THE REFRESH TOKEN) !!!");
    console.log(tokens);
    // The refresh_token will only be provided on the very first authorization.

    // You can now stop the server. You have what you need.
    return NextResponse.json({
        message: "Authentication successful! Check your server console for the refresh_token. You can now add it to your .env.local file.",
        tokens_received: {
            access_token: "...",
            refresh_token: tokens.refresh_token ? "RECEIVED!" : "NOT RECEIVED (this is normal if you've authorized before)",
        }
    });
}