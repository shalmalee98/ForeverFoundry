import type { WeddingVibe } from "@/lib/wedding-theme";
import type { SiteSectionId } from "./site-sections";

export interface WeddingEventItem {
  id: string;
  name: string;
  time: string;
  location: string;
}

/** Shared props for modular preview sections — easy to persist / API later */
/** Local preview only — object URLs from uploads; revoke when removed (see builder). */
export interface GalleryPreviewImage {
  id: string;
  url: string;
}

export interface WeddingPreviewData {
  partner1: string;
  partner2: string;
  weddingDate: string;
  location: string;
  vibe: WeddingVibe;
  tagline: string;
  story: string;
  events: WeddingEventItem[];
  guestMode: boolean;
  /** When non-empty, gallery shows these instead of placeholders */
  galleryImages: GalleryPreviewImage[];
  /** Design mode: section order & visibility (Joy-style pages) */
  pageOrder: SiteSectionId[];
  pageVisibility: Record<SiteSectionId, boolean>;
  /** Top-bar “RSVP is on” — hides RSVP block when false */
  rsvpEnabled: boolean;
}
