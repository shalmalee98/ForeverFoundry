import { LanguageProvider } from '@/context/LanguageContext';
import { Navigation } from '@/components/Navigation';
import { RSVPSection } from '@/components/RSVPSection';
import { Footer } from '@/components/Footer';

const RSVP = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24">
          <RSVPSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default RSVP;
