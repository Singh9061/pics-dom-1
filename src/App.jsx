import { lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import Base from "./components/Base";
import ScrollToTop from "./components/ScrollToTop";

const Homepage = lazy(() => import("./pages/Homepage")); 
const About = lazy(() => import("./pages/About"));
const ContactSection = lazy(() => import("./pages/ContactSection"));
const GridGallery = lazy(() => import("./pages/Gallery")); 

// A clean, global full-screen transition fallback layout
const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
  </div>
);

// Minimal, elegant 404 view matching your studio design guidelines
const NotFound = () => (
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
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      
      {/* 
        The entire routing grid is wrapped in Suspense. 
        As the user switches routes, only the required tiny chunk is downloaded dynamically.
      */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Base />}>
            <Route index element={<Homepage />} />
            <Route path="about" element={<About />} />
            <Route path="gallery" element={<GridGallery />} />
            <Route path="contact" element={<ContactSection />} />
            
            {/* Catch-all 404 Route handling (Prevents unexpected blank structural views) */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;