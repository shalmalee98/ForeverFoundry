"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import type { WeddingPreviewData } from "../types";
import type { WeddingThemeTokens } from "@/lib/wedding-theme";
import { usePreviewEdit } from "./PreviewEditContext";
import { EditableText } from "./EditableText";

interface Props {
  data: WeddingPreviewData;
  theme: WeddingThemeTokens;
}

export function HeroSection({ data, theme }: Props) {
  const edit = usePreviewEdit();

  const dateFromPicker = data.weddingDate
    ? (() => {
        try {
          return format(new Date(data.weddingDate), "MMMM d, yyyy");
        } catch {
          return data.weddingDate;
        }
      })()
    : "Date to be announced";

  const dateShown =
    data.siteCopy.heroDateLine !== "" ? data.siteCopy.heroDateLine : dateFromPicker;

  const locationShown =
    data.siteCopy.heroLocationLine !== ""
      ? data.siteCopy.heroLocationLine
      : data.location || "";

  return (
    <motion.section
      layout
      className={`relative min-h-[320px] flex flex-col items-center justify-center px-6 py-16 text-center ${theme.hero}`}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className={`text-sm uppercase tracking-[0.25em] mb-4 ${theme.muted}`}>
        <EditableText
          value={data.siteCopy.heroEyebrow}
          onChange={(v) => edit?.setSiteCopyKey("heroEyebrow", v)}
          className={`text-sm uppercase tracking-[0.25em] ${theme.muted}`}
        />
      </p>
      <h1 className={`text-4xl sm:text-5xl md:text-6xl ${theme.headingFont} ${theme.accent} flex flex-wrap items-baseline justify-center gap-x-1 gap-y-1`}>
        <EditableText
          value={data.partner1 || "Partner 1"}
          onChange={(v) => edit?.setPartner1(v)}
          className={`text-4xl sm:text-5xl md:text-6xl ${theme.headingFont} ${theme.accent}`}
          as="block"
        />
        <EditableText
          value={data.siteCopy.heroAmpersand}
          onChange={(v) => edit?.setSiteCopyKey("heroAmpersand", v)}
          className={`text-4xl sm:text-5xl md:text-6xl ${theme.headingFont} ${theme.accent}`}
        />
        <EditableText
          value={data.partner2 || "Partner 2"}
          onChange={(v) => edit?.setPartner2(v)}
          className={`text-4xl sm:text-5xl md:text-6xl ${theme.headingFont} ${theme.accent}`}
          as="block"
        />
      </h1>
      <p className={`mt-4 text-lg md:text-xl max-w-xl ${theme.muted}`}>
        <EditableText
          value={data.tagline}
          onChange={(v) => edit?.setTagline(v)}
          className={`text-lg md:text-xl ${theme.muted} text-center`}
          as="block"
        />
      </p>
      <p className={`mt-6 text-base ${theme.muted}`}>
        <EditableText
          value={dateShown}
          onChange={(v) => edit?.setSiteCopyKey("heroDateLine", v)}
          placeholder={dateFromPicker}
          className={`text-base ${theme.muted} text-center`}
          as="block"
        />
      </p>
      {(locationShown || edit?.enabled) ? (
        <p className={`mt-2 text-sm ${theme.muted} w-full max-w-lg`}>
          <EditableText
            value={locationShown}
            onChange={(v) => edit?.setSiteCopyKey("heroLocationLine", v)}
            placeholder="Venue or city"
            className={`text-sm ${theme.muted} text-center`}
            as="block"
          />
        </p>
      ) : null}
    </motion.section>
  );
}
