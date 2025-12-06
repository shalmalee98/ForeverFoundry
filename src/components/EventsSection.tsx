import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Shirt } from 'lucide-react';
import haldiImage from '@/assets/events/haldi.jpg';
import mehendiImage from '@/assets/events/mehendi.jpg';
import sangeetImage from '@/assets/events/sangeet.jpg';
import weddingImage from '@/assets/events/wedding.jpg';
import receptionImage from '@/assets/events/reception.jpg';
import { useLanguage } from '@/context/LanguageContext';

interface WeddingEvent {
  id: string;
  nameKey: string;
  date: string;
  time: string;
  venue: string;
  dressCode: string;
  image: string;
  description: string;
}

const events: WeddingEvent[] = [
  {
    id: 'haldi',
    nameKey: 'event.haldi',
    date: 'December 12, 2024',
    time: '10:00 AM - 2:00 PM',
    venue: 'Sharma Family Residence',
    dressCode: 'Yellow / Traditional Indian',
    image: haldiImage,
    description: 'A joyous ceremony where turmeric paste is applied to the bride and groom for blessings.',
  },
  {
    id: 'mehendi',
    nameKey: 'event.mehendi',
    date: 'December 13, 2024',
    time: '4:00 PM - 10:00 PM',
    venue: 'The Garden Terrace',
    dressCode: 'Green / Colorful Traditional',
    image: mehendiImage,
    description: 'Beautiful henna designs are applied to the bride and guests, symbolizing love and prosperity.',
  },
  {
    id: 'sangeet',
    nameKey: 'event.sangeet',
    date: 'December 14, 2024',
    time: '7:00 PM - 1:00 AM',
    venue: 'Grand Ballroom, Hotel Imperial',
    dressCode: 'Festive / Indo-Western',
    image: sangeetImage,
    description: 'A night of music, dance, and celebration with performances from both families.',
  },
  {
    id: 'wedding',
    nameKey: 'event.wedding',
    date: 'December 15, 2024',
    time: '7:00 AM - 2:00 PM',
    venue: 'The Grand Palace, Mumbai',
    dressCode: 'Traditional Wedding Attire',
    image: weddingImage,
    description: 'The sacred wedding ceremony following traditional rituals and customs.',
  },
  {
    id: 'reception',
    nameKey: 'event.reception',
    date: 'December 15, 2024',
    time: '7:00 PM - 12:00 AM',
    venue: 'Crystal Hall, Hotel Taj',
    dressCode: 'Formal / Evening Wear',
    image: receptionImage,
    description: 'An elegant evening reception to celebrate the newlyweds with dinner and dancing.',
  },
];

export function EventsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="text-primary text-2xl">❧</div>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            {t('events.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('events.subtitle')}
          </p>
          <div className="flex justify-center mt-4">
            <div className="text-primary text-2xl rotate-180">❧</div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const { t } = useLanguage();

  return (
    <div
      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={t(event.nameKey)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <h3 className="absolute bottom-4 left-4 font-display text-2xl text-card">
          {t(event.nameKey)}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-foreground">{event.date}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-foreground">{event.time}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-foreground">{event.venue}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Shirt className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-muted-foreground">{event.dressCode}</span>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-6">
          {t('events.rsvpEvent')}
        </Button>
      </div>
    </div>
  );
}
