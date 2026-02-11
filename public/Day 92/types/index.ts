export interface TeamMember {
    name: string;
    email: string;
    role?: string;
}

export interface RegistrationData {
    teamName: string;
    leaderName: string;
    leaderEmail: string;
    leaderPhone: string;
    teamSize: number;
    members: TeamMember[];
    projectIdea: string;
    techStack: string;
    experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface RegistrationResponse {
    id: number;
    team_name: string;
    leader_name: string;
    leader_email: string;
    leader_phone: string;
    team_size: number;
    members: TeamMember[];
    project_idea: string;
    tech_stack: string;
    experience_level: string;
    created_at: string;
}
