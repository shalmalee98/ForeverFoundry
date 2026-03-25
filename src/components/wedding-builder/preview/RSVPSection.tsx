"use client";

import { motion } from "framer-motion";
import type { WeddingPreviewData } from "../types";
import type { WeddingThemeTokens } from "@/lib/wedding-theme";

interface Props {
  data: WeddingPreviewData;
  theme: WeddingThemeTokens;
}

export function RSVPSection({ data, theme }: Props) {
  return (
    <motion.section layout className="px-6 max-w-md mx-auto w-full pb-8" transition={{ duration: 0.4 }}>
      <h2 className={`text-2xl md:text-3xl mb-8 text-center ${theme.headingFont} ${theme.accent}`}>RSVP</h2>
      <div className={`p-6 ${theme.card}`}>
        <label className={`block text-sm mb-2 ${theme.muted}`}>Full name</label>
        <input
          type="text"
          readOnly
          placeholder="Guest name"
          className={`w-full mb-4 px-4 py-3 rounded-xl border border-black/10 bg-white/50 ${theme.bodyFont}`}
        />
        <label className={`block text-sm mb-2 ${theme.muted}`}>Will you attend?</label>
        <div className="flex gap-3">
          <button type="button" className={`flex-1 py-3 px-4 text-sm ${theme.button}`}>
            Joyfully accepts
          </button>
          <button type="button" className={`flex-1 py-3 px-4 text-sm ${theme.buttonOutline}`}>
            Regretfully declines
          </button>
        </div>
        {data.guestMode ? (
          <p className={`text-xs mt-4 text-center ${theme.muted}`}>Guests will submit responses here when you publish.</p>
        ) : null}
      </div>
    </motion.section>
  );
}
