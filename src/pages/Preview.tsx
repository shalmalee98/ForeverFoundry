import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Calendar, MapPin, Camera, Image, Users, Music, Award, Gamepad2, Upload, Gift } from 'lucide-react';

interface Event {
  id: number;
  type: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  dressCode: string;
}

interface Project {
  name: string;
  partner1: { name: string; type: string };
  partner2: { name: string; type: string };
  theme: string;
  background: string;
  culture: string;
  hashtag: string;
  story: string;
  events: Event[];
  guestPhotos: boolean;
  familyTree: boolean;
  rsvp: boolean;
  selectedGames: string[];
}

const Preview = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState('home');

  const themeColors: { [key: string]: string } = {
    royal: 'from-purple-600 via-pink-600 to-orange-600',
    traditional: 'from-red-600 via-orange-600 to-yellow-600',
    pastel: 'from-pink-400 via-purple-400 to-blue-400',
    modern: 'from-gray-800 via-rose-500 to-pink-500',
    garden: 'from-green-500 via-teal-500 to-pink-500',
    golden: 'from-yellow-600 via-orange-600 to-red-600',
    peacock: 'from-blue-600 via-green-600 to-teal-600',
    marigold: 'from-orange-500 via-yellow-500 to-orange-400'
  };

  const backgrounds: { [key: string]: string } = {
    'mandala-gold': 'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=1600&auto=format',
    'rangoli': 'https://images.unsplash.com/photo-1609168661292-1b75f9b18af7?w=1600&auto=format',
    'paisley-gold': 'https://images.unsplash.com/photo-1528490462738-c63fc49b7dae?w=1600&auto=format',
    'marigold-pattern': 'https://images.unsplash.com/photo-1609168664303-44efc46807fa?w=1600&auto=format',
    'peacock-motif': 'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?w=1600&auto=format',
    'lotus-garden': 'https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=1600&auto=format',
    'traditional-textile': 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1600&auto=format',
    'henna-art': 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=1600&auto=format',
    'diya-lights': 'https://images.unsplash.com/photo-1571841261157-e090a5a92feb?w=1600&auto=format',
    'silk-saree': 'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?w=1600&auto=format'
  };

  const gameDetails: { [key: string]: { icon: any; color: string } } = {
    'shoe-game': { icon: Heart, color: 'rose' },
    'ring-finding': { icon: Gift, color: 'pink' },
    'joota-chupai': { icon: Award, color: 'orange' },
    'antakshari': { icon: Music, color: 'purple' },
    'dumb-charades': { icon: Gamepad2, color: 'blue' },
    'mehendi-design': { icon: Sparkles, color: 'yellow' },
    'couple-trivia': { icon: Users, color: 'green' },
    'dance-competition': { icon: Music, color: 'red' },
    'guess-song': { icon: Music, color: 'indigo' },
    'photo-booth': { icon: Camera, color: 'teal' }
  };

  const gameNames: { [key: string]: string } = {
    'shoe-game': 'The Shoe Game',
    'ring-finding': 'Ring Finding',
    'joota-chupai': 'Joota Chupai',
    'antakshari': 'Antakshari',
    'dumb-charades': 'Dumb Charades',
    'mehendi-design': 'Find the Name',
    'couple-trivia': 'Couple Trivia',
    'dance-competition': 'Dance Battle',
    'guess-song': 'Guess the Song',
    'photo-booth': 'Photo Booth'
  };

  useEffect(() => {
    const previewProject = localStorage.getItem('previewProject');
    if (previewProject) {
      setProject(JSON.parse(previewProject));
    } else {
      navigate('/dashboard');
    }
  }, [navigate]);

  if (!project) return null;

  const theme = project.theme || 'royal';
  const bgImage = project.background ? backgrounds[project.background] : backgrounds['mandala-gold'];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
        <h2 className="text-xl font-bold text-gray-800">Preview Mode</h2>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="fixed top-20 w-full bg-white shadow-md z-40">
        <div className="container mx-auto px-6 py-3 flex justify-center space-x-6 overflow-x-auto">
          {['Home', 'Story', 'Events', 'Gallery', 'Games', 'RSVP'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`px-4 py-2 rounded-lg transition font-medium whitespace-nowrap ${activeSection === item.toLowerCase() ? 'bg-rose-500 text-white' : 'text-gray-600 hover:bg-rose-50'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      <div className="pt-32">
        {/* Hero Section with Background */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${themeColors[theme]} opacity-80`}></div>
          </div>
          
          {/* Animated Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Sparkles className="absolute top-20 left-10 w-8 h-8 text-white animate-pulse" style={{ animationDelay: '0s' }} />
            <Sparkles className="absolute top-40 right-20 w-6 h-6 text-white animate-pulse" style={{ animationDelay: '1s' }} />
            <Heart className="absolute bottom-40 left-20 w-10 h-10 text-white fill-white opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
            <Sparkles className="absolute bottom-20 right-40 w-8 h-8 text-white animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center animate-pulse">
                  <Heart className="w-20 h-20 text-white fill-white" />
                </div>
              </div>
            </div>
            <h1 className="text-7xl md:text-8xl font-bold mb-6 text-white drop-shadow-lg animate-fade-in">
              {project.partner1.name} <span className="text-5xl">❤️</span> {project.partner2.name}
            </h1>
            <p className="text-3xl md:text-4xl opacity-90 mb-6 text-white font-light">
              We're Getting Married!
            </p>
            {project.hashtag && (
              <div className="inline-block bg-white bg-opacity-20 backdrop-blur-md px-8 py-4 rounded-full mb-8 border-2 border-white border-opacity-30">
                <p className="text-2xl font-bold text-white">{project.hashtag}</p>
              </div>
            )}
            <button 
              onClick={() => scrollToSection('events')}
              className="px-8 py-4 bg-white text-rose-600 text-lg rounded-full hover:shadow-2xl transform hover:scale-105 transition font-bold"
            >
              View Wedding Details
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        {project.story && (
          <section id="story" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <Heart className="w-16 h-16 text-rose-500 fill-rose-400 mx-auto mb-4 animate-pulse" />
                  <h2 className="text-5xl font-bold text-gray-800 mb-4">Our Love Story</h2>
                  <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
                </div>
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-12 shadow-xl">
                  <p className="text-xl text-gray-700 leading-relaxed text-center italic">
                    "{project.story}"
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Events Section */}
        {project.events && project.events.length > 0 && (
          <section id="events" className="py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <Calendar className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                <h2 className="text-5xl font-bold text-gray-800 mb-4">Wedding Celebrations</h2>
                <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
                <p className="text-gray-600 mt-4 text-lg">Join us in celebrating our special moments</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {project.events.map((event, idx) => (
                  <div 
                    key={event.id} 
                    className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-rose-500"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${themeColors[theme]} flex items-center justify-center mb-6 mx-auto`}>
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{event.type}</h3>
                    <div className="space-y-4 text-gray-600">
                      <div className="flex items-start space-x-3">
                        <Calendar className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-700">Date</p>
                          <p className="text-sm">
                            {event.date 
                              ? new Date(event.date).toLocaleDateString('en-IN', { 
                                  weekday: 'long', 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })
                              : 'Date to be announced'}
                          </p>
                        </div>
                      </div>
                      {event.time && (
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-rose-500 text-xl">🕐</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">Time</p>
                            <p className="text-sm">{event.time}</p>
                          </div>
                        </div>
                      )}
                      {event.venue && (
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold text-gray-700">Venue</p>
                            <p className="text-sm">{event.venue}</p>
                            {event.address && <p className="text-xs text-gray-500 mt-1">{event.address}</p>}
                          </div>
                        </div>
                      )}
                      {event.dressCode && (
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-rose-500 text-xl">👗</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">Dress Code</p>
                            <p className="text-sm">{event.dressCode}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Photo Gallery */}
        <section id="gallery" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Camera className="w-16 h-16 text-rose-500 mx-auto mb-4" />
              <h2 className="text-5xl font-bold text-gray-800 mb-4">Our Memories</h2>
              <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 text-lg">Capturing moments of love and joy</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div 
                  key={i} 
                  className="aspect-square bg-gradient-to-br from-rose-200 via-pink-200 to-orange-200 rounded-2xl flex items-center justify-center hover:scale-105 transition shadow-lg hover:shadow-2xl cursor-pointer group relative overflow-hidden"
                >
                  <Image className="w-16 h-16 text-white opacity-40 group-hover:opacity-60 transition" />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition"></div>
                </div>
              ))}
            </div>
            {project.guestPhotos && (
              <div className="mt-12 text-center">
                <div className="inline-block bg-gradient-to-r from-rose-50 to-orange-50 px-8 py-6 rounded-2xl border-2 border-rose-200">
                  <Upload className="w-12 h-12 text-rose-500 mx-auto mb-3" />
                  <h3 className="font-bold text-xl text-gray-800 mb-2">Share Your Photos!</h3>
                  <p className="text-gray-600 mb-4">Upload your favorite moments from our wedding</p>
                  <button className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition font-medium">
                    Upload Photos
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Games Section */}
        {project.selectedGames && project.selectedGames.length > 0 && (
          <section id="games" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <Gamepad2 className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                <h2 className="text-5xl font-bold text-gray-800 mb-4">Wedding Games</h2>
                <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
                <p className="text-gray-600 mt-4 text-lg">Join the fun and make memories!</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {project.selectedGames.map((gameId, idx) => {
                  const game = gameDetails[gameId];
                  const GameIcon = game?.icon || Gamepad2;
                  const color = game?.color || 'rose';
                  
                  return (
                    <div 
                      key={gameId}
                      className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className={`w-20 h-20 rounded-full bg-${color}-100 flex items-center justify-center mb-6 mx-auto`}>
                        <GameIcon className={`w-10 h-10 text-${color}-500`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 text-center mb-3">
                        {gameNames[gameId]}
                      </h3>
                      <button className={`w-full px-6 py-3 bg-${color}-500 text-white rounded-lg hover:bg-${color}-600 transition font-medium`}>
                        Play Now
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Family Tree Section */}
        {project.familyTree && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <Users className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                <h2 className="text-5xl font-bold text-gray-800 mb-4">Our Families</h2>
                <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
                <p className="text-gray-600 mt-4 text-lg">Meet the wonderful people who shaped our lives</p>
              </div>
              <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 shadow-xl">
                  <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {project.partner1.name}'s Family
                  </h3>
                  <div className="space-y-4">
                    {['Parents', 'Siblings', 'Grandparents'].map((relation, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-4 shadow">
                        <p className="font-semibold text-gray-700">{relation}</p>
                        <p className="text-sm text-gray-500">Names will appear here</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 shadow-xl">
                  <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {project.partner2.name}'s Family
                  </h3>
                  <div className="space-y-4">
                    {['Parents', 'Siblings', 'Grandparents'].map((relation, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-4 shadow">
                        <p className="font-semibold text-gray-700">{relation}</p>
                        <p className="text-sm text-gray-500">Names will appear here</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* RSVP Section */}
        {project.rsvp && (
          <section id="rsvp" className="py-20 bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 text-white">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl mx-auto text-center">
                <Heart className="w-20 h-20 mx-auto mb-6 fill-white animate-pulse" />
                <h2 className="text-5xl font-bold mb-6">Save Your Spot!</h2>
                <p className="text-2xl mb-8 opacity-90">Let us know you're coming</p>
                <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white border-opacity-30">
                  <form className="space-y-6">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full px-6 py-4 rounded-xl bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition text-lg"
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full px-6 py-4 rounded-xl bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition text-lg"
                    />
                    <select className="w-full px-6 py-4 rounded-xl bg-white bg-opacity-90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition text-lg">
                      <option>Will you be attending?</option>
                      <option>Joyfully accepts</option>
                      <option>Regretfully declines</option>
                    </select>
                    <select className="w-full px-6 py-4 rounded-xl bg-white bg-opacity-90 text-gray-800 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition text-lg">
                      <option>Number of Guests</option>
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3+ Guests</option>
                    </select>
                    <textarea 
                      placeholder="Special requests or dietary restrictions" 
                      rows={4}
                      className="w-full px-6 py-4 rounded-xl bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition text-lg"
                    ></textarea>
                    <button 
                      type="submit"
                      className="w-full px-8 py-4 bg-white text-rose-600 text-xl rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition"
                    >
                      Submit RSVP
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className={`bg-gradient-to-r ${themeColors[theme]} text-white py-16 text-center relative overflow-hidden`}>
          <div 
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>
          <div className="relative z-10">
            <Heart className="w-20 h-20 mx-auto mb-6 fill-white animate-pulse" />
            <h3 className="text-4xl font-bold mb-4">Can't Wait to Celebrate With You!</h3>
            <p className="text-2xl opacity-90 mb-6">
              {project.partner1.name} & {project.partner2.name}
            </p>
            {project.hashtag && (
              <p className="text-3xl font-bold mb-8">{project.hashtag}</p>
            )}
            <div className="flex justify-center space-x-6">
              <Sparkles className="w-8 h-8 animate-pulse" />
              <Heart className="w-8 h-8 fill-white" />
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Preview;