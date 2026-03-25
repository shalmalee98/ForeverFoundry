"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import type { WeddingPreviewData } from "../types";
import type { WeddingThemeTokens } from "@/lib/wedding-theme";

interface Props {
  data: WeddingPreviewData;
  theme: WeddingThemeTokens;
}

export function HeroSection({ data, theme }: Props) {
  const dateLabel = data.weddingDate
    ? (() => {
        try {
          return format(new Date(data.weddingDate), "MMMM d, yyyy");
        } catch {
          return data.weddingDate;
        }
      })()
    : "Date to be announced";

  return (
    <motion.section
      layout
      className={`relative min-h-[320px] flex flex-col items-center justify-center px-6 py-16 text-center ${theme.hero}`}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className={`text-sm uppercase tracking-[0.25em] mb-4 ${theme.muted}`}>Save the date</p>
      <h1 className={`text-4xl sm:text-5xl md:text-6xl ${theme.headingFont} ${theme.accent}`}>
        {data.partner1 || "Partner 1"} & {data.partner2 || "Partner 2"}
      </h1>
      <p className={`mt-4 text-lg md:text-xl max-w-xl ${theme.muted}`}>{data.tagline}</p>
      <p className={`mt-6 text-base ${theme.muted}`}>{dateLabel}</p>
      {data.location ? (
        <p className={`mt-2 text-sm ${theme.muted}`}>{data.location}</p>
      ) : null}
    </motion.section>
  );
}
