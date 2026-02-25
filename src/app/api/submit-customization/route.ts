import { NextResponse } from 'next/server';

const GHL_API_BASE = 'https://services.leadconnectorhq.com';

/**
 * Upload a file to GoHighLevel Media Library
 * Returns the hosted URL on success
 */
async function uploadToGHLMedia(
    file: File,
    fileName: string
): Promise<string | null> {
    const ghlApiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!ghlApiKey || !locationId) {
        console.error('GHL_API_KEY or GHL_LOCATION_ID not configured — skipping media upload');
        return null;
    }

    try {
        const formData = new FormData();
        formData.append('file', file, fileName);
        formData.append('hosted', 'false');
        formData.append('name', fileName);

        const response = await fetch(
            `${GHL_API_BASE}/medias/upload-file`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${ghlApiKey}`,
                    Version: '2021-07-28',
                },
                body: formData,
            }
        );

        if (!response.ok) {
            const errText = await response.text();
            console.error(`GHL media upload failed (${response.status}):`, errText);
            return null;
        }

        const result = await response.json();
        return result.url || result.fileUrl || null;
    } catch (error) {
        console.error('GHL media upload error:', error);
        return null;
    }
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        // Extract text fields
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const company = formData.get('company') as string;
        const quantity = formData.get('quantity') as string;
        const orderNumber = formData.get('orderNumber') as string;
        const deadline = formData.get('deadline') as string;
        const notes = formData.get('notes') as string;
        const rushOrder = formData.get('rushOrder') as string;

        // Hat config (JSON stringified from frontend)
        const panel = formData.get('panel') as string;
        const structure = formData.get('structure') as string;
        const fabric = formData.get('fabric') as string;
        const bill = formData.get('bill') as string;
        const closure = formData.get('closure') as string;
        const frontDecoLocation = formData.get('frontDecoLocation') as string;
        const frontDecoType = formData.get('frontDecoType') as string;
        const secondDecoLocation = formData.get('secondDecoLocation') as string;
        const secondDecoType = formData.get('secondDecoType') as string;

        // Extract files
        const frontDecoFile = formData.get('frontDecoFile') as File | null;
        const secondDecoFile = formData.get('secondDecoFile') as File | null;

        // Basic validation
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and Email are required.' },
                { status: 400 }
            );
        }

        // Upload files to GHL Media Library
        let frontDecoFileUrl: string | null = null;
        let secondDecoFileUrl: string | null = null;

        if (frontDecoFile && frontDecoFile.size > 0) {
            frontDecoFileUrl = await uploadToGHLMedia(
                frontDecoFile,
                `front-deco_${Date.now()}_${frontDecoFile.name}`
            );
        }

        if (secondDecoFile && secondDecoFile.size > 0) {
            secondDecoFileUrl = await uploadToGHLMedia(
                secondDecoFile,
                `second-deco_${Date.now()}_${secondDecoFile.name}`
            );
        }

        // Parse hat config JSON safely
        const parse = (val: string | null) => {
            if (!val || val === 'null') return null;
            try { return JSON.parse(val); } catch { return val; }
        };

        // Build webhook payload
        const webhookUrl = process.env.HL_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error('HighLevel Webhook URL is not defined in environment variables.');
            return NextResponse.json(
                { error: 'Server configuration error.' },
                { status: 500 }
            );
        }

        const payload = {
            // Contact
            name,
            email,
            phone,
            company_name: company,

            // Order Details
            quantity,
            previous_order_number: orderNumber,
            deadline,
            rush_order: rushOrder === 'true' ? 'Yes' : 'No',
            notes,

            // Hat Configuration
            hat_panel_style: parse(panel)?.name,
            hat_structure: parse(structure)?.name,
            hat_fabric: parse(fabric)?.name,
            hat_bill_style: parse(bill)?.name,
            hat_closure: parse(closure)?.name,

            // Decoration
            front_decoration_location: parse(frontDecoLocation)?.name,
            front_decoration_type: parse(frontDecoType)?.name,
            second_decoration_location: parse(secondDecoLocation)?.name,
            second_decoration_type: parse(secondDecoType)?.name,

            // File URLs (from GHL Media Library)
            front_decoration_artwork_url: frontDecoFileUrl || '',
            second_decoration_artwork_url: secondDecoFileUrl || '',

            // Source
            source: 'Website Customizer',
        };

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HighLevel webhook failed: ${response.statusText}`);
        }

        return NextResponse.json({ success: true, message: 'Customization submitted successfully!' });

    } catch (error) {
        console.error('Error submitting customization:', error);
        return NextResponse.json(
            { error: 'Failed to submit customization.' },
            { status: 500 }
        );
    }
}
