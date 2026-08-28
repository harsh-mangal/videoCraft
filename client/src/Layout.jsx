import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageMeta from "./components/PageMeta";
import RouteErrorBoundary from "./components/RouteErrorBoundary";
import WhatsAppButton from "./components/WhatsAppButton";
import InstagramSection from "./pages/InstagramSection";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { normalizePath, routeMeta } from "./config/seo";

const pages = [
  ["/", Home],
  ["/about", lazy(() => import("./pages/About"))],
  ["/services", lazy(() => import("./pages/OurServices"))],
  ["/contact", lazy(() => import("./pages/ContactUs"))],
  ["/gallery", lazy(() => import("./pages/Gallery"))],
  ["/bridal-portraits", lazy(() => import("./pages/BridalPortraits"))],
  ["/pre-wedding", lazy(() => import("./pages/PreWedding"))],
  ["/videocrafts-junior", lazy(() => import("./pages/VideoCraftsJunior"))],
  ["/wedding-stories/tales-of-romance", lazy(() => import("./pages/TalesOfRomance"))],
  ["/wedding-stories/from-i-do-to-forever", lazy(() => import("./pages/WeddingStory2"))],
  ["/wedding-stories/unforgettable-wedding-day", lazy(() => import("./pages/WeddingStory3"))],
];

export default function Layout() {
  const location = useLocation();
  const canonicalPath = normalizePath(location.pathname);
  if (routeMeta[canonicalPath] && canonicalPath !== location.pathname) {
    return <Navigate replace to={{ ...location, pathname: canonicalPath }} />;
  }
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <ScrollToTop />
    <PageMeta />
    <Navbar />
    <main id="main-content" tabIndex={-1} className="min-h-screen">
      <RouteErrorBoundary key={location.pathname} path={location.pathname + location.search + location.hash}>
      <Suspense fallback={<p role="status" className="px-6 py-20 text-center">Loading page…</p>}>
        <Routes>
          {pages.map(([path, Component]) => <Route key={path} path={path} element={<Component />} />)}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      </RouteErrorBoundary>
    </main>
    <InstagramSection />
    <Footer />
    <WhatsAppButton />
  </>;
}
