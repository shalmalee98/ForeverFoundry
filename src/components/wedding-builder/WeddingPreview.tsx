"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { WeddingPreviewData } from "./types";
import type { SiteSectionId } from "./site-sections";
import { getTheme } from "@/lib/wedding-theme";
import { HeroSection } from "./preview/HeroSection";
import { StorySection } from "./preview/StorySection";
import { EventsSection } from "./preview/EventsSection";
import { RSVPSection } from "./preview/RSVPSection";
import { GallerySection } from "./preview/GallerySection";
import { TravelSection } from "./preview/TravelSection";
import { PreviewSiteNav } from "./preview/PreviewSiteNav";
import { SectionFrame } from "./preview/SectionFrame";
import { EditableText } from "./preview/EditableText";
import { usePreviewEdit } from "./preview/PreviewEditContext";

interface Props {
  data: WeddingPreviewData;
  /** Joy-style: in-page nav, clickable sections, focus ring */
  designMode?: boolean;
  activeSectionId?: SiteSectionId | null;
  onSectionClick?: (id: SiteSectionId) => void;
}

function renderSection(
  id: SiteSectionId,
  data: WeddingPreviewData,
  theme: ReturnType<typeof getTheme>
) {
  switch (id) {
    case "hero":
      return <HeroSection data={data} theme={theme} />;
    case "story":
      return <StorySection data={data} theme={theme} />;
    case "events":
      return <EventsSection data={data} theme={theme} />;
    case "gallery":
      return <GallerySection data={data} theme={theme} />;
    case "travel":
      return <TravelSection data={data} theme={theme} />;
    case "rsvp":
      return <RSVPSection data={data} theme={theme} />;
    default:
      return null;
  }
}

function GuestBanner({ data }: { data: WeddingPreviewData }) {
  const edit = usePreviewEdit();
  if (!data.guestMode) return null;
  return (
    <div className="bg-black/5 text-center text-xs py-2 px-4 tracking-wide uppercase">
      <EditableText
        value={data.siteCopy.guestBanner}
        onChange={(v) => edit?.setSiteCopyKey("guestBanner", v)}
        className="text-xs tracking-wide uppercase text-center"
        as="block"
      />
    </div>
  );
}

function PreviewFooter({ data, theme }: { data: WeddingPreviewData; theme: ReturnType<typeof getTheme> }) {
  const edit = usePreviewEdit();
  return (
    <footer className={`py-10 text-center text-sm ${theme.muted}`}>
      <EditableText
        value={data.siteCopy.footerLine}
        onChange={(v) => edit?.setSiteCopyKey("footerLine", v)}
        className={`text-sm ${theme.muted} text-center`}
        multiline
        rows={2}
        as="block"
      />
    </footer>
  );
}

export function WeddingPreview({ data, designMode = false, activeSectionId, onSectionClick }: Props) {
  const theme = getTheme(data.vibe);

  const visibleOrdered = data.pageOrder.filter((id) => {
    if (!data.pageVisibility[id]) return false;
    if (id === "rsvp" && !data.rsvpEnabled) return false;
    return true;
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={data.vibe}
        initial={{ opacity: 0.85 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className={`min-h-full overflow-hidden rounded-2xl border border-black/5 shadow-lg ${theme.frame}`}
      >
        <GuestBanner data={data} />

        <PreviewSiteNav data={data} theme={theme} />

        {visibleOrdered.map((sectionId) => {
          const inner = renderSection(sectionId, data, theme);
          if (!inner) return null;

          if (designMode) {
            return (
              <SectionFrame
                key={sectionId}
                sectionId={sectionId}
                designMode
                isActive={activeSectionId === sectionId}
                onSelect={onSectionClick}
              >
                {inner}
              </SectionFrame>
            );
          }

          return (
            <div key={sectionId} id={`preview-section-${sectionId}`} className="scroll-mt-[72px]">
              {inner}
            </div>
          );
        })}

        <PreviewFooter data={data} theme={theme} />
      </motion.div>
    </AnimatePresence>
  );
}
