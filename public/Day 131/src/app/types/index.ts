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

// Analytics types
export interface DashboardStats {
  totalLeads: number;
  totalCustomers: number;
  conversionRate: number;
  totalRevenue: number;
  pipelineValue: number;
  activeDeals: number;
}

// API Response types
export interface ApiResponse<T = any> {
  success?: boolean;
  error?: string;
  [key: string]: any;
}
