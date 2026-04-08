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

function defaultTravelBody(data: WeddingPreviewData): string {
  if (data.location) {
    return `We can’t wait to celebrate with you in ${data.location}. Hotel blocks, airport tips, and shuttle details will appear here when you publish your site.`;
  }
  return "Add your location in the builder to personalize travel notes for guests. Hotel blocks, directions, and local favorites will show here.";
}

export function TravelSection({ data, theme }: Props) {
  const edit = usePreviewEdit();
  const fallback = defaultTravelBody(data);
  const body = data.siteCopy.travelIntro !== "" ? data.siteCopy.travelIntro : fallback;

  return (
    <motion.section layout className="px-6 max-w-2xl mx-auto w-full" transition={{ duration: 0.4 }}>
      <h2 className={`text-2xl md:text-3xl mb-6 text-center ${theme.headingFont} ${theme.accent}`}>
        <EditableText
          value={data.siteCopy.travelHeading}
          onChange={(v) => edit?.setSiteCopyKey("travelHeading", v)}
          className={`text-2xl md:text-3xl text-center ${theme.headingFont} ${theme.accent}`}
          as="block"
        />
      </h2>
      <div className={`p-6 ${theme.card}`}>
        <div className={`${theme.bodyFont} ${theme.muted} leading-relaxed`}>
          <EditableText
            value={body}
            onChange={(v) => edit?.setSiteCopyKey("travelIntro", v)}
            multiline
            rows={6}
            placeholder={fallback}
            className={`${theme.bodyFont} ${theme.muted} leading-relaxed`}
            as="block"
          />
        </div>
      </div>
    </motion.section>
  );
}
