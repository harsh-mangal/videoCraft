import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Import your pages
import Home from "./pages/Home";
import Footer from "./components/Footer";
import InstagramSection from "./pages/IntsagramSection";
import AboutUs from "./pages/About";
import OurServices from "./pages/OurServices";
import ContactUs from "./pages/ContactUs";
import BridalPortraits from "./pages/BridalPortrate";
import PreWedding from "./pages/Pre-Wedding";
import VideoCraftsJunior from "./pages/VideoCraft";
import TalesOf from "./pages/TalesOfRomance";
import WeddingStory2 from "./pages/WeddingStory2";
import WeddingStory3 from "./pages/WeddingStory3";
import ScrollToTop from "./components/ScrollToTop";
import Gallery from "./pages/Gallary";
import ScrollToTop1 from "./components/Scroll";


const Layout = () => {
  return (
    <>
    <ScrollToTop1 />
    <ScrollToTop />
      <Navbar /> {/* Always visible */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/contact" element={<ContactUs />} />
           <Route path="/gallery" element={<Gallery />} />
          <Route path="/bridal-potraits" element={<BridalPortraits />} />
          <Route path="/pre-wedding" element={<PreWedding />} />
          <Route path="/video-craft-junion" element={<VideoCraftsJunior />} />
          <Route path="/tales-off-romance" element={<TalesOf />} />
          <Route path="/From-‘I-Do’-to Forever" element={<WeddingStory2 />} />
          <Route path="/Unforgettable-Wedding-Day" element={<WeddingStory3 />} />
        </Routes>
      </main>
      <InstagramSection />
      <Footer />
    </>
  );
};

export default Layout;
