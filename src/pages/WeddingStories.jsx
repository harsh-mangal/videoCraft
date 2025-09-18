import React from "react";
import { useNavigate } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    image: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp-3.jpg?updatedAt=1758084618164",
    title: "Tales of Romance | Highlighting a Client’s Beautiful Wedding Day",
    description:
      "Every love story is unique, but there’s something extra magical about the day two hearts become one. In today’s post,",
    link: "#",
    date: "November 18, 2024",
    time: "2:54 pm",
    path: '/tales-off-romance'
  },
  {
    id: 2,
    image: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp-1.jpg?updatedAt=1758084618297",
    title: "From ‘I Do’ to Forever | Celebrating a Client’s Unique Wedding Experience",
    description:
      "Weddings are more than just ceremonies; they are the beautiful tapestry of love, dreams, and unforgettable moments woven together by",
    link: "#",
    date: "November 18, 2024",
    time: "2:43 pm",
    path: '/From-‘I-Do’-to Forever'
  },
  {
    id: 3,
    image: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp.jpg?updatedAt=1758084618253",
    title: "Every Love Has a Story | Client Chronicles Their Unforgettable Wedding Day",
    description:
      "Every love story is unique, but some resonate with us in ways that leave an everlasting imprint on our hearts.",
    link: "#",
    date: "November 18, 2024",
    time: "1:57 pm",
    path: '/Unforgettable-Wedding-Day'
  },
];

const WeddingStories = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* ✅ Main wrapper div */}
      <div className="relative z-10 bg-white">
        {/* Heading */}
        <div className="text-center mb-12 pt-16 px-4 sm:px-6 lg:px-20">
          <h2
            className="tracking-wide"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "35px",
              fontWeight: 400,
              color: "#5E5E56",
              textTransform: "uppercase",
            }}
          >
            VIDEOCRAFTS WEDDING STORIES
          </h2>
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "22px",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#84847C",
            }}
            className="mt-2"
          >
            “Tales of Love, Laughter, and Happily Ever After”
          </p>
        </div>

        {/* Cards */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-20 cursor-pointer ">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-md shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col min-h-[28rem]"
              onClick={() => navigate(post.path)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover rounded-t-md"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm flex-grow">
                  {post.description}
                </p>
                <a
                  href={post.link}
                  className="text-green-600 text-sm mt-4 inline-block hover:underline"
                >
                  READ MORE »
                </a>
                <p className="text-sm text-gray-500 mt-4 border-t pt-3">
                  {post.date} • {post.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Beige background with leaf */}
        <div className="bg-[#f5f1ee] -mt-16 pb-24 relative z-10">
          {/* Background leaf image */}
          <img
            src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/landing-img-18.png?updatedAt=1758085212783"
            alt="Leaf"
            className="absolute left-16 bottom-0 w-[160px] h-auto mb-10"
          />

          <div className="relative py-20 lg:ml-20 ">
            {/* Add extra content if needed */}
          </div>
        </div>
      </div>
    </>
  );
};

export default WeddingStories;
