import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiCamera } from "react-icons/fi";
import { herosection_video } from "../../Assets/video";

export default function HeroSection() {
    const videoRef = useRef(null);

    useEffect(() => {
        // Ensuring background media plays reliably across strict mobile low-battery and power-saving profiles
        if (videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.log("Auto-play was speculatively deferred by browser power settings:", error);
            });
        }
    }, []);

    return (
        <section className="relative flex h-screen w-full items-end justify-center overflow-hidden bg-black pb-28 md:pb-36 transform-gpu">

            {/* 1. Background Video Layer - Optimized Resource Preloading Structure */}
            <div className="absolute inset-0 z-0 select-none overflow-hidden will-change-transform">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    /* 
                       Pro-tip: Replace this Unsplash link with a real, high-quality compressed 
                       static cover image of your actual hero video frame to eliminate the black flash!
                    */
                    poster="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=60"
                    className="h-full w-full object-cover opacity-85 scale-102 transition-opacity duration-700 ease-out"
                    src={herosection_video}
                />
            </div>

            {/* 2. Cinematic Matte Overlay - Very Subtle Darken & Micro-Blur */}
            <div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-[1px]" />

            {/* 3. Camera Viewfinder Overlay Graphic */}
            <div className="pointer-events-none absolute inset-8 z-20 border border-white/10 md:inset-16">
                {/* Top-Left Corner */}
                <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-white/60" />
                {/* Top-Right Corner */}
                <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-white/60" />
                {/* Bottom-Left Corner */}
                <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-white/60" />
                {/* Bottom-Right Corner */}
                <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-white/60" />

                {/* Micro Shutter Info Label */}
                <div className="absolute bottom-4 left-4 hidden text-[10px] uppercase tracking-widest text-white/50 sm:block">
                    HERITAGE ARCHIVE &bull; 60FPS &bull; 4K
                </div>
            </div>

            {/* 4. Foreground Content */}
            <div className="relative z-30 mx-auto max-w-5xl px-6 text-center text-white">

                {/* Small Tagline */}
                <div className="mb-5 flex items-center justify-center gap-2.5 text-xs uppercase tracking-[0.3em] text-white/80 md:text-sm">
                    <FiCamera className="animate-pulse text-gold" size={14} />
                    <span className="tracking-[0.25em]">Luxury Wedding & Heritage Photography</span>
                </div>

                {/* Cinematic Header Typography */}
                <h1 className="font-serif text-4xl font-light uppercase tracking-[0.2em] sm:text-5xl md:text-7xl leading-tight text-white">
                    Archiving <br className="sm:hidden" /> Timeless <br />
                    <span className="font-semibold tracking-[0.15em] italic text-gold">Legacies</span>
                </h1>

                {/* Subtitle Paragraph */}
                <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 tracking-wide text-white/90 font-light md:mt-6">
                    Where the grandeur of sacred traditions meets raw emotion. <br className="hidden md:inline" />
                    Documenting royal palace unions, intimate elopements, and luxury celebrations worldwide.
                </p>

                {/* Action Callouts */}
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-10">
                    {/* Primary Solid Gold Button */}
                    <Link
                        to="/gallery"
                        className="group relative flex h-12 items-center justify-center bg-gold px-8 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-gold-hover w-56 sm:w-auto shadow-lg shadow-black/30"
                    >
                        View Love Stories
                    </Link>

                    {/* Secondary Outlined Pure White Glass Button */}
                    <Link
                        to="/contact"
                        className="flex h-12 items-center justify-center border border-white/30 bg-white/10 px-8 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/20 text-white w-56 sm:w-auto shadow-xs"
                    >
                        Reserve Date
                    </Link>
                </div>

            </div>

            {/* 5. Elegant Scroll Down Prompt */}
            <div className="absolute bottom-6 z-30 flex animate-bounce flex-col items-center gap-1 text-white/50">
                <FiChevronDown size={14} />
            </div>

        </section>
    );
}