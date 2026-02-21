import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useAuthStore } from '../stores/authStore';
import { leadService, customerService, dealService } from '../services/api';
import type { Lead, Customer, Deal } from '../types';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';

export function Reports() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!accessToken) return;

    try {
      setIsLoading(true);
      const [leadsData, customersData, dealsData] = await Promise.all([
        leadService.getAll(accessToken),
        customerService.getAll(accessToken),
        dealService.getAll(accessToken),
      ]);
      setLeads(leadsData);
      setCustomers(customersData);
      setDeals(dealsData);
    } catch (error) {
      console.error('Failed to load report data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Lead status distribution
  const leadStatusData = [
    { name: 'New', value: leads.filter(l => l.status === 'new').length, color: '#3b82f6' },
    { name: 'Contacted', value: leads.filter(l => l.status === 'contacted').length, color: '#eab308' },
    { name: 'Qualified', value: leads.filter(l => l.status === 'qualified').length, color: '#22c55e' },
    { name: 'Unqualified', value: leads.filter(l => l.status === 'unqualified').length, color: '#ef4444' },
    { name: 'Converted', value: leads.filter(l => l.status === 'converted').length, color: '#a855f7' },
  ].filter(item => item.value > 0);

  // Lead source distribution
  const leadSourceData = [
    { name: 'Website', value: leads.filter(l => l.source === 'website').length },
    { name: 'Referral', value: leads.filter(l => l.source === 'referral').length },
    { name: 'Social', value: leads.filter(l => l.source === 'social').length },
    { name: 'Email', value: leads.filter(l => l.source === 'email').length },
    { name: 'Phone', value: leads.filter(l => l.source === 'phone').length },
    { name: 'Other', value: leads.filter(l => l.source === 'other').length },
  ].filter(item => item.value > 0);

  // Customer stage distribution
  const customerStageData = [
    { name: 'Prospect', value: customers.filter(c => c.stage === 'prospect').length, color: '#3b82f6' },
    { name: 'Active', value: customers.filter(c => c.stage === 'active').length, color: '#22c55e' },
    { name: 'Inactive', value: customers.filter(c => c.stage === 'inactive').length, color: '#eab308' },
    { name: 'Churned', value: customers.filter(c => c.stage === 'churned').length, color: '#ef4444' },
  ].filter(item => item.value > 0);

  // Deal stage distribution
  const dealStageData = [
    { name: 'Qualification', value: deals.filter(d => d.stage === 'qualification').length },
    { name: 'Proposal', value: deals.filter(d => d.stage === 'proposal').length },
    { name: 'Negotiation', value: deals.filter(d => d.stage === 'negotiation').length },
    { name: 'Closed Won', value: deals.filter(d => d.stage === 'closed_won').length },
    { name: 'Closed Lost', value: deals.filter(d => d.stage === 'closed_lost').length },
  ];

  // Revenue by stage
  const revenueByStage = [
    { 
      stage: 'Qualification', 
      revenue: deals.filter(d => d.stage === 'qualification').reduce((sum, d) => sum + d.value, 0) 
    },
    { 
      stage: 'Proposal', 
      revenue: deals.filter(d => d.stage === 'proposal').reduce((sum, d) => sum + d.value, 0) 
    },
    { 
      stage: 'Negotiation', 
      revenue: deals.filter(d => d.stage === 'negotiation').reduce((sum, d) => sum + d.value, 0) 
    },
    { 
      stage: 'Won', 
      revenue: deals.filter(d => d.stage === 'closed_won').reduce((sum, d) => sum + d.value, 0) 
    },
  ];

  const totalRevenue = deals
    .filter(d => d.stage === 'closed_won')
    .reduce((sum, d) => sum + d.value, 0);

  const conversionRate = leads.length > 0 
    ? ((customers.length / leads.length) * 100).toFixed(1)
    : '0.0';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">Comprehensive insights into your sales performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Customers</p>
                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{conversionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {leadStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={leadStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {leadStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-12">No lead data available</p>
            )}
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            {leadSourceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={leadSourceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-12">No source data available</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Stages */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Stages</CardTitle>
          </CardHeader>
          <CardContent>
            {customerStageData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={customerStageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {customerStageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-12">No customer data available</p>
            )}
          </CardContent>
        </Card>

        {/* Deal Stages */}
        <Card>
          <CardHeader>
            <CardTitle>Deals by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dealStageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Deal Stage</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueByStage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={{ fill: '#22c55e', r: 6 }}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
