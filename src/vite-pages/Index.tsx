import { LanguageProvider } from '@/context/LanguageContext';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { EventsSection } from '@/components/EventsSection';
import { GallerySection } from '@/components/GallerySection';
import { RSVPSection } from '@/components/RSVPSection';
import { TravelSection } from '@/components/TravelSection';
import { FamilySection } from '@/components/FamilySection';
import { TraditionsSection } from '@/components/TraditionsSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <HeroSection
            brideName="Priya"
            groomName="Arjun"
            weddingDate="15th December 2024"
            venue="The Grand Palace, Mumbai"
          />
          <EventsSection />
          <GallerySection />
          <RSVPSection />
          <TravelSection />
          <FamilySection />
          <TraditionsSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
