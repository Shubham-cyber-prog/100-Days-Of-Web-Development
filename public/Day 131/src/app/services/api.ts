import { apiRequest } from '../lib/supabase';
import type { User, Lead, Customer, Deal, Interaction, DashboardStats, Task, EmailTemplate, Email } from '../types';

// ============================================
// AUTHENTICATION SERVICES
// ============================================

export const authService = {
  async signup(email: string, password: string, name: string, role: string = 'sales_rep') {
    const data = await apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, role }),
    });
    return data;
  },

  async login(email: string, password: string) {
    const data = await apiRequest<{ accessToken: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return data;
  },

  async getCurrentUser(token: string) {
    const data = await apiRequest<{ user: User }>('/auth/me', {
      method: 'GET',
    }, token);
    return data.user;
  },
};

// ============================================
// LEAD SERVICES
// ============================================

export const leadService = {
  async create(lead: Partial<Lead>, token: string) {
    const data = await apiRequest<{ lead: Lead }>('/leads', {
      method: 'POST',
      body: JSON.stringify(lead),
    }, token);
    return data.lead;
  },

  async getAll(token: string) {
    const data = await apiRequest<{ leads: Lead[] }>('/leads', {
      method: 'GET',
    }, token);
    return data.leads;
  },

  async update(id: string, updates: Partial<Lead>, token: string) {
    const data = await apiRequest<{ lead: Lead }>(`/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }, token);
    return data.lead;
  },

  async delete(id: string, token: string) {
    await apiRequest(`/leads/${id}`, {
      method: 'DELETE',
    }, token);
  },
};

// ============================================
// CUSTOMER SERVICES
// ============================================

export const customerService = {
  async create(customer: Partial<Customer>, token: string) {
    const data = await apiRequest<{ customer: Customer }>('/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    }, token);
    return data.customer;
  },

  async getAll(token: string) {
    const data = await apiRequest<{ customers: Customer[] }>('/customers', {
      method: 'GET',
    }, token);
    return data.customers;
  },

  async update(id: string, updates: Partial<Customer>, token: string) {
    const data = await apiRequest<{ customer: Customer }>(`/customers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }, token);
    return data.customer;
  },
};

// ============================================
// DEAL SERVICES
// ============================================

export const dealService = {
  async create(deal: Partial<Deal>, token: string) {
    const data = await apiRequest<{ deal: Deal }>('/deals', {
      method: 'POST',
      body: JSON.stringify(deal),
    }, token);
    return data.deal;
  },

  async getAll(token: string) {
    const data = await apiRequest<{ deals: Deal[] }>('/deals', {
      method: 'GET',
    }, token);
    return data.deals;
  },

  async update(id: string, updates: Partial<Deal>, token: string) {
    const data = await apiRequest<{ deal: Deal }>(`/deals/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }, token);
    return data.deal;
  },
};

// ============================================
// INTERACTION SERVICES
// ============================================

export const interactionService = {
  async create(interaction: Partial<Interaction>, token: string) {
    const data = await apiRequest<{ interaction: Interaction }>('/interactions', {
      method: 'POST',
      body: JSON.stringify(interaction),
    }, token);
    return data.interaction;
  },

  async getByCustomer(customerId: string, token: string) {
    const data = await apiRequest<{ interactions: Interaction[] }>(
      `/interactions/${customerId}`,
      { method: 'GET' },
      token
    );
    return data.interactions;
  },
};

// ============================================
// ANALYTICS SERVICES
// ============================================

export const analyticsService = {
  async getDashboardStats(token: string) {
    const data = await apiRequest<DashboardStats>('/analytics/dashboard', {
      method: 'GET',
    }, token);
    return data;
  },
};

// ============================================
// TASK SERVICES
// ============================================

export const taskService = {
  async create(task: Partial<Task>, token: string) {
    const data = await apiRequest<{ task: Task }>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    }, token);
    return data.task;
  },

  async getAll(token: string) {
    const data = await apiRequest<{ tasks: Task[] }>('/tasks', {
      method: 'GET',
    }, token);
    return data.tasks;
  },

  async update(id: string, updates: Partial<Task>, token: string) {
    const data = await apiRequest<{ task: Task }>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }, token);
    return data.task;
  },

  async delete(id: string, token: string) {
    await apiRequest(`/tasks/${id}`, {
      method: 'DELETE',
    }, token);
  },
};

// ============================================
// EMAIL SERVICES
// ============================================

export const emailService = {
  async sendEmail(email: Partial<Email>, token: string) {
    const data = await apiRequest<{ email: Email }>('/emails/send', {
      method: 'POST',
      body: JSON.stringify(email),
    }, token);
    return data.email;
  },

  async getTemplates(token: string) {
    const data = await apiRequest<{ templates: EmailTemplate[] }>('/emails/templates', {
      method: 'GET',
    }, token);
    return data.templates;
  },

  async createTemplate(template: Partial<EmailTemplate>, token: string) {
    const data = await apiRequest<{ template: EmailTemplate }>('/emails/templates', {
      method: 'POST',
      body: JSON.stringify(template),
    }, token);
    return data.template;
  },

  async getSentEmails(token: string) {
    const data = await apiRequest<{ emails: Email[] }>('/emails', {
      method: 'GET',
    }, token);
    return data.emails;
  },
};
