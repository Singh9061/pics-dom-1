import React, { useEffect, useState, useCallback, useMemo, lazy, Suspense } from "react";
import GalleryCard from "../pageComponents/gallery/GalleryCard";
import { MASTER_GALLERY_ARCHIVE, TABS } from "../data/galleryData";

// Code-split modal chunk for optimal initial page load
const GalleryModal = lazy(() => import("../pageComponents/gallery/GalleryModal"));

export default function GridGallery() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [selectedTag, setSelectedTag] = useState("all");
    const [mounted, setMounted] = useState(false);

    // Initial mount frame sync for entrance animation
    useEffect(() => {
        const frame = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    // Memoize gallery filtering based on active tag
    const filteredGallery = useMemo(() => {
        if (selectedTag === "all") return MASTER_GALLERY_ARCHIVE;
        return MASTER_GALLERY_ARCHIVE.filter((item) => item.tag === selectedTag);
    }, [selectedTag]);

    const handleSelectImage = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev !== null ? (prev + 1) % filteredGallery.length : null));
    }, [filteredGallery.length]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev !== null ? (prev - 1 + filteredGallery.length) % filteredGallery.length : null));
    }, [filteredGallery.length]);

    const handleClose = useCallback(() => {
        setActiveIndex(null);
    }, []);

    const handleTabChange = useCallback((id) => {
        setSelectedTag(id);
        setActiveIndex(null);
    }, []);

    // Global keyboard listener bound only when modal is open
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

    // Prevent background scroll layout shift on modal toggle
    useEffect(() => {
        if (activeIndex === null) return;

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, [activeIndex]);

    // Safely map active modal image to handle both high-res AVIF & simple imports
    const activeModalImage = useMemo(() => {
        if (activeIndex === null) return null;
        const currentItem = filteredGallery[activeIndex];
        if (!currentItem) return null;

        return {
            ...currentItem,
            img: currentItem.fullAvif || currentItem.thumbAvif || currentItem.img
        };
    }, [activeIndex, filteredGallery]);

    return (
        <div className="relative w-full bg-bg text-text px-4 py-24 sm:px-8 md:px-12 lg:px-16 select-none overflow-hidden transition-colors duration-300">
            {/* Curated Editorial Header */}
            <div className="mx-auto max-w-7xl text-center mb-20 space-y-4">
                <span className="font-serif text-xs uppercase tracking-[0.3em] text-gold block">
                    Visual Love Stories
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-text">
                    The Curated Wedding Archives
                </h2>
                <div className="h-px w-24 bg-linear-to-r from-transparent via-gold/40 to-transparent mx-auto mt-4" />

                {/* Navigation Tabs */}
                <div className="flex justify-center items-center gap-3 pt-6 flex-wrap">
                    {TABS.map((tab) => {
                        const isActive = selectedTag === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`px-6 py-2 text-[11px] font-serif uppercase tracking-widest transition-all duration-300 border rounded-full cursor-pointer ${isActive
                                        ? "bg-gold/10 border-gold text-gold shadow-[0_4px_12px_rgba(197,168,128,0.15)]"
                                        : "bg-transparent border-border text-text-muted hover:border-gold/40 hover:text-text"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Asymmetric Photo Layout Grid */}
            <div className="mx-auto max-w-7xl">
                <div
                    className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-all duration-1000 ease-out will-change-transform ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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

            {/* Code-split Lightbox Modal with Suspense fallback */}
            {activeIndex !== null && (
                <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md" />}>
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