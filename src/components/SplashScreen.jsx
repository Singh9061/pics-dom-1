import React, { useEffect, useState } from "react";

export default function SplashScreen({ onFinish, duration = 2200 }) {
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        // Trigger fade-out transition slightly before complete unmount
        const fadeTimer = setTimeout(() => {
            setIsFadingOut(true);
        }, duration - 600);

        // Complete the splash lifecycle
        const finishTimer = setTimeout(() => {
            onFinish();
        }, duration);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(finishTimer);
        };
    }, [duration, onFinish]);

    return (
        <div
            className={`fixed inset-0 z-10000 flex flex-col items-center justify-center bg-black transition-all duration-700 ease-out ${isFadingOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
                }`}
        >
            {/* Ambient Background Glow */}
            <div className="absolute h-64 w-64 rounded-full bg-gold/10 blur-3xl pointer-events-none animate-pulse" />

            {/* Editorial Brand Mark & Animation */}
            <div className="relative z-10 flex flex-col items-center space-y-6 text-center px-4">
                <span className="font-serif text-xs uppercase tracking-[0.4em] text-gold/80 animate-fade-in">
                    The Archive Collection
                </span>

                <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-widest text-white uppercase">
                    Visual Stories
                </h1>

                <div className="h-px w-16 bg-linear-to-r from-transparent via-gold/60 to-transparent my-2" />

                {/* Minimalist Spinner / Progress Bar */}
                <div className="h-0.5 w-24 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-full bg-gold origin-left animate-[splashProgress_2s_ease-in-out_infinite]" />
                </div>
            </div>
        </div>
    );
}