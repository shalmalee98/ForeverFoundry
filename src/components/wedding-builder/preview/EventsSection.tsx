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

export function EventsSection({ data, theme }: Props) {
  const edit = usePreviewEdit();
  const events = data.events.filter((e) => e.name.trim() || edit?.enabled);

  return (
    <motion.section layout className="px-6 max-w-xl mx-auto w-full" transition={{ duration: 0.4 }}>
      <h2 className={`text-2xl md:text-3xl mb-10 text-center ${theme.headingFont} ${theme.accent}`}>
        <EditableText
          value={data.siteCopy.eventsHeading}
          onChange={(v) => edit?.setSiteCopyKey("eventsHeading", v)}
          className={`text-2xl md:text-3xl text-center ${theme.headingFont} ${theme.accent}`}
          as="block"
        />
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
            <p className={`font-medium ${theme.accent}`}>
              <EditableText
                value={ev.name}
                onChange={(v) => edit?.updateEvent(ev.id, "name", v)}
                className={`font-medium ${theme.accent}`}
                as="block"
              />
            </p>
            <p className={`text-sm mt-1 ${theme.muted}`}>
              <EditableText
                value={ev.time}
                onChange={(v) => edit?.updateEvent(ev.id, "time", v)}
                className={`text-sm ${theme.muted}`}
                as="block"
              />
            </p>
            <p className={`text-sm ${theme.muted}`}>
              <EditableText
                value={ev.location}
                onChange={(v) => edit?.updateEvent(ev.id, "location", v)}
                className={`text-sm ${theme.muted}`}
                as="block"
              />
            </p>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
