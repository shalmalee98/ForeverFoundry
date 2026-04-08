"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteCopyText, WeddingEventItem } from "../types";
import type { SiteSectionId } from "../site-sections";
import { SECTION_LABELS } from "../site-sections";

export type PreviewEditContextValue = {
  enabled: boolean;
  siteCopy: SiteCopyText;
  setSiteCopyKey: (key: keyof SiteCopyText, value: string) => void;
  navLabels: Partial<Record<SiteSectionId, string>>;
  setNavLabel: (id: SiteSectionId, value: string) => void;
  setPartner1: (v: string) => void;
  setPartner2: (v: string) => void;
  setTagline: (v: string) => void;
  setStory: (v: string) => void;
  setLocation: (v: string) => void;
  setWeddingDate: (v: string) => void;
  updateEvent: (eventId: string, field: keyof WeddingEventItem, value: string) => void;
};

const PreviewEditContext = createContext<PreviewEditContextValue | null>(null);

export function PreviewEditProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: PreviewEditContextValue;
}) {
  return <PreviewEditContext.Provider value={value}>{children}</PreviewEditContext.Provider>;
}

export function usePreviewEdit(): PreviewEditContextValue | null {
  return useContext(PreviewEditContext);
}

export function usePreviewEditRequired(): PreviewEditContextValue {
  const ctx = useContext(PreviewEditContext);
  if (!ctx) {
    throw new Error("usePreviewEditRequired outside PreviewEditProvider");
  }
  return ctx;
}

/** Resolved nav label for preview + sidebar */
export function resolveNavLabel(
  navLabels: Partial<Record<SiteSectionId, string>>,
  id: SiteSectionId
): string {
  const custom = navLabels[id]?.trim();
  if (custom) return custom;
  return SECTION_LABELS[id];
}
