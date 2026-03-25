"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { SiteSectionId } from "../site-sections";
import { cn } from "@/lib/utils";

interface Props {
  sectionId: SiteSectionId;
  designMode: boolean;
  isActive: boolean;
  onSelect?: (id: SiteSectionId) => void;
  children: ReactNode;
}

/**
 * Clickable frame in design mode — highlights active section (Joy-style).
 */
export function SectionFrame({ sectionId, designMode, isActive, onSelect, children }: Props) {
  return (
    <motion.div
      layout
      id={`preview-section-${sectionId}`}
      className={cn(
        "scroll-mt-[72px] relative rounded-lg transition-shadow",
        designMode && "cursor-pointer",
        designMode && isActive && "ring-2 ring-violet-500 ring-offset-2 ring-offset-background z-10"
      )}
      onClick={(e) => {
        e.stopPropagation();
        if (designMode) onSelect?.(sectionId);
      }}
      role={designMode ? "button" : undefined}
      tabIndex={designMode ? 0 : undefined}
      onKeyDown={(e) => {
        if (!designMode) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(sectionId);
        }
      }}
    >
      {children}
    </motion.div>
  );
}
