// app/api/register/route.ts
import { File } from "formidable";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { getGoogleApisClient } from "@/app/lib/google";
import { v4 as uuidv4 } from "uuid";
import { parseForm } from "../utils";

export const config = {
    api: {
        bodyParser: false, // This is crucial
    },
};

export async function POST(req: NextRequest) {
    try {
        const { drive, sheets } = getGoogleApisClient();

        console.log("--- Received a new request. Starting to parse form... ---");
        const { fields, files } = await parseForm(req);

        // --- ADD THIS LOGGING BLOCK ---
        console.log("✅ Form parsed successfully.");
        console.log("Parsed Fields:", fields);
        console.log("Parsed Files:", files);
        console.log("Keys of the 'files' object:", Object.keys(files));
        // -----------------------------

        const imageFile = (files.fotografija as File[])?.[0]; // This line is likely the problem
        if (!imageFile) {
            // This is the error you are probably getting.
            console.error("❌ Error: No file found under the key 'image'.");
            return NextResponse.json({ error: "Image file is required." }, { status: 400 });
        }

        // Upload to Drive
        const fileStream = fs.createReadStream(imageFile.filepath);
        const fileRes = await drive.files.create({
            requestBody: {
                name: `${uuidv4()}_${imageFile.originalFilename}`,
                parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
            },
            media: {
                mimeType: imageFile.mimetype!,
                body: fileStream,
            },
            fields: 'id', // Only get the ID back
        });

        const fileId = fileRes.data.id!;

        // Make the file publicly readable
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });

        const imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

        // Write to Sheet
        const values = [[
            (fields.ime as string[])?.[0] || '',              // Column A: Ime
            (fields.prezime as string[])?.[0] || '',           // Column B: Prezime
            (fields.kontaktTelefon as string[])?.[0] || '',    // Column C: Kontakt Telefon
            (fields.email as string[])?.[0] || '',              // Column D: Email adresa
            (fields.brojLicneKarte as string[])?.[0] || '',     // Column E: Broj lične karte
            (fields.adresaStanovanja as string[])?.[0] || '',   // Column F: Adresa stanovanja
            (fields.hasWeapon as string[])?.[0] || 'Ne',       // Column G: Poseduje oružje?
            (fields.brojOruzanogLista as string[])?.[0] || '',  // Column H: Broj oružanog lista
            (fields.paket as string[])?.[0] || '',             // Column I: Paket
            imageUrl                                           // Column J: Link Fotografije
        ]];

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID!,
            range: 'prijave!A1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: values,
            },
        });

        return NextResponse.json({ success: true, fileUrl: imageUrl });
    } catch (err: any) {
        console.error('Register error:', err);
        // Provide a more structured error response
        return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 });
    }
}