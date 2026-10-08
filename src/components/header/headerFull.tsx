"use client";

import { forwardRef, PropsWithChildren, ReactNode, useEffect, useRef } from "react";

const HEADER_VIDEO_PLAYBACK_RATE = 0.75;

export const HeaderFull = forwardRef<HTMLElement, PropsWithChildren<{ bottomContent?: ReactNode }>>(
  ({ children, bottomContent }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      const video = videoRef.current;

      if (!video) return;

      video.defaultPlaybackRate = HEADER_VIDEO_PLAYBACK_RATE;
      video.playbackRate = HEADER_VIDEO_PLAYBACK_RATE;
    }, []);

    return (
      <header
        ref={ref}
        className={
          `header-full relative ${bottomContent ? "grid grid-cols-1 grid-rows-[minmax(65svh,auto)_1fr_1fr]" : "h-svh flex justify-center items-center"}`
        }
      >
        <div className={`absolute inset-0 isolate overflow-hidden bg-[url('/images/hero/header-poster.jpg')] bg-cover bg-center ${bottomContent ? "col-start-1 col-end-2 row-start-1 row-end-3" : ""}`}>
          <video
          ref={videoRef}
          className="header-full__video absolute z-0 inset-x-0 -top-[15svh] h-[calc(100%+30svh)] w-full object-cover will-change-transform"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero/header-poster.jpg"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          aria-hidden="true"
        >
          <source
            src="/images/hero/header.webm"
            type='video/webm; codecs="av01.0.08M.10"'
          />

          <source src="/images/hero/header.mp4" type="video/mp4" />
          </video>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] bg-header-gradient"
          />
        </div>
        <div className={`relative z-[2] flex justify-center items-center w-full ${bottomContent ? "col-start-1 row-start-1 py-20" : ""}`}>
          {children}
        </div>
        {bottomContent && (
          <div className="relative z-[2] col-start-1 row-start-2 row-end-4 w-full max-w-7xl mx-auto px-reg xl:px-0">
            {bottomContent}
          </div>
        )}
      </header>
    );
  },
);

HeaderFull.displayName = "HeaderFull";
