// app/lib/google.ts
import { google } from 'googleapis';

// --- Function #1: For the one-time authentication flow ---
// This function creates a basic client instance needed for generating the auth URL
// and exchanging the code for tokens.
export function getOAuthClient() {
    if (
        !process.env.GOOGLE_CLIENT_ID ||
        !process.env.GOOGLE_CLIENT_SECRET ||
        !process.env.GOOGLE_REDIRECT_URI
    ) {
        throw new Error('Missing Google OAuth credentials for client setup.');
    }

    return new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );
}


// --- Function #2: For the main application logic (e.g., the register route) ---
// This function creates a fully authenticated client that can make API calls
// on your behalf using the stored refresh token.
export function getGoogleApisClient() {
    if (!process.env.GOOGLE_REFRESH_TOKEN) {
        throw new Error('Missing GOOGLE_REFRESH_TOKEN in environment variables. Please run the auth flow first.');
    }

    // Get the basic client structure
    const oauth2Client = getOAuthClient();

    // Set the refresh token so the client is authenticated
    oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    // Now create the specific API clients (Drive, Sheets, etc.)
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

    return { drive, sheets };
}