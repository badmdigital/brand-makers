import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Basic validation
        if (!data.name || !data.email) {
            return NextResponse.json(
                { error: 'Name and Email are required.' },
                { status: 400 }
            );
        }

        const webhookUrl = process.env.NEXT_PUBLIC_HL_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error('HighLevel Webhook URL is not defined in environment variables.');
            return NextResponse.json(
                { error: 'Server configuration error.' },
                { status: 500 }
            );
        }

        // Map frontend keys to HighLevel Custom Field keys (as defined in mapping guide)
        // Note: The frontend is expected to send 'quantity', 'panel', 'fabric', etc.
        // We can do a direct pass-through or a mapping here.
        // For simplicity and flexibility, we'll pass the structured object.
        // But HighLevel webhooks often prefer a flat object.

        const payload = {
            // Contact
            name: data.name,
            email: data.email,
            phone: data.phone,
            company_name: data.company,

            // Order Details
            quantity: data.quantity,
            previous_order_number: data.orderNumber,

            // Hat Configuration
            hat_panel_style: data.panel?.name,
            hat_structure: data.structure?.name,
            hat_fabric: data.fabric?.name,
            hat_bill_style: data.bill?.name,
            hat_closure: data.closure?.name,

            // Decoration
            front_decoration_location: data.frontDecoLocation?.name,
            front_decoration_type: data.frontDecoType?.name,
            second_decoration_location: data.secondDecoLocation?.name,
            second_decoration_type: data.secondDecoType?.name,

            // Raw Source (for debugging/fallback in notes)
            source: 'Website Customizer'
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
