import { useCallback, useEffect, useRef, useState } from "react";

export type VideoOrientation = "portrait" | "landscape";

type ProjectWalkthroughVideoProps = {
  src: string;
  title: string;
  hint?: VideoOrientation;
  onOrientation: (orientation: VideoOrientation) => void;
  layout: VideoOrientation | "pending";
};

function useAutoplayVideo(videoRef: { current: HTMLVideoElement | null }, src: string) {
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.volume = 0;
    const play = () => {
      el.muted = true;
      el.volume = 0;
      void el.play().catch(() => {});
    };
    play();
    el.addEventListener("loadeddata", play);
    return () => el.removeEventListener("loadeddata", play);
  }, [src, videoRef]);
}

function useVideoAspect(videoRef: { current: HTMLVideoElement | null }, fallback = 9 / 16) {
  const [aspect, setAspect] = useState(fallback);

  const syncAspect = useCallback((video: HTMLVideoElement) => {
    if (!video.videoWidth || !video.videoHeight) return;
    setAspect(video.videoWidth / video.videoHeight);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (el && el.readyState >= 1) syncAspect(el);
  }, [videoRef, syncAspect]);

  return { aspect, syncAspect };
}

export function ProjectWalkthroughVideo({
  src,
  title,
  hint,
  onOrientation,
  layout,
}: ProjectWalkthroughVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reported = useRef(false);
  const fallbackAspect = hint === "landscape" ? 16 / 9 : 9 / 16;
  const { aspect, syncAspect } = useVideoAspect(videoRef, fallbackAspect);

  const reportOrientation = useCallback(
    (video: HTMLVideoElement) => {
      syncAspect(video);
      if (reported.current || !video.videoWidth || !video.videoHeight) return;
      reported.current = true;
      const orientation: VideoOrientation =
        video.videoHeight > video.videoWidth ? "portrait" : "landscape";
      onOrientation(orientation);
    },
    [onOrientation, syncAspect],
  );

  useEffect(() => {
    reported.current = false;
    if (hint) onOrientation(hint);
  }, [src, hint, onOrientation]);

  useAutoplayVideo(videoRef, src);

  const activeLayout = layout === "pending" ? hint ?? "portrait" : layout;
  const isPortrait = activeLayout === "portrait";

  const frameStyle = { aspectRatio: `${aspect}` as const };

  const videoEl = (
    <video
      ref={videoRef}
      className="project-detail-video__el"
      src={src}
      autoPlay
      muted
      defaultMuted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      volume={0}
      aria-hidden
      onLoadedMetadata={(e) => reportOrientation(e.currentTarget)}
    />
  );

  if (isPortrait) {
    return (
      <figure
        className="project-detail-video project-detail-video--portrait mx-auto mt-8 w-full md:mx-0 md:mt-0 md:w-full md:justify-self-stretch md:self-start"
        aria-label={`Kitchen walkthrough — ${title}`}
      >
        <div
          className="project-detail-video__frame project-detail-video__frame--portrait"
          style={frameStyle}
        >
          {videoEl}
        </div>
      </figure>
    );
  }

  return (
    <figure
      className="project-detail-video project-detail-video--landscape w-full"
      aria-label={`Kitchen walkthrough — ${title}`}
    >
      <div
        className="project-detail-video__frame project-detail-video__frame--landscape"
        style={frameStyle}
      >
        {videoEl}
      </div>
    </figure>
  );
}

export function ProjectVideoOrientationProbe({
  src,
  hint,
  onOrientation,
}: {
  src: string;
  hint?: VideoOrientation;
  onOrientation: (orientation: VideoOrientation) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reported = useRef(false);

  useEffect(() => {
    reported.current = false;
    if (hint) onOrientation(hint);
  }, [src, hint, onOrientation]);

  if (hint) return null;

  return (
    <video
      ref={videoRef}
      className="pointer-events-none absolute h-0 w-0 opacity-0"
      src={src}
      preload="metadata"
      muted
      playsInline
      aria-hidden
      onLoadedMetadata={(e) => {
        if (reported.current) return;
        const v = e.currentTarget;
        if (!v.videoWidth || !v.videoHeight) return;
        reported.current = true;
        onOrientation(v.videoHeight > v.videoWidth ? "portrait" : "landscape");
      }}
    />
  );
}
