export default function NotFound() {
    return (
        <>
            <section className="relative flex min-h-[85vh] flex-col items-center justify-center bg-bg px-6 text-center transform-gpu">
                <div className="max-w-xl">
                    <span className="text-xs uppercase tracking-[0.4em] text-gold block mb-4">
                        Error 404
                    </span>
                    <h1 className="font-serif text-4xl font-light uppercase tracking-widest sm:text-5xl text-text mb-6">
                        Frame <span className="font-semibold italic text-gold">Not Found</span>
                    </h1>
                    <p className="text-sm leading-7 text-text-muted max-w-sm mx-auto mb-10 tracking-wide font-light">
                        The memory or archive link you are attempting to view has either been moved, mispelled, or re-developed.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center border border-gold/40 bg-transparent hover:bg-gold hover:text-white px-8 h-12 text-xs font-semibold uppercase tracking-[0.2em] text-text transition-all duration-300"
                    >
                        Return to Archives
                    </Link>
                </div>
            </section>
        </>
    )
}