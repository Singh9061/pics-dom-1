import { lazy, Suspense, useEffect } from "react";
import HeroSection from "../pageComponents/homepage/Herosection"; 
const PhotographyShowcase = lazy(() => import("../pageComponents/homepage/PhotographyShowcase"));
const AlbumCollection = lazy(() => import("../pageComponents/homepage/AlbumCollection"));
const MoreAboutSection = lazy(() => import("../pageComponents/homepage/MoreAboutSection"));

const SectionSkeleton = () => (
  <div className="w-full py-20 animate-pulse bg-bg-secondary/20 px-6">
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="h-6 w-1/4 bg-glass-border rounded" />
      <div className="h-4 w-3/4 bg-glass-border rounded opacity-60" />
      <div className="h-64 w-full bg-glass-border/40 rounded-xl mt-8" />
    </div>
  </div>
);

export default function Homepage() {
  
  useEffect(() => {
    /* ---------------- Mobile Performance Optimization ---------------- */
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      html {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
      }
      .will-change-transform {
        will-change: transform, opacity;
        transform: translate3d(0,0,0);
      }
    `;
    document.head.appendChild(styleTag);

    /* ---------------- Resource Preloading Hint ---------------- */
    const preloadTimeout = setTimeout(() => {
      const links = [
        "/src/pageComponents/homepage/PhotographyShowcase.jsx",
        "/src/pageComponents/homepage/AlbumCollection.jsx"
      ];
      links.forEach((url) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = url;
        document.head.appendChild(link);
      });
    }, 1500);

    return () => {
      document.head.removeChild(styleTag);
      clearTimeout(preloadTimeout);
    };
  }, []);

  return (
    <>
      <HeroSection />

      <Suspense fallback={<SectionSkeleton />}>
        <div className="will-change-transform">
          <PhotographyShowcase />
        </div>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <div className="will-change-transform">
          <AlbumCollection />
        </div>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <div className="will-change-transform">
          <MoreAboutSection />
        </div>
      </Suspense>
    </>
  );
}