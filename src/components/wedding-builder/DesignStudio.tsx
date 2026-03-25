"use client";

import { useCallback, useState, type RefObject } from "react";
import {
  Sparkles,
  Plus,
  Trash2,
  RefreshCw,
  Heart,
  ArrowLeft,
  ImagePlus,
  Copy,
  Check,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  Globe,
} from "lucide-react";
import { WeddingPreview } from "./WeddingPreview";
import type { GalleryPreviewImage, WeddingEventItem, WeddingPreviewData } from "./types";
import type { WeddingVibe } from "@/lib/wedding-theme";
import { WEDDING_THEMES } from "@/lib/wedding-theme";
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
import { SECTION_LABELS, type SiteSectionId } from "./site-sections";
import { cn } from "@/lib/utils";

function moveInOrder(order: SiteSectionId[], id: SiteSectionId, dir: -1 | 1): SiteSectionId[] {
  const i = order.indexOf(id);
  if (i < 0) return order;
  const j = i + dir;
  if (j < 0 || j >= order.length) return order;
  const next = [...order];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

interface DesignStudioProps {
  siteSlug: string;
  setSiteSlug: (v: string) => void;
  sitePublished: boolean;
  setSitePublished: (v: boolean) => void;
  partner1: string;
  setPartner1: (v: string) => void;
  partner2: string;
  setPartner2: (v: string) => void;
  weddingDate: string;
  setWeddingDate: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  vibe: WeddingVibe;
  setVibe: (v: WeddingVibe) => void;
  howTheyMet: string;
  setHowTheyMet: (v: string) => void;
  proposalStory: string;
  setProposalStory: (v: string) => void;
  events: WeddingEventItem[];
  setEvents: React.Dispatch<React.SetStateAction<WeddingEventItem[]>>;
  guestMode: boolean;
  setGuestMode: (v: boolean) => void;
  galleryImages: GalleryPreviewImage[];
  fileInputRef: RefObject<HTMLInputElement | null>;
  onGalleryFiles: (files: FileList | null) => void;
  removeGalleryImage: (id: string) => void;
  clearGallery: () => void;
  maxGallery: number;
  maxFileMb: number;
  tagline: string;
  setTagline: (v: string) => void;
  story: string;
  setStory: (v: string) => void;
  runGeneration: () => void;
  pageOrder: SiteSectionId[];
  setPageOrder: React.Dispatch<React.SetStateAction<SiteSectionId[]>>;
  pageVisibility: Record<SiteSectionId, boolean>;
  setPageVisibility: React.Dispatch<React.SetStateAction<Record<SiteSectionId, boolean>>>;
  rsvpEnabled: boolean;
  setRsvpEnabled: (v: boolean) => void;
  activeSectionId: SiteSectionId | null;
  setActiveSectionId: (v: SiteSectionId | null) => void;
  previewData: WeddingPreviewData;
  onBackToIntake: () => void;
  uid: () => string;
}

/**
 * Step 2 — Joy-style: URL bar, publish/RSVP toggles, big live preview, pages sidebar, section editor.
 */
export function DesignStudio(props: DesignStudioProps) {
  const [copied, setCopied] = useState(false);

  const copyUrl = useCallback(() => {
    const url = `https://foreverfoundry.com/${props.siteSlug}`;
    void navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [props.siteSlug]);

  const togglePageVisibility = (id: SiteSectionId) => {
    if (id === "hero") return;
    props.setPageVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-md">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-3 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Button variant="ghost" size="icon" asChild className="rounded-full shrink-0">
                <a href="/" aria-label="Home">
                  <ArrowLeft className="h-5 w-5" />
                </a>
              </Button>
              <div className="flex items-center gap-2 font-display font-semibold text-lg truncate">
                <Heart className="h-5 w-5 fill-primary text-primary shrink-0" />
                <span className="truncate">Designer</span>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground shrink-0" onClick={props.onBackToIntake}>
                Edit basics
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Switch id="guest" checked={props.guestMode} onCheckedChange={props.setGuestMode} />
                <Label htmlFor="guest" className="text-muted-foreground cursor-pointer whitespace-nowrap">
                  Preview as guest
                </Label>
              </div>
              <Button variant="outline" size="sm" className="rounded-full gap-2" onClick={props.runGeneration}>
                <RefreshCw className="h-4 w-4" />
                Regenerate story
              </Button>
            </div>
          </div>

          {/* Joy-style site controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 rounded-xl border border-border/80 bg-muted/20 px-4 py-3">
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-xs text-muted-foreground shrink-0 hidden sm:inline">Site URL</span>
              <div className="flex items-center gap-1 min-w-0 rounded-lg bg-background border border-border px-2 py-1.5 text-sm font-mono flex-1 max-w-md">
                <span className="truncate text-muted-foreground">foreverfoundry.com/</span>
                <input
                  value={props.siteSlug}
                  onChange={(e) => props.setSiteSlug(e.target.value.replace(/[^a-z0-9-]/gi, "").toLowerCase())}
                  className="min-w-0 flex-1 bg-transparent outline-none text-foreground"
                  aria-label="URL slug"
                />
                <button
                  type="button"
                  onClick={copyUrl}
                  className="p-1 rounded hover:bg-muted shrink-0"
                  title="Copy link"
                >
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch id="published" checked={props.sitePublished} onCheckedChange={props.setSitePublished} />
                <Label htmlFor="published" className="text-sm cursor-pointer whitespace-nowrap">
                  {props.sitePublished ? "Published" : "Unpublished"}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    props.rsvpEnabled ? "bg-emerald-500" : "bg-muted-foreground/40"
                  )}
                />
                <span className="text-sm text-muted-foreground">RSVP is</span>
                <Switch id="rsvp-on" checked={props.rsvpEnabled} onCheckedChange={props.setRsvpEnabled} />
                <Label htmlFor="rsvp-on" className="text-sm cursor-pointer">
                  {props.rsvpEnabled ? "On" : "Off"}
                </Label>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0 max-w-[1920px] mx-auto w-full">
        {/* Live preview — primary canvas (Joy: left) */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0 border-b lg:border-b-0 lg:border-r border-border/60">
          <div className="flex items-center gap-2 px-4 py-2 text-xs text-muted-foreground border-b border-border/40 bg-muted/10">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Live preview — click a section to edit</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-muted/30 to-background">
            <WeddingPreview
              data={props.previewData}
              designMode
              activeSectionId={props.activeSectionId}
              onSectionClick={(id) => props.setActiveSectionId(id)}
            />
          </div>
        </div>

        {/* Pages + editor — Joy: right rail */}
        <aside className="w-full lg:w-[380px] shrink-0 flex flex-col max-h-[50vh] lg:max-h-none lg:h-[calc(100vh-140px)] border-t lg:border-t-0 lg:border-l border-border/60 bg-muted/15">
          <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
            <h2 className="font-display font-semibold text-foreground">Pages</h2>
            <span className="text-xs text-muted-foreground">Reorder · show/hide</span>
          </div>
          <ul className="overflow-y-auto divide-y divide-border/50 max-h-[40vh] lg:max-h-[220px]">
            {props.pageOrder.map((id) => {
              const visible = props.pageVisibility[id];
              const isRsvp = id === "rsvp";
              return (
                <li key={id}>
                  <div
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 hover:bg-muted/40 transition-colors",
                      props.activeSectionId === id && "bg-primary/5"
                    )}
                  >
                    <div className="flex flex-col gap-0.5 text-muted-foreground">
                      <button
                        type="button"
                        className="p-0.5 rounded hover:bg-muted disabled:opacity-30"
                        disabled={props.pageOrder.indexOf(id) === 0}
                        onClick={() => props.setPageOrder((o) => moveInOrder(o, id, -1))}
                        aria-label="Move up"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="p-0.5 rounded hover:bg-muted disabled:opacity-30"
                        disabled={props.pageOrder.indexOf(id) === props.pageOrder.length - 1}
                        onClick={() => props.setPageOrder((o) => moveInOrder(o, id, 1))}
                        aria-label="Move down"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="flex-1 text-left text-sm font-medium truncate"
                      onClick={() => {
                        props.setActiveSectionId(id);
                        document.getElementById(`preview-section-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                    >
                      {SECTION_LABELS[id]}
                    </button>
                    {isRsvp ? <Lock className="h-3.5 w-3.5 text-muted-foreground shrink-0" title="RSVP settings" /> : null}
                    {id !== "hero" ? (
                      <button
                        type="button"
                        className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
                        onClick={() => togglePageVisibility(id)}
                        title={visible ? "Hide from site" : "Show on site"}
                      >
                        {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                    ) : (
                      <span className="w-8" />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex-1 overflow-y-auto border-t border-border/60 p-4 space-y-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Edit section</p>
            <SectionEditorPanel {...props} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function SectionEditorPanel(props: DesignStudioProps) {
  const id = props.activeSectionId;

  if (!id) {
    return <p className="text-sm text-muted-foreground">Select a section in the preview or in Pages.</p>;
  }

  if (id === "hero") {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Home — hero & headline</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs">Partner 1</Label>
            <Input value={props.partner1} onChange={(e) => props.setPartner1(e.target.value)} className="rounded-lg h-9 text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Partner 2</Label>
            <Input value={props.partner2} onChange={(e) => props.setPartner2(e.target.value)} className="rounded-lg h-9 text-sm" />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Tagline</Label>
          <Input value={props.tagline} onChange={(e) => props.setTagline(e.target.value)} className="rounded-lg h-9 text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Wedding vibe</Label>
          <Select value={props.vibe} onValueChange={(v) => props.setVibe(v as WeddingVibe)}>
            <SelectTrigger className="rounded-lg h-9 text-sm">
              <SelectValue />
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
      </div>
    );
  }

  if (id === "story") {
    return (
      <div className="space-y-3">
        <Label className="text-xs">Our story</Label>
        <Textarea value={props.story} onChange={(e) => props.setStory(e.target.value)} rows={8} className="rounded-xl text-sm resize-none" />
        <Button type="button" variant="outline" size="sm" className="w-full gap-2" onClick={props.runGeneration}>
          <RefreshCw className="h-3.5 w-3.5" />
          Regenerate from notes
        </Button>
        <div className="space-y-1">
          <Label className="text-xs">How you met (source)</Label>
          <Textarea value={props.howTheyMet} onChange={(e) => props.setHowTheyMet(e.target.value)} rows={3} className="rounded-lg text-sm" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Proposal (source)</Label>
          <Textarea value={props.proposalStory} onChange={(e) => props.setProposalStory(e.target.value)} rows={3} className="rounded-lg text-sm" />
        </div>
      </div>
    );
  }

  if (id === "events") {
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-xs">Schedule</Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs gap-1 text-primary"
            onClick={() =>
              props.setEvents((ev) => [...ev, { id: props.uid(), name: "Custom event", time: "", location: "" }])
            }
          >
            <Plus className="h-3 w-3" />
            Add
          </Button>
        </div>
        <ul className="space-y-2 max-h-48 overflow-y-auto">
          {props.events.map((ev, index) => (
            <li key={ev.id} className="p-2 rounded-lg border border-border bg-card/80 space-y-1.5">
              <div className="flex gap-1">
                <Input
                  value={ev.name}
                  onChange={(e) => {
                    const next = [...props.events];
                    next[index] = { ...ev, name: e.target.value };
                    props.setEvents(next);
                  }}
                  className="h-8 text-xs"
                  placeholder="Event"
                />
                {ev.id !== "ceremony" && ev.id !== "reception" ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => props.setEvents((list) => list.filter((x) => x.id !== ev.id))}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                ) : null}
              </div>
              <div className="grid grid-cols-2 gap-1">
                <Input
                  value={ev.time}
                  onChange={(e) => {
                    const next = [...props.events];
                    next[index] = { ...ev, time: e.target.value };
                    props.setEvents(next);
                  }}
                  className="h-8 text-xs"
                  placeholder="Time"
                />
                <Input
                  value={ev.location}
                  onChange={(e) => {
                    const next = [...props.events];
                    next[index] = { ...ev, location: e.target.value };
                    props.setEvents(next);
                  }}
                  className="h-8 text-xs"
                  placeholder="Place"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (id === "gallery") {
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-xs">Photos ({props.galleryImages.length}/{props.maxGallery})</Label>
        </div>
        <input
          ref={props.fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => props.onGalleryFiles(e.target.files)}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full gap-2"
          disabled={props.galleryImages.length >= props.maxGallery}
          onClick={() => props.fileInputRef.current?.click()}
        >
          <ImagePlus className="h-4 w-4" />
          Add photos
        </Button>
        {props.galleryImages.length > 0 ? (
          <Button type="button" variant="ghost" size="sm" className="text-xs" onClick={props.clearGallery}>
            Clear all
          </Button>
        ) : null}
        <div className="grid grid-cols-3 gap-1">
          {props.galleryImages.map((img) => (
            <div key={img.id} className="relative aspect-square rounded-md overflow-hidden border">
              <img src={img.url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                className="absolute top-0.5 right-0.5 p-1 rounded bg-background/90"
                onClick={() => props.removeGalleryImage(img.id)}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === "travel") {
    return (
      <div className="space-y-2">
        <Label className="text-xs">Location shown to guests</Label>
        <Input value={props.location} onChange={(e) => props.setLocation(e.target.value)} className="rounded-lg text-sm" />
        <p className="text-xs text-muted-foreground">Travel copy updates from your venue. Publishing will unlock hotel blocks, maps, etc.</p>
      </div>
    );
  }

  if (id === "rsvp") {
    return (
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">RSVP form matches your theme. Use the top bar to turn RSVP on or off for guests.</p>
        <div className="flex items-center gap-2">
          <Switch id="rsvp2" checked={props.rsvpEnabled} onCheckedChange={props.setRsvpEnabled} />
          <Label htmlFor="rsvp2">Collect RSVPs</Label>
        </div>
      </div>
    );
  }

  return null;
}
