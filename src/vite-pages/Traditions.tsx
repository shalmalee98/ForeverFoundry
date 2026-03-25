import { Navigation } from '@/components/Navigation';
import { TraditionsSection } from '@/components/TraditionsSection';
import { Footer } from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

const Traditions = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24">
          <TraditionsSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Traditions;
