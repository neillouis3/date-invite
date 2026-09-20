import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Hairline({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto h-px w-16 bg-accent/25 ${className}`}
      aria-hidden
    />
  );
}

export function PrimaryButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-accent px-4 text-base font-semibold text-white transition hover:bg-[#c91827] active:scale-[0.98] disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-10 items-center justify-center rounded-lg px-3 text-sm text-stone-500 transition hover:bg-midground hover:text-accent ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ProgressDots({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div className="flex items-center justify-center gap-1.5" aria-hidden>
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            index === current
              ? "w-5 bg-accent"
              : index < current
                ? "w-1.5 bg-accent/40"
                : "w-1.5 bg-rose-200"
          }`}
        />
      ))}
    </div>
  );
}

export function HeartBurst() {
  const hearts = [
    { dx: "-90px", dy: "-120px", delay: "0s" },
    { dx: "70px", dy: "-130px", delay: "0.05s" },
    { dx: "-40px", dy: "-160px", delay: "0.1s" },
    { dx: "110px", dy: "-80px", delay: "0.08s" },
    { dx: "-130px", dy: "-60px", delay: "0.12s" },
    { dx: "20px", dy: "-170px", delay: "0.15s" },
    { dx: "-70px", dy: "-40px", delay: "0.18s" },
    { dx: "95px", dy: "-150px", delay: "0.2s" },
    { dx: "0px", dy: "-200px", delay: "0.04s" },
    { dx: "-110px", dy: "-110px", delay: "0.16s" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={`${heart.dx}-${heart.delay}`}
          className="absolute top-1/2 left-1/2 text-sm text-rose-500"
          style={{
            ["--dx" as string]: heart.dx,
            ["--dy" as string]: heart.dy,
            animation: `heart-pop 1.4s ease-out ${heart.delay} both`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
