"use client";

import { motion } from "framer-motion";
import type { WeddingThemeTokens } from "@/lib/wedding-theme";

interface Props {
  theme: WeddingThemeTokens;
}

const PLACEHOLDER_IDS = ["1015", "1016", "1018", "1025"];

export function GallerySection({ theme }: Props) {
  return (
    <motion.section layout className="px-6 max-w-4xl mx-auto w-full" transition={{ duration: 0.4 }}>
      <h2 className={`text-2xl md:text-3xl mb-10 text-center ${theme.headingFont} ${theme.accent}`}>Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PLACEHOLDER_IDS.map((id, i) => (
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
      <p className={`text-center text-xs mt-4 ${theme.muted}`}>Placeholder photos — upload yours when you publish.</p>
    </motion.section>
  );
}
