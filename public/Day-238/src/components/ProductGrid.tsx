import { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../App';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Personalized Photo Frame',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'personalized',
    description: 'Beautiful wooden frame with custom engraving',
    rating: 4.8,
    inStock: true,
  },
  {
    id: '2',
    name: 'Luxury Jewelry Box',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'jewelry',
    description: 'Elegant velvet-lined jewelry organizer',
    rating: 4.9,
    inStock: true,
  },
  {
    id: '3',
    name: 'Scented Candle Set',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1602874801006-38e486c7c944?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'home',
    description: 'Set of 3 premium aromatherapy candles',
    rating: 4.7,
    inStock: true,
  },
  {
    id: '4',
    name: 'Birthday Crown',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'birthday',
    description: 'Sparkly birthday crown for special celebrations',
    rating: 4.5,
    inStock: true,
  },
  {
    id: '5',
    name: 'Anniversary Wine Glasses',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'anniversary',
    description: 'Engraved crystal wine glasses for couples',
    rating: 4.9,
    inStock: true,
  },
  {
    id: '6',
    name: 'Holiday Ornament Set',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1544271446-14ad7611085b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'holiday',
    description: 'Beautiful handcrafted Christmas ornaments',
    rating: 4.6,
    inStock: true,
  },
  {
    id: '7',
    name: 'Custom Name Necklace',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'jewelry',
    description: 'Gold-plated necklace with personalized name',
    rating: 4.8,
    inStock: true,
  },
  {
    id: '8',
    name: 'Succulent Garden Kit',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'home',
    description: 'Complete kit to grow your own succulent garden',
    rating: 4.7,
    inStock: true,
  },
  {
    id: '9',
    name: 'Memory Book Album',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'personalized',
    description: 'Leather-bound photo album for precious memories',
    rating: 4.8,
    inStock: true,
  },
  {
    id: '10',
    name: 'Birthday Balloon Bouquet',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'birthday',
    description: 'Colorful helium balloon arrangement',
    rating: 4.4,
    inStock: true,
  },
  {
    id: '11',
    name: 'Couple\'s Spa Set',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1602874801006-38e486c7c944?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'anniversary',
    description: 'Luxurious spa kit for romantic evenings',
    rating: 4.9,
    inStock: true,
  },
  {
    id: '12',
    name: 'Holiday Cookie Cutters',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1544271446-14ad7611085b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'holiday',
    description: 'Festive cookie cutter set with recipes',
    rating: 4.5,
    inStock: true,
  },
];

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  selectedCategory: string;
  searchQuery: string;
}

export function ProductGrid({ onAddToCart, selectedCategory, searchQuery }: ProductGridProps) {
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2>
            {selectedCategory === 'all' 
              ? 'All Gifts' 
              : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Gifts`}
          </h2>
          <p className="text-muted-foreground">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}