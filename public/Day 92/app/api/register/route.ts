import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { registrationSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate the request body
        const validatedData = registrationSchema.parse(body);

        // Insert into database
        const result = await query(
            `INSERT INTO registrations (
        team_name, leader_name, leader_email, leader_phone,
        team_size, members, project_idea, tech_stack, experience_level
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
            [
                validatedData.teamName,
                validatedData.leaderName,
                validatedData.leaderEmail,
                validatedData.leaderPhone,
                validatedData.teamSize,
                JSON.stringify(validatedData.members),
                validatedData.projectIdea,
                validatedData.techStack,
                validatedData.experienceLevel,
            ]
        );

        return NextResponse.json({
            success: true,
            message: 'Registration successful!',
            data: result.rows[0],
        }, { status: 201 });

    } catch (error: unknown) {
        console.error('Registration error:', error);

        // Type guard for Zod errors
        if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError' && 'errors' in error) {
            return NextResponse.json({
                success: false,
                message: 'Validation error',
                errors: error.errors,
            }, { status: 400 });
        }

        // Type guard for PostgreSQL errors
        if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
            return NextResponse.json({
                success: false,
                message: 'This email is already registered',
            }, { status: 409 });
        }

        return NextResponse.json({
            success: false,
            message: 'Internal server error',
        }, { status: 500 });
    }
}
