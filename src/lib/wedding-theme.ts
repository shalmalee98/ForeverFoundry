/**
 * Wedding vibe → visual system (fonts, colors, layout feel).
 * Swap `classes` on the preview root for instant theme changes.
 */

export type WeddingVibe = "romantic" | "modern" | "beach" | "royal" | "minimal";

export interface WeddingThemeTokens {
  vibe: WeddingVibe;
  label: string;
  /** Applied to the outer preview frame */
  frame: string;
  /** Hero background (gradient or solid) */
  hero: string;
  headingFont: string;
  bodyFont: string;
  accent: string;
  muted: string;
  button: string;
  buttonOutline: string;
  sectionSpacing: string;
  card: string;
}

export const WEDDING_THEMES: Record<WeddingVibe, WeddingThemeTokens> = {
  romantic: {
    vibe: "romantic",
    label: "Romantic",
    frame: "bg-[hsl(350_40%_98%)] text-[hsl(350_25%_18%)]",
    hero: "bg-gradient-to-br from-rose-100/90 via-pink-50 to-amber-50/80",
    headingFont: "font-display",
    bodyFont: "font-body",
    accent: "text-rose-700",
    muted: "text-rose-900/60",
    button: "rounded-full bg-rose-600 text-white hover:bg-rose-700 shadow-md",
    buttonOutline: "rounded-full border border-rose-200 bg-white/80 text-rose-800 hover:bg-white",
    sectionSpacing: "space-y-20 py-16",
    card: "rounded-2xl border border-rose-100/80 bg-white/70 shadow-sm backdrop-blur-sm",
  },
  modern: {
    vibe: "modern",
    label: "Modern",
    frame: "bg-neutral-50 text-neutral-950",
    hero: "bg-gradient-to-b from-neutral-100 to-neutral-50",
    headingFont: "font-sans tracking-tight font-semibold",
    bodyFont: "font-sans text-[15px] leading-relaxed",
    accent: "text-neutral-900",
    muted: "text-neutral-500",
    button: "rounded-md bg-neutral-900 text-white hover:bg-neutral-800",
    buttonOutline: "rounded-md border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50",
    sectionSpacing: "space-y-24 py-20",
    card: "rounded-xl border border-neutral-200 bg-white shadow-sm",
  },
  beach: {
    vibe: "beach",
    label: "Beach",
    frame: "bg-sky-50 text-sky-950",
    hero: "bg-gradient-to-br from-sky-100 via-cyan-50 to-emerald-50/70",
    headingFont: "font-display italic",
    bodyFont: "font-body",
    accent: "text-cyan-800",
    muted: "text-cyan-900/55",
    button: "rounded-2xl bg-cyan-600 text-white hover:bg-cyan-700 shadow-md",
    buttonOutline: "rounded-2xl border border-cyan-200 bg-white/90 text-cyan-900 hover:bg-white",
    sectionSpacing: "space-y-20 py-16",
    card: "rounded-3xl border border-cyan-100/80 bg-white/75 shadow-sm backdrop-blur-sm",
  },
  royal: {
    vibe: "royal",
    label: "Royal",
    frame: "bg-[hsl(280_20%_12%)] text-[hsl(45_40%_92%)]",
    hero: "bg-gradient-to-br from-violet-950 via-purple-900 to-amber-900/90",
    headingFont: "font-display",
    bodyFont: "font-body",
    accent: "text-amber-200",
    muted: "text-violet-200/70",
    button: "rounded-full bg-amber-500 text-violet-950 hover:bg-amber-400",
    buttonOutline: "rounded-full border border-amber-400/40 text-amber-100 hover:bg-white/10",
    sectionSpacing: "space-y-20 py-16",
    card: "rounded-2xl border border-amber-400/20 bg-white/5 backdrop-blur-md",
  },
  minimal: {
    vibe: "minimal",
    label: "Minimal",
    frame: "bg-stone-50 text-stone-900",
    hero: "bg-stone-100/90",
    headingFont: "font-sans font-medium tracking-wide",
    bodyFont: "font-sans text-[15px] leading-7 text-stone-600",
    accent: "text-stone-900",
    muted: "text-stone-500",
    button: "rounded-full bg-stone-900 text-stone-50 hover:bg-stone-800",
    buttonOutline: "rounded-full border border-stone-300 bg-transparent text-stone-800 hover:bg-stone-100",
    sectionSpacing: "space-y-28 py-24",
    card: "rounded-2xl border border-stone-200/80 bg-white",
  },
};

export function getTheme(vibe: WeddingVibe): WeddingThemeTokens {
  return WEDDING_THEMES[vibe] ?? WEDDING_THEMES.romantic;
}
