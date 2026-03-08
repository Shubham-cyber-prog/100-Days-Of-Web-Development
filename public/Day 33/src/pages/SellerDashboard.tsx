import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import type { Property } from '@/types/property';
import { getCustomProperties, saveCustomProperty, deleteCustomProperty, updateCustomProperty } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import property1 from '@/assets/property-1.jpg';

const emptyProperty: Omit<Property, 'id'> = {
  title: '',
  price: 0,
  location: '',
  city: '',
  type: 'house',
  bedrooms: 1,
  bathrooms: 1,
  area: 0,
  description: '',
  features: [],
  images: [property1],
};

export default function SellerDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Property, 'id'>>(emptyProperty);
  const [featuresInput, setFeaturesInput] = useState('');

  useEffect(() => {
    setProperties(getCustomProperties());
  }, []);

  const resetForm = () => {
    setForm(emptyProperty);
    setFeaturesInput('');
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const feats = featuresInput.split(',').map(f => f.trim()).filter(Boolean);

    if (editingId) {
      const updated: Property = { ...form, id: editingId, features: feats };
      updateCustomProperty(updated);
    } else {
      const newProp: Property = { ...form, id: `custom-${Date.now()}`, features: feats, isNew: true };
      saveCustomProperty(newProp);
    }

    setProperties(getCustomProperties());
    resetForm();
  };

  const handleEdit = (p: Property) => {
    setForm(p);
    setFeaturesInput(p.features.join(', '));
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this property?')) {
      deleteCustomProperty(id);
      setProperties(getCustomProperties());
    }
  };

  const inputCls = "w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50";

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Seller Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your property listings</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="h-11 px-6 rounded-xl bg-accent text-accent-foreground font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" /> Add Property
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="rounded-2xl border border-border p-6 mb-8 animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-foreground">
                {editingId ? 'Edit Property' : 'Add New Property'}
              </h2>
              <button onClick={resetForm} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors">
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="e.g. Modern Villa" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Price ($)</label>
                <input required type="number" min={0} value={form.price || ''} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as Property['type'] })} className={inputCls}>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="cottage">Cottage</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                <input required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className={inputCls} placeholder="e.g. 123 Main St, City" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">City</label>
                <input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Bedrooms</label>
                <input type="number" min={0} value={form.bedrooms} onChange={e => setForm({ ...form, bedrooms: Number(e.target.value) })} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Bathrooms</label>
                <input type="number" min={0} value={form.bathrooms} onChange={e => setForm({ ...form, bathrooms: Number(e.target.value) })} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Area (sqft)</label>
                <input type="number" min={0} value={form.area || ''} onChange={e => setForm({ ...form, area: Number(e.target.value) })} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Features (comma-separated)</label>
                <input value={featuresInput} onChange={e => setFeaturesInput(e.target.value)} className={inputCls} placeholder="Pool, Garden, Garage" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/50" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="h-11 px-8 rounded-xl bg-accent text-accent-foreground font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" /> {editingId ? 'Update Property' : 'Add Property'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Listing grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(p => (
              <div key={p.id} className="relative group">
                <PropertyCard property={p} />
                <div className="absolute top-3 right-14 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(p)}
                    className="w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background"
                  >
                    <Pencil className="w-3.5 h-3.5 text-foreground" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="w-8 h-8 rounded-full bg-destructive/90 backdrop-blur-sm flex items-center justify-center hover:bg-destructive"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-destructive-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl bg-secondary">
            <p className="text-muted-foreground text-lg mb-2">No properties listed yet</p>
            <p className="text-sm text-muted-foreground">Click "Add Property" to create your first listing</p>
          </div>
        )}
      </div>
    </div>
  );
}
