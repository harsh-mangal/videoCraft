import ResponsiveImage from "../components/ResponsiveImage";
import React from "react";
import ReviewsSection from "./ReviewsSection";

const reviewProfiles = [
  {
    href: "https://www.wedmegood.com/profile/Videocrafts-37406/reviews",
    label: "Read Videocrafts reviews on WedMeGood",
    image: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/418805108_811056341052605_752968751592059872_n.jpg?updatedAt=1758030946409",
  },
  {
    href: "https://www.weddingwire.in/wedding-photography/videocrafts-by-abhir-sood--e72302/reviews",
    label: "Read Videocrafts reviews on WeddingWire",
    image: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/367-3678920_weddingwire-icon-wedding-wire-logo.png?updatedAt=1758030946343",
  },
];

const ClientFeedback = () => (
  <>
    <section className="bg-white px-4 pb-10 text-center">
      <h2 className="text-3xl font-normal uppercase text-[#5E5E56] sm:text-4xl" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
        Client Feedback
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg italic text-[#62625A]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
        Our clients are at the heart of everything we do. Their trust inspires us to turn meaningful moments into lasting visual stories.
      </p>
      <div className="mt-6 flex justify-center gap-6">
        {reviewProfiles.map((profile) => (
          <a key={profile.href} href={profile.href} target="_blank" rel="noopener noreferrer" aria-label={profile.label} className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#4D504A]">
            <ResponsiveImage src={profile.image} alt="" className="h-16 w-16 rounded-full object-contain transition hover:scale-105" loading="lazy" decoding="async" />
          </a>
        ))}
      </div>
    </section>
    <ReviewsSection />
  </>
);

export default ClientFeedback;
