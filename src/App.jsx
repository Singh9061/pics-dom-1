import { lazy, Suspense, useState } from "react";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import Base from "./components/Base";
import ScrollToTop from "./components/ScrollToTop";
import SplashScreen from "./components/SplashScreen";

const Homepage = lazy(() => import("./pages/Homepage"));
const About = lazy(() => import("./pages/About"));
const ContactSection = lazy(() => import("./pages/ContactSection"));
const GridGallery = lazy(() => import("./pages/Gallery"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
  </div>
);

function AppRoutes() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(() => {
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
      {showSplash && location.pathname === "/" && (
        <SplashScreen onFinish={handleSplashFinish} duration={4200} />
      )}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Base />}>
            <Route index element={<Homepage />} />
            <Route path="about" element={<About />} />
            <Route path="gallery" element={<GridGallery />} />
            <Route path="contact" element={<ContactSection />} />
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
