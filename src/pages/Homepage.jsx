import { lazy, Suspense, useEffect } from "react";
import ThroughTheLensHero from "../pageComponents/homepage/ThroughTheLensHero";
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

/**
 * Homepage — cinematic 3D entry → spatial wall → editorial sections
 */
export default function Homepage() {
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

  return (
    <>
      {/* 1. Immersive 3D — Through the Lens */}
      <ThroughTheLensHero />

      {/* 2. Interactive spatial portfolio wall */}
      <PortfolioWall />

      {/* 3. Editorial storytelling blocks */}
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
