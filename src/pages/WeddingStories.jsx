import ResponsiveImage from "../components/ResponsiveImage";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    image: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp-3.jpg?updatedAt=1758084618164",
    title: "Tales of Romance | A Beautiful Wedding Day",
    description: "A heartfelt celebration filled with quiet emotions, joyful moments and the people who made the day unforgettable.",
    date: "November 18, 2024",
    path: "/wedding-stories/tales-of-romance",
  },
  {
    id: 2,
    image: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp-1.jpg?updatedAt=1758084618297",
    title: "From I Do to Forever | A Unique Wedding Experience",
    description: "A wedding shaped by the couple’s personalities, meaningful details and the warmth of their closest family and friends.",
    date: "November 18, 2024",
    path: "/wedding-stories/from-i-do-to-forever",
  },
  {
    id: 3,
    image: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp.jpg?updatedAt=1758084618253",
    title: "Every Love Has a Story | An Unforgettable Wedding Day",
    description: "A visual story of anticipation, laughter, heartfelt vows and spontaneous moments from a memorable wedding celebration.",
    date: "November 18, 2024",
    path: "/wedding-stories/unforgettable-wedding-day",
  },
];

const WeddingStories = () => (
  <section className="relative z-10 bg-white pb-24">
    <div className="px-4 pt-16 text-center sm:px-6 lg:px-20">
      <h2 className="text-3xl font-normal uppercase tracking-wide text-[#5E5E56] sm:text-4xl" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
        Videocrafts Wedding Stories
      </h2>
      <p className="mt-2 text-xl italic text-[#62625A]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
        Tales of love, laughter and happily ever after
      </p>
    </div>

    <div className="relative z-20 mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((post) => (
        <article key={post.id} className="flex min-h-[28rem] flex-col overflow-hidden rounded-md bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <Link to={post.path} className="flex h-full flex-col focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4D504A]" aria-label={`Read ${post.title}`}>
            <ResponsiveImage src={post.image} alt={post.title} className="h-64 w-full object-cover" loading="lazy" decoding="async" />
            <div className="flex flex-grow flex-col p-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">{post.title}</h3>
              <p className="flex-grow text-sm text-gray-600">{post.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#4D504A]">Read story <ArrowRight size={18} className="shrink-0" aria-hidden="true" focusable="false" /></span>
              <time className="mt-4 border-t pt-3 text-sm text-gray-500" dateTime="2024-11-18">{post.date}</time>
            </div>
          </Link>
        </article>
      ))}
    </div>
  </section>
);

export default WeddingStories;
