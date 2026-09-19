"use client";

import { useSyncExternalStore } from "react";
import type { PolaroidLayout } from "./polaroidScatter";

function subscribe(onChange: () => void) {
  const queries = [
    window.matchMedia("(min-width: 1024px)"),
    window.matchMedia("(min-width: 768px) and (max-width: 1023px)"),
  ];
  for (const media of queries) {
    media.addEventListener("change", onChange);
  }
  return () => {
    for (const media of queries) {
      media.removeEventListener("change", onChange);
    }
  };
}

function getSnapshot(): PolaroidLayout {
  if (window.matchMedia("(min-width: 1024px)").matches) {
    return "laptop";
  }
  if (window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches) {
    return "tablet";
  }
  return "mobile";
}

function getServerSnapshot(): PolaroidLayout {
  return "mobile";
}

export function usePolaroidLayout() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
