import { lazy, Suspense, useState, useEffect } from "react";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import Base from "./components/Base";
import ScrollToTop from "./components/ScrollToTop";
import SplashScreen from "./components/SplashScreen";

const Homepage = lazy(() => import("./pages/Homepage"));
const About = lazy(() => import("./pages/About"));
const ContactSection = lazy(() => import("./pages/ContactSection"));
const GridGallery = lazy(() => import("./pages/Gallery"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Global fallback for lazy loading components
const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
  </div>
);

// Router Content Wrapper to access `useLocation` hook
function AppRoutes() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(() => {
    // Check if user is entering on home page AND hasn't seen splash this session
    const isHome = location.pathname === "/";
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    return isHome && !hasSeenSplash;
  });

  const handleSplashFinish = () => {
    sessionStorage.setItem("hasSeenSplash", "true");
    setShowSplash(false);
  };

  return (
    <>
      {/* Renders splash overlay strictly on the root route */}
      {showSplash && location.pathname === "/" && (
        <SplashScreen onFinish={handleSplashFinish} duration={2200} />
      )}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Base />}>
            <Route index element={<Homepage />} />
            <Route path="about" element={<About />} />
            <Route path="gallery" element={<GridGallery />} />
            <Route path="contact" element={<ContactSection />} />

            {/* Catch-all 404 Route handling */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}