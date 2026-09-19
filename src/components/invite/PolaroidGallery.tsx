"use client";

import Image from "next/image";
import { invite } from "@/lib/invite";
import { polaroidScatter } from "./polaroidScatter";
import { usePolaroidLayout } from "./usePolaroidLayout";

export function PolaroidGallery() {
  const layout = usePolaroidLayout();

  return (
    <div
      className={`polaroid-scatter polaroid-scatter--${layout}`}
      aria-label="Our photos"
    >
      {invite.polaroids.map((photo, index) => {
        const place = polaroidScatter(index, layout);
        const rotateBoost =
          layout === "tablet" ? 0.2 : layout === "laptop" ? 0.25 : 0.35;
        const rotate =
          "rotate" in photo && typeof photo.rotate === "number"
            ? place.rotate + photo.rotate * rotateBoost
            : place.rotate;

        const imageSizes =
          layout === "laptop"
            ? "116px"
            : layout === "tablet"
              ? "7rem"
              : "(max-width: 640px) 30vw, 132px";

        return (
          <figure
            key={photo.src}
            className="polaroid polaroid--scatter"
            style={{
              top: place.top,
              left: place.left,
              right: place.right,
              bottom: place.bottom,
              transform: `rotate(${rotate}deg) scale(${place.scale})`,
            }}
          >
            <div className="polaroid-photo">
              {"kind" in photo && photo.kind === "video" ? (
                <video
                  className="polaroid-image"
                  src={photo.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden
                />
              ) : (
                <Image
                  src={photo.src}
                  alt=""
                  width={768}
                  height={1024}
                  className="polaroid-image"
                  sizes={imageSizes}
                />
              )}
            </div>
          </figure>
        );
      })}
    </div>
  );
}
