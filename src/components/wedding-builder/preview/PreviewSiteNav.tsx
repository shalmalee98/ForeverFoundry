"use client";

import type { WeddingPreviewData } from "../types";
import type { WeddingThemeTokens } from "@/lib/wedding-theme";
import { SECTION_LABELS, type SiteSectionId } from "../site-sections";
import { cn } from "@/lib/utils";

interface Props {
  data: WeddingPreviewData;
  theme: WeddingThemeTokens;
}

export function PreviewSiteNav({ data, theme }: Props) {
  const links: { id: SiteSectionId; label: string }[] = [];
  for (const id of data.pageOrder) {
    if (!data.pageVisibility[id]) continue;
    if (id === "rsvp" && !data.rsvpEnabled) continue;
    links.push({ id, label: SECTION_LABELS[id] });
  }

  if (links.length === 0) return null;

  return (
    <nav
      className={cn(
        "sticky top-0 z-20 border-b border-black/5 backdrop-blur-md px-4 py-3",
        data.vibe === "royal" ? "bg-white/5" : "bg-white/80"
      )}
      aria-label="Wedding site"
    >
      <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm md:text-[15px]">
        {links.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#preview-section-${id}`}
              className={cn(
                "hover:opacity-80 transition-opacity",
                theme.muted,
                data.vibe === "royal" && "text-amber-100/90"
              )}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
