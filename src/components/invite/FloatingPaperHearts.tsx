function heartRand(index: number, salt: number) {
  const x = Math.sin((index + 1) * 91.17 + salt * 33.42) * 43758.5453;
  return x - Math.floor(x);
}

const HEART_COUNT = 7;
const RIGHT_HEART_COUNT = 6;

function buildHearts() {
  const base = Array.from({ length: HEART_COUNT }, (_, index) => ({
    left: `${4 + heartRand(index, 1) * 46}%`,
    top: `${3 + heartRand(index, 2) * 88}%`,
    size: Math.round(30 + heartRand(index, 3) * 26),
    rotate: Math.round(-22 + heartRand(index, 4) * 44),
    delay: `${(heartRand(index, 5) * 3.2).toFixed(2)}s`,
  }));

  const rightSide = Array.from({ length: RIGHT_HEART_COUNT }, (_, index) => {
    const i = index + HEART_COUNT;
    return {
      left: `${70 + heartRand(i, 1) * 24}%`,
      top: `${6 + heartRand(i, 2) * 84}%`,
      size: Math.round(32 + heartRand(i, 3) * 24),
      rotate: Math.round(-18 + heartRand(i, 4) * 36),
      delay: `${(heartRand(i, 5) * 3.2).toFixed(2)}s`,
    };
  });

  return [...base, ...rightSide];
}

const HEARTS = buildHearts();

function PaperHeart({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 44"
      className="paper-heart-svg"
      aria-hidden
    >
      <path
        d="M24 41 C24 41 4 27 4 16 C4 9 9 4 16 6 C19 7 22 12 24 16 C26 12 29 7 32 6 C39 4 44 9 44 16 C44 27 24 41 24 41 Z"
        fill="#e11d2e"
        stroke="#b91c1c"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M14 12 C12 11 10 12 10.5 15 C11.5 18 15 22 19 26"
        fill="none"
        stroke="#fca5a5"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

export function FloatingPaperHearts() {
  return (
    <div className="paper-hearts" aria-hidden>
      {HEARTS.map((heart, index) => (
        <span
          key={index}
          className="paper-heart"
          style={{
            left: heart.left,
            top: heart.top,
            animationDelay: heart.delay,
            transform: `rotate(${heart.rotate}deg) scale(${0.85 + (heart.size % 7) * 0.03})`,
          }}
        >
          <PaperHeart size={heart.size} />
        </span>
      ))}
    </div>
  );
}
