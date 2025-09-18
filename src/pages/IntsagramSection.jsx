import React from "react";

const InstagramSection = () => {
  const images = [
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/6.jpg?updatedAt=1758090684661",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/2.jpg?updatedAt=1758090685030",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/3.jpg?updatedAt=1758090684646",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/4.jpg?updatedAt=1758090685024",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/1-1.jpg?updatedAt=1758090684969",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/5.jpg?updatedAt=1758090684914",
  ];

  return (
    <>
    <div className="w-full py-16 bg-white text-center px-4">
      {/* Heading */}
      <h2
        className="mb-2 uppercase"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          color: "#5E5E56",
          fontSize: "35px",
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        Follow us on Instagram
      </h2>
      <p
        className="text-lg md:text-xl mb-8 italic"
        style={{ fontFamily: '"Cormorant Garamond", serif', color: "#84847C" }}
      >
        @Videocrafts
      </p>

      {/* Images Full Width */}
      <div className="flex flex-wrap w-full justify-center">
        {images.map((img, index) => (
          <a
            key={index}
            href="https://www.instagram.com/accounts/login/?next=%2Fvideocrafts%2F&source=omni_redirect"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden"
            style={{
              width: "calc(16.66% - 4px)", // Default: 6 columns
              height: "200px",
              marginTop: index % 2 !== 0 ? "20px" : "0px",
              marginLeft: "2px",
              marginRight: "2px",
            }}
          >
            <img
              src={img}
              alt={`Instagram ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>

            {/* Heartbeat pulse on hover */}
            <style>{`
              .group:hover img {
                animation: pulse 1s infinite;
              }
              @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
              }

              /* Responsive for mobile: 2 columns */
              @media (max-width: 640px) {
                .group {
                  width: calc(50% - 4px) !important;
                  height: 180px !important;
                }
              }
            `}</style>
          </a>
        ))}
      </div>
    </div>

    <div className="w-full h-36 bg-[#f4f0ed] -mt-32 mb-6"></div>

    </>
  );
};

export default InstagramSection;
