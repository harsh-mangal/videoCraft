import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/banner.jpg?updatedAt=1758019513834')",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 flex flex-col items-center justify-center h-full text-center text-white">
        {/* Logo */}
        <img
          src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/logo__1_-removebg-preview.png?updatedAt=1758019179068"
          alt="Video Crafts Logo"
          className="mx-auto h-20 sm:h-24 md:h-32 lg:h-40 mb-4"
        />

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 500,
            fontStyle: "italic",
            fontVariant: "normal",
            fontKerning: "auto",
            fontOpticalSizing: "auto",
            fontStretch: "100%",
            textTransform: "none",
            textDecoration: "none",
            textAlign: "center",
            color: "#FFFFFF",
          }}
        >
          Crafting timeless visuals of your story
        </p>

        {/* Button */}
        <Link
          to="/about"
          className="inline-block px-5 py-2 sm:px-6 sm:py-3 border border-white rounded hover:bg-white hover:text-black transition-colors text-sm sm:text-base md:text-lg"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Banner;
