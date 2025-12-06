import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { Upload, Image, Video, X, Heart } from 'lucide-react';
import haldiImage from '@/assets/events/haldi.jpg';
import mehendiImage from '@/assets/events/mehendi.jpg';
import sangeetImage from '@/assets/events/sangeet.jpg';
import weddingImage from '@/assets/events/wedding.jpg';
import receptionImage from '@/assets/events/reception.jpg';

// Demo gallery images using event images
const galleryImages = [
  { id: 1, src: haldiImage, alt: 'Haldi Ceremony', category: 'haldi' },
  { id: 2, src: mehendiImage, alt: 'Mehendi Celebration', category: 'mehendi' },
  { id: 3, src: sangeetImage, alt: 'Sangeet Night', category: 'sangeet' },
  { id: 4, src: weddingImage, alt: 'Wedding Ceremony', category: 'wedding' },
  { id: 5, src: receptionImage, alt: 'Reception', category: 'reception' },
  { id: 6, src: haldiImage, alt: 'Pre-wedding', category: 'pre-wedding' },
];

const categories = ['all', 'pre-wedding', 'haldi', 'mehendi', 'sangeet', 'wedding', 'reception'];

export function GallerySection() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-muted-foreground text-lg">{t('gallery.subtitle')}</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'gold' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category.replace('-', ' ')}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="relative group aspect-square overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                <Image className="text-card opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8" />
              </div>
            </div>
          ))}
        </div>

        {/* Upload Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <Button variant="outline" size="lg">
            <Upload className="w-4 h-4 mr-2" />
            {t('gallery.uploadPhoto')}
          </Button>
          <Button variant="outline" size="lg">
            <Video className="w-4 h-4 mr-2" />
            {t('gallery.uploadVideo')}
          </Button>
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-card hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Gallery view"
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
}
