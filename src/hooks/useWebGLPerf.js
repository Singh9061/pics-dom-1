import { useEffect, useMemo, useState } from "react";

/**
 * Shared WebGL performance profile
 * - Caps DPR on mobile / low-end
 * - Detects reduced motion preference
 * - IntersectionObserver visibility for pausing canvases
 */
export function getDeviceProfile() {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isLowEnd: false,
      reduceMotion: false,
      maxDpr: 1.5,
      antialias: true,
    };
  }

  const ua = navigator.userAgent || "";
  const isMobile =
    /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || window.innerWidth < 768;

  // Heuristic: low cores / low memory
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;
  const isLowEnd = cores <= 4 || mem <= 4 || isMobile;

  const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  const dpr = window.devicePixelRatio || 1;
  const maxDpr = isLowEnd ? Math.min(dpr, 1.25) : Math.min(dpr, 1.5);

  return {
    isMobile,
    isLowEnd,
    reduceMotion,
    maxDpr,
    antialias: !isLowEnd,
  };
}

export function useWebGLPerf() {
  const profile = useMemo(() => getDeviceProfile(), []);
  return profile;
}

/**
 * Pause / resume canvas when section leaves viewport
 */
export function useCanvasVisibility(rootRef) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = rootRef?.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting && entry.intersectionRatio > 0.05);
      },
      { root: null, threshold: [0, 0.05, 0.15] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootRef]);

  return visible;
}
