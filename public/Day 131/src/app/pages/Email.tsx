import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { useAuthStore } from '../stores/authStore';
import { emailService, leadService, customerService } from '../services/api';
import type { EmailTemplate, Email, Lead, Customer } from '../types';
import { toast } from 'sonner';
import { Mail, Plus, Send, FileText, Clock } from 'lucide-react';

export function EmailPage() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [sentEmails, setSentEmails] = useState<Email[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

  const [emailForm, setEmailForm] = useState({
    to: '',
    subject: '',
    body: '',
    templateId: '',
    recipientType: '' as 'lead' | 'customer' | 'manual',
    recipientId: '',
  });

  const [templateForm, setTemplateForm] = useState({
    name: '',
    subject: '',
    body: '',
    category: 'general' as EmailTemplate['category'],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const [templatesData, emailsData, leadsData, customersData] = await Promise.all([
        emailService.getTemplates(accessToken).catch(err => {
          console.error('Templates error:', err);
          return [];
        }),
        emailService.getSentEmails(accessToken).catch(err => {
          console.error('Emails error:', err);
          return [];
        }),
        leadService.getAll(accessToken).catch(err => {
          console.error('Leads error:', err);
          return [];
        }),
        customerService.getAll(accessToken).catch(err => {
          console.error('Customers error:', err);
          return [];
        }),
      ]);
      setTemplates(templatesData);
      setSentEmails(emailsData);
      setLeads(leadsData);
      setCustomers(customersData);
    } catch (error) {
      console.error('Load email data error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    try {
      const relatedTo = emailForm.recipientId ? {
        type: emailForm.recipientType,
        id: emailForm.recipientId,
      } : undefined;

      await emailService.sendEmail({
        to: emailForm.to,
        subject: emailForm.subject,
        body: emailForm.body,
        templateId: emailForm.templateId || undefined,
        relatedTo,
      }, accessToken);

      toast.success('Email sent successfully! (Demo mode - not actually sent)');
      resetEmailForm();
      setIsComposeOpen(false);
      loadData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to send email');
    }
  };

  const handleCreateTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    try {
      await emailService.createTemplate(templateForm, accessToken);
      toast.success('Template created successfully');
      resetTemplateForm();
      setIsTemplateDialogOpen(false);
      loadData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create template');
    }
  };

  const handleUseTemplate = (template: EmailTemplate) => {
    setEmailForm({
      ...emailForm,
      subject: template.subject,
      body: template.body,
      templateId: template.id,
    });
    setIsComposeOpen(true);
  };

  const handleRecipientChange = (type: 'lead' | 'customer', id: string) => {
    const recipient = type === 'lead' 
      ? leads.find(l => l.id === id)
      : customers.find(c => c.id === id);

    if (recipient) {
      setEmailForm({
        ...emailForm,
        to: recipient.email,
        recipientType: type,
        recipientId: id,
        // Replace placeholders in template
        body: emailForm.body
          .replace('{{name}}', recipient.name)
          .replace('{{sender}}', user?.name || 'Your Name'),
      });
    }
  };

  const resetEmailForm = () => {
    setEmailForm({
      to: '',
      subject: '',
      body: '',
      templateId: '',
      recipientType: 'manual',
      recipientId: '',
    });
  };

  const resetTemplateForm = () => {
    setTemplateForm({
      name: '',
      subject: '',
      body: '',
      category: 'general',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      follow_up: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      proposal: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      onboarding: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      general: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    };
    return colors[category] || colors.general;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Email</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage email templates and communication</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Email Template</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateTemplate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name *</Label>
                  <Input
                    id="template-name"
                    value={templateForm.name}
                    onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-category">Category</Label>
                  <Select
                    value={templateForm.category}
                    onValueChange={(value) => setTemplateForm({ ...templateForm, category: value as EmailTemplate['category'] })}
                  >
                    <SelectTrigger id="template-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="follow_up">Follow-up</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="onboarding">Onboarding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-subject">Subject *</Label>
                  <Input
                    id="template-subject"
                    value={templateForm.subject}
                    onChange={(e) => setTemplateForm({ ...templateForm, subject: e.target.value })}
                    placeholder="Use {{name}}, {{company}}, {{sender}} for placeholders"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-body">Email Body *</Label>
                  <Textarea
                    id="template-body"
                    value={templateForm.body}
                    onChange={(e) => setTemplateForm({ ...templateForm, body: e.target.value })}
                    placeholder="Use {{name}}, {{company}}, {{sender}} for placeholders"
                    rows={8}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Create Template
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetTemplateForm();
                      setIsTemplateDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isComposeOpen} onOpenChange={(open) => {
            setIsComposeOpen(open);
            if (!open) resetEmailForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Compose Email
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Compose Email</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div className="space-y-2">
                  <Label>Quick Select Recipient</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      value={emailForm.recipientType === 'lead' ? emailForm.recipientId : ''}
                      onValueChange={(value) => handleRecipientChange('lead', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a lead" />
                      </SelectTrigger>
                      <SelectContent>
                        {leads.map(lead => (
                          <SelectItem key={lead.id} value={lead.id}>
                            {lead.name} ({lead.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={emailForm.recipientType === 'customer' ? emailForm.recipientId : ''}
                      onValueChange={(value) => handleRecipientChange('customer', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map(customer => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name} ({customer.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-to">To *</Label>
                  <Input
                    id="email-to"
                    type="email"
                    value={emailForm.to}
                    onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })}
                    placeholder="recipient@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-subject">Subject *</Label>
                  <Input
                    id="email-subject"
                    value={emailForm.subject}
                    onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-body">Message *</Label>
                  <Textarea
                    id="email-body"
                    value={emailForm.body}
                    onChange={(e) => setEmailForm({ ...emailForm, body: e.target.value })}
                    rows={10}
                    required
                  />
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Demo Mode:</strong> Emails are logged but not actually sent. In production, integrate with SendGrid, AWS SES, or similar service.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetEmailForm();
                      setIsComposeOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Sent</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{sentEmails.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Templates</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{templates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sentEmails.filter(e => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(e.sentAt) > weekAgo;
                  }).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="sent">Sent Emails</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          {isLoading ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">Loading templates...</p>
          ) : templates.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No templates found. Create your first template!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge className={getCategoryColor(template.category)}>
                        {template.category.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Subject:</p>
                      <p className="text-sm text-gray-900 dark:text-white">{template.subject}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Preview:</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                        {template.body}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleUseTemplate(template)}
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="sent">
          {isLoading ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">Loading sent emails...</p>
          ) : sentEmails.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No sent emails yet</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {sentEmails.map((email) => (
                    <div key={email.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{email.subject}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">To: {email.to}</p>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(email.sentAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                        {email.body}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
