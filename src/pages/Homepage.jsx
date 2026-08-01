import { lazy, Suspense, useEffect } from "react";
import HeroSection from "../pageComponents/homepage/Herosection";

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
      <HeroSection />

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
