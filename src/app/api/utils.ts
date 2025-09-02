import formidable from "formidable";
import { NextRequest } from "next/server";
import { Readable } from "stream";

export async function parseForm(req: NextRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
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