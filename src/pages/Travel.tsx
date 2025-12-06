import { Navigation } from '@/components/Navigation';
import { TravelSection } from '@/components/TravelSection';
import { Footer } from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

const Travel = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24">
          <TravelSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Travel;
