import React from "react";
import Tilt3D from "../../components/Tilt3D";

export default function GalleryCard({ item, index, isWideFeature, onSelect }) {
  const src = item.thumbAvif || item.img;

  return (
    <div
      className={`${isWideFeature ? "sm:col-span-2" : ""}`}
      style={{ perspective: "1000px" }}
    >
      <Tilt3D max={10} scale={1.03}>
        <button
          type="button"
          onClick={() => onSelect(index)}
          className="group relative block w-full overflow-hidden bg-surface text-left shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
          style={{ aspectRatio: isWideFeature ? "16/10" : "3/4" }}
        >
          <img
            src={src}
            alt={item.title || "Gallery"}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            {item.tag && (
              <span className="mb-1 block text-[10px] uppercase tracking-[0.25em] text-gold">
                {item.tag}
              </span>
            )}
            {item.title && (
              <span className="font-serif text-lg font-light text-white">
                {item.title}
              </span>
            )}
          </div>
        </button>
      </Tilt3D>
    </div>
  );
}
