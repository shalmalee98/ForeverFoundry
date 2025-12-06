import { useLanguage } from '@/context/LanguageContext';
import { Heart, MessageCircle, Share2, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const { t } = useLanguage();

  const handleShare = () => {
    const text = 'You are invited to the wedding of Shalmalee & Kshitij! 💒';
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer className="bg-foreground text-card py-16">
      <div className="container mx-auto px-4">
        {/* Decorative Top */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>

        {/* Couple Names */}
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl mb-2">
            <span className="text-primary">Shalmalee</span>
            <span className="mx-3 text-card">&</span>
            <span className="text-primary">Kshitij</span>
          </h2>
          <p className="text-card/70">December 15, 2024</p>
        </div>

        {/* Share Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <Button variant="whatsapp" onClick={handleShare}>
            <MessageCircle className="w-4 h-4 mr-2" />
            {t('footer.shareOnWhatsapp')}
          </Button>
          <Button variant="outline" className="border-card/30 text-card hover:bg-card/10 hover:text-card">
            <QrCode className="w-4 h-4 mr-2" />
            Show QR Code
          </Button>
        </div>

        {/* Wedding Hashtag */}
        <div className="text-center mb-8">
          <p className="text-primary font-display text-xl">#KshitijNeShalmaleeKoPaaya</p>
          <p className="text-card/60 text-sm mt-2">Share your photos with our wedding hashtag!</p>
        </div>

        {/* Bottom */}
        <div className="text-center pt-8 border-t border-card/10">
          <p className="text-card/60 text-sm flex items-center justify-center gap-2">
            {t('footer.madeWith')} <Heart className="w-4 h-4 text-primary fill-primary" />
          </p>
          <p className="text-card/40 text-xs mt-2">
            Powered by Vivah • Indian Wedding Websites
          </p>
        </div>
      </div>
    </footer>
  );
}
