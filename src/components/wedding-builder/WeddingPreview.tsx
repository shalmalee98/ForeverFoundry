"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { WeddingPreviewData } from "./types";
import { getTheme } from "@/lib/wedding-theme";
import { HeroSection } from "./preview/HeroSection";
import { StorySection } from "./preview/StorySection";
import { EventsSection } from "./preview/EventsSection";
import { RSVPSection } from "./preview/RSVPSection";
import { GallerySection } from "./preview/GallerySection";
import { TravelSection } from "./preview/TravelSection";

interface Props {
  data: WeddingPreviewData;
}

/**
 * Live preview shell — all sections are modular for future publish/save pipelines.
 */
export function WeddingPreview({ data }: Props) {
  const theme = getTheme(data.vibe);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={data.vibe}
        initial={{ opacity: 0.85 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className={`min-h-full overflow-hidden rounded-2xl border border-black/5 shadow-lg ${theme.frame}`}
      >
        {data.guestMode ? (
          <div className="bg-black/5 text-center text-xs py-2 px-4 tracking-wide uppercase">
            Preview as guest
          </div>
        ) : null}
        <HeroSection data={data} theme={theme} />
        <StorySection data={data} theme={theme} />
        <EventsSection data={data} theme={theme} />
        <GallerySection data={data} theme={theme} />
        <TravelSection data={data} theme={theme} />
        <RSVPSection data={data} theme={theme} />
        <footer className={`py-10 text-center text-sm ${theme.muted}`}>
          Made with ForeverFoundry · Private preview
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}
