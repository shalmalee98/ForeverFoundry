import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.events', path: '/events' },
  { key: 'nav.gallery', path: '/gallery' },
  { key: 'nav.travel', path: '/travel' },
  { key: 'nav.family', path: '/family' },
  { key: 'nav.traditions', path: '/traditions' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-elegant py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-display text-2xl text-primary">
            विवाह
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary relative',
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-muted-foreground',
                  'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left'
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Link to="/rsvp" className="hidden sm:block">
              <Button variant="gold">{t('nav.rsvp')}</Button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border/20 pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-lg font-medium py-2 transition-colors',
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {t(item.key)}
                </Link>
              ))}
              <Link to="/rsvp" onClick={() => setIsOpen(false)}>
                <Button variant="gold" className="w-full mt-2">
                  {t('nav.rsvp')}
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
