import { lazy, Suspense, useEffect, useState, useCallback } from "react";
import HeroSection from "../pageComponents/homepage/Herosection";
import CameraLensTransition from "../pageComponents/homepage/CameraLensTransition";
import PortfolioWall from "../pageComponents/homepage/PortfolioWall";

const PhotographyShowcase = lazy(() => import("../pageComponents/homepage/PhotographyShowcase"));
const AlbumCollection = lazy(() => import("../pageComponents/homepage/AlbumCollection"));
const FilmsSection = lazy(() => import("../pageComponents/homepage/FilmsSection"));
const InstagramFeed = lazy(() => import("../pageComponents/homepage/InstagramFeed"));
const MoreAboutSection = lazy(() => import("../pageComponents/homepage/MoreAboutSection"));

const SectionSkeleton = () => (
  <div className="w-full py-24 animate-pulse bg-bg-secondary/20 px-6">
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="h-5 w-1/4 bg-border rounded" />
      <div className="h-4 w-2/3 bg-border rounded opacity-60" />
      <div className="h-56 w-full bg-border/40 rounded mt-8" />
    </div>
  </div>
);

export default function Homepage() {
  const [lensActive, setLensActive] = useState(false);
  const [showWall, setShowWall] = useState(false);
  const [lensDone, setLensDone] = useState(false);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      html {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
      }
    `;
    document.head.appendChild(styleTag);
    return () => {
      if (styleTag.parentNode) document.head.removeChild(styleTag);
    };
  }, []);

  // Trigger lens transition when user scrolls past hero (~85vh)
  useEffect(() => {
    if (lensDone) return;

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.72) {
        setLensActive(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lensDone]);

  const handleLensComplete = useCallback(() => {
    setLensDone(true);
    setShowWall(true);
    setLensActive(false);
    // Unlock scroll feel — wall is already in flow below
  }, []);

  return (
    <>
      <HeroSection />

      {/* Signature lens transition overlay */}
      <CameraLensTransition
        active={lensActive}
        onComplete={handleLensComplete}
      />

      {/* 4D Portfolio Wall — appears after lens or immediately on revisit */}
      {(showWall || lensDone) && <PortfolioWall />}

      {/* Keep wall mounted after first play so scroll works */}
      {!showWall && !lensDone && (
        <div className="h-[20vh] bg-black" aria-hidden />
      )}

      <Suspense fallback={<SectionSkeleton />}>
        <PhotographyShowcase />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <AlbumCollection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FilmsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <InstagramFeed />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <MoreAboutSection />
      </Suspense>
    </>
  );
}
