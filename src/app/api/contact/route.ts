// src/app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getGoogleApisClient } from "@/app/lib/google";

export async function POST(req: NextRequest) {
    try {
        const { sheets } = getGoogleApisClient();

        const formData = await req.formData();
        const name = formData.get('ime') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('telefon') as string;
        const question = formData.get('pitanje') as string;

        // --- Server-Side Validation ---
        if (!name || !email || !phone || !question) {

            return NextResponse.json({ error: "Sva polja su obavezna." }, { status: 400 });
        }
        if (question.length > 500) {
            return NextResponse.json({ error: "Pitanje ne može biti duže od 500 karaktera." }, { status: 400 });
        }
        // Basic email format validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            return NextResponse.json({ error: "Unesite ispravnu email adresu." }, { status: 400 });
        }

        // --- Prepare Row for Google Sheets ---
        const timestamp = new Date().toLocaleString('hr-HR'); // Adds a timestamp for context
        const row = [name, email, phone, question, timestamp];

        // --- Append to the "pitanja" sheet ---
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID!,
            // This is the crucial part: specifying the sheet name
            range: 'pitanja!A1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [row],
            },
        });

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Contact form error:", error);
        return NextResponse.json({ error: "Došlo je do greške na serveru." }, { status: 500 });
    }
}