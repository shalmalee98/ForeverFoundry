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

export function RSVPSection({ data, theme }: Props) {
  const edit = usePreviewEdit();

  return (
    <motion.section layout className="px-6 max-w-md mx-auto w-full pb-8" transition={{ duration: 0.4 }}>
      <h2 className={`text-2xl md:text-3xl mb-8 text-center ${theme.headingFont} ${theme.accent}`}>
        <EditableText
          value={data.siteCopy.rsvpHeading}
          onChange={(v) => edit?.setSiteCopyKey("rsvpHeading", v)}
          className={`text-2xl md:text-3xl text-center ${theme.headingFont} ${theme.accent}`}
          as="block"
        />
      </h2>
      <div className={`p-6 ${theme.card}`}>
        <label className={`block text-sm mb-2 ${theme.muted}`}>
          <EditableText
            value={data.siteCopy.rsvpNameLabel}
            onChange={(v) => edit?.setSiteCopyKey("rsvpNameLabel", v)}
            className={`text-sm ${theme.muted}`}
            as="block"
          />
        </label>
        {edit?.enabled ? (
          <div className={`w-full mb-4 px-4 py-3 rounded-xl border border-black/10 bg-white/50 ${theme.bodyFont}`}>
            <EditableText
              value={data.siteCopy.rsvpNamePlaceholder}
              onChange={(v) => edit?.setSiteCopyKey("rsvpNamePlaceholder", v)}
              className={`text-sm w-full bg-transparent ${theme.bodyFont}`}
              placeholder="Guest name"
              as="block"
            />
          </div>
        ) : (
          <input
            type="text"
            readOnly
            placeholder={data.siteCopy.rsvpNamePlaceholder}
            className={`w-full mb-4 px-4 py-3 rounded-xl border border-black/10 bg-white/50 ${theme.bodyFont}`}
          />
        )}
        <label className={`block text-sm mb-2 ${theme.muted}`}>
          <EditableText
            value={data.siteCopy.rsvpAttendingLabel}
            onChange={(v) => edit?.setSiteCopyKey("rsvpAttendingLabel", v)}
            className={`text-sm ${theme.muted}`}
            as="block"
          />
        </label>
        <div className="flex gap-3">
          <div
            className={`flex-1 py-3 px-4 text-sm text-center ${theme.button}`}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <EditableText
              value={data.siteCopy.rsvpAccept}
              onChange={(v) => edit?.setSiteCopyKey("rsvpAccept", v)}
              className="text-sm bg-transparent w-full text-center"
            />
          </div>
          <div
            className={`flex-1 py-3 px-4 text-sm text-center ${theme.buttonOutline}`}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <EditableText
              value={data.siteCopy.rsvpDecline}
              onChange={(v) => edit?.setSiteCopyKey("rsvpDecline", v)}
              className="text-sm bg-transparent w-full text-center"
            />
          </div>
        </div>
        {data.guestMode || edit?.enabled ? (
          <p className={`text-xs mt-4 text-center ${theme.muted}`}>
            <EditableText
              value={data.siteCopy.rsvpGuestNote}
              onChange={(v) => edit?.setSiteCopyKey("rsvpGuestNote", v)}
              multiline
              rows={2}
              className={`text-xs ${theme.muted} text-center`}
              as="block"
            />
          </p>
        ) : null}
      </div>
    </motion.section>
  );
}
