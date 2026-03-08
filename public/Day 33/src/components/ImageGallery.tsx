import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Props {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: Props) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setCurrent(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      {/* Main gallery */}
      <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-muted">
        <img
          src={images[current]}
          alt={`${title} - Image ${current + 1}`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setLightbox(true)}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </>
        )}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                i === current ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center animate-fade-in">
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/20 flex items-center justify-center hover:bg-background/40 transition-colors"
          >
            <X className="w-5 h-5 text-background" />
          </button>
          <button onClick={prev} className="absolute left-4 w-10 h-10 rounded-full bg-background/20 flex items-center justify-center hover:bg-background/40 transition-colors">
            <ChevronLeft className="w-6 h-6 text-background" />
          </button>
          <img src={images[current]} alt={title} className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl" />
          <button onClick={next} className="absolute right-4 w-10 h-10 rounded-full bg-background/20 flex items-center justify-center hover:bg-background/40 transition-colors">
            <ChevronRight className="w-6 h-6 text-background" />
          </button>
        </div>
      )}
    </>
  );
}
