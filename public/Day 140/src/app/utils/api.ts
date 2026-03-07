import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c7b8121e`;

interface GenerateEmailParams {
  goal: string;
  tone: string;
  audience: string;
  keywords?: string;
  cta?: string;
}

interface GenerateEmailResponse {
  subject: string;
  body: string;
  confidenceScore: number;
  error?: string;
}

export async function generateEmail(params: GenerateEmailParams): Promise<GenerateEmailResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      const error: any = new Error(data.error || 'Failed to generate email');
      // Attach instructions if available
      if (data.instructions) {
        error.instructions = data.instructions;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error generating email:', error);
    throw error;
  }
}

export async function saveCampaign(campaign: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(campaign),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to save campaign');
    }

    return data;
  } catch (error) {
    console.error('Error saving campaign:', error);
    throw error;
  }
}

export async function getCampaigns() {
  try {
    const response = await fetch(`${API_BASE_URL}/campaigns`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch campaigns');
    }

    return data.campaigns || [];
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
}

export async function saveSegment(segment: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/segments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(segment),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to save segment');
    }

    return data;
  } catch (error) {
    console.error('Error saving segment:', error);
    throw error;
  }
}

export async function getSegments() {
  try {
    const response = await fetch(`${API_BASE_URL}/segments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch segments');
    }

    return data.segments || [];
  } catch (error) {
    console.error('Error fetching segments:', error);
    throw error;
  }
}