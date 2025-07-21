// app/api/register/route.ts
import formidable, { File } from "formidable";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { getGoogleApisClient } from "@/app/lib/google";
import { v4 as uuidv4 } from "uuid";
import { Readable } from "stream";

export const config = {
    api: {
        bodyParser: false, // This is crucial
    },
};

// THIS IS THE HELPER FUNCTION YOU NEED TO ADD BACK
async function parseForm(req: NextRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
    const buffer = Buffer.from(await req.arrayBuffer());

    // Create a fake stream for formidable
    const reqStream = new Readable({
        read() {
            this.push(buffer);
            this.push(null);
        },
    }) as any;

    // Add necessary headers for formidable to work
    reqStream.headers = {
        'content-type': req.headers.get('content-type') || '',
        'content-length': req.headers.get('content-length') || '',
    };

    return new Promise((resolve, reject) => {
        const form = formidable({ multiples: false, keepExtensions: true });
        form.parse(reqStream, (err, fields, files) => {
            if (err) {
                return reject(err);
            }
            resolve({ fields, files });
        });
    });
}


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
            (fields.brojLicneKarte as string[])?.[0] || '',     // Column D: Broj lične karte
            (fields.adresaStanovanja as string[])?.[0] || '',   // Column E: Adresa stanovanja
            (fields.hasWeapon as string[])?.[0] || 'Ne',       // Column F: Poseduje oružje?
            (fields.brojOruzanogLista as string[])?.[0] || '',  // Column G: Broj oružanog lista
            (fields.paket as string[])?.[0] || '',             // Column H: Paket
            imageUrl                                           // Column I: Link Fotografije
        ]];

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID!,
            range: 'Sheet1!A1',
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