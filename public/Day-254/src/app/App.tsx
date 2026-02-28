import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardView } from './components/DashboardView';
import { AllSubscriptionsView } from './components/AllSubscriptionsView';
import { CalendarView } from './components/CalendarView';
import { AnalyticsView } from './components/AnalyticsView';
import { PaymentMethodsView } from './components/PaymentMethodsView';
import { SettingsView } from './components/SettingsView';
import { AddSubscriptionModal } from './components/AddSubscriptionModal';
import { useSubscriptions } from './hooks/useSubscriptions';
import { Subscription } from './types/subscription';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

  const { subscriptions, addSubscription, updateSubscription, deleteSubscription } = useSubscriptions();

  const handleAddSubscription = () => {
    setEditingSubscription(null);
    setModalOpen(true);
  };

  const handleEditSubscription = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setModalOpen(true);
  };

  const handleSaveSubscription = (subscription: Omit<Subscription, 'id'> | Subscription) => {
    if ('id' in subscription) {
      updateSubscription(subscription.id, subscription);
    } else {
      addSubscription(subscription);
    }
    setModalOpen(false);
    setEditingSubscription(null);
  };

  const handleDeleteSubscription = (id: string) => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      deleteSubscription(id);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        onAddSubscription={handleAddSubscription}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        
        <main className="flex-1 overflow-y-auto p-8">
          {activeView === 'dashboard' && (
            <DashboardView 
              subscriptions={subscriptions}
              onEdit={handleEditSubscription}
              onDelete={handleDeleteSubscription}
              searchQuery={searchQuery}
            />
          )}
          
          {activeView === 'subscriptions' && (
            <AllSubscriptionsView 
              subscriptions={subscriptions}
              onEdit={handleEditSubscription}
              onDelete={handleDeleteSubscription}
              searchQuery={searchQuery}
            />
          )}
          
          {activeView === 'calendar' && (
            <CalendarView subscriptions={subscriptions} />
          )}
          
          {activeView === 'analytics' && (
            <AnalyticsView subscriptions={subscriptions} />
          )}
          
          {activeView === 'payments' && (
            <PaymentMethodsView />
          )}
          
          {activeView === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>

      <AddSubscriptionModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingSubscription(null);
        }}
        onSave={handleSaveSubscription}
        editingSubscription={editingSubscription}
      />
    </div>
  );
}
