import { ArrowRight, Building2, Home as HomeIcon, Castle, Building, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.jpg';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { defaultProperties } from '@/data/properties';

const propertyTypes = [
  { icon: HomeIcon, label: 'Houses', count: 42 },
  { icon: Building2, label: 'Apartments', count: 78 },
  { icon: Castle, label: 'Villas', count: 15 },
  { icon: Building, label: 'Penthouses', count: 8 },
];

export default function Index() {
  const featured = defaultProperties.filter(p => p.isFeatured);
  const latest = defaultProperties.filter(p => p.isNew);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center">
        <img src={heroBg} alt="Luxury home" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Premium Properties Await</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 leading-tight">
              Find Your Dream<br />Home Today
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto">
              Discover exceptional properties in the world's most desirable locations. Your perfect home is just a search away.
            </p>
          </div>
          <div className="max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 bg-surface-cool">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Featured Listings</h2>
              <p className="text-muted-foreground mt-2">Hand-picked properties for discerning buyers</p>
            </div>
            <Link to="/listings" className="hidden md:flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/listings" className="inline-flex items-center gap-2 text-sm font-medium text-accent">
              View All Listings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Browse by Property Type
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
            From cozy apartments to sprawling estates, find the property type that fits your lifestyle
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {propertyTypes.map(t => (
              <Link
                key={t.label}
                to={`/listings?type=${t.label.toLowerCase().slice(0, -1)}`}
                className="group flex flex-col items-center p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <t.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{t.label}</h3>
                <span className="text-sm text-muted-foreground">{t.count} properties</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Listings */}
      {latest.length > 0 && (
        <section className="py-20 bg-surface-warm">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Latest Listings</h2>
            <p className="text-muted-foreground mb-10">Just added to our collection</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map(p => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-primary p-10 md:p-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Sell Your Property?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
              List your property with us and reach thousands of qualified buyers
            </p>
            <Link
              to="/seller"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Start Selling <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
