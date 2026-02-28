import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { getAllProperties } from '@/data/properties';

const ITEMS_PER_PAGE = 6;

export default function Listings() {
  const [searchParams] = useSearchParams();
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || '');
  const [priceFilter, setPriceFilter] = useState(searchParams.get('price') || '');
  const [bedroomFilter, setBedroomFilter] = useState('');
  const [bathroomFilter, setBathroomFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [, setRefresh] = useState(0);

  const showFavoritesOnly = searchParams.get('favorites') === 'true';

  useEffect(() => {
    setLocationFilter(searchParams.get('location') || '');
    setTypeFilter(searchParams.get('type') || '');
    setPriceFilter(searchParams.get('price') || '');
  }, [searchParams]);

  const allProperties = getAllProperties();

  const filtered = useMemo(() => {
    let result = allProperties;

    if (showFavoritesOnly) {
      const favs = JSON.parse(localStorage.getItem('realestate_favorites') || '[]');
      result = result.filter(p => favs.includes(p.id));
    }

    if (locationFilter) {
      const q = locationFilter.toLowerCase();
      result = result.filter(p => p.location.toLowerCase().includes(q) || p.city.toLowerCase().includes(q));
    }

    if (typeFilter) {
      result = result.filter(p => p.type === typeFilter);
    }

    if (priceFilter) {
      const [min, max] = priceFilter.split('-').map(Number);
      result = result.filter(p => p.price >= min && p.price <= max);
    }

    if (bedroomFilter) {
      result = result.filter(p => p.bedrooms >= Number(bedroomFilter));
    }

    if (bathroomFilter) {
      result = result.filter(p => p.bathrooms >= Number(bathroomFilter));
    }

    return result;
  }, [allProperties, locationFilter, typeFilter, priceFilter, bedroomFilter, bathroomFilter, showFavoritesOnly]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const clearFilters = () => {
    setLocationFilter('');
    setTypeFilter('');
    setPriceFilter('');
    setBedroomFilter('');
    setBathroomFilter('');
  };

  const hasActiveFilters = locationFilter || typeFilter || priceFilter || bedroomFilter || bathroomFilter;

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            {showFavoritesOnly ? 'Saved Properties' : 'Property Listings'}
          </h1>
          <p className="text-muted-foreground">{filtered.length} properties found</p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by location..."
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`h-11 px-5 rounded-xl border text-sm font-medium flex items-center gap-2 transition-colors ${
              showFilters ? 'bg-accent text-accent-foreground border-accent' : 'border-border text-foreground hover:bg-secondary'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="h-11 px-4 rounded-xl text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <X className="w-4 h-4" /> Clear
            </button>
          )}
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5 rounded-2xl bg-secondary mb-6 animate-fade-in">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Property Type</label>
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground text-sm"
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
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Price Range</label>
              <select
                value={priceFilter}
                onChange={e => setPriceFilter(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground text-sm"
              >
                <option value="">Any Price</option>
                <option value="0-500000">Under $500K</option>
                <option value="500000-1000000">$500K – $1M</option>
                <option value="1000000-3000000">$1M – $3M</option>
                <option value="3000000-100000000">$3M+</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Bedrooms (min)</label>
              <select
                value={bedroomFilter}
                onChange={e => setBedroomFilter(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground text-sm"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Bathrooms (min)</label>
              <select
                value={bathroomFilter}
                onChange={e => setBathroomFilter(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground text-sm"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>
        )}

        {/* Grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map(p => (
              <PropertyCard key={p.id} property={p} onFavoriteChange={() => setRefresh(n => n + 1)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No properties match your filters.</p>
            <button onClick={clearFilters} className="mt-4 text-accent font-medium text-sm hover:underline">Clear all filters</button>
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount(n => n + ITEMS_PER_PAGE)}
              className="h-11 px-8 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Load More Properties
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
