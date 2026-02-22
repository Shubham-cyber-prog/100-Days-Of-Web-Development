'use client';

import { useState } from 'react';
import { RegistrationData, TeamMember } from '@/types';

/**
 * Generic fetch wrapper with error handling and retry logic
 */
async function fetchWithErrorHandling(
    url: string,
    options?: RequestInit,
    retries: number = 3
): Promise<any> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000);

            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType?.includes('application/json')) {
                throw new Error('Invalid response format: expected JSON');
            }

            return await response.json();
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            lastError = error;

            const isRetryable =
                error instanceof TypeError ||
                error.name === 'AbortError' ||
                error.message.includes('HTTP');

            if (attempt < retries && isRetryable) {
                console.warn(`Retry attempt ${attempt}/${retries}:`, error.message);
                await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
                continue;
            }

            throw error;
        }
    }

    throw lastError || new Error('Unknown error');
}

/**
 * Form validation utility
 */
function validateFormData(formData: RegistrationData, members: TeamMember[]): string | null {
    if (!formData.teamName.trim()) {
        return 'Team name is required';
    }
    if (!formData.leaderName.trim()) {
        return 'Leader name is required';
    }
    if (!formData.leaderEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return 'Valid email is required';
    }
    if (!formData.leaderPhone.trim()) {
        return 'Phone number is required';
    }
    if (formData.projectIdea.trim().length < 50) {
        return 'Project idea must be at least 50 characters';
    }
    if (!formData.techStack.trim()) {
        return 'Tech stack is required';
    }

    // Validate team members if any
    for (const member of members) {
        if (member.name && !member.email) {
            return 'All team members must have an email';
        }
        if (member.email && !member.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return 'Invalid email for team member';
        }
    }

    return null;
}

export default function RegistrationForm() {
    const [formData, setFormData] = useState<RegistrationData>({
        teamName: '',
        leaderName: '',
        leaderEmail: '',
        leaderPhone: '',
        teamSize: 1,
        members: [],
        projectIdea: '',
        techStack: '',
        experienceLevel: 'Beginner',
    });

    const [members, setMembers] = useState<TeamMember[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'teamSize' ? parseInt(value) || 1 : value,
        }));
    };

    const addMember = () => {
        if (members.length < 4) {
            setMembers([...members, { name: '', email: '', role: '' }]);
        }
    };

    const removeMember = (index: number) => {
        setMembers(members.filter((_, i) => i !== index));
    };

    const updateMember = (index: number, field: keyof TeamMember, value: string) => {
        const updated = [...members];
        updated[index] = { ...updated[index], [field]: value };
        setMembers(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        // Validate form before submission
        const validationError = validateFormData(formData, members);
        if (validationError) {
            setMessage({ type: 'error', text: validationError });
            return;
        }

        setIsSubmitting(true);

        try {
            const data = await fetchWithErrorHandling('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    members,
                }),
            });

            if (data.success || data.id) {
                setMessage({ type: 'success', text: '✓ Registration successful! 🎉' });
                // Reset form
                setFormData({
                    teamName: '',
                    leaderName: '',
                    leaderEmail: '',
                    leaderPhone: '',
                    teamSize: 1,
                    members: [],
                    projectIdea: '',
                    techStack: '',
                    experienceLevel: 'Beginner',
                });
                setMembers([]);
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            console.error('Registration error:', error);

            let errorMsg = 'Registration failed';

            if (error.message.includes('Failed to fetch')) {
                errorMsg = 'Network error. Please check your connection.';
            } else if (error.name === 'AbortError') {
                errorMsg = 'Request timeout. Please try again.';
            } else if (error.message.includes('HTTP')) {
                errorMsg = `Server error: ${error.message}`;
            } else {
                errorMsg = error.message;
            }

            setMessage({ type: 'error', text: `⚠️ ${errorMsg}` });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
                <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'}`}>
                    <p className={message.type === 'success' ? 'text-green-300' : 'text-red-300'}>{message.text}</p>
                </div>
            )}

            {/* Team Information */}
            <div className="glass-card p-6 space-y-4">
                <h3 className="text-xl font-bold text-orange-400">Team Information</h3>

                <div>
                    <label className="block text-sm font-medium mb-2">Team Name *</label>
                    <input
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Team Leader Name *</label>
                        <input
                            type="text"
                            name="leaderName"
                            value={formData.leaderName}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                            type="email"
                            name="leaderEmail"
                            value={formData.leaderEmail}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Phone Number *</label>
                        <input
                            type="tel"
                            name="leaderPhone"
                            value={formData.leaderPhone}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Team Size (1-5) *</label>
                        <input
                            type="number"
                            name="teamSize"
                            min="1"
                            max="5"
                            value={formData.teamSize}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                    </div>
                </div>
            </div>

            {/* Team Members */}
            <div className="glass-card p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-orange-400">Team Members (Optional)</h3>
                    <button
                        type="button"
                        onClick={addMember}
                        disabled={members.length >= 4 || isSubmitting}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 rounded-lg transition"
                    >
                        + Add Member
                    </button>
                </div>

                {members.map((member, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg space-y-3">
                        <div className="flex justify-between items-center">
                            <h4 className="font-medium">Member {index + 1}</h4>
                            <button
                                type="button"
                                onClick={() => removeMember(index)}
                                disabled={isSubmitting}
                                className="text-red-400 hover:text-red-300 disabled:text-gray-500"
                            >
                                Remove
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                type="text"
                                placeholder="Name"
                                value={member.name}
                                onChange={(e) => updateMember(index, 'name', e.target.value)}
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 disabled:opacity-50"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={member.email}
                                onChange={(e) => updateMember(index, 'email', e.target.value)}
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 disabled:opacity-50"
                            />
                            <input
                                type="text"
                                placeholder="Role (e.g., Developer)"
                                value={member.role}
                                onChange={(e) => updateMember(index, 'role', e.target.value)}
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 disabled:opacity-50"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Project Details */}
            <div className="glass-card p-6 space-y-4">
                <h3 className="text-xl font-bold text-orange-400">Project Details</h3>

                <div>
                    <label className="block text-sm font-medium mb-2">Project Idea (min 50 characters) *</label>
                    <textarea
                        name="projectIdea"
                        value={formData.projectIdea}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        rows={4}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 disabled:opacity-50"
                        placeholder="Describe your hackathon project idea..."
                    />
                    <p className={`text-sm mt-1 ${formData.projectIdea.length < 50 ? 'text-red-400' : 'text-green-400'}`}>
                        {formData.projectIdea.length} / 50 characters
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Tech Stack *</label>
                    <input
                        type="text"
                        name="techStack"
                        value={formData.techStack}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        placeholder="e.g., React, Node.js, PostgreSQL"
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 disabled:opacity-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Experience Level *</label>
                    <select
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 disabled:opacity-50"
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 rounded-lg font-bold text-lg transition transform hover:scale-105 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Submitting...' : 'Register Team 🚀'}
            </button>
        </form>
    );
}

                <div>
                    <label className="block text-sm font-medium mb-2">Team Name *</label>
                    <input
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Team Leader Name *</label>
                        <input
                            type="text"
                            name="leaderName"
                            value={formData.leaderName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                            type="email"
                            name="leaderEmail"
                            value={formData.leaderEmail}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Phone Number *</label>
                        <input
                            type="tel"
                            name="leaderPhone"
                            value={formData.leaderPhone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Team Size (1-5) *</label>
                        <input
                            type="number"
                            name="teamSize"
                            min="1"
                            max="5"
                            value={formData.teamSize}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                    </div>
                </div>
            </div>

            {/* Team Members */}
            <div className="glass-card p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-orange-400">Team Members (Optional)</h3>
                    <button
                        type="button"
                        onClick={addMember}
                        disabled={members.length >= 4}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 rounded-lg transition"
                    >
                        + Add Member
                    </button>
                </div>

                {members.map((member, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg space-y-3">
                        <div className="flex justify-between items-center">
                            <h4 className="font-medium">Member {index + 1}</h4>
                            <button
                                type="button"
                                onClick={() => removeMember(index)}
                                className="text-red-400 hover:text-red-300"
                            >
                                Remove
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                type="text"
                                placeholder="Name"
                                value={member.name}
                                onChange={(e) => updateMember(index, 'name', e.target.value)}
                                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={member.email}
                                onChange={(e) => updateMember(index, 'email', e.target.value)}
                                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                            />
                            <input
                                type="text"
                                placeholder="Role (e.g., Developer)"
                                value={member.role}
                                onChange={(e) => updateMember(index, 'role', e.target.value)}
                                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Project Details */}
            <div className="glass-card p-6 space-y-4">
                <h3 className="text-xl font-bold text-orange-400">Project Details</h3>

                <div>
                    <label className="block text-sm font-medium mb-2">Project Idea (min 50 characters) *</label>
                    <textarea
                        name="projectIdea"
                        value={formData.projectIdea}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="Describe your hackathon project idea..."
                    />
                    <p className="text-sm text-gray-400 mt-1">{formData.projectIdea.length} / 50 characters</p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Tech Stack *</label>
                    <input
                        type="text"
                        name="techStack"
                        value={formData.techStack}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., React, Node.js, PostgreSQL"
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Experience Level *</label>
                    <select
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500"
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 rounded-lg font-bold text-lg transition transform hover:scale-105"
            >
                {isSubmitting ? 'Submitting...' : 'Register Team 🚀'}
            </button>
        </form>
    );
}
