import { LanguageProvider } from '@/context/LanguageContext';
import { Navigation } from '@/components/Navigation';
import { EventsSection } from '@/components/EventsSection';
import { Footer } from '@/components/Footer';

const Events = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24">
          <EventsSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Events;
