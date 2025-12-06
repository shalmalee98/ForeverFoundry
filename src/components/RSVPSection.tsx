import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Send, Heart } from 'lucide-react';

const eventOptions = [
  { id: 'haldi', labelKey: 'event.haldi' },
  { id: 'mehendi', labelKey: 'event.mehendi' },
  { id: 'sangeet', labelKey: 'event.sangeet' },
  { id: 'wedding', labelKey: 'event.wedding' },
  { id: 'reception', labelKey: 'event.reception' },
];

export function RSVPSection() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    selectedEvents: [] as string[],
    dietary: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'RSVP Submitted!',
      description: 'Thank you for your response. We look forward to celebrating with you!',
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      guests: '1',
      selectedEvents: [],
      dietary: '',
      message: '',
    });
  };

  const handleEventToggle = (eventId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedEvents: prev.selectedEvents.includes(eventId)
        ? prev.selectedEvents.filter((id) => id !== eventId)
        : [...prev.selectedEvents, eventId],
    }));
  };

  const handleWhatsAppRSVP = () => {
    const message = `Hi! I would like to RSVP for the wedding.\n\nName: ${formData.name}\nGuests: ${formData.guests}\nEvents: ${formData.selectedEvents.join(', ')}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919876543210?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="py-20 bg-muted/30 paisley-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Heart className="w-8 h-8 text-primary fill-primary" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              {t('rsvp.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('rsvp.subtitle')}
            </p>
          </div>

          {/* RSVP Form */}
          <div className="bg-card rounded-2xl shadow-elegant p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">{t('rsvp.name')}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                  className="bg-background"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('rsvp.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('rsvp.phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="bg-background"
                  />
                </div>
              </div>

              {/* Number of Guests */}
              <div className="space-y-2">
                <Label htmlFor="guests">{t('rsvp.guests')}</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="bg-background w-32"
                />
              </div>

              {/* Events Selection */}
              <div className="space-y-3">
                <Label>{t('rsvp.events')}</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {eventOptions.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center space-x-2 p-3 bg-background rounded-lg hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => handleEventToggle(event.id)}
                    >
                      <Checkbox
                        id={event.id}
                        checked={formData.selectedEvents.includes(event.id)}
                        onCheckedChange={() => handleEventToggle(event.id)}
                      />
                      <Label htmlFor={event.id} className="cursor-pointer text-sm">
                        {t(event.labelKey)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dietary Requirements */}
              <div className="space-y-2">
                <Label htmlFor="dietary">{t('rsvp.dietary')}</Label>
                <Input
                  id="dietary"
                  value={formData.dietary}
                  onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                  placeholder="Vegetarian, Vegan, Allergies, etc."
                  className="bg-background"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">{t('rsvp.message')}</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your blessings or any special message..."
                  className="bg-background min-h-[100px]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" variant="gold" size="lg" className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  {t('rsvp.submit')}
                </Button>
                <Button
                  type="button"
                  variant="whatsapp"
                  size="lg"
                  className="flex-1"
                  onClick={handleWhatsAppRSVP}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t('rsvp.whatsapp')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
