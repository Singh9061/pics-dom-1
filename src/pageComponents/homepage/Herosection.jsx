import { Link } from "react-router-dom";
import { FiChevronDown, FiCamera } from "react-icons/fi";

export default function HeroSection() {
    return (
        <section className="relative flex h-[calc(100vh-5rem)] min-h-150 w-full items-center justify-center overflow-hidden">

            {/* 1. Background Video Layer */}
            <div className="absolute inset-0 z-0 select-none overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover opacity-80"
                    src="https://www.pexels.com/download/video/38264084/" // Replace with your production cinematic asset path
                />
            </div>

            {/* 2. Cinematic Soft Blur Backdrop & Dark Vignette */}
            {/* This layer gives the video that high-end, premium shallow-depth-of-field glass blur */}
            <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-[3px]" />
            <div className="absolute inset-0 z-10 bg-linear-to-t from-bg via-transparent to-black/40" />

            {/* 3. Camera Viewfinder Overlay Graphic */}
            <div className="pointer-events-none absolute inset-10 z-20 border border-white/5 md:inset-16">
                {/* Top-Left Corner */}
                <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-white/20" />
                {/* Top-Right Corner */}
                <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-white/20" />
                {/* Bottom-Left Corner */}
                <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-white/20" />
                {/* Bottom-Right Corner */}
                <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-white/20" />

                {/* Micro Shutter Info Label */}
                <div className="absolute bottom-4 left-4 hidden text-[10px] uppercase tracking-widest text-white/30 sm:block">
                    RAW &bull; 60FPS &bull; 4K
                </div>
            </div>

            {/* 4. Foreground Content */}
            <div className="relative z-30 mx-auto max-w-5xl px-6 text-center text-white">

                {/* Small Tagline */}
                <div className="mb-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-white/80 md:text-sm">
                    <FiCamera className="animate-pulse" size={14} />
                    <span>Fine Art Photography Studio</span>
                </div>

                {/* Cinematic Header Typography */}
                <h1 className="font-serif text-4xl font-light uppercase tracking-[0.2em] sm:text-5xl md:text-7xl leading-tight drop-shadow-sm">
                    Capturing <br className="sm:hidden" /> Timeless <br />
                    <span className="font-semibold tracking-[0.15em] opacity-90">Moments</span>
                </h1>

                {/* Subtitle Paragraph */}
                <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed tracking-wider text-white/70 sm:text-base md:mt-8">
                    Where every shutter click tells a story and every photograph becomes art.
                    Specializing in premium portraits, editorial, and cinematic event visuals.
                </p>

                {/* Action Callouts */}
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-12">
                    <Link
                        to="/gallery"
                        className="group relative flex h-12 items-center justify-center overflow-hidden border border-white bg-white px-8 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-white w-56 sm:w-auto"
                    >
                        Explore Gallery
                    </Link>

                    <Link
                        to="/contact"
                        className="flex h-12 items-center justify-center border border-white/30 bg-black/20 px-8 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-black/40 w-56 sm:w-auto"
                    >
                        Book Session
                    </Link>
                </div>

            </div>

            {/* 5. Elegant Scroll Down Prompt */}
            <div className="absolute bottom-8 z-30 flex animate-bounce flex-col items-center gap-1 text-white/40">
                <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
                <FiChevronDown size={16} />
            </div>

        </section>
    );
}