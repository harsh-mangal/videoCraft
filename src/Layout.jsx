import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageMeta from "./components/PageMeta";
import InstagramSection from "./pages/InstagramSection";
import Home from "./pages/Home";
import AboutUs from "./pages/About";
import OurServices from "./pages/OurServices";
import ContactUs from "./pages/ContactUs";
import BridalPortraits from "./pages/BridalPortraits";
import PreWedding from "./pages/PreWedding";
import VideoCraftsJunior from "./pages/VideoCraftsJunior";
import TalesOf from "./pages/TalesOfRomance";
import WeddingStory2 from "./pages/WeddingStory2";
import WeddingStory3 from "./pages/WeddingStory3";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

const Layout = () => (
  <>
    <ScrollToTop />
    <PageMeta />
    <Navbar />
    <main className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<OurServices />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/bridal-portraits" element={<BridalPortraits />} />
        <Route path="/pre-wedding" element={<PreWedding />} />
        <Route path="/videocrafts-junior" element={<VideoCraftsJunior />} />
        <Route path="/wedding-stories/tales-of-romance" element={<TalesOf />} />
        <Route path="/wedding-stories/from-i-do-to-forever" element={<WeddingStory2 />} />
        <Route path="/wedding-stories/unforgettable-wedding-day" element={<WeddingStory3 />} />

        {/* Backward-compatible redirects for previously published URLs. */}
        <Route path="/bridal-potraits" element={<Navigate replace to="/bridal-portraits" />} />
        <Route path="/video-craft-junion" element={<Navigate replace to="/videocrafts-junior" />} />
        <Route path="/tales-off-romance" element={<Navigate replace to="/wedding-stories/tales-of-romance" />} />
        <Route path="/From-‘I-Do’-to Forever" element={<Navigate replace to="/wedding-stories/from-i-do-to-forever" />} />
        <Route path="/From-‘I-Do’-to%20Forever" element={<Navigate replace to="/wedding-stories/from-i-do-to-forever" />} />
        <Route path="/Unforgettable-Wedding-Day" element={<Navigate replace to="/wedding-stories/unforgettable-wedding-day" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <InstagramSection />
    <Footer />
  </>
);

export default Layout;
