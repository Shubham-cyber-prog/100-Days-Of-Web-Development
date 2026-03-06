// User types
export type UserRole = 'admin' | 'manager' | 'sales_rep';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt?: string;
}

// Lead types
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted';
export type LeadSource = 'website' | 'referral' | 'social' | 'email' | 'phone' | 'other';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  assignedTo: string;
  assignedToName: string;
  notes: string;
  score?: number; // Lead scoring (0-100)
  createdAt: string;
  updatedAt: string;
}

// Customer types
export type CustomerStage = 'prospect' | 'active' | 'inactive' | 'churned';

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  value: number;
  stage: CustomerStage;
  ownerId: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
}

// Deal types
export type DealStage = 
  | 'qualification' 
  | 'proposal' 
  | 'negotiation' 
  | 'closed_won' 
  | 'closed_lost';

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  customerId: string;
  closeDate: string | null;
  probability?: number; // Win probability (0-100)
  ownerId: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
}

// Interaction types
export type InteractionType = 'call' | 'email' | 'meeting' | 'note' | 'other';

export interface Interaction {
  id: string;
  type: InteractionType;
  notes: string;
  customerId: string;
  date: string;
  userId: string;
  userName: string;
  createdAt: string;
}

// Task types
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignedTo: string;
  assignedToName: string;
  relatedTo?: {
    type: 'lead' | 'customer' | 'deal';
    id: string;
    name: string;
  };
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

// Email types
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'follow_up' | 'proposal' | 'onboarding' | 'general';
  createdAt: string;
}

export interface Email {
  id: string;
  to: string;
  subject: string;
  body: string;
  templateId?: string;
  relatedTo?: {
    type: 'lead' | 'customer' | 'deal';
    id: string;
  };
  sentBy: string;
  sentByName: string;
  sentAt: string;
  opened?: boolean;
  openedAt?: string;
}

// Dashboard Widget types
export interface DashboardWidget {
  id: string;
  type: 'stats' | 'chart' | 'list';
  title: string;
  position: number;
  visible: boolean;
  config?: any;
}

// Analytics types
export interface DashboardStats {
  totalLeads: number;
  totalCustomers: number;
  conversionRate: number;
  totalRevenue: number;
  pipelineValue: number;
  activeDeals: number;
}

// Search types
export interface SearchResult {
  id: string;
  type: 'lead' | 'customer' | 'deal' | 'task';
  title: string;
  subtitle: string;
  metadata?: string;
}

export interface SavedFilter {
  id: string;
  name: string;
  entityType: 'lead' | 'customer' | 'deal';
  filters: any;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success?: boolean;
  error?: string;
  [key: string]: any;
}
