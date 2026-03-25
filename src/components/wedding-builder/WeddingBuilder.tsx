"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Plus, Trash2, RefreshCw, Heart, ArrowLeft, ImagePlus } from "lucide-react";
import { WeddingPreview } from "./WeddingPreview";
import type { GalleryPreviewImage, WeddingEventItem } from "./types";
import type { WeddingVibe } from "@/lib/wedding-theme";
import { WEDDING_THEMES } from "@/lib/wedding-theme";
import { generateWeddingContentSync } from "@/lib/generate-wedding-content";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultEvents = (): WeddingEventItem[] => [
  { id: "ceremony", name: "Ceremony", time: "4:00 PM", location: "Main venue" },
  { id: "reception", name: "Reception", time: "6:00 PM", location: "Same venue" },
];

function uid() {
  return `e-${typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36)}`;
}

function galleryUid() {
  return `g-${typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36)}`;
}

const MAX_GALLERY_IMAGES = 12;
const MAX_FILE_MB = 8;

export function WeddingBuilder() {
  const [booting, setBooting] = useState(true);
  const [partner1, setPartner1] = useState("Alex");
  const [partner2, setPartner2] = useState("Jordan");
  const [weddingDate, setWeddingDate] = useState("");
  const [location, setLocation] = useState("");
  const [vibe, setVibe] = useState<WeddingVibe>("romantic");
  const [howTheyMet, setHowTheyMet] = useState("");
  const [proposalStory, setProposalStory] = useState("");
  const [events, setEvents] = useState<WeddingEventItem[]>(defaultEvents);
  const [guestMode, setGuestMode] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryPreviewImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryImagesRef = useRef<GalleryPreviewImage[]>([]);
  galleryImagesRef.current = galleryImages;

  const seedContent = useMemo(
    () => generateWeddingContentSync({ partner1: "Alex", partner2: "Jordan" }),
    []
  );
  const [tagline, setTagline] = useState(seedContent.tagline);
  const [story, setStory] = useState(seedContent.story);

  const runGeneration = useCallback(() => {
    const { story: s, tagline: t } = generateWeddingContentSync({
      partner1,
      partner2,
      howTheyMet: howTheyMet || undefined,
      proposalStory: proposalStory || undefined,
    });
    setStory(s);
    setTagline(t);
  }, [partner1, partner2, howTheyMet, proposalStory]);

  /** Initial “Creating your website…” moment — no auth required */
  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1800);
    return () => clearTimeout(t);
  }, []);

  /** Re-run mock AI when story inputs change (debounced) — swap for OpenAI later */
  useEffect(() => {
    if (booting) return;
    const t = setTimeout(() => runGeneration(), 450);
    return () => clearTimeout(t);
  }, [booting, partner1, partner2, howTheyMet, proposalStory, runGeneration]);

  /** Revoke blob URLs on unmount to avoid leaks */
  useEffect(() => {
    return () => {
      galleryImagesRef.current.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, []);

  const removeGalleryImage = useCallback((id: string) => {
    setGalleryImages((prev) => {
      const target = prev.find((x) => x.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((x) => x.id !== id);
    });
  }, []);

  const onGalleryFiles = useCallback((files: FileList | null) => {
    if (!files?.length) return;
    const next: GalleryPreviewImage[] = [];
    let room = MAX_GALLERY_IMAGES - galleryImages.length;
    for (let i = 0; i < files.length && room > 0; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;
      if (file.size > MAX_FILE_MB * 1024 * 1024) continue;
      next.push({ id: galleryUid(), url: URL.createObjectURL(file) });
      room--;
    }
    if (next.length) setGalleryImages((prev) => [...prev, ...next].slice(0, MAX_GALLERY_IMAGES));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [galleryImages.length]);

  const previewData = useMemo(
    () => ({
      partner1,
      partner2,
      weddingDate,
      location,
      vibe,
      tagline,
      story,
      events,
      guestMode,
      galleryImages,
    }),
    [partner1, partner2, weddingDate, location, vibe, tagline, story, events, guestMode, galleryImages]
  );

  if (booting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-rose-50/80 to-background px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="inline-flex mb-6"
          >
            <Heart className="w-14 h-14 text-rose-400 fill-rose-200" />
          </motion.div>
          <h1 className="font-display text-2xl md:text-3xl text-foreground mb-3">Creating your wedding website…</h1>
          <p className="text-muted-foreground text-sm mb-8">We’re tailoring your story and layout. Almost there.</p>
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-2 w-2 rounded-full bg-primary"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <a href="/" aria-label="Home">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>
            <div className="flex items-center gap-2 font-display font-semibold text-lg">
              <Heart className="h-5 w-5 fill-primary text-primary" />
              <span>ForeverFoundry</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Switch id="guest" checked={guestMode} onCheckedChange={setGuestMode} />
              <Label htmlFor="guest" className="text-muted-foreground cursor-pointer">
                Preview as guest
              </Label>
            </div>
            <Button variant="outline" size="sm" className="rounded-full gap-2" onClick={runGeneration}>
              <RefreshCw className="h-4 w-4" />
              Regenerate story
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 grid lg:grid-cols-2 gap-0 lg:min-h-[calc(100vh-57px)]">
        {/* Left: form */}
        <motion.aside
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="border-r border-border/60 bg-muted/20 overflow-y-auto max-h-[50vh] lg:max-h-none p-6 sm:p-8 space-y-8"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-primary mb-1">Builder</p>
            <h2 className="font-display text-2xl text-foreground">Your details</h2>
            <p className="text-sm text-muted-foreground mt-1">Updates appear instantly in the preview — no save required yet.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="p1">Partner 1</Label>
              <Input
                id="p1"
                value={partner1}
                onChange={(e) => setPartner1(e.target.value)}
                placeholder="First name"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p2">Partner 2</Label>
              <Input
                id="p2"
                value={partner2}
                onChange={(e) => setPartner2(e.target.value)}
                placeholder="First name"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Wedding date</Label>
              <Input
                id="date"
                type="date"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loc">Location</Label>
              <Input
                id="loc"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or venue"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Wedding vibe</Label>
            <Select value={vibe} onValueChange={(v) => setVibe(v as WeddingVibe)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Choose a vibe" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(WEDDING_THEMES) as WeddingVibe[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {WEDDING_THEMES[key].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="met">How you met (optional)</Label>
            <Textarea
              id="met"
              value={howTheyMet}
              onChange={(e) => setHowTheyMet(e.target.value)}
              placeholder="A short note — we’ll weave it into your story."
              rows={3}
              className="rounded-xl resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prop">Proposal story (optional)</Label>
            <Textarea
              id="prop"
              value={proposalStory}
              onChange={(e) => setProposalStory(e.target.value)}
              placeholder="The moment you said yes…"
              rows={3}
              className="rounded-xl resize-none"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Events</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-full gap-1 text-primary"
                onClick={() => setEvents((ev) => [...ev, { id: uid(), name: "Custom event", time: "", location: "" }])}
              >
                <Plus className="h-4 w-4" />
                Add event
              </Button>
            </div>
            <ul className="space-y-3">
              {events.map((ev, index) => (
                <li key={ev.id} className="p-4 rounded-2xl border border-border bg-card/80 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <Input
                      value={ev.name}
                      onChange={(e) => {
                        const next = [...events];
                        next[index] = { ...ev, name: e.target.value };
                        setEvents(next);
                      }}
                      className="rounded-lg font-medium"
                      placeholder="Event name"
                    />
                    {ev.id !== "ceremony" && ev.id !== "reception" ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => setEvents((list) => list.filter((x) => x.id !== ev.id))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground px-2 py-1.5">Core</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={ev.time}
                      onChange={(e) => {
                        const next = [...events];
                        next[index] = { ...ev, time: e.target.value };
                        setEvents(next);
                      }}
                      placeholder="Time"
                      className="rounded-lg text-sm"
                    />
                    <Input
                      value={ev.location}
                      onChange={(e) => {
                        const next = [...events];
                        next[index] = { ...ev, location: e.target.value };
                        setEvents(next);
                      }}
                      placeholder="Location"
                      className="rounded-lg text-sm"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <Label>Gallery photos</Label>
              <span className="text-xs text-muted-foreground">
                {galleryImages.length}/{MAX_GALLERY_IMAGES}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Upload JPG, PNG, or WebP (max {MAX_FILE_MB}MB each). Shown live in the preview — stored in this tab only until you add publishing.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              className="hidden"
              onChange={(e) => onGalleryFiles(e.target.files)}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl gap-2"
              disabled={galleryImages.length >= MAX_GALLERY_IMAGES}
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="h-4 w-4" />
              Add photos
            </Button>
            {galleryImages.length > 0 ? (
              <ul className="grid grid-cols-3 gap-2">
                {galleryImages.map((img) => (
                  <li key={img.id} className="relative group aspect-square rounded-xl overflow-hidden border border-border bg-muted/30">
                    <img src={img.url} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(img.id)}
                      className="absolute top-1 right-1 p-1.5 rounded-full bg-background/95 text-destructive shadow-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                      aria-label="Remove photo"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            {galleryImages.length > 0 ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => {
                  galleryImages.forEach((img) => URL.revokeObjectURL(img.url));
                  setGalleryImages([]);
                }}
              >
                Clear all photos
              </Button>
            ) : null}
          </div>
        </motion.aside>

        {/* Right: live preview */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="bg-gradient-to-br from-muted/30 to-background p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[50vh] lg:max-h-none"
        >
          <div className="sticky top-0 z-10 flex items-center gap-2 mb-4 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Live preview</span>
          </div>
          <WeddingPreview data={previewData} />
        </motion.div>
      </div>
    </div>
  );
}
