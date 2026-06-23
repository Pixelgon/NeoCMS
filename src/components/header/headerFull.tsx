"use client";

import { forwardRef, PropsWithChildren, useEffect, useRef } from "react";

const HEADER_VIDEO_PLAYBACK_RATE = 0.75;

export const HeaderFull = forwardRef<HTMLElement, PropsWithChildren>(
  ({ children }, ref) => {
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
          "header-full relative h-svh flex justify-center items-center overflow-hidden bg-[url('/images/hero/header-poster.jpg')] bg-cover bg-center before:bg-header-gradient before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-[1]"
        }
      >
        <video
          ref={videoRef}
          className="header-full__video absolute inset-x-0 -top-[15svh] h-[130svh] w-full object-cover will-change-transform"
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
        <div className="relative z-[2] flex justify-center items-center w-full">
          {children}
        </div>
      </header>
    );
  },
);

HeaderFull.displayName = "HeaderFull";
