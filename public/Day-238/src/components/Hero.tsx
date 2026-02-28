import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary/5 to-primary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-medium leading-tight">
              Find the Perfect Gift for Every Occasion
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover unique and thoughtful gifts that will make your loved ones smile. 
              From personalized treasures to timeless classics, we have something special for everyone.
            </p>
            <div className="flex gap-4">
              <Button size="lg">
                Shop Now
              </Button>
              <Button variant="outline" size="lg">
                Gift Guide
              </Button>
            </div>
          </div>
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Beautiful gift boxes and flowers"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}