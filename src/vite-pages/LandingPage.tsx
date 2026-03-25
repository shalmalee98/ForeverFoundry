import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Sparkles,
  Palette,
  Image,
  Calendar,
  Shield,
  ChevronRight,
  Check,
  Quote,
  Flower2,
  Gift,
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [previewNames, setPreviewNames] = useState({ first: 'Priya', second: 'Rohan' });

  return (
    <div className="min-h-screen bg-background font-body antialiased overflow-x-hidden">
      {/* Subtle mandala background */}
      <div className="fixed inset-0 mandala-pattern opacity-40 pointer-events-none" aria-hidden />
      <div className="fixed inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/60 pointer-events-none" aria-hidden />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xl font-display font-semibold text-foreground hover:opacity-90 transition"
          >
            <Heart className="w-6 h-6 fill-primary text-primary" />
            <span>Forever<span className="text-primary">Foundry</span></span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/builder')}
            className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Build your website for free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Hero background orbs */}
        <div
          className="pointer-events-none absolute -top-24 -left-10 w-72 h-72 rounded-full bg-primary/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-10 w-80 h-80 rounded-full bg-secondary/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-1/3 -right-24 w-64 h-64 rounded-full bg-accent/10 blur-3xl"
          aria-hidden
        />
        <div className="container mx-auto px-6 text-center">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4" />
            Built for Indian weddings — every ceremony, one beautiful site
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground max-w-4xl mx-auto mb-6 animate-fade-up animation-delay-100">
            Your traditions.
            <br />
            <span className="text-gradient-gold">Your story.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up animation-delay-200">
            One stunning website for Mehendi, Sangeet, Haldi, Wedding & Reception. Beautiful themes, photo galleries, and RSVPs — no ads, no clutter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-300">
            <button
              type="button"
              onClick={() => navigate('/builder')}
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground text-lg font-semibold shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition"
            >
              Build your website for free
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full border-2 border-border text-foreground font-medium hover:bg-muted/50 transition"
            >
              See how it works
            </button>
          </div>

          {/* "See your names" preview strip — wow factor */}
          <div className="mt-16 md:mt-20 max-w-4xl mx-auto animate-fade-up animation-delay-400">
            <p className="text-sm text-muted-foreground mb-2">See it in action</p>
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <input
                type="text"
                value={previewNames.first}
                onChange={(e) => setPreviewNames((n) => ({ ...n, first: e.target.value || 'Priya' }))}
                placeholder="Your name"
                className="w-36 px-4 py-2 rounded-full border border-border bg-background text-center text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <span className="text-muted-foreground self-center">&</span>
              <input
                type="text"
                value={previewNames.second}
                onChange={(e) => setPreviewNames((n) => ({ ...n, second: e.target.value || 'Rohan' }))}
                placeholder="Partner's name"
                className="w-36 px-4 py-2 rounded-full border border-border bg-background text-center text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="relative rounded-2xl border border-border bg-card shadow-elegant overflow-hidden floral-corner">
              <div className="absolute inset-0 paisley-pattern opacity-30" aria-hidden />
              <div className="relative p-8 md:p-10 text-center">
                <p className="font-display text-2xl md:text-3xl text-foreground mb-1">
                  {previewNames.first || 'Priya'} &amp; {previewNames.second || 'Rohan'}
                </p>
                <p className="text-muted-foreground text-sm md:text-base">We’re getting married — and we can’t wait to celebrate with you.</p>
                <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
                  {['Our story', 'Events', 'Gallery', 'RSVP'].map((label) => (
                    <span key={label} className="px-4 py-2 rounded-full bg-muted/80 text-muted-foreground">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ForeverFoundry — differentiator */}
      <section className="relative py-16 md:py-20 bg-muted/30 overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 -right-10 w-72 h-72 rounded-full bg-primary/12 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-accent/10 blur-3xl"
          aria-hidden
        />
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Why couples choose ForeverFoundry
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            We built what we wished existed: a wedding website that honors your culture and keeps the focus on you.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Flower2, title: 'Made for Indian weddings', desc: 'Mehendi, Sangeet, Haldi, Wedding, Reception — every event in one place with the right vibe.' },
              { icon: Palette, title: 'Beautiful, not generic', desc: 'Themes and motifs that feel like your wedding, not a template from a dropdown.' },
              { icon: Shield, title: 'No ads. Your privacy.', desc: 'Your site and your guests’ data stay yours. No tracking, no sponsored clutter.' },
              { icon: Gift, title: 'Free to start', desc: 'Create your site and invite guests with no credit card. Upgrade only when you’re ready.' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-background rounded-2xl p-6 border border-border shadow-card hover:shadow-elegant hover:border-primary/20 transition"
              >
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-16 md:py-20 overflow-hidden">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/8 blur-3xl"
          aria-hidden
        />
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Everything you need in one place
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Design, share, and manage your wedding without juggling a dozen tools.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Palette, title: 'Beautiful themes', desc: 'Stunning Indian wedding themes with traditional motifs and modern elegance. Switch anytime.', color: 'primary' },
              { icon: Image, title: 'Photo galleries', desc: 'Upload unlimited photos, create albums for each function, and share precious moments with family.', color: 'primary' },
              { icon: Calendar, title: 'Event management', desc: 'Manage multiple functions — Mehendi, Sangeet, Haldi, Wedding, Reception — with one dashboard.', color: 'primary' },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-elegant hover:-translate-y-1 transition"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof / Testimonials */}
      <section className="relative py-16 md:py-20 bg-muted/30 overflow-hidden">
        <div
          className="pointer-events-none absolute -top-20 left-0 w-72 h-72 rounded-full bg-secondary/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 right-0 w-80 h-80 rounded-full bg-primary/12 blur-3xl"
          aria-hidden
        />
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Loved by couples like you
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Real stories from couples who wanted something that felt like them.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { quote: 'Finally a wedding website that gets Indian weddings. We had Mehendi, Sangeet, and the main day — everything looked beautiful and our guests actually used it.', author: 'Ananya & Vikram', location: 'Mumbai' },
              { quote: 'No ads, no chaos. Just our photos, our events, and our story. Exactly what we wanted.', author: 'Kavya & Arjun', location: 'Bangalore' },
              { quote: 'Setup was so easy. Our parents could find the schedule and RSVP without calling us a hundred times.', author: 'Divya & Rohan', location: 'Delhi' },
            ].map((t, i) => (
              <div key={i} className="bg-background rounded-2xl p-6 border border-border shadow-card">
                <Quote className="w-8 h-8 text-primary/50 mb-4" />
                <p className="text-foreground/90 mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-semibold text-foreground">{t.author}</p>
                <p className="text-sm text-muted-foreground">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Your website in three steps
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            No design skills needed. Just your details and your photos.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: 1, title: 'Pick a theme', desc: 'Choose a design that matches your wedding. All themes work for multi-day celebrations.' },
              { step: 2, title: 'Add your story & events', desc: 'Add dates, venues, and your love story. Upload photos for each function.' },
              { step: 3, title: 'Share & collect RSVPs', desc: 'Share one link with guests. They can RSVP and see only what you want them to see.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-display font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5" aria-hidden />
        <div className="container mx-auto px-6 relative text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Start your wedding website today
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Free to create. No credit card required. Publish when you’re ready.
          </p>
          <button
            type="button"
            onClick={() => navigate('/builder')}
            className="px-10 py-4 rounded-full bg-primary text-primary-foreground text-lg font-semibold shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Build your website for free
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              No credit card
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              Cancel anytime
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              Your data stays yours
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-muted/20">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-foreground/80 font-medium">
            <Heart className="w-4 h-4 fill-primary text-primary" />
            ForeverFoundry
          </div>
          <button
            type="button"
            onClick={() => navigate('/builder')}
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            Open builder
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
