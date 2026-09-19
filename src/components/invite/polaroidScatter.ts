export type PolaroidScatter = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate: number;
  scale: number;
};

export type PolaroidLayout = "mobile" | "tablet" | "laptop";

/** Stable pseudo-random in [0, 1) — same output on server and client. */
function rand(index: number, salt: number) {
  const x = Math.sin((index + 1) * 78.233 + salt * 45.164) * 43758.5453;
  return x - Math.floor(x);
}

/** Ring around the letter — inset from viewport edges, not stuck on the sides. */
const MOBILE_SLOTS: Omit<PolaroidScatter, "rotate" | "scale">[] = [
  { top: "9%", left: "5%" },
  { top: "8%", right: "5%" },
  { top: "27%", left: "3%" },
  { top: "25%", right: "3%" },
  { bottom: "23%", left: "4%" },
  { bottom: "21%", right: "4%" },
  { bottom: "7%", left: "32%" },
];

const TABLET_SLOTS: Omit<PolaroidScatter, "rotate" | "scale">[] = [
  { top: "8%", left: "11%" },
  { top: "7%", right: "11%" },
  { top: "24%", left: "8%" },
  { top: "22%", right: "8%" },
  { bottom: "19%", left: "10%" },
  { bottom: "17%", right: "10%" },
  { bottom: "5%", right: "18%" },
];

const LAPTOP_SLOTS: Omit<PolaroidScatter, "rotate" | "scale">[] = [
  { top: "11%", left: "20%" },
  { top: "9%", right: "20%" },
  { top: "36%", left: "14%" },
  { top: "34%", right: "14%" },
  { bottom: "21%", left: "18%" },
  { bottom: "19%", right: "18%" },
  { bottom: "9%", right: "24%" },
];

export function polaroidScatter(
  index: number,
  layout: PolaroidLayout = "mobile",
): PolaroidScatter {
  const slots =
    layout === "laptop"
      ? LAPTOP_SLOTS
      : layout === "tablet"
        ? TABLET_SLOTS
        : MOBILE_SLOTS;
  const slot = slots[index] ?? slots[0];

  const scale =
    layout === "laptop"
      ? 0.92 + rand(index, 1) * 0.14
      : layout === "tablet"
        ? 0.9 + rand(index, 1) * 0.12
        : 0.82 + rand(index, 1) * 0.22;
  const rotate =
    layout === "laptop"
      ? Math.round(-11 + rand(index, 2) * 22)
      : layout === "tablet"
        ? Math.round(-9 + rand(index, 2) * 18)
        : Math.round(-14 + rand(index, 2) * 28);

  return {
    ...slot,
    rotate,
    scale,
  };
}
