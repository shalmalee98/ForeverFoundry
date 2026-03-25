import { LanguageProvider } from '@/context/LanguageContext';
import { Navigation } from '@/components/Navigation';
import { FamilySection } from '@/components/FamilySection';
import { Footer } from '@/components/Footer';

const Family = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24">
          <FamilySection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Family;
