import type { WeddingVibe } from "@/lib/wedding-theme";
import type { SiteSectionId } from "./site-sections";

/** All “fixed” copy on the site — editable in design-mode preview */
export interface SiteCopyText {
  heroEyebrow: string;
  /** Empty = show formatted wedding date from date field */
  heroDateLine: string;
  /** Empty = show data.location in hero */
  heroLocationLine: string;
  heroAmpersand: string;
  storyHeading: string;
  eventsHeading: string;
  galleryHeading: string;
  galleryFootnoteUploads: string;
  galleryFootnotePlaceholders: string;
  travelHeading: string;
  /** Empty = auto paragraph from location */
  travelIntro: string;
  rsvpHeading: string;
  rsvpNameLabel: string;
  rsvpNamePlaceholder: string;
  rsvpAttendingLabel: string;
  rsvpAccept: string;
  rsvpDecline: string;
  rsvpGuestNote: string;
  footerLine: string;
  guestBanner: string;
}

export const DEFAULT_SITE_COPY: SiteCopyText = {
  heroEyebrow: "Save the date",
  heroDateLine: "",
  heroLocationLine: "",
  heroAmpersand: " & ",
  storyHeading: "Our story",
  eventsHeading: "Events",
  galleryHeading: "Gallery",
  galleryFootnoteUploads: "Your uploads — shown only in this browser until you publish.",
  galleryFootnotePlaceholders: "Add photos in the builder, or use placeholders for now.",
  travelHeading: "Travel & stay",
  travelIntro: "",
  rsvpHeading: "RSVP",
  rsvpNameLabel: "Full name",
  rsvpNamePlaceholder: "Guest name",
  rsvpAttendingLabel: "Will you attend?",
  rsvpAccept: "Joyfully accepts",
  rsvpDecline: "Regretfully declines",
  rsvpGuestNote: "Guests will submit responses here when you publish.",
  footerLine: "Made with ForeverFoundry · Private preview",
  guestBanner: "Preview as guest",
};

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
  siteCopy: SiteCopyText;
  /** Nav labels in preview; omit key to use default SECTION_LABELS */
  navLabels: Partial<Record<SiteSectionId, string>>;
}
