import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import heroImage from '@/assets/hero-bg.jpg';
import { Calendar, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  brideName?: string;
  groomName?: string;
  weddingDate?: string;
  venue?: string;
}

export function HeroSection({
  brideName = 'Shalmalee',
  groomName = 'Kshitij',
  weddingDate = '3rd Jaruary 2026',
  venue = 'The Dhepe Wada, Pune',
}: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/60" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-20 animate-float">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center py-32">
        {/* Ornamental top */}
        <div className="flex justify-center mb-8 animate-fade-up">
          <div className="text-primary text-4xl">❧</div>
        </div>

        {/* Wedding of text */}
        <p className="text-muted-foreground text-lg md:text-xl mb-4 font-body tracking-wider uppercase animate-fade-up animation-delay-100">
          {t('hero.weddingOf')}
        </p>

        {/* Names */}
        <div className="mb-8 animate-fade-up animation-delay-200">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-4">
            <span className="text-gradient-gold">{groomName}</span>
            <span className="text-primary mx-4 md:mx-6">&</span>
            <span className="text-gradient-gold">{brideName}</span>
          </h1>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-up animation-delay-300">
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-primary" />
          <Heart className="w-6 h-6 text-primary fill-primary" />
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-primary" />
        </div>

        {/* Save the Date */}
        <p className="font-display text-2xl md:text-3xl text-secondary mb-8 animate-fade-up animation-delay-300">
          {t('hero.saveTheDate')}
        </p>

        {/* Date and Venue */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 animate-fade-up animation-delay-400">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-lg">{weddingDate}</span>
          </div>
          <div className="hidden md:block w-1 h-1 bg-primary rounded-full" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-lg">{venue}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-500">
          <Link to="/events">
            <Button variant="outline" size="xl">
              {t('hero.viewEvents')}
            </Button>
          </Link>
          <Link to="/rsvp">
            <Button variant="hero" size="xl">
              {t('hero.rsvpNow')}
            </Button>
          </Link>
        </div>

        {/* Ornamental bottom */}
        <div className="flex justify-center mt-16 animate-fade-up animation-delay-500">
          <div className="text-primary text-4xl rotate-180">❧</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
