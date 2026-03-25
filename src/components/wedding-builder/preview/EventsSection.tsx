"use client";

import { motion } from "framer-motion";
import type { WeddingPreviewData } from "../types";
import type { WeddingThemeTokens } from "@/lib/wedding-theme";

interface Props {
  data: WeddingPreviewData;
  theme: WeddingThemeTokens;
}

export function EventsSection({ data, theme }: Props) {
  const events = data.events.filter((e) => e.name.trim());

  return (
    <motion.section layout className="px-6 max-w-xl mx-auto w-full" transition={{ duration: 0.4 }}>
      <h2 className={`text-2xl md:text-3xl mb-10 text-center ${theme.headingFont} ${theme.accent}`}>
        Events
      </h2>
      <ul className="space-y-4">
        {events.map((ev, i) => (
          <motion.li
            key={ev.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`p-5 ${theme.card}`}
          >
            <p className={`font-medium ${theme.accent}`}>{ev.name}</p>
            <p className={`text-sm mt-1 ${theme.muted}`}>{ev.time}</p>
            <p className={`text-sm ${theme.muted}`}>{ev.location}</p>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
