"use client";

import { forwardRef, PropsWithChildren, ReactNode, useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const HEADER_VIDEO_PLAYBACK_RATE = 0.75;

export const HeaderFull = forwardRef<HTMLElement, PropsWithChildren<{ bottomContent?: ReactNode }>>(
  ({ children, bottomContent }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
      const video = videoRef.current;

      if (!video) return;

      video.defaultPlaybackRate = HEADER_VIDEO_PLAYBACK_RATE;
      video.playbackRate = HEADER_VIDEO_PLAYBACK_RATE;
      video.defaultMuted = true;
      video.muted = true;

      if (shouldReduceMotion) {
        video.pause();
        return;
      }

      let isVisible = false;
      let pauseRecoveryAttempted = false;
      let lastPlaybackTime = video.currentTime;
      const resumePlayback = () => {
        if (!isVisible || document.visibilityState !== "visible") return;

        void video.play().catch(() => {
          // Autoplay may be unavailable, for example in Low Power Mode.
        });
      };
      const restartPlayback = () => {
        // Recover if a browser reaches the end without applying native looping.
        if (video.ended) video.currentTime = 0;
        resumePlayback();
      };
      const recoverPausedPlayback = () => {
        if (pauseRecoveryAttempted) return;
        pauseRecoveryAttempted = true;
        restartPlayback();
      };
      const trackPlayback = () => {
        // Allow another recovery only after playback has actually advanced.
        if (video.currentTime !== lastPlaybackTime && !video.paused) {
          pauseRecoveryAttempted = false;
        }
        lastPlaybackTime = video.currentTime;
      };
      const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) resumePlayback();
      });

      observer.observe(video);
      video.addEventListener("ended", restartPlayback);
      video.addEventListener("pause", recoverPausedPlayback);
      video.addEventListener("timeupdate", trackPlayback);
      document.addEventListener("visibilitychange", resumePlayback);
      window.addEventListener("pageshow", resumePlayback);

      return () => {
        observer.disconnect();
        video.removeEventListener("ended", restartPlayback);
        video.removeEventListener("pause", recoverPausedPlayback);
        video.removeEventListener("timeupdate", trackPlayback);
        document.removeEventListener("visibilitychange", resumePlayback);
        window.removeEventListener("pageshow", resumePlayback);
      };
    }, [shouldReduceMotion]);

    return (
      <header
        ref={ref}
        className={
          `header-full relative ${bottomContent ? "h-auto lg:h-svh grid grid-cols-1 lg:grid-rows-[minmax(0,1fr)_auto_auto] pb-reg lg:pb-8" : "h-svh flex justify-center items-center"}`
        }
      >
        <div className={`absolute inset-0 isolate overflow-hidden bg-[url('/images/hero/header-poster.jpg')] bg-cover bg-center ${bottomContent ? "h-svh lg:h-auto col-start-1 row-start-1 row-end-3" : ""}`}>
          <video
          ref={videoRef}
          className="header-full__video pointer-events-none absolute z-0 inset-x-0 -top-[15svh] h-[calc(100%+30svh)] w-full object-cover will-change-transform"
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
            src="/images/hero/header-av1.mp4"
            type='video/mp4; codecs="av01.0.12M.10"'
          />
          <source
            src="/images/hero/header.webm"
            type='video/webm; codecs="av01.0.12M.10"'
          />
          <source src="/images/hero/header.mp4" type="video/mp4" />
          </video>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] bg-header-gradient"
          />
        </div>
        <div className={`relative z-[2] flex justify-center items-center w-full ${bottomContent ? "col-start-1 row-start-1 min-h-[max(16rem,calc(100svh-18rem))] lg:min-h-0" : ""}`}>
          {children}
        </div>
        {bottomContent && (
          <div className="relative z-[2] col-start-1 row-start-2 lg:row-end-4 w-full max-w-7xl mx-auto px-reg xl:px-0">
            {bottomContent}
          </div>
        )}
      </header>
    );
  },
);

HeaderFull.displayName = "HeaderFull";
