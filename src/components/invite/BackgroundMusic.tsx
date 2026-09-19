"use client";

import { useEffect, useRef, useState } from "react";
import { invite } from "@/lib/invite";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
};

type YTNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      width: number;
      height: number;
      playerVars: Record<string, string | number>;
      events: {
        onReady: (event: { target: YTPlayer }) => void;
        onStateChange: (event: { data: number }) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { ENDED: number };
};

type WindowWithYouTube = Window & {
  YT?: YTNamespace;
  onYouTubeIframeAPIReady?: () => void;
};

function loadYouTubeApi(): Promise<YTNamespace> {
  const win = window as WindowWithYouTube;
  if (win.YT?.Player) return Promise.resolve(win.YT);

  return new Promise((resolve) => {
    const previous = win.onYouTubeIframeAPIReady;
    win.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (win.YT) resolve(win.YT);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

export function BackgroundMusic() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const playingRef = useRef(false);
  const wantsSoundRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    wantsSoundRef.current = true;
    const player = playerRef.current;
    if (!player) return;
    player.unMute();
    player.setVolume(62);
    player.playVideo();
    playingRef.current = true;
    setPlaying(true);
  };

  const pause = () => {
    wantsSoundRef.current = false;
    playerRef.current?.pauseVideo();
    playingRef.current = false;
    setPlaying(false);
  };

  useEffect(() => {
    let cancelled = false;
    let player: YTPlayer | null = null;

    const start = async () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const YT = await loadYouTubeApi();
      if (cancelled) return;

      const host = document.createElement("div");
      wrapper.replaceChildren(host);

      player = new YT.Player(host, {
        videoId: invite.music.youtubeId,
        width: 240,
        height: 135,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: invite.music.youtubeId,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            if (cancelled) return;
            event.target.setVolume(62);
            playerRef.current = event.target;
            event.target.playVideo();
            playingRef.current = true;
            setPlaying(true);
            if (wantsSoundRef.current) {
              event.target.unMute();
            }
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.ENDED && playingRef.current) {
              playerRef.current?.playVideo();
            }
          },
        },
      });
    };

    void start();

    return () => {
      cancelled = true;
      playerRef.current = null;
      player?.destroy();
      wrapperRef.current?.replaceChildren();
    };
  }, []);

  useEffect(() => {
    const unmuteOnGesture = (event: PointerEvent) => {
      if ((event.target as HTMLElement | null)?.closest("[data-music-toggle]")) {
        return;
      }
      wantsSoundRef.current = true;
      const player = playerRef.current;
      if (player) {
        player.unMute();
        player.setVolume(62);
        if (!playingRef.current) {
          player.playVideo();
          playingRef.current = true;
          setPlaying(true);
        }
      }
      window.removeEventListener("pointerdown", unmuteOnGesture, true);
    };

    window.addEventListener("pointerdown", unmuteOnGesture, true);
    return () => window.removeEventListener("pointerdown", unmuteOnGesture, true);
  }, []);

  return (
    <>
      <div
        ref={wrapperRef}
        className="pointer-events-none fixed bottom-0 left-0 z-0 h-[135px] w-[240px] overflow-hidden opacity-0"
        aria-hidden
      />

      <div className="fixed right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50">
        <button
          type="button"
          data-music-toggle
          onClick={() => (playing ? pause() : play())}
          aria-pressed={playing}
          aria-label={
            playing
              ? `Pause ${invite.music.title}`
              : `Play ${invite.music.title}`
          }
          className="flex items-center gap-2 rounded-full border border-rose-100 bg-white/90 py-1 pr-2.5 pl-1 shadow-sm backdrop-blur-sm transition hover:bg-midground active:scale-[0.98]"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-white">
            {playing ? (
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
              </svg>
            )}
          </span>
          <span className="whitespace-nowrap text-sm">
            <span className="font-medium text-foreground">Palagi</span>
            <span className="text-stone-500"> · TJxKZ</span>
          </span>
        </button>
      </div>
    </>
  );
}
