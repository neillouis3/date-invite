"use client";

import Image from "next/image";
import { useState } from "react";
import { invite } from "@/lib/invite";
import { BackgroundMusic } from "./BackgroundMusic";
import { OpeningMail } from "./Envelope";
import { FloatingPaperHearts } from "./FloatingPaperHearts";
import { PolaroidGallery } from "./PolaroidGallery";
import { HeartBurst, PrimaryButton } from "./ui";

type Screen = "envelope" | "accepted" | "details";

export function DateInvite() {
  const [screen, setScreen] = useState<Screen>("envelope");
  const [opening, setOpening] = useState(false);

  const go = (next: Screen) => setScreen(next);

  return (
    <div className="scene relative overflow-x-hidden">
      <FloatingPaperHearts />
      <BackgroundMusic />
      <div
        className={`relative z-10 mx-auto flex min-h-dvh w-full flex-col py-7 pb-[max(4.5rem,calc(env(safe-area-inset-bottom)+3.5rem))] ${
          screen === "details"
            ? "max-w-[52rem] px-3 sm:px-5 md:px-8"
            : "max-w-lg px-5 sm:px-8"
        }`}
      >
        <div className="flex flex-1 flex-col justify-center pb-6">
          {screen === "envelope" && (
            <EnvelopeScreen
              opening={opening}
              onOpen={() => setOpening(true)}
              onYes={() => go("accepted")}
            />
          )}
          {screen === "accepted" && (
            <AcceptedScreen onContinue={() => go("details")} />
          )}
          {screen === "details" && <DetailsScreen />}
        </div>
      </div>
    </div>
  );
}

function EnvelopeScreen({
  opening,
  onOpen,
  onYes,
}: {
  opening: boolean;
  onOpen: () => void;
  onYes: () => void;
}) {
  const [rejected, setRejected] = useState(false);

  if (rejected) {
    return (
      <div className="full-screen-note reject-screen animate-fade-up">
        <Image
          src="/sad-puppy.gif"
          alt=""
          width={220}
          height={300}
          unoptimized
          className="reject-screen-puppy"
          priority
        />
        <p className="full-screen-note-text invite-script">why not?? huhuhu</p>
        <button
          type="button"
          className="full-screen-note-button"
          onClick={() => setRejected(false)}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-up text-center">
      <OpeningMail
        open={opening}
        onOpen={() => {
          setRejected(false);
          onOpen();
        }}
        onYes={onYes}
        onNo={() => setRejected(true)}
      />
    </div>
  );
}

function AcceptedScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="animate-scale-in relative text-center">
      <HeartBurst />
      <Image
        src="/happy-cat.gif"
        alt=""
        width={280}
        height={280}
        unoptimized
        className="accepted-screen-cat mx-auto"
        priority
      />
      <p className="invite-script mx-auto mt-5 max-w-sm whitespace-pre-line text-foreground">
        {invite.accepted.message}
      </p>
      <div className="mt-8">
        <PrimaryButton className="invite-script" onClick={onContinue}>
          {invite.accepted.cta}
        </PrimaryButton>
      </div>
    </div>
  );
}

function noteLines(note: string) {
  return note
    .split("\n")
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter(Boolean);
}

function DetailsScreen() {
  return (
    <>
      <PolaroidGallery />
      <div className="itenari-wrap animate-fade-up">
        <article className="itenari-paper">
          <div className="itenari-paper-sheet" aria-hidden />
          <div className="itenari-paper-trim" aria-hidden />
          <div className="itenari-paper-tape" aria-hidden />
          <div className="itenari-paper-body">
            <header className="itenari-paper-header">
              <p className="itenari-paper-title">{invite.detailsTitle}</p>
              <p className="itenari-paper-meta">{invite.detailsDate}</p>
            </header>
            <div className="itenari-schedule">
              {invite.details.map((item) =>
                item.note ? (
                  <div
                    key={`${item.label}-${item.value}`}
                    className="itenari-block"
                  >
                    <p className="itenari-line">{item.value}</p>
                    <ul className="itenari-paper-sublist">
                      {noteLines(item.note).map((line) => (
                        <li key={line}>- {line}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p
                    key={`${item.label}-${item.value}`}
                    className="itenari-line"
                  >
                    {item.value}
                  </p>
                ),
              )}
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
