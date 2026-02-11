import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const result = await query(
            'SELECT * FROM registrations ORDER BY created_at DESC'
        );

        return NextResponse.json({
            success: true,
            data: result.rows,
        });

    } catch (error) {
        console.error('Error fetching registrations:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch registrations',
        }, { status: 500 });
    }
}
