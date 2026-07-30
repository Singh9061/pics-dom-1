import React, { memo } from "react";
import { FiMaximize2 } from "react-icons/fi";

const GalleryCard = memo(function GalleryCard({ item, index, isWideFeature, onSelect }) {
    const isPriority = index < 2;

    return (
        <article
            onClick={() => onSelect(index)}
            className={`
                group
                relative
                w-full
                overflow-hidden
                cursor-zoom-in
                border
                border-border
                bg-card
                shadow-card
                rounded-(--radius)
                transition-colors
                duration-300
                hover:border-gold/60
                [content-visibility:auto]
                [contain-intrinsic-size:420px]
                ${isWideFeature
                    ? "sm:col-span-2 aspect-16/10"
                    : "col-span-1 aspect-4/5"
                }
            `}
        >
            {/* Decorative Inner Accent Frame */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-10
                    rounded-(--radius)
                    border
                    border-white/20
                    transition-colors
                    duration-300
                    group-hover:border-gold/30
                "
            />

            {/* Direct High-Quality Image Loading */}
            <img
                src={item.img}
                alt={item.alt}
                loading={isPriority ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
                decoding="async"
                draggable={false}
                className="
                    h-full
                    w-full
                    select-none
                    object-cover
                    transform-gpu
                    transition-transform
                    duration-500
                    ease-[cubic-bezier(.22,.61,.36,1)]
                    group-hover:scale-[1.03]
                    brightness-[0.97]
                    group-hover:brightness-100
                "
            />

            {/* Dark Editorial Overlay */}
            <div
                className="
                    absolute
                    inset-0
                    z-20
                    flex
                    flex-col
                    justify-end
                    bg-linear-to-t
                    from-black/85
                    via-black/20
                    to-transparent
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                "
            >
                <div
                    className="
                        flex
                        items-end
                        justify-between
                        p-6
                        text-white
                    "
                >
                    <div className="max-w-[85%] space-y-1">
                        <span
                            className="
                                block
                                font-serif
                                text-[10px]
                                uppercase
                                tracking-[0.25em]
                                text-gold
                            "
                        >
                            Chapter {index + 1}
                        </span>

                        <p
                            className="
                                truncate
                                font-serif
                                text-xs
                                font-light
                                tracking-wide
                                text-neutral-100
                                sm:text-sm
                            "
                        >
                            {item.alt}
                        </p>
                    </div>

                    <div
                        className="
                            ml-4
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/15
                            bg-white/10
                            text-white
                            backdrop-blur-sm
                            transition-transform
                            duration-300
                            group-hover:scale-110
                        "
                    >
                        <FiMaximize2 size={14} />
                    </div>
                </div>
            </div>
        </article>
    );
});

GalleryCard.displayName = "GalleryCard";

export default GalleryCard;