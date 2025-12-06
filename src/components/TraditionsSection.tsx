import { useLanguage } from '@/context/LanguageContext';
import { Heart, BookOpen } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const traditions = [
  {
    id: 'haldi',
    title: 'Haldi Ceremony',
    titleHindi: 'हल्दी',
    description:
      'The Haldi ceremony is a pre-wedding ritual where a paste made of turmeric, sandalwood, and other ingredients is applied to the bride and groom. This is believed to cleanse and purify them before the wedding, and the yellow color of turmeric symbolizes prosperity.',
    significance: 'Purification, blessing, and preparation for the sacred wedding rituals.',
  },
  {
    id: 'mehendi',
    title: 'Mehendi',
    titleHindi: 'मेहंदी',
    description:
      'Mehendi is the application of henna on the hands and feet of the bride. The intricate designs often include the groom\'s name hidden within the patterns. The darkness of the mehendi is said to represent the depth of love in the marriage.',
    significance: 'Symbol of beauty, joy, and the bond between the couple.',
  },
  {
    id: 'sangeet',
    title: 'Sangeet',
    titleHindi: 'संगीत',
    description:
      'The Sangeet is a musical celebration where both families come together to sing and dance. It\'s a night of performances, fun, and bonding between the two families before the wedding.',
    significance: 'Celebration of joy and unity between two families.',
  },
  {
    id: 'baraat',
    title: 'Baraat',
    titleHindi: 'बारात',
    description:
      'The Baraat is the groom\'s wedding procession to the bride\'s home or wedding venue. The groom arrives on a decorated horse or in a car, accompanied by dancing family and friends.',
    significance: 'The joyful arrival of the groom to claim his bride.',
  },
  {
    id: 'jaimala',
    title: 'Jaimala (Varmala)',
    titleHindi: 'जयमाला',
    description:
      'Also known as Varmala, this is the exchange of floral garlands between the bride and groom. It signifies their acceptance of each other as life partners.',
    significance: 'Mutual acceptance and the beginning of the wedding ceremony.',
  },
  {
    id: 'saptapadi',
    title: 'Saat Phere (Seven Vows)',
    titleHindi: 'सात फेरे',
    description:
      'The Saat Phere are seven rounds taken around the sacred fire (Agni). With each round, the couple makes a vow to each other, promising love, respect, prosperity, and lifelong companionship.',
    significance: 'The most sacred part of Hindu wedding, binding the couple for seven lifetimes.',
  },
  {
    id: 'sindoor',
    title: 'Sindoor & Mangalsutra',
    titleHindi: 'सिंदूर और मंगलसूत्र',
    description:
      'The groom applies sindoor (vermillion) on the bride\'s forehead and ties the mangalsutra (sacred necklace) around her neck. These are symbols of married status.',
    significance: 'Symbols of marriage, commitment, and the bride\'s new status as a wife.',
  },
  {
    id: 'vidaai',
    title: 'Vidaai',
    titleHindi: 'विदाई',
    description:
      'The Vidaai is the emotional farewell of the bride from her parental home. She throws rice over her shoulder, symbolizing prosperity for the family she is leaving behind.',
    significance: 'The bride\'s departure to her new home, blessing her family with prosperity.',
  },
];

export function TraditionsSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            {t('traditions.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('traditions.subtitle')}
          </p>
        </div>

        {/* Traditions Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {traditions.map((tradition) => (
              <AccordionItem
                key={tradition.id}
                value={tradition.id}
                className="bg-card rounded-xl px-6 shadow-card border-none"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-foreground">
                        {tradition.title}
                      </h3>
                      {language === 'hi' && (
                        <p className="text-sm text-primary font-hindi">
                          {tradition.titleHindi}
                        </p>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="pl-16 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {tradition.description}
                    </p>
                    <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                      <p className="text-sm font-medium text-foreground">
                        <span className="text-primary">Significance: </span>
                        {tradition.significance}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
