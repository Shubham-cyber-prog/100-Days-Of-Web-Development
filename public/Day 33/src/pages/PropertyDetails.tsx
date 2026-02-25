import { useParams, Link } from 'react-router-dom';
import { Bed, Bath, Maximize, Calendar, Car, MapPin, ArrowLeft, Heart, Share2, Phone } from 'lucide-react';
import { useState } from 'react';
import { getAllProperties, getFavorites, toggleFavorite } from '@/data/properties';
import ImageGallery from '@/components/ImageGallery';
import ContactModal from '@/components/ContactModal';

export default function PropertyDetails() {
  const { id } = useParams();
  const property = getAllProperties().find(p => p.id === id);
  const [modalOpen, setModalOpen] = useState(false);
  const [isFav, setIsFav] = useState(property ? getFavorites().includes(property.id) : false);

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">Property Not Found</h1>
        <Link to="/listings" className="text-accent font-medium hover:underline">Browse all listings</Link>
      </div>
    );
  }

  const handleFav = () => {
    toggleFavorite(property.id);
    setIsFav(!isFav);
  };

  const details = [
    { icon: Bed, label: 'Bedrooms', value: property.bedrooms },
    { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
    { icon: Maximize, label: 'Area', value: `${property.area.toLocaleString()} sqft` },
    { icon: Calendar, label: 'Year Built', value: property.yearBuilt || 'N/A' },
    { icon: Car, label: 'Parking', value: property.parking ? `${property.parking} spots` : 'N/A' },
  ];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Link to="/listings" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Listings
        </Link>

        {/* Gallery */}
        <ImageGallery images={property.images} title={property.title} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & price */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{property.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFav}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                      isFav ? 'bg-accent/10 border-accent text-accent' : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                  <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="font-display text-3xl font-bold text-accent mt-4">
                ${property.price.toLocaleString()}
              </p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {details.map(d => (
                <div key={d.label} className="p-4 rounded-xl bg-secondary text-center">
                  <d.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">{d.label}</p>
                  <p className="font-semibold text-foreground text-sm">{d.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">About This Property</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">Amenities & Features</h2>
              <div className="flex flex-wrap gap-2">
                {property.features.map(f => (
                  <span key={f} className="px-4 py-2 rounded-lg bg-secondary text-sm text-foreground font-medium">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Map */}
            {property.lat && property.lng && (
              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">Location</h2>
                <div className="rounded-2xl overflow-hidden border border-border">
                  <iframe
                    title="Property Location"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://maps.google.com/maps?q=${property.lat},${property.lng}&z=14&output=embed`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border p-6 shadow-card sticky top-24">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">Interested in this property?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Get in touch with our team to schedule a viewing or request more information.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full h-11 rounded-xl bg-accent text-accent-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mb-3"
              >
                <Phone className="w-4 h-4" />
                Schedule a Viewing
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full h-11 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
              >
                Request Info
              </button>
            </div>

            <div className="rounded-2xl bg-secondary p-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Property Type</p>
              <p className="font-semibold text-foreground capitalize">{property.type}</p>
            </div>
          </div>
        </div>
      </div>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} propertyTitle={property.title} />
    </div>
  );
}
