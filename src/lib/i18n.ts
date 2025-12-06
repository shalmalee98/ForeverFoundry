export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'gu' | 'mr' | 'pa' | 'ur' | 'ml';

export const languages: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  bn: 'বাংলা',
  gu: 'ગુજરાતી',
  mr: 'मराठी',
  pa: 'ਪੰਜਾਬੀ',
  ur: 'اردو',
  ml: 'മലയാളം',
};

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.events': 'Events',
    'nav.gallery': 'Gallery',
    'nav.rsvp': 'RSVP',
    'nav.travel': 'Travel',
    'nav.family': 'Family',
    'nav.traditions': 'Traditions',
    
    // Hero
    'hero.weddingOf': 'The Wedding of',
    'hero.and': '&',
    'hero.saveTheDate': 'Save the Date',
    'hero.viewEvents': 'View Events',
    'hero.rsvpNow': 'RSVP Now',
    
    // Events
    'events.title': 'Wedding Events',
    'events.subtitle': 'Join us for these joyous celebrations',
    'events.dressCode': 'Dress Code',
    'events.venue': 'Venue',
    'events.time': 'Time',
    'events.rsvpEvent': 'RSVP for this event',
    
    // RSVP
    'rsvp.title': 'RSVP',
    'rsvp.subtitle': 'We would be honored by your presence',
    'rsvp.name': 'Full Name',
    'rsvp.email': 'Email Address',
    'rsvp.phone': 'Phone Number',
    'rsvp.guests': 'Number of Guests',
    'rsvp.events': 'Select Events',
    'rsvp.dietary': 'Dietary Requirements',
    'rsvp.message': 'Message for the Couple',
    'rsvp.submit': 'Send RSVP',
    'rsvp.whatsapp': 'RSVP via WhatsApp',
    
    // Gallery
    'gallery.title': 'Our Gallery',
    'gallery.subtitle': 'Moments we treasure',
    'gallery.uploadPhoto': 'Upload Photo',
    'gallery.uploadVideo': 'Upload Video',
    
    // Travel
    'travel.title': 'Travel & Stay',
    'travel.subtitle': 'Everything you need for your journey',
    'travel.airports': 'Nearest Airports',
    'travel.hotels': 'Recommended Hotels',
    'travel.transport': 'Local Transport',
    'travel.weather': 'Weather & Climate',
    'travel.visa': 'Visa Information',
    'travel.currency': 'Currency & Exchange',
    
    // Family
    'family.title': 'Meet the Families',
    'family.brideFamily': "Bride's Family",
    'family.groomFamily': "Groom's Family",
    
    // Traditions
    'traditions.title': 'Our Traditions',
    'traditions.subtitle': 'Understanding the beautiful rituals',
    
    // Footer
    'footer.madeWith': 'Made with love',
    'footer.shareOnWhatsapp': 'Share on WhatsApp',
    
    // Events Names
    'event.haldi': 'Haldi',
    'event.mehendi': 'Mehendi',
    'event.sangeet': 'Sangeet',
    'event.wedding': 'Wedding Ceremony',
    'event.reception': 'Reception',
    'event.engagement': 'Engagement',
    'event.baraat': 'Baraat',
    
    // Common
    'common.viewDetails': 'View Details',
    'common.learnMore': 'Learn More',
    'common.close': 'Close',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.events': 'कार्यक्रम',
    'nav.gallery': 'गैलरी',
    'nav.rsvp': 'आरएसवीपी',
    'nav.travel': 'यात्रा',
    'nav.family': 'परिवार',
    'nav.traditions': 'परंपराएं',
    
    // Hero
    'hero.weddingOf': 'शादी',
    'hero.and': 'और',
    'hero.saveTheDate': 'तारीख याद रखें',
    'hero.viewEvents': 'कार्यक्रम देखें',
    'hero.rsvpNow': 'अभी RSVP करें',
    
    // Events
    'events.title': 'शादी के कार्यक्रम',
    'events.subtitle': 'इन खुशी के अवसरों में शामिल हों',
    'events.dressCode': 'ड्रेस कोड',
    'events.venue': 'स्थान',
    'events.time': 'समय',
    'events.rsvpEvent': 'इस कार्यक्रम के लिए RSVP करें',
    
    // RSVP
    'rsvp.title': 'आरएसवीपी',
    'rsvp.subtitle': 'आपकी उपस्थिति से हम सम्मानित होंगे',
    'rsvp.name': 'पूरा नाम',
    'rsvp.email': 'ईमेल पता',
    'rsvp.phone': 'फोन नंबर',
    'rsvp.guests': 'मेहमानों की संख्या',
    'rsvp.events': 'कार्यक्रम चुनें',
    'rsvp.dietary': 'आहार संबंधी आवश्यकताएं',
    'rsvp.message': 'जोड़े के लिए संदेश',
    'rsvp.submit': 'RSVP भेजें',
    'rsvp.whatsapp': 'WhatsApp पर RSVP करें',
    
    // Gallery
    'gallery.title': 'हमारी गैलरी',
    'gallery.subtitle': 'जिन पलों को हम संजोते हैं',
    'gallery.uploadPhoto': 'फोटो अपलोड करें',
    'gallery.uploadVideo': 'वीडियो अपलोड करें',
    
    // Travel
    'travel.title': 'यात्रा और ठहरना',
    'travel.subtitle': 'आपकी यात्रा के लिए सब कुछ',
    'travel.airports': 'निकटतम हवाई अड्डे',
    'travel.hotels': 'अनुशंसित होटल',
    'travel.transport': 'स्थानीय परिवहन',
    'travel.weather': 'मौसम और जलवायु',
    'travel.visa': 'वीज़ा जानकारी',
    'travel.currency': 'मुद्रा और विनिमय',
    
    // Family
    'family.title': 'परिवारों से मिलें',
    'family.brideFamily': 'दुल्हन का परिवार',
    'family.groomFamily': 'दूल्हे का परिवार',
    
    // Traditions
    'traditions.title': 'हमारी परंपराएं',
    'traditions.subtitle': 'सुंदर रीति-रिवाजों को समझना',
    
    // Footer
    'footer.madeWith': 'प्यार से बनाया गया',
    'footer.shareOnWhatsapp': 'WhatsApp पर शेयर करें',
    
    // Events Names
    'event.haldi': 'हल्दी',
    'event.mehendi': 'मेहंदी',
    'event.sangeet': 'संगीत',
    'event.wedding': 'शादी समारोह',
    'event.reception': 'रिसेप्शन',
    'event.engagement': 'सगाई',
    'event.baraat': 'बारात',
    
    // Common
    'common.viewDetails': 'विवरण देखें',
    'common.learnMore': 'और जानें',
    'common.close': 'बंद करें',
  },
  mr: {
    // Navigation
    'nav.home': 'होम',
    'nav.events': 'कार्यक्रम',
    'nav.gallery': 'गैलरी',
    'nav.rsvp': 'आरएसवीपी',
    'nav.travel': 'यात्रा',
    'nav.family': 'परिवार',
    'nav.traditions': 'परंपराएं',
    
    // Hero
    'hero.weddingOf': 'शादी',
    'hero.and': 'और',
    'hero.saveTheDate': 'तारीख याद रखें',
    'hero.viewEvents': 'कार्यक्रम देखें',
    'hero.rsvpNow': 'अभी RSVP करें',
    
    // Events
    'events.title': 'शादी के कार्यक्रम',
    'events.subtitle': 'इन खुशी के अवसरों में शामिल हों',
    'events.dressCode': 'ड्रेस कोड',
    'events.venue': 'स्थान',
    'events.time': 'समय',
    'events.rsvpEvent': 'इस कार्यक्रम के लिए RSVP करें',
    
    // RSVP
    'rsvp.title': 'आरएसवीपी',
    'rsvp.subtitle': 'आपकी उपस्थिति से हम सम्मानित होंगे',
    'rsvp.name': 'पूरा नाम',
    'rsvp.email': 'ईमेल पता',
    'rsvp.phone': 'फोन नंबर',
    'rsvp.guests': 'मेहमानों की संख्या',
    'rsvp.events': 'कार्यक्रम चुनें',
    'rsvp.dietary': 'आहार संबंधी आवश्यकताएं',
    'rsvp.message': 'जोड़े के लिए संदेश',
    'rsvp.submit': 'RSVP भेजें',
    'rsvp.whatsapp': 'WhatsApp पर RSVP करें',
    
    // Gallery
    'gallery.title': 'हमारी गैलरी',
    'gallery.subtitle': 'जिन पलों को हम संजोते हैं',
    'gallery.uploadPhoto': 'फोटो अपलोड करें',
    'gallery.uploadVideo': 'वीडियो अपलोड करें',
    
    // Travel
    'travel.title': 'यात्रा और ठहरना',
    'travel.subtitle': 'आपकी यात्रा के लिए सब कुछ',
    'travel.airports': 'निकटतम हवाई अड्डे',
    'travel.hotels': 'अनुशंसित होटल',
    'travel.transport': 'स्थानीय परिवहन',
    'travel.weather': 'मौसम और जलवायु',
    'travel.visa': 'वीज़ा जानकारी',
    'travel.currency': 'मुद्रा और विनिमय',
    
    // Family
    'family.title': 'परिवारों से मिलें',
    'family.brideFamily': 'दुल्हन का परिवार',
    'family.groomFamily': 'दूल्हे का परिवार',
    
    // Traditions
    'traditions.title': 'हमारी परंपराएं',
    'traditions.subtitle': 'सुंदर रीति-रिवाजों को समझना',
    
    // Footer
    'footer.madeWith': 'प्यार से बनाया गया',
    'footer.shareOnWhatsapp': 'WhatsApp पर शेयर करें',
    
    // Events Names
    'event.haldi': 'हल्दी',
    'event.mehendi': 'मेहंदी',
    'event.sangeet': 'संगीत',
    'event.wedding': 'शादी समारोह',
    'event.reception': 'रिसेप्शन',
    'event.engagement': 'सगाई',
    'event.baraat': 'बारात',
    
    // Common
    'common.viewDetails': 'विवरण देखें',
    'common.learnMore': 'और जानें',
    'common.close': 'बंद करें',
  },
  // Placeholder for other languages - would be filled similarly
  ta: { 'nav.home': 'முகப்பு' },
  te: { 'nav.home': 'హోమ్' },
  bn: { 'nav.home': 'হোম' },
  gu: { 'nav.home': 'હોમ' },
  pa: { 'nav.home': 'ਹੋਮ' },
  ur: { 'nav.home': 'ہوم' },
  ml: { 'nav.home': 'ഹോം' },
};
  
export function t(key: string, lang: Language = 'en'): string {
  return translations[lang][key] || translations['en'][key] || key;
}
