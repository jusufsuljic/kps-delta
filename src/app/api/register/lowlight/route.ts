// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getGoogleApisClient, getRowCountForSheet } from "@/app/lib/google";
import { parseForm } from "../../utils";

export const config = {
    api: {
        bodyParser: false, // This is crucial
    },
};

export async function POST(req: NextRequest) {
    try {
        const totalCount = await getRowCountForSheet('prijave_lowlight', 'E')
        if (totalCount >= 10){
            throw new Error("Svi termini su popunjeni.")
        }
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
        ]];

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID!,
            range: 'prijave_lowlight!A2',
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