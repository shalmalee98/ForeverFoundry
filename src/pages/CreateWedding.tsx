import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Plus, Trash2, Calendar, MapPin, Camera, Image, Sparkles, Wand2 } from 'lucide-react';

interface Event {
  id: number;
  type: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  dressCode: string;
  photos: any[];
}

interface FormData {
  id?: number;
  name: string;
  createdAt: string;
  theme: string;
  background: string;
  culture: string;
  partner1: { name: string; type: string };
  partner2: { name: string; type: string };
  hashtag: string;
  events: Event[];
  photos: any[];
  guests: any[];
  games: boolean;
  guestPhotos: boolean;
  familyTree: boolean;
  rsvp: boolean;
  story: string;
  selectedGames: string[];
}

const CreateWedding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [generatingHashtag, setGeneratingHashtag] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: 'Untitled Wedding',
    createdAt: new Date().toISOString(),
    theme: 'royal',
    background: 'mandala-gold',
    culture: 'north-indian',
    partner1: { name: '', type: 'bride' },
    partner2: { name: '', type: 'groom' },
    hashtag: '',
    events: [],
    photos: [],
    guests: [],
    games: false,
    guestPhotos: false,
    familyTree: false,
    rsvp: false,
    story: '',
    selectedGames: []
  });

  const cultures = [
    { id: 'north-indian', name: 'North Indian', desc: 'Punjabi, UP, Delhi traditions' },
    { id: 'south-indian', name: 'South Indian', desc: 'Tamil, Telugu, Kerala traditions' },
    { id: 'bengali', name: 'Bengali', desc: 'West Bengal traditions' },
    { id: 'gujarati', name: 'Gujarati', desc: 'Gujarat traditions' },
    { id: 'marathi', name: 'Marathi', desc: 'Maharashtra traditions' },
    { id: 'rajasthani', name: 'Rajasthani', desc: 'Rajasthan traditions' },
    { id: 'goan', name: 'Goan', desc: 'Goa traditions' },
    { id: 'modern-fusion', name: 'Modern Fusion', desc: 'Contemporary mix' }
  ];

  const themes = [
    { id: 'royal', name: 'Royal Maharaja', colors: ['from-purple-600', 'to-pink-600'], desc: 'Rich purples and golds', cultures: ['north-indian', 'rajasthani'] },
    { id: 'traditional', name: 'Traditional Red', colors: ['from-red-600', 'to-orange-600'], desc: 'Classic red and gold', cultures: ['north-indian', 'gujarati', 'marathi'] },
    { id: 'pastel', name: 'Pastel Dreams', colors: ['from-pink-400', 'to-blue-400'], desc: 'Soft pastels', cultures: ['modern-fusion', 'goan'] },
    { id: 'modern', name: 'Modern Minimalist', colors: ['from-gray-800', 'to-rose-500'], desc: 'Sleek and elegant', cultures: ['modern-fusion'] },
    { id: 'garden', name: 'Garden Romance', colors: ['from-green-500', 'to-pink-500'], desc: 'Nature inspired', cultures: ['south-indian', 'goan'] },
    { id: 'golden', name: 'Golden Elegance', colors: ['from-yellow-600', 'to-orange-600'], desc: 'Luxurious gold', cultures: ['south-indian', 'tamil'] },
    { id: 'peacock', name: 'Peacock Pride', colors: ['from-blue-600', 'to-green-600'], desc: 'Vibrant peacock colors', cultures: ['south-indian'] },
    { id: 'marigold', name: 'Marigold Magic', colors: ['from-orange-500', 'to-yellow-500'], desc: 'Bright marigold', cultures: ['north-indian', 'gujarati'] }
  ];

  const backgrounds = [
    { id: 'mandala-gold', name: 'Golden Mandala', url: 'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=800&auto=format', pattern: 'mandala' },
    { id: 'rangoli', name: 'Colorful Rangoli', url: 'https://images.unsplash.com/photo-1609168661292-1b75f9b18af7?w=800&auto=format', pattern: 'rangoli' },
    { id: 'paisley-gold', name: 'Gold Paisley', url: 'https://images.unsplash.com/photo-1528490462738-c63fc49b7dae?w=800&auto=format', pattern: 'paisley' },
    { id: 'marigold-pattern', name: 'Marigold Blooms', url: 'https://images.unsplash.com/photo-1609168664303-44efc46807fa?w=800&auto=format', pattern: 'floral' },
    { id: 'peacock-motif', name: 'Peacock Feathers', url: 'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?w=800&auto=format', pattern: 'peacock' },
    { id: 'lotus-garden', name: 'Lotus Garden', url: 'https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=800&auto=format', pattern: 'lotus' },
    { id: 'traditional-textile', name: 'Traditional Textile', url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format', pattern: 'textile' },
    { id: 'henna-art', name: 'Henna Designs', url: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&auto=format', pattern: 'henna' },
    { id: 'diya-lights', name: 'Diya Lights', url: 'https://images.unsplash.com/photo-1571841261157-e090a5a92feb?w=800&auto=format', pattern: 'lights' },
    { id: 'silk-saree', name: 'Silk Saree Texture', url: 'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?w=800&auto=format', pattern: 'silk' }
  ];

  const weddingGames = [
    { id: 'shoe-game', name: 'The Shoe Game', desc: 'Couple answers questions about each other' },
    { id: 'ring-finding', name: 'Ring Finding Ceremony', desc: 'Traditional game of finding ring in milk' },
    { id: 'joota-chupai', name: 'Joota Chupai', desc: "Bride's sisters steal groom's shoes" },
    { id: 'antakshari', name: 'Antakshari', desc: 'Musical game with Bollywood songs' },
    { id: 'dumb-charades', name: 'Dumb Charades', desc: 'Act out Bollywood movies' },
    { id: 'mehendi-design', name: 'Find the Name', desc: 'Groom finds his name in bride\'s mehendi' },
    { id: 'couple-trivia', name: 'Couple Trivia', desc: 'Guests answer questions about the couple' },
    { id: 'dance-competition', name: 'Dance Competition', desc: 'Guests compete in dance-off' },
    { id: 'guess-song', name: 'Guess the Song', desc: 'Identify Bollywood songs from lyrics' },
    { id: 'photo-booth', name: 'Photo Booth Challenge', desc: 'Fun props and poses for guests' }
  ];

  const eventTypes = ['Engagement', 'Roka', 'Mehendi', 'Sangeet', 'Haldi', 'Tilak', 'Wedding Ceremony', 'Reception', 'Custom Event'];

  useEffect(() => {
    const savedUser = localStorage.getItem('weddingUser');
    if (!savedUser) {
      navigate('/login');
      return;
    }

    const currentProject = localStorage.getItem('currentProject');
    if (currentProject) {
      setFormData(JSON.parse(currentProject));
      localStorage.removeItem('currentProject');
    }
  }, [navigate]);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateHashtag = async () => {
    setGeneratingHashtag(true);
    // Simulate AI generation with creative logic
    setTimeout(() => {
      const name1 = formData.partner1.name.split(' ')[0] || 'Love';
      const name2 = formData.partner2.name.split(' ')[0] || 'Forever';
      
      const suggestions = [
        `#${name1}Weds${name2}`,
        `#${name1}❤️${name2}`,
        `#${name1}And${name2}Forever`,
        `#The${name1}${name2}Wedding`,
        `#${name1}${name2}ShadiSaga`,
        `#Bound${name1}${name2}`,
        `#${name1}Hearts${name2}`,
        `#${name1}Meets${name2}`
      ];
      
      // Pick a random suggestion
      const randomHashtag = suggestions[Math.floor(Math.random() * suggestions.length)];
      updateFormData('hashtag', randomHashtag);
      setGeneratingHashtag(false);
    }, 1500);
  };

  const getFilteredThemes = () => {
    if (!formData.culture) return themes;
    return themes.filter(theme => 
      theme.cultures.includes(formData.culture) || theme.cultures.includes('modern-fusion')
    );
  };

  const addEvent = () => {
    const newEvent: Event = {
      id: Date.now(),
      type: 'Wedding Ceremony',
      date: '',
      time: '',
      venue: '',
      address: '',
      dressCode: '',
      photos: []
    };
    updateFormData('events', [...formData.events, newEvent]);
  };

  const updateEvent = (id: number, field: string, value: any) => {
    updateFormData('events', formData.events.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeEvent = (id: number) => {
    updateFormData('events', formData.events.filter(e => e.id !== id));
  };

  const toggleGame = (gameId: string) => {
    const selected = formData.selectedGames || [];
    if (selected.includes(gameId)) {
      updateFormData('selectedGames', selected.filter(g => g !== gameId));
    } else {
      updateFormData('selectedGames', [...selected, gameId]);
    }
  };

  const handleSave = () => {
    const savedProjects = localStorage.getItem('weddingProjects');
    const projects = savedProjects ? JSON.parse(savedProjects) : [];
    
    const updatedProjects = formData.id 
      ? projects.map((p: FormData) => p.id === formData.id ? formData : p)
      : [...projects, { ...formData, id: Date.now() }];
    
    localStorage.setItem('weddingProjects', JSON.stringify(updatedProjects));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 text-2xl font-bold text-rose-600">
            <Heart className="fill-rose-500" />
            <span>Wedding Builder</span>
          </div>
          <div className="flex space-x-4">
            <button onClick={() => navigate('/dashboard')} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              Cancel
            </button>
            <button onClick={handleSave} className="px-6 py-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition">
              Save Website
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8 overflow-x-auto">
          {['Culture', 'Basic Info', 'Theme & BG', 'Events', 'Photos', 'Games & Extras'].map((s, i) => (
            <div key={i} className="flex items-center min-w-fit">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-rose-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`ml-2 text-sm ${step === i + 1 ? 'font-bold text-rose-600' : 'text-gray-600'}`}>{s}</span>
              {i < 5 && <div className="w-8 h-1 bg-gray-300 mx-2"></div>}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Culture Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Sparkles className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Culture</h2>
                <p className="text-gray-600">We'll suggest themes and traditions based on your selection</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {cultures.map(culture => (
                  <div 
                    key={culture.id} 
                    onClick={() => updateFormData('culture', culture.id)} 
                    className={`cursor-pointer border-3 rounded-xl p-6 transition transform hover:scale-105 ${formData.culture === culture.id ? 'border-rose-500 bg-rose-50 shadow-lg' : 'border-gray-200 bg-white'}`}
                  >
                    <h3 className="font-bold text-xl text-gray-800 mb-2">{culture.name}</h3>
                    <p className="text-gray-600 text-sm">{culture.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Basic Info */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Let's Start with the Basics</h2>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Website Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => updateFormData('name', e.target.value)} 
                  placeholder="e.g., Priya & Arjun's Wedding" 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none transition" 
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Partner 1 Name</label>
                  <input 
                    type="text" 
                    value={formData.partner1.name} 
                    onChange={(e) => updateFormData('partner1', { ...formData.partner1, name: e.target.value })} 
                    placeholder="First name" 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none transition" 
                  />
                  <select 
                    value={formData.partner1.type} 
                    onChange={(e) => updateFormData('partner1', { ...formData.partner1, type: e.target.value })} 
                    className="w-full mt-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none transition"
                  >
                    <option value="bride">Bride</option>
                    <option value="groom">Groom</option>
                    <option value="partner">Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Partner 2 Name</label>
                  <input 
                    type="text" 
                    value={formData.partner2.name} 
                    onChange={(e) => updateFormData('partner2', { ...formData.partner2, name: e.target.value })} 
                    placeholder="Second name" 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none transition" 
                  />
                  <select 
                    value={formData.partner2.type} 
                    onChange={(e) => updateFormData('partner2', { ...formData.partner2, type: e.target.value })} 
                    className="w-full mt-2 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none transition"
                  >
                    <option value="bride">Bride</option>
                    <option value="groom">Groom</option>
                    <option value="partner">Partner</option>
                  </select>
                </div>
              </div>
              
              {/* Hashtag Generator */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                      <Wand2 className="w-5 h-5 text-purple-500" />
                      Wedding Hashtag
                    </h3>
                    <p className="text-gray-600 text-sm">AI-powered hashtag for your big day</p>
                  </div>
                  <button 
                    onClick={generateHashtag}
                    disabled={!formData.partner1.name || !formData.partner2.name || generatingHashtag}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {generatingHashtag ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate
                      </>
                    )}
                  </button>
                </div>
                <input 
                  type="text" 
                  value={formData.hashtag} 
                  onChange={(e) => updateFormData('hashtag', e.target.value)} 
                  placeholder="Your wedding hashtag will appear here" 
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 outline-none transition text-xl font-bold text-purple-600" 
                />
                <p className="text-gray-500 text-xs mt-2">Tip: Enter partner names first, then click Generate!</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Love Story (Optional)</label>
                <textarea 
                  value={formData.story} 
                  onChange={(e) => updateFormData('story', e.target.value)} 
                  placeholder="Share how you met, your journey together..." 
                  rows={4} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none transition"
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 3: Theme & Background */}
          {step === 3 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Theme</h2>
                <p className="text-gray-600 mb-6">Curated themes for {cultures.find(c => c.id === formData.culture)?.name || 'your'} wedding</p>
                <div className="grid md:grid-cols-2 gap-6">
                  {getFilteredThemes().map(theme => (
                    <div 
                      key={theme.id} 
                      onClick={() => updateFormData('theme', theme.id)} 
                      className={`cursor-pointer border-4 rounded-2xl overflow-hidden transition transform hover:scale-105 ${formData.theme === theme.id ? 'border-rose-500 shadow-xl' : 'border-gray-200'}`}
                    >
                      <div className={`h-32 bg-gradient-to-r ${theme.colors.join(' ')}`}></div>
                      <div className="p-4 bg-white">
                        <h3 className="font-bold text-lg text-gray-800">{theme.name}</h3>
                        <p className="text-gray-600 text-sm">{theme.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Select Background Design</h2>
                <p className="text-gray-600 mb-6">Beautiful Indian-inspired patterns and textures</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {backgrounds.map(bg => (
                    <div 
                      key={bg.id} 
                      onClick={() => updateFormData('background', bg.id)} 
                      className={`cursor-pointer rounded-xl overflow-hidden transition transform hover:scale-105 border-4 ${formData.background === bg.id ? 'border-rose-500 shadow-xl' : 'border-gray-200'}`}
                    >
                      <div className="relative h-32 bg-cover bg-center" style={{ backgroundImage: `url(${bg.url})` }}>
                        <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-10 transition"></div>
                      </div>
                      <div className="p-3 bg-white">
                        <h4 className="font-bold text-sm text-gray-800">{bg.name}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Events */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Wedding Events</h2>
                <button onClick={addEvent} className="flex items-center space-x-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition">
                  <Plus className="w-4 h-4" />
                  <span>Add Event</span>
                </button>
              </div>
              {formData.events.map((event, idx) => (
                <div key={event.id} className="border-2 border-gray-200 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800">Event {idx + 1}</h3>
                    <button onClick={() => removeEvent(event.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Event Type</label>
                      <select 
                        value={event.type} 
                        onChange={(e) => updateEvent(event.id, 'type', e.target.value)} 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none transition"
                      >
                        {eventTypes.map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Date</label>
                      <input 
                        type="date" 
                        value={event.date} 
                        onChange={(e) => updateEvent(event.id, 'date', e.target.value)} 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none transition" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Time</label>
                      <input 
                        type="time" 
                        value={event.time} 
                        onChange={(e) => updateEvent(event.id, 'time', e.target.value)} 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none transition" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Venue Name</label>
                      <input 
                        type="text" 
                        value={event.venue} 
                        onChange={(e) => updateEvent(event.id, 'venue', e.target.value)} 
                        placeholder="e.g., Grand Banquet Hall" 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none transition" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">Address</label>
                      <input 
                        type="text" 
                        value={event.address} 
                        onChange={(e) => updateEvent(event.id, 'address', e.target.value)} 
                        placeholder="Full address" 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none transition" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">Dress Code (Optional)</label>
                      <input 
                        type="text" 
                        value={event.dressCode} 
                        onChange={(e) => updateEvent(event.id, 'dressCode', e.target.value)} 
                        placeholder="e.g., Traditional Indian attire" 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 outline-none transition" 
                      />
                    </div>
                  </div>
                </div>
              ))}
              {formData.events.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No events added yet. Click "Add Event" to get started!</p>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Photo Gallery */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Photo Gallery</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-rose-500 transition">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Upload your favorite photos</p>
                <p className="text-sm text-gray-500 mb-4">(In production, this will connect to Firebase Storage)</p>
                <button className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition">
                  Select Photos
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-rose-200 to-orange-200 rounded-xl flex items-center justify-center">
                    <Image className="w-12 h-12 text-white opacity-50" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Games & Extras */}
          {step === 6 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Wedding Games</h2>
                <p className="text-gray-600 mb-6">Select fun games for your guests</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {weddingGames.map(game => (
                    <div 
                      key={game.id}
                      onClick={() => toggleGame(game.id)}
                      className={`cursor-pointer border-3 rounded-xl p-4 transition transform hover:scale-105 ${(formData.selectedGames || []).includes(game.id) ? 'border-rose-500 bg-rose-50 shadow-lg' : 'border-gray-200 bg-white'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-800">{game.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">{game.desc}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-3 ${(formData.selectedGames || []).includes(game.id) ? 'border-rose-500 bg-rose-500' : 'border-gray-300'}`}>
                          {(formData.selectedGames || []).includes(game.id) && (
                            <span className="text-white text-sm">✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Extra Features</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl border-2 border-rose-200">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">Guest Photo Upload</h3>
                      <p className="text-gray-600 text-sm">Let guests upload their photos from the wedding</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.guestPhotos} 
                        onChange={(e) => updateFormData('guestPhotos', e.target.checked)} 
                        className="sr-only peer" 
                      />
                      <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-rose-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">Family Tree</h3>
                      <p className="text-gray-600 text-sm">Display family members and relationships</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.familyTree} 
                        onChange={(e) => updateFormData('familyTree', e.target.checked)} 
                        className="sr-only peer" 
                      />
                      <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">RSVP Form</h3>
                      <p className="text-gray-600 text-sm">Collect guest responses and meal preferences</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.rsvp} 
                        onChange={(e) => updateFormData('rsvp', e.target.checked)} 
                        className="sr-only peer" 
                      />
                      <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-200">
            <button 
              onClick={() => setStep(Math.max(1, step - 1))} 
              disabled={step === 1} 
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button 
              onClick={() => step === 6 ? handleSave() : setStep(step + 1)} 
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition"
            >
              {step === 6 ? 'Save & Finish' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWedding;