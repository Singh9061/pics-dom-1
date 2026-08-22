import { lazy, Suspense, useEffect, useState, useCallback } from "react";
import HeroSection from "../pageComponents/homepage/Herosection";
import CameraLensTransition from "../pageComponents/homepage/CameraLensTransition";
import PortfolioWall from "../pageComponents/homepage/PortfolioWall";

const PhotographyShowcase = lazy(() =>
  import("../pageComponents/homepage/PhotographyShowcase")
);
const AlbumCollection = lazy(() =>
  import("../pageComponents/homepage/AlbumCollection")
);
const FilmsSection = lazy(() =>
  import("../pageComponents/homepage/FilmsSection")
);
const InstagramFeed = lazy(() =>
  import("../pageComponents/homepage/InstagramFeed")
);
const MoreAboutSection = lazy(() =>
  import("../pageComponents/homepage/MoreAboutSection")
);

const SectionSkeleton = () => (
  <div className="w-full animate-pulse bg-bg-secondary/20 px-6 py-24">
    <div className="mx-auto max-w-6xl space-y-4">
      <div className="h-5 w-1/4 rounded bg-border" />
      <div className="h-4 w-2/3 rounded bg-border opacity-60" />
      <div className="mt-8 h-56 w-full rounded bg-border/40" />
    </div>
  </div>
);

export default function Homepage() {
  const [lensActive, setLensActive] = useState(false);
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

  // Trigger lens once when scrolling past hero
  useEffect(() => {
    if (lensDone) return;

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.65) {
        setLensActive(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lensDone]);

  const handleLensComplete = useCallback(() => {
    setLensDone(true);
    setLensActive(false);
  }, []);

  return (
    <>
      <HeroSection />

      <CameraLensTransition
        active={lensActive}
        onComplete={handleLensComplete}
      />

      <PortfolioWall />

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
