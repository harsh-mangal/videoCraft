import ResponsiveImage from "../components/ResponsiveImage";
import React from "react";

const images = [
  "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/6.jpg?updatedAt=1758090684661",
  "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/2.jpg?updatedAt=1758090685030",
  "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/3.jpg?updatedAt=1758090684646",
  "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/4.jpg?updatedAt=1758090685024",
  "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/1-1.jpg?updatedAt=1758090684969",
  "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/5.jpg?updatedAt=1758090684914",
];

const InstagramSection = () => (
  <section className="bg-white px-4 py-16 text-center">
    <p className="luxury-kicker">Latest frames</p>
    <h2 className="section-heading mt-4">
      Follow us on Instagram
    </h2>
    <a href="https://www.instagram.com/videocrafts/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xl italic text-[#62625A] hover:underline" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
      @videocrafts
    </a>

    <div className="mx-auto mt-8 grid max-w-7xl grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      {images.map((image, index) => (
        <a key={image} href="https://www.instagram.com/videocrafts/" target="_blank" rel="noopener noreferrer" aria-label={`View Videocrafts India on Instagram, photograph ${index + 1}`} className="group overflow-hidden rounded-sm focus:outline-none focus:ring-2 focus:ring-[#4D504A]">
          <ResponsiveImage src={image} alt={`Videocrafts India Instagram photograph ${index + 1}`} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
        </a>
      ))}
    </div>
  </section>
);

export default InstagramSection;
