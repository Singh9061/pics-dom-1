import { Link } from "react-router-dom";
import { FiFolder, FiArrowRight } from "react-icons/fi";

const albums = [
  {
    id: "editorial-2026",
    title: "Vogue & Velvet",
    count: "24 Photographs",
    year: "2026",
    coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
    link: "/albums/vogue-and-velvet",
  },
  {
    id: "archival-nature",
    title: "Silent Monoliths",
    count: "18 Photographs",
    year: "2025",
    coverImage: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1000&auto=format&fit=crop",
    link: "/albums/silent-monoliths",
  },
];

export default function AlbumCollection() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-16 z-10 border-t border-border">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-text-muted block mb-3">
            Printed & Digital Archives
          </span>
          <h2 className="font-serif text-3xl font-light uppercase tracking-[0.15em] sm:text-4xl md:text-5xl">
            Album <span className="font-semibold">Collections</span>
          </h2>
        </div>

        {/* Landscape Album Row Layout */}
        <div className="flex flex-col gap-12">
          {albums.map(({ id, title, count, year, coverImage, link }) => (
            <div 
              key={id}
              className="group flex flex-col gap-8 border-b border-border pb-12 last:border-0 last:pb-0 md:flex-row md:items-center"
            >
              
              {/* 1. Interactive Album Spine Cover Art */}
              <Link 
                to={link}
                className="relative aspect-16/10 w-full overflow-hidden bg-card md:w-100 lg:w-125 shrink-0 border border-border shadow-md"
              >
                <img 
                  src={coverImage} 
                  alt={title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-102"
                />
                
                {/* Book Jacket Glassmorphism Spine Edge Shadow */}
                <div className="absolute top-0 left-0 h-full w-4 bg-linear-to-r from-black/20 via-black/5 to-transparent shadow-[inset_1px_0_0_rgba(255,255,255,0.1)]" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              </Link>

              {/* 2. Album Detailed Metadata */}
              <div className="flex flex-1 flex-col justify-between py-2">
                <div>
                  <div className="flex items-center gap-4 text-xs tracking-widest text-text-muted uppercase mb-3">
                    <span className="flex items-center gap-1.5">
                      <FiFolder size={12} />
                      {count}
                    </span>
                    <span>&bull;</span>
                    <span>{year} Edition</span>
                  </div>

                  <h3 className="font-serif text-2xl font-light tracking-wide md:text-3xl lg:text-4xl transition-colors duration-300 group-hover:text-text-muted">
                    {title}
                  </h3>
                </div>

                {/* Inline Action Button */}
                <div className="mt-8 md:mt-12">
                  <Link
                    to={link}
                    className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] group/btn"
                  >
                    <span>Open Archive</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:border-text">
                      <FiArrowRight size={14} />
                    </div>
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}