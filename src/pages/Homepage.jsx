import { lazy, Suspense, useEffect, useState, useCallback, useRef } from "react";
import HeroSection from "../pageComponents/homepage/Herosection";
import CameraLensTransition from "../pageComponents/homepage/CameraLensTransition";

// Heavy WebGL wall — load only when approaching viewport
const PortfolioWall = lazy(() =>
  import("../pageComponents/homepage/PortfolioWall")
);

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

const WallPlaceholder = () => (
  <div className="relative h-[100vh] min-h-[640px] w-full bg-black" aria-hidden />
);

export default function Homepage() {
  const [lensActive, setLensActive] = useState(false);
  const [lensDone, setLensDone] = useState(false);
  const [mountWall, setMountWall] = useState(false);
  const wallSentinelRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  // Lens transition once past hero
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

  // Defer WebGL PortfolioWall until near viewport
  useEffect(() => {
    const el = wallSentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setMountWall(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMountWall(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

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

      <div ref={wallSentinelRef}>
        {mountWall ? (
          <Suspense fallback={<WallPlaceholder />}>
            <PortfolioWall />
          </Suspense>
        ) : (
          <WallPlaceholder />
        )}
      </div>

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
