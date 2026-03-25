import type { WeddingVibe } from "@/lib/wedding-theme";

export interface WeddingEventItem {
  id: string;
  name: string;
  time: string;
  location: string;
}

/** Shared props for modular preview sections — easy to persist / API later */
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
}
