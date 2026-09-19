/**
 * App-wide typography scale — matches teavie / inbox conventions.
 *
 * xs (12px)  — captions, badges, meta
 * sm (14px)  — default UI copy, descriptions, buttons
 * base (16px)— card titles, emphasized body
 * lg (18px)  — section headers
 * xl+        — page titles
 */

export const TEXT_UI = "text-sm";

export const TEXT_UI_MUTED = "text-sm text-stone-500";

export const TEXT_CAPTION = "text-xs";

export const TEXT_CAPTION_MUTED = "text-xs text-stone-500";

export const TEXT_TITLE = "text-base font-medium text-foreground";

export const TEXT_HEADING = "text-base font-semibold text-foreground";

export const TEXT_SECTION =
  "text-lg font-normal tracking-tight text-foreground";

export const TEXT_PAGE_TITLE =
  "text-2xl font-normal tracking-tight text-foreground sm:text-3xl";

export const TEXT_LABEL = "text-xs font-medium text-stone-500";

export const PAGE_CARD =
  "rounded-xl border border-rose-100 bg-white/85 p-5 shadow-sm backdrop-blur-sm";
