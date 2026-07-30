import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function GalleryModal({
    activeImage,
    onClose,
    onNext,
    onPrev,
    hasMultiple
}) {
    const [highResLoaded, setHighResLoaded] = useState(false);

    useEffect(() => {
        if (activeImage) setHighResLoaded(false);
    }, [activeImage]);

    if (!activeImage) return null;

    const modalContent = (
        <div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 transition-opacity duration-300 ease-in-out"
            onClick={onClose}
        >
            {/* Structural Close Action Layer */}
            <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-end px-6 z-10000 pointer-events-none">
                <button
                    onClick={onClose}
                    className="p-2.5 text-white/60 hover:text-white transition-colors border border-white/10 bg-white/5 rounded-full backdrop-blur-md cursor-pointer pointer-events-auto"
                    aria-label="Close Lightbox"
                >
                    <FiX size={20} />
                </button>
            </div>

            {/* Previous Arrow Button */}
            {hasMultiple && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrev();
                    }}
                    className="absolute left-4 sm:left-8 z-10000 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer"
                    aria-label="Previous image"
                >
                    <FiChevronLeft size={24} />
                </button>
            )}

            {/* Target Image Frame Content Layer */}
            <div
                className={`relative max-w-5xl max-h-[82vh] flex flex-col items-center justify-center transition-all duration-300 ease-out ${highResLoaded ? "scale-100 opacity-100" : "scale-[0.98] opacity-0"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative flex items-center justify-center overflow-hidden">
                    {/* Loading Indicator */}
                    {!highResLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
                        </div>
                    )}

                    <img
                        src={activeImage.img}
                        alt={activeImage.alt}
                        decoding="async"
                        onLoad={() => setHighResLoaded(true)}
                        className="max-w-full max-h-[78vh] w-auto h-auto object-contain border border-white/10 shadow-2xl select-none"
                    />
                </div>

                {/* Caption Layer */}
                <p className="mt-4 font-serif text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/70 text-center truncate w-full px-4">
                    {activeImage.alt}
                </p>
            </div>

            {/* Next Arrow Button */}
            {hasMultiple && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                    }}
                    className="absolute right-4 sm:right-8 z-10000 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer"
                    aria-label="Next image"
                >
                    <FiChevronRight size={24} />
                </button>
            )}
        </div>
    );

    return createPortal(modalContent, document.body);
}