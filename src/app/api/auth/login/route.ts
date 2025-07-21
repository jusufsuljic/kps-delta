// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import { getOAuthClient } from '@/app/lib/google'

export async function GET() {
    const oauth2Client = getOAuthClient()
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // Critical for getting a refresh token
        scope: [
            'https://www.googleapis.com/auth/drive.file', // To create files
            'https://www.googleapis.com/auth/spreadsheets' // To write to sheets
        ],
        prompt: 'consent', // Forces the consent screen to ensure you get a refresh token
    })
    return NextResponse.redirect(url)
}