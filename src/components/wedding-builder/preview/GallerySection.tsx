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

const PLACEHOLDER_IDS = ["1015", "1016", "1018", "1025"];

export function GallerySection({ data, theme }: Props) {
  const edit = usePreviewEdit();
  const uploads = data.galleryImages ?? [];
  const useUploads = uploads.length > 0;

  const footnote = useUploads
    ? data.siteCopy.galleryFootnoteUploads
    : data.siteCopy.galleryFootnotePlaceholders;

  return (
    <motion.section layout className="px-6 max-w-4xl mx-auto w-full" transition={{ duration: 0.4 }}>
      <h2 className={`text-2xl md:text-3xl mb-10 text-center ${theme.headingFont} ${theme.accent}`}>
        <EditableText
          value={data.siteCopy.galleryHeading}
          onChange={(v) => edit?.setSiteCopyKey("galleryHeading", v)}
          className={`text-2xl md:text-3xl text-center ${theme.headingFont} ${theme.accent}`}
          as="block"
        />
      </h2>
      <div
        className={`grid gap-3 ${
          useUploads && uploads.length === 1
            ? "grid-cols-1 max-w-md mx-auto"
            : useUploads && uploads.length === 2
              ? "grid-cols-2 max-w-2xl mx-auto"
              : "grid-cols-2 md:grid-cols-4"
        }`}
      >
        {useUploads
          ? uploads.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className={`relative aspect-square overflow-hidden ${theme.card} p-0`}
              >
                <img
                  src={img.url}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))
          : PLACEHOLDER_IDS.map((id, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className={`relative aspect-square overflow-hidden ${theme.card} p-0`}
              >
                <img
                  src={`https://picsum.photos/seed/wedding-${id}/600/600`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
      </div>
      <p className={`text-center text-xs mt-4 ${theme.muted}`}>
        <EditableText
          value={footnote}
          onChange={(v) =>
            useUploads
              ? edit?.setSiteCopyKey("galleryFootnoteUploads", v)
              : edit?.setSiteCopyKey("galleryFootnotePlaceholders", v)
          }
          multiline
          rows={2}
          className={`text-xs ${theme.muted} text-center`}
          as="block"
        />
      </p>
    </motion.section>
  );
}
