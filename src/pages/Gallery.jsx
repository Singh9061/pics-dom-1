import { useEffect, useState, useCallback, useMemo } from "react";
import { FiMaximize2 } from "react-icons/fi";
import GalleryModal from "../pageComponents/gallery/GalleryModal";

// Client 1 Imports
import {
    c1_pic1, c1_pic2, c1_pic3, c1_pic4, c1_pic5,
    c1_pic6, c1_pic7, c1_pic8, c1_pic9, c1_pic10
} from '../Assets/picture/client1';

// Client 2 Imports
import {
    c2_pic1, c2_pic2, c2_pic3, c2_pic4, c2_pic5,
    c2_pic6, c2_pic7, c2_pic8, c2_pic9, c2_pic10,
    c2_pic11, c2_pic12
} from '../Assets/picture/client2';

const masterGalleryArchive = [
    { id: "c1-1", img: c1_pic1, tag: "client1", alt: "Sacred Luxury Wedding Archive Frame" },
    { id: "c2-1", img: c2_pic1, tag: "client2", alt: "Heritage Palace Celebration" },
    { id: "c1-2", img: c1_pic2, tag: "client1", alt: "Fine-Art Bridal Portrait" },
    { id: "c2-2", img: c2_pic2, tag: "client2", alt: "Grand High-Motion Baraat" },
    { id: "c1-3", img: c1_pic3, tag: "client1", alt: "Traditional Ritual Moments" },
    { id: "c2-3", img: c2_pic3, tag: "client2", alt: "Royal Shadi Festivities" },
    { id: "c1-4", img: c1_pic4, tag: "client1", alt: "Intimate Cinematic Glance" },
    { id: "c2-4", img: c2_pic4, tag: "client2", alt: "Luxury Destination Reception" },
    { id: "c1-5", img: c1_pic5, tag: "client1", alt: "Detailed Heirloom Archive" },
    { id: "c2-5", img: c2_pic5, tag: "client2", alt: "Elegant Jharokha Framing" },
    { id: "c1-6", img: c1_pic6, tag: "client1", alt: "Emotional Vow Exchange" },
    { id: "c2-6", img: c2_pic6, tag: "client2", alt: "Grand Entrance Narrative" },
    { id: "c1-7", img: c1_pic7, tag: "client1", alt: "Classic Monochrome Story" },
    { id: "c2-7", img: c2_pic7, tag: "client2", alt: "Bespoke Bridal Dressing Details" },
    { id: "c1-8", img: c1_pic8, tag: "client1", alt: "Candid Joyous Reception" },
    { id: "c2-8", img: c2_pic8, tag: "client2", alt: "The Champagne Sangeet Beats" },
    { id: "c1-9", img: c1_pic9, tag: "client1", alt: "Twilight Celebration Layout" },
    { id: "c2-9", img: c2_pic9, tag: "client2", alt: "Vibrant Mandap Aesthetics" },
    { id: "c1-10", img: c1_pic10, tag: "client1", alt: "The Crimson Sindoor Ritual" },
    { id: "c2-10", img: c2_pic10, tag: "client2", alt: "Midnight Heritage Pheras" },
    { id: "c2-11", img: c2_pic11, tag: "client2", alt: "Luxury Visual Legacy Story" },
    { id: "c2-12", img: c2_pic12, tag: "client2", alt: "Bespoke Fine-Art Masterpiece" }
];

export default function GridGallery() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [selectedTag, setSelectedTag] = useState("all");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    const filteredGallery = useMemo(() => {
        if (selectedTag === "all") return masterGalleryArchive;
        return masterGalleryArchive.filter(item => item.tag === selectedTag);
    }, [selectedTag]);

    const handleNext = useCallback(() => {
        if (activeIndex !== null) {
            setActiveIndex((prev) => (prev + 1) % filteredGallery.length);
        }
    }, [activeIndex, filteredGallery]);

    const handlePrev = useCallback(() => {
        if (activeIndex !== null) {
            setActiveIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
        }
    }, [activeIndex, filteredGallery]);

    const handleClose = useCallback(() => {
        setActiveIndex(null);
    }, []);

    useEffect(() => {
        if (activeIndex === null) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") handleClose();
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeIndex, handleNext, handlePrev, handleClose]);

    useEffect(() => {
        if (activeIndex !== null) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, [activeIndex]);

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

                {/* Modern Navigation Tabs with Custom Theme Var Tokens */}
                <div className="flex justify-center items-center gap-3 pt-6 flex-wrap">
                    {[
                        { id: "all", label: "All Stories" },
                        { id: "client1", label: "The Royal Union" },
                        { id: "client2", label: "Palace Heritage" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setSelectedTag(tab.id);
                                setActiveIndex(null);
                            }}
                            className={`px-6 py-2 text-[11px] font-serif uppercase tracking-widest transition-all duration-300 border rounded-full cursor-pointer ${selectedTag === tab.id
                                    ? "bg-gold/10 border-gold text-gold shadow-[0_4px_12px_rgba(197,168,128,0.15)]"
                                    : "bg-transparent border-border text-text-muted hover:border-gold/40 hover:text-text"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Asymmetric Editorial Photo Layout Grid */}
            <div className="mx-auto max-w-7xl">
                <div
                    className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-all duration-1000 ease-out will-change-transform ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    {filteredGallery.map(({ id, img, alt }, index) => {
                        // Every 6th photo acts as a cinematic wide feature panel
                        const isWideFeature = index % 6 === 0;

                        return (
                            <div
                                key={id}
                                onClick={() => setActiveIndex(index)}
                                className={`group relative w-full overflow-hidden border border-border bg-card cursor-zoom-in shadow-card transition-all duration-500 ease-out hover:border-gold/60 rounded-var(--radius)`}
                                style={{
                                    gridColumn: isWideFeature ? "span 2" : "auto",
                                    aspectRatio: isWideFeature ? "16/10" : "4/5"
                                }}
                            >
                                {/* Inner framing accent border */}
                                <div className="absolute inset-0 border border-white/20 pointer-events-none z-10 transition-colors duration-500 group-hover:border-gold/30 rounded-var(--radius)" />

                                <img
                                    src={img}
                                    alt={alt}
                                    loading={index < 4 ? "eager" : "lazy"}
                                    fetchPriority={index < 4 ? "high" : "auto"}
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] brightness-[0.97] group-hover:brightness-100"
                                />

                                {/* Pure Luxury Dark Gradient Veil Overlay - Smooth contrast backdrop for typography */}
                                <div className="absolute inset-0 bg-linear-to-t from-text/90 via-text/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-6 z-20">
                                    <div className="flex items-end justify-between text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <div className="space-y-1 max-w-[85%]">
                                            <span className="font-serif text-[10px] uppercase tracking-widest text-gold block">
                                                Chapter {index + 1}
                                            </span>
                                            <p className="font-serif text-xs sm:text-sm tracking-wide font-light truncate text-neutral-100">
                                                {alt}
                                            </p>
                                        </div>
                                        {/* Styled micro glass capsule for maximize button */}
                                        <div className="p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/10 text-white shrink-0 ml-4 shadow-lg transition-transform duration-300 hover:scale-110">
                                            <FiMaximize2 size={12} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <GalleryModal
                activeImage={activeIndex !== null ? filteredGallery[activeIndex] : null}
                onClose={handleClose}
                onNext={handleNext}
                onPrev={handlePrev}
                hasMultiple={filteredGallery.length > 1}
            />
        </div>
    );
}