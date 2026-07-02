import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const showcaseItems = [
    {
        id: 1,
        title: "Serenade of Silk",
        category: "Editorial / Fashion",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
        link: "/gallery/editorial",
    },
    {
        id: 2,
        title: "Whispering Waters",
        category: "Landscape / Fine Art",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
        link: "/gallery/fine-art",
    },
    {
        id: 3,
        title: "The Golden Hour Bond",
        category: "Portraits / Couples",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
        link: "/gallery/portraits",
    },
];

export default function PhotographyShowcase() {
    return (
        <section className="relative w-full bg-bgpx-12 py-10 lg:px-16 z-10">
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <div className="mb-16 flex flex-col items-start justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end">
                    <div>
                        <span className="text-xs uppercase tracking-[0.3em] text-text-muted block mb-3">
                            Selected Works
                        </span>
                        <h2 className="font-serif text-3xl font-light uppercase tracking-[0.15em] sm:text-4xl md:text-5xl">
                            Featured <span className="font-semibold">Portfolios</span>
                        </h2>
                    </div>

                    <Link
                        to="/gallery"
                        className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                    >
                        <span>View All Collections</span>
                        <FiArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>

                {/* 3-Card Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {showcaseItems.map(({ id, title, category, image, link }) => (
                        <Link
                            key={id}
                            to={link}
                            className="group relative block aspect-3/4 w-full overflow-hidden bg-card border border-border shadow-sm"
                        >

                            {/* Image Layer with Zoom Hover */}
                            <div className="absolute inset-0 h-full w-full overflow-hidden">
                                <img
                                    src={image}
                                    alt={title}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-105"
                                />
                            </div>

                            {/* Ambient Overlay Vignette */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                            {/* Card Meta Content Info */}
                            <div className="absolute bottom-0 inset-x-0 p-6 z-20 flex flex-col justify-end translate-y-2 transition-transform duration-500 group-hover:translate-y-0">

                                <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-2 block">
                                    {category}
                                </span>

                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="font-serif text-xl font-medium tracking-wide text-white sm:text-2xl">
                                        {title}
                                    </h3>

                                    {/* Minimal Circular Arrow Tag */}
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white opacity-0 transition-all duration-500 transform scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-white group-hover:text-black">
                                        <FiArrowUpRight size={18} />
                                    </div>
                                </div>

                            </div>

                            {/* Micro Tech Frame Lines (Photography Asset Theme) */}
                            <div className="absolute inset-4 pointer-events-none border border-white/0 transition-colors duration-500 group-hover:border-white/10" />

                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}