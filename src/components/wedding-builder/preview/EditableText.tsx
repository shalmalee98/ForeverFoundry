"use client";

import { cn } from "@/lib/utils";
import { usePreviewEdit } from "./PreviewEditContext";

type EditableTextProps = {
  /** Shown when edit mode off or no handler */
  value: string;
  onChange?: (next: string) => void;
  className?: string;
  /** Multi-line body text */
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  /** Use for headings so it stays one line visually */
  as?: "inline" | "block";
};

const editRing =
  "rounded-md border border-dashed border-violet-400/60 bg-white/5 px-1.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-violet-400/40";

/**
 * In design mode, renders a real input/textarea so copy can be edited in place.
 * Clicks don’t bubble to the section frame (so you don’t “select section” while typing).
 */
export function EditableText({
  value,
  onChange,
  className,
  multiline,
  rows = 4,
  placeholder,
  as = "inline",
}: EditableTextProps) {
  const edit = usePreviewEdit();
  const active = Boolean(edit?.enabled && onChange);

  if (!active) {
    if (multiline) {
      return (
        <span className={cn(className, as === "block" && "block w-full whitespace-pre-wrap")}>{value}</span>
      );
    }
    return <span className={cn(className, as === "block" && "block w-full")}>{value}</span>;
  }

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  if (multiline) {
    return (
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        onMouseDown={stop}
        onClick={stop}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(className, editRing, "w-full resize-y min-h-[2.5rem]")}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onMouseDown={stop}
      onClick={stop}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(
        className,
        editRing,
        as === "block" ? "block w-full" : "min-w-[4ch] max-w-full"
      )}
    />
  );
}
