"use client";

import { motion } from "framer-motion";
import type { WeddingPreviewData } from "../types";
import type { WeddingThemeTokens } from "@/lib/wedding-theme";

interface Props {
  data: WeddingPreviewData;
  theme: WeddingThemeTokens;
}

export function StorySection({ data, theme }: Props) {
  return (
    <motion.section
      layout
      className={`px-6 max-w-2xl mx-auto ${theme.sectionSpacing}`}
      transition={{ duration: 0.4 }}
    >
      <h2 className={`text-2xl md:text-3xl mb-6 text-center ${theme.headingFont} ${theme.accent}`}>
        Our story
      </h2>
      <p className={`${theme.bodyFont} ${theme.muted} text-center leading-relaxed`}>{data.story}</p>
    </motion.section>
  );
}
