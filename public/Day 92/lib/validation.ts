import { z } from 'zod';

export const registrationSchema = z.object({
    teamName: z.string().min(3, 'Team name must be at least 3 characters').max(100),
    leaderName: z.string().min(2, 'Leader name must be at least 2 characters').max(100),
    leaderEmail: z.string().email('Invalid email address'),
    leaderPhone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number').min(10),
    teamSize: z.number().int().min(1).max(5, 'Team size must be between 1 and 5'),
    members: z.array(z.object({
        name: z.string().min(2),
        email: z.string().email(),
        role: z.string().optional(),
    })),
    projectIdea: z.string().min(50, 'Project idea must be at least 50 characters').max(1000),
    techStack: z.string().min(3, 'Please specify your tech stack'),
    experienceLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
