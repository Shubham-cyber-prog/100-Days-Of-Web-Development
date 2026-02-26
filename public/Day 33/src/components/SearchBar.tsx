import { Search, MapPin, Home, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ className = '' }: { className?: string }) {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (type) params.set('type', type);
    if (priceRange) params.set('price', priceRange);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className={`flex flex-col md:flex-row gap-3 ${className}`}>
      <div className="flex-1 relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="City or location..."
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
        />
      </div>
      <div className="relative">
        <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="h-12 pl-11 pr-8 rounded-xl border border-border bg-background text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow cursor-pointer"
        >
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="townhouse">Townhouse</option>
          <option value="penthouse">Penthouse</option>
          <option value="cottage">Cottage</option>
        </select>
      </div>
      <div className="relative">
        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <select
          value={priceRange}
          onChange={e => setPriceRange(e.target.value)}
          className="h-12 pl-11 pr-8 rounded-xl border border-border bg-background text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow cursor-pointer"
        >
          <option value="">Any Price</option>
          <option value="0-500000">Under $500K</option>
          <option value="500000-1000000">$500K – $1M</option>
          <option value="1000000-3000000">$1M – $3M</option>
          <option value="3000000-100000000">$3M+</option>
        </select>
      </div>
      <button
        type="submit"
        className="h-12 px-8 rounded-xl bg-accent text-accent-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
      >
        <Search className="w-4 h-4" />
        Search
      </button>
    </form>
  );
}
