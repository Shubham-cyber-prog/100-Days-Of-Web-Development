import { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { useAuthStore } from '../stores/authStore';
import { dealService, customerService } from '../services/api';
import type { Deal, Customer } from '../types';
import { toast } from 'sonner';
import { Plus, DollarSign, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const DEAL_STAGES = [
  { id: 'qualification', label: 'Qualification', color: 'bg-blue-100 border-blue-300' },
  { id: 'proposal', label: 'Proposal', color: 'bg-yellow-100 border-yellow-300' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-orange-100 border-orange-300' },
  { id: 'closed_won', label: 'Closed Won', color: 'bg-green-100 border-green-300' },
  { id: 'closed_lost', label: 'Closed Lost', color: 'bg-red-100 border-red-300' },
];

interface DealCardProps {
  deal: Deal;
  onUpdate: (id: string, stage: Deal['stage']) => void;
}

function DealCard({ deal, onUpdate }: DealCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'deal',
    item: { id: deal.id, stage: deal.stage },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`
        p-4 bg-white rounded-lg border-2 border-gray-200 cursor-move
        hover:shadow-md transition-all
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <h4 className="font-semibold text-gray-900 mb-2">{deal.title}</h4>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
          <DollarSign className="w-4 h-4" />
          ${deal.value.toLocaleString()}
        </div>
        {deal.closeDate && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            {new Date(deal.closeDate).toLocaleDateString()}
          </div>
        )}
        <p className="text-xs text-gray-500">Owner: {deal.ownerName}</p>
      </div>
    </div>
  );
}

interface DealColumnProps {
  stage: typeof DEAL_STAGES[0];
  deals: Deal[];
  onDrop: (dealId: string, newStage: Deal['stage']) => void;
}

function DealColumn({ stage, deals, onDrop }: DealColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'deal',
    drop: (item: { id: string; stage: string }) => {
      if (item.stage !== stage.id) {
        onDrop(item.id, stage.id as Deal['stage']);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <div
      ref={drop}
      className={`
        flex-1 min-w-[280px] rounded-lg border-2 p-4 transition-colors
        ${stage.color}
        ${isOver ? 'ring-2 ring-blue-500' : ''}
      `}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900">{stage.label}</h3>
          <Badge variant="secondary">{deals.length}</Badge>
        </div>
        <p className="text-sm font-medium text-gray-700">
          ${totalValue.toLocaleString()}
        </p>
      </div>
      <div className="space-y-3">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} onUpdate={onDrop} />
        ))}
      </div>
    </div>
  );
}

export function Deals() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    value: 0,
    stage: 'qualification' as Deal['stage'],
    customerId: '',
    closeDate: '',
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
      const [dealsData, customersData] = await Promise.all([
        dealService.getAll(accessToken),
        customerService.getAll(accessToken),
      ]);
      setDeals(dealsData);
      setCustomers(customersData);
    } catch (error) {
      toast.error('Failed to load deals');
      console.error('Load deals error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    try {
      await dealService.create(formData, accessToken);
      toast.success('Deal created successfully');
      resetForm();
      setIsDialogOpen(false);
      loadData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create deal');
    }
  };

  const handleDealDrop = async (dealId: string, newStage: Deal['stage']) => {
    if (!accessToken) return;

    try {
      await dealService.update(dealId, { stage: newStage }, accessToken);
      
      // Update local state
      setDeals((prevDeals) =>
        prevDeals.map((deal) =>
          deal.id === dealId ? { ...deal, stage: newStage } : deal
        )
      );
      
      toast.success('Deal stage updated');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update deal');
      loadData(); // Reload on error
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      value: 0,
      stage: 'qualification',
      customerId: '',
      closeDate: '',
    });
  };

  const getDealsByStage = (stageId: string) => {
    return deals.filter((deal) => deal.stage === stageId);
  };

  const totalPipelineValue = deals
    .filter((deal) => deal.stage !== 'closed_lost')
    .reduce((sum, deal) => sum + deal.value, 0);

  const totalWonValue = deals
    .filter((deal) => deal.stage === 'closed_won')
    .reduce((sum, deal) => sum + deal.value, 0);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Deals Pipeline</h1>
            <p className="text-gray-600 mt-1">Track and manage your sales opportunities</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Deal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Deal</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Deal Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer *</Label>
                  <Select
                    value={formData.customerId}
                    onValueChange={(value) => setFormData({ ...formData, customerId: value })}
                  >
                    <SelectTrigger id="customer">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Deal Value ($) *</Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stage">Stage</Label>
                  <Select
                    value={formData.stage}
                    onValueChange={(value) => setFormData({ ...formData, stage: value as Deal['stage'] })}
                  >
                    <SelectTrigger id="stage">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEAL_STAGES.filter(s => !s.id.startsWith('closed')).map((stage) => (
                        <SelectItem key={stage.id} value={stage.id}>
                          {stage.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closeDate">Expected Close Date</Label>
                  <Input
                    id="closeDate"
                    type="date"
                    value={formData.closeDate}
                    onChange={(e) => setFormData({ ...formData, closeDate: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Create Deal
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Pipeline Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Total Pipeline Value</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ${totalPipelineValue.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Closed Won</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                ${totalWonValue.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Active Deals</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {deals.filter(d => !d.stage.startsWith('closed')).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Board */}
        {isLoading ? (
          <p className="text-gray-500 text-center py-8">Loading deals...</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {DEAL_STAGES.map((stage) => (
              <DealColumn
                key={stage.id}
                stage={stage}
                deals={getDealsByStage(stage.id)}
                onDrop={handleDealDrop}
              />
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
}