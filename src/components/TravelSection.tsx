import { useLanguage } from '@/context/LanguageContext';
import { Plane, Hotel, Car, Cloud, CreditCard, Wifi, Train, MapPin } from 'lucide-react';

const travelInfo = {
  airports: [
    { name: 'Chhatrapati Shivaji International Airport (BOM)', distance: '25 km from venue' },
    { name: 'Domestic Terminal', distance: '22 km from venue' },
  ],
  hotels: [
    { name: 'The Taj Mahal Palace', rating: '5 Star', distance: '2 km' },
    { name: 'Hotel Oberoi', rating: '5 Star', distance: '3 km' },
    { name: 'The Lalit Mumbai', rating: '5 Star', distance: '5 km' },
  ],
  transport: [
    { type: 'Uber / Ola', note: 'Available 24/7' },
    { type: 'Pre-booked Cars', note: 'Arranged by family' },
    { type: 'Metro Rail', note: 'Nearby stations available' },
  ],
  weather: {
    month: 'December',
    temperature: '20-28°C',
    humidity: 'Low',
    advice: 'Pleasant winter weather. Light layers recommended for evenings.',
  },
  visa: {
    evisa: 'Available for most countries',
    processing: '2-4 business days',
    link: 'https://indianvisaonline.gov.in',
  },
  currency: {
    name: 'Indian Rupee (INR)',
    exchange: '1 USD ≈ 83 INR',
    tip: 'ATMs widely available. Cards accepted at most venues.',
  },
};

export function TravelSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Plane className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            {t('travel.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('travel.subtitle')}
          </p>
        </div>

        {/* Travel Info Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Airports */}
          <TravelCard
            icon={<Plane className="w-6 h-6" />}
            title={t('travel.airports')}
          >
            <ul className="space-y-3">
              {travelInfo.airports.map((airport, index) => (
                <li key={index} className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">{airport.name}</p>
                    <p className="text-sm text-muted-foreground">{airport.distance}</p>
                  </div>
                </li>
              ))}
            </ul>
          </TravelCard>

          {/* Hotels */}
          <TravelCard
            icon={<Hotel className="w-6 h-6" />}
            title={t('travel.hotels')}
          >
            <ul className="space-y-3">
              {travelInfo.hotels.map((hotel, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-4 h-4 bg-primary/20 rounded-full flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">{hotel.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {hotel.rating} • {hotel.distance}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </TravelCard>

          {/* Transport */}
          <TravelCard
            icon={<Car className="w-6 h-6" />}
            title={t('travel.transport')}
          >
            <ul className="space-y-3">
              {travelInfo.transport.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Train className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">{item.type}</p>
                    <p className="text-sm text-muted-foreground">{item.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </TravelCard>

          {/* Weather */}
          <TravelCard
            icon={<Cloud className="w-6 h-6" />}
            title={t('travel.weather')}
          >
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Month</span>
                <span className="font-medium">{travelInfo.weather.month}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Temperature</span>
                <span className="font-medium">{travelInfo.weather.temperature}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Humidity</span>
                <span className="font-medium">{travelInfo.weather.humidity}</span>
              </div>
              <p className="text-sm text-muted-foreground pt-2 border-t border-border">
                {travelInfo.weather.advice}
              </p>
            </div>
          </TravelCard>

          {/* Visa */}
          <TravelCard
            icon={<CreditCard className="w-6 h-6" />}
            title={t('travel.visa')}
          >
            <div className="space-y-3">
              <p className="text-foreground">
                <span className="font-medium">e-Visa: </span>
                {travelInfo.visa.evisa}
              </p>
              <p className="text-foreground">
                <span className="font-medium">Processing: </span>
                {travelInfo.visa.processing}
              </p>
              <a
                href={travelInfo.visa.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm inline-block"
              >
                Apply for e-Visa →
              </a>
            </div>
          </TravelCard>

          {/* Currency */}
          <TravelCard
            icon={<Wifi className="w-6 h-6" />}
            title={t('travel.currency')}
          >
            <div className="space-y-3">
              <p className="text-foreground">
                <span className="font-medium">Currency: </span>
                {travelInfo.currency.name}
              </p>
              <p className="text-foreground">
                <span className="font-medium">Rate: </span>
                {travelInfo.currency.exchange}
              </p>
              <p className="text-sm text-muted-foreground pt-2 border-t border-border">
                {travelInfo.currency.tip}
              </p>
            </div>
          </TravelCard>
        </div>
      </div>
    </section>
  );
}

function TravelCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-elegant transition-shadow">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
        <h3 className="font-display text-xl text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}
