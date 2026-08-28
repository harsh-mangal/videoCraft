import PageBanner from "../components/PageBanner";
import ResponsiveImage from "../components/ResponsiveImage";
import React from "react";

const VideoCraftsJunior = () => {
    const galleryImages = [
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/junior-3.jpg?updatedAt=1758024179268",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/junior-5.jpg?updatedAt=1758110393016",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/junior-2.jpg?updatedAt=1758024179185",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/junior.jpg?updatedAt=1758024179151",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/junior-6.jpg?updatedAt=1758024179335",
    ];

    return (
        <div className="w-full">
            {/* Banner Section */}
            <PageBanner title="Videocrafts Junior" image="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/vc-junior.jpg?updatedAt=1758110287945" />

            {/* Gallery Section */}
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((img, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-lg"
                    >
                        <ResponsiveImage
                            src={img}
                            alt={`Junior ${index + 1}`}
                            className="aspect-[4/5] w-full object-cover transform transition-transform duration-500 hover:scale-105" loading="lazy" decoding="async"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoCraftsJunior;
