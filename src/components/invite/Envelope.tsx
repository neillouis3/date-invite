import { invite } from "@/lib/invite";

export function OpeningMail({
  open,
  onOpen,
  onYes,
  onNo,
}: {
  open: boolean;
  onOpen: () => void;
  onYes: () => void;
  onNo: () => void;
}) {
  return (
    <div className={`mail-stage ${open ? "is-open" : ""}`}>
      <div className="mail">
        <div className="mail-back" />

        <article className="mail-letter">
          <div className="mail-letter-sheet" aria-hidden />
          <div className="mail-letter-body">
            {invite.envelope.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mb-6 last:mb-0">
                {paragraph}
              </p>
            ))}
            {open ? (
              <div className="mail-letter-actions">
                <button type="button" onClick={onYes}>
                  Yes
                </button>
                <button type="button" onClick={onNo}>
                  No
                </button>
              </div>
            ) : null}
          </div>
        </article>

        <div className="mail-pocket" aria-hidden>
          <svg viewBox="0 0 340 220" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="foil" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c49a2a" />
                <stop offset="42%" stopColor="#f0d57a" />
                <stop offset="100%" stopColor="#a67b1f" />
              </linearGradient>
              <clipPath id="pocketCut">
                <path
                  d="M0 0 C 58 18 128 112 170 147 L0 220 Z M340 0 C 282 18 212 112 170 147 L340 220 Z M0 220 L170 147 L340 220 Z"
                />
              </clipPath>
            </defs>
            <g clipPath="url(#pocketCut)">
              <image
                href="/letter-paper.jpg"
                x="0"
                y="0"
                width="340"
                height="220"
                preserveAspectRatio="xMidYMid slice"
              />
              <rect
                width="340"
                height="220"
                fill="#e2c49a"
                opacity="0.62"
                style={{ mixBlendMode: "multiply" }}
              />
            </g>
            <path
              className="mail-pocket-foil-bottom"
              d="M18 211 C 92 196 138 164 170 148 C 202 164 248 196 322 212"
              fill="none"
              stroke="url(#foil)"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <button
          type="button"
          className="mail-flap"
          onClick={open ? undefined : onOpen}
          disabled={open}
          aria-label={open ? undefined : "Open the letter"}
        >
          <span className="mail-flap-face mail-flap-front">
            <svg viewBox="0 0 340 150" preserveAspectRatio="none" className="h-full w-full">
              <defs>
                <linearGradient id="flapFoil" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c49a2a" />
                  <stop offset="45%" stopColor="#f0d57a" />
                  <stop offset="100%" stopColor="#a67b1f" />
                </linearGradient>
                <clipPath id="flapCut">
                  <path d="M5 5 C 78 0 150 4 170 6 C 198 3 268 0 335 6 C 286 52 228 122 171 147 C 114 122 52 50 5 5 Z" />
                </clipPath>
              </defs>
              <g clipPath="url(#flapCut)">
                <image
                  href="/letter-paper.jpg"
                  x="-20"
                  y="-30"
                  width="380"
                  height="260"
                  preserveAspectRatio="xMidYMid slice"
                />
                <rect
                  width="340"
                  height="150"
                  fill="#edd4b0"
                  opacity="0.55"
                  style={{ mixBlendMode: "multiply" }}
                />
              </g>
              <path
                className="mail-flap-foil"
                d="M8 7 C 96 22 138 94 170 146 C 202 94 244 22 332 8"
                fill="none"
                stroke="url(#flapFoil)"
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mail-heart" aria-hidden>
              <svg viewBox="0 0 56 50" className="h-full w-full">
                <path
                  d="M18 8.5 C 12 6 5.5 10.5 5.5 18 C 5.5 24 10 31 17 37 C 22 41.5 27.2 46.5 28 47.2 C 28.8 46.5 34.2 41.2 39.5 36.5 C 47 30 51.5 23.5 51.2 17.5 C 50.8 10 44.5 6.2 38.5 8.8 C 35.5 10.2 32.2 13.8 28.2 18.2 C 25.2 13.2 22.2 9.6 18 8.5 Z"
                  fill="#c81e2a"
                />
                <path
                  d="M16.5 12.5 C 13.5 11 9.5 13.2 10.2 17.5 C 11.2 22.2 16 28 22 33.5"
                  fill="none"
                  stroke="#ffb3b8"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.55"
                />
              </svg>
            </span>
          </span>
          <span className="mail-flap-face mail-flap-inside" />
        </button>
      </div>
    </div>
  );
}
