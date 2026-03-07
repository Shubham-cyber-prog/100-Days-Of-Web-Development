import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import { 
  Users, 
  Plus,
  Search,
  Upload,
  Download,
  Mail,
  MailCheck,
  MailX,
  TrendingUp,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  UserPlus,
  FileText
} from "lucide-react";

interface Contact {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: "subscribed" | "unsubscribed" | "bounced";
  tags: string[];
  source: string;
  joinedDate: string;
  lastEngaged?: string;
  totalOpens: number;
  totalClicks: number;
  engagementScore: number;
}

export default function ContactManagerPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      email: "sarah.johnson@example.com",
      firstName: "Sarah",
      lastName: "Johnson",
      status: "subscribed",
      tags: ["VIP", "Tech"],
      source: "Website Signup",
      joinedDate: "2026-01-15",
      lastEngaged: "2026-03-05",
      totalOpens: 45,
      totalClicks: 23,
      engagementScore: 92,
    },
    {
      id: "2",
      email: "michael.chen@example.com",
      firstName: "Michael",
      lastName: "Chen",
      status: "subscribed",
      tags: ["New"],
      source: "Import",
      joinedDate: "2026-02-20",
      lastEngaged: "2026-03-04",
      totalOpens: 12,
      totalClicks: 5,
      engagementScore: 68,
    },
    {
      id: "3",
      email: "emily.davis@example.com",
      firstName: "Emily",
      lastName: "Davis",
      status: "unsubscribed",
      tags: [],
      source: "Webinar",
      joinedDate: "2025-11-10",
      lastEngaged: "2026-02-01",
      totalOpens: 8,
      totalClicks: 2,
      engagementScore: 35,
    },
    {
      id: "4",
      email: "james.wilson@example.com",
      firstName: "James",
      lastName: "Wilson",
      status: "bounced",
      tags: ["Enterprise"],
      source: "Conference",
      joinedDate: "2026-01-05",
      totalOpens: 0,
      totalClicks: 0,
      engagementScore: 0,
    },
    {
      id: "5",
      email: "lisa.anderson@example.com",
      firstName: "Lisa",
      lastName: "Anderson",
      status: "subscribed",
      tags: ["VIP", "Engaged"],
      source: "Referral",
      joinedDate: "2025-12-01",
      lastEngaged: "2026-03-06",
      totalOpens: 67,
      totalClicks: 34,
      engagementScore: 98,
    },
  ]);

  const [newContact, setNewContact] = useState({
    email: "",
    firstName: "",
    lastName: "",
    tags: "",
  });

  const stats = {
    total: contacts.length,
    subscribed: contacts.filter(c => c.status === "subscribed").length,
    unsubscribed: contacts.filter(c => c.status === "unsubscribed").length,
    bounced: contacts.filter(c => c.status === "bounced").length,
    avgEngagement: Math.round(contacts.reduce((sum, c) => sum + c.engagementScore, 0) / contacts.length),
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || contact.status === filterStatus;
    
    const matchesTab = 
      activeTab === "all" ||
      (activeTab === "subscribed" && contact.status === "subscribed") ||
      (activeTab === "unsubscribed" && contact.status === "unsubscribed") ||
      (activeTab === "bounced" && contact.status === "bounced");

    return matchesSearch && matchesStatus && matchesTab;
  });

  const handleAddContact = () => {
    if (!newContact.email || !newContact.firstName || !newContact.lastName) {
      toast.error("Please fill in all required fields");
      return;
    }

    const contact: Contact = {
      id: Date.now().toString(),
      email: newContact.email,
      firstName: newContact.firstName,
      lastName: newContact.lastName,
      status: "subscribed",
      tags: newContact.tags ? newContact.tags.split(",").map(t => t.trim()) : [],
      source: "Manual Entry",
      joinedDate: new Date().toISOString().split('T')[0],
      totalOpens: 0,
      totalClicks: 0,
      engagementScore: 0,
    };

    setContacts([contact, ...contacts]);
    setShowAddModal(false);
    setNewContact({ email: "", firstName: "", lastName: "", tags: "" });
    toast.success("Contact added successfully!");
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
    toast.success("Contact deleted");
  };

  const handleExport = () => {
    toast.success("Exporting contacts to CSV...");
  };

  const handleImport = () => {
    toast.success("Import functionality coming soon!");
  };

  const toggleSelectContact = (id: string) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const getEngagementColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getEngagementBadge = (score: number) => {
    if (score >= 80) return { label: "High", variant: "default" as const };
    if (score >= 50) return { label: "Medium", variant: "secondary" as const };
    return { label: "Low", variant: "outline" as const };
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="w-8 h-8 text-indigo-600" />
            Contact Manager
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your subscriber list and track engagement
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImport} className="gap-2">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button onClick={() => setShowAddModal(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Contacts</p>
              <p className="text-2xl font-bold mt-1">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Subscribed</p>
              <p className="text-2xl font-bold mt-1 text-green-600">{stats.subscribed}</p>
            </div>
            <MailCheck className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Unsubscribed</p>
              <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.unsubscribed}</p>
            </div>
            <MailX className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Bounced</p>
              <p className="text-2xl font-bold mt-1 text-red-600">{stats.bounced}</p>
            </div>
            <Mail className="w-8 h-8 text-red-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Engagement</p>
              <p className="text-2xl font-bold mt-1">{stats.avgEngagement}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="subscribed">Subscribed</SelectItem>
              <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
              <SelectItem value="bounced">Bounced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Contacts Table */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="subscribed">Subscribed ({stats.subscribed})</TabsTrigger>
          <TabsTrigger value="unsubscribed">Unsubscribed ({stats.unsubscribed})</TabsTrigger>
          <TabsTrigger value="bounced">Bounced ({stats.bounced})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {selectedContacts.length > 0 && (
            <Card className="p-4 mb-4 bg-indigo-50 dark:bg-indigo-950/20">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {selectedContacts.length} contact{selectedContacts.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Add to Segment</Button>
                  <Button size="sm" variant="outline">Send Email</Button>
                  <Button size="sm" variant="outline" className="text-red-600">Delete</Button>
                </div>
              </div>
            </Card>
          )}

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="p-4 w-12">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedContacts(filteredContacts.map(c => c.id));
                          } else {
                            setSelectedContacts([]);
                          }
                        }}
                        checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                        className="rounded"
                      />
                    </th>
                    <th className="p-4 font-semibold">Contact</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Tags</th>
                    <th className="p-4 font-semibold">Source</th>
                    <th className="p-4 font-semibold">Engagement</th>
                    <th className="p-4 font-semibold">Stats</th>
                    <th className="p-4 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => {
                    const engagementBadge = getEngagementBadge(contact.engagementScore);
                    return (
                      <tr key={contact.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedContacts.includes(contact.id)}
                            onChange={() => toggleSelectContact(contact.id)}
                            className="rounded"
                          />
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{contact.firstName} {contact.lastName}</p>
                            <p className="text-sm text-muted-foreground">{contact.email}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant={
                            contact.status === "subscribed" ? "default" :
                            contact.status === "unsubscribed" ? "secondary" :
                            "destructive"
                          }>
                            {contact.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1 flex-wrap">
                            {contact.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-sm">{contact.source}</td>
                        <td className="p-4">
                          <div>
                            <div className={`font-semibold ${getEngagementColor(contact.engagementScore)}`}>
                              {contact.engagementScore}
                            </div>
                            <Badge variant={engagementBadge.variant} className="text-xs mt-1">
                              {engagementBadge.label}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4 text-sm">
                          <div className="text-xs text-muted-foreground">
                            <div>{contact.totalOpens} opens</div>
                            <div>{contact.totalClicks} clicks</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 p-0 text-red-600"
                              onClick={() => handleDeleteContact(contact.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredContacts.length === 0 && (
                <div className="p-12 text-center text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No contacts found</p>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-indigo-600" />
              Add New Contact
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contact@example.com"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={newContact.firstName}
                    onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={newContact.lastName}
                    onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  placeholder="VIP, Tech, Engaged"
                  value={newContact.tags}
                  onChange={(e) => setNewContact({ ...newContact, tags: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleAddContact} className="flex-1">
                  Add Contact
                </Button>
                <Button onClick={() => setShowAddModal(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
