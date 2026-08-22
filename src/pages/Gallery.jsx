import React, { useEffect, useState, useCallback, useMemo, lazy, Suspense } from "react";
import GalleryCard from "../pageComponents/gallery/GalleryCard";
import { MASTER_GALLERY_ARCHIVE, TABS } from "../data/galleryData";
import SectionField3D from "../components/three/SectionField3D";

const GalleryModal = lazy(() => import("../pageComponents/gallery/GalleryModal"));

export default function GridGallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedTag, setSelectedTag] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const filteredGallery = useMemo(() => {
    if (selectedTag === "all") return MASTER_GALLERY_ARCHIVE;
    return MASTER_GALLERY_ARCHIVE.filter((item) => item.tag === selectedTag);
  }, [selectedTag]);

  const handleSelectImage = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev !== null ? (prev + 1) % filteredGallery.length : null
    );
  }, [filteredGallery.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredGallery.length) % filteredGallery.length
        : null
    );
  }, [filteredGallery.length]);

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handleTabChange = useCallback((id) => {
    setSelectedTag(id);
    setActiveIndex(null);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, handleClose, handleNext, handlePrev]);

  useEffect(() => {
    if (activeIndex === null) return;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [activeIndex]);

  const activeModalImage = useMemo(() => {
    if (activeIndex === null) return null;
    const currentItem = filteredGallery[activeIndex];
    if (!currentItem) return null;
    return {
      ...currentItem,
      img: currentItem.fullAvif || currentItem.thumbAvif || currentItem.img,
    };
  }, [activeIndex, filteredGallery]);

  return (
    <div className="relative w-full select-none overflow-hidden bg-bg px-4 py-24 text-text transition-colors duration-300 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto mb-12 max-w-7xl space-y-4 text-center">
        <span className="block font-serif text-xs uppercase tracking-[0.3em] text-gold">
          Visual Love Stories
        </span>
        <h2 className="font-serif text-3xl font-light tracking-wide text-text sm:text-4xl md:text-5xl">
          The Curated Wedding Archives
        </h2>
        <div className="mx-auto mt-4 h-px w-24 bg-linear-to-r from-transparent via-gold/40 to-transparent" />

        <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
          {TABS.map((tab) => {
            const isActive = selectedTag === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`cursor-pointer rounded-full border px-6 py-2 font-serif text-[11px] uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? "border-gold bg-gold/10 text-gold shadow-[0_4px_12px_rgba(197,168,128,0.15)]"
                    : "border-border bg-transparent text-text-muted hover:border-gold/40 hover:text-text"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <SectionField3D height="h-[160px] md:h-[200px]" density="med" className="mb-12 -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-16" />

      <div className="mx-auto max-w-7xl">
        <div
          className={`grid grid-cols-1 gap-6 transition-all duration-1000 ease-out will-change-transform sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {filteredGallery.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              isWideFeature={index % 6 === 0}
              onSelect={handleSelectImage}
            />
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md" />
          }
        >
          <GalleryModal
            activeImage={activeModalImage}
            onClose={handleClose}
            onNext={handleNext}
            onPrev={handlePrev}
            hasMultiple={filteredGallery.length > 1}
          />
        </Suspense>
      )}
    </div>
  );
}
