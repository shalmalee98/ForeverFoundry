"use client";

import type { WeddingPreviewData } from "../types";
import type { WeddingThemeTokens } from "@/lib/wedding-theme";
import { SECTION_LABELS, type SiteSectionId } from "../site-sections";
import { cn } from "@/lib/utils";
import { usePreviewEdit } from "./PreviewEditContext";
import { EditableText } from "./EditableText";

interface Props {
  data: WeddingPreviewData;
  theme: WeddingThemeTokens;
}

export function PreviewSiteNav({ data, theme }: Props) {
  const edit = usePreviewEdit();

  const links: { id: SiteSectionId; label: string }[] = [];
  for (const id of data.pageOrder) {
    if (!data.pageVisibility[id]) continue;
    if (id === "rsvp" && !data.rsvpEnabled) continue;
    const label = data.navLabels[id]?.trim() || SECTION_LABELS[id];
    links.push({ id, label });
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
          <li key={id} className="flex items-center gap-1 max-w-[min(100%,12rem)]">
            <a
              href={`#preview-section-${id}`}
              className={cn(
                "shrink-0 text-[10px] opacity-40 hover:opacity-70",
                theme.muted,
                data.vibe === "royal" && "text-amber-200/80"
              )}
              title="Jump to section"
            >
              #
            </a>
            <EditableText
              value={label}
              onChange={(v) => edit?.setNavLabel(id, v)}
              className={cn(
                "text-sm md:text-[15px] min-w-0 flex-1",
                theme.muted,
                data.vibe === "royal" && "text-amber-100/90"
              )}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
