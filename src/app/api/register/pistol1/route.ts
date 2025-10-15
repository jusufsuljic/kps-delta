// app/api/register/route.ts
import formidable, { File } from "formidable";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { getGoogleApisClient } from "@/app/lib/google";
import { v4 as uuidv4 } from "uuid";
import { Readable } from "stream";
import { parseForm } from "../../utils";

export const config = {
    api: {
        bodyParser: false, // This is crucial
    },
};

export async function POST(req: NextRequest) {
    try {
        const { sheets } = getGoogleApisClient();

        // console.log("--- Received a new request. Starting to parse form... ---");
        const { fields, files } = await parseForm(req);

        // // --- ADD THIS LOGGING BLOCK ---
        // console.log("✅ Form parsed successfully.");
        // console.log("Parsed Fields:", fields);
        // console.log("Parsed Files:", files);

        // Write to Sheet
        const values = [[
            (fields.ime as string[])?.[0] || '',              // Column A: Ime
            (fields.prezime as string[])?.[0] || '',           // Column B: Prezime
            (fields.kontaktTelefon as string[])?.[0] || '',    // Column C: Kontakt Telefon
            (fields.email as string[])?.[0] || '',              // Column D: Email adresa
            (fields.brojLicneKarte as string[])?.[0] || '',     // Column E: Broj lične karte
            (fields.termin as string[])?.[0] || '',     // Column F: Termin karte
            (fields.groupId as string[])?.[0] || '',     // Column G: Group id
        ]];

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID!,
            range: 'prijave_pistol_1!A2',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: values,
            },
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error('Register error:', err);
        // Provide a more structured error response
        return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 });
    }
}