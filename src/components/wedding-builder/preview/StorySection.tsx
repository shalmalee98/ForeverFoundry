"use client";

import { motion } from "framer-motion";
import type { WeddingPreviewData } from "../types";
import type { WeddingThemeTokens } from "@/lib/wedding-theme";
import { usePreviewEdit } from "./PreviewEditContext";
import { EditableText } from "./EditableText";

interface Props {
  data: WeddingPreviewData;
  theme: WeddingThemeTokens;
}

export function StorySection({ data, theme }: Props) {
  const edit = usePreviewEdit();

  return (
    <motion.section
      layout
      className={`px-6 max-w-2xl mx-auto ${theme.sectionSpacing}`}
      transition={{ duration: 0.4 }}
    >
      <h2 className={`text-2xl md:text-3xl mb-6 text-center ${theme.headingFont} ${theme.accent}`}>
        <EditableText
          value={data.siteCopy.storyHeading}
          onChange={(v) => edit?.setSiteCopyKey("storyHeading", v)}
          className={`text-2xl md:text-3xl text-center ${theme.headingFont} ${theme.accent}`}
          as="block"
        />
      </h2>
      <div className={`${theme.bodyFont} ${theme.muted} text-center leading-relaxed`}>
        <EditableText
          value={data.story}
          onChange={(v) => edit?.setStory(v)}
          multiline
          rows={10}
          className={`${theme.bodyFont} ${theme.muted} text-center leading-relaxed`}
          as="block"
        />
      </div>
    </motion.section>
  );
}
