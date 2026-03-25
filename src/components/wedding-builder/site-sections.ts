/**
 * Site “pages” map to scroll sections in the live preview (Joy-style IA).
 */

export type SiteSectionId = "hero" | "story" | "events" | "gallery" | "travel" | "rsvp";

export const SECTION_LABELS: Record<SiteSectionId, string> = {
  hero: "Home",
  story: "Our Story",
  events: "Schedule",
  gallery: "Gallery",
  travel: "Travel",
  rsvp: "RSVP",
};

export const DEFAULT_PAGE_ORDER: SiteSectionId[] = [
  "hero",
  "story",
  "events",
  "gallery",
  "travel",
  "rsvp",
];

export function defaultPageVisibility(): Record<SiteSectionId, boolean> {
  return {
    hero: true,
    story: true,
    events: true,
    gallery: true,
    travel: true,
    rsvp: true,
  };
}

export function slugFromNames(a: string, b: string): string {
  const raw = `${a || "couple"}-${b || "forever"}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return raw.slice(0, 48) || "your-wedding";
}
