import { LanguageProvider } from '@/context/LanguageContext';
import { Navigation } from '@/components/Navigation';
import { GallerySection } from '@/components/GallerySection';
import { Footer } from '@/components/Footer';

const Gallery = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24">
          <GallerySection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Gallery;
