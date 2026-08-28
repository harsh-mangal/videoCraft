import PageBanner from "../components/PageBanner";
import ResponsiveImage from "../components/ResponsiveImage";
import React from "react";

const PreWedding = () => {
    const galleryImages = [
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/pre-wedding-2%20(1).jpg?updatedAt=1758109838211",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/pre-wedding-6.jpg?updatedAt=1758109838374",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/pre-wedding.jpg?updatedAt=1758109838711",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/pre-wedding-3%20(1).jpg?updatedAt=1758109838971",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/pre-wedding-1.jpg?updatedAt=1758109838829",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/pre-wedding-5.jpg?updatedAt=1758109839088",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/pre-wedding-4.jpg?updatedAt=1758109839101",
    ];

    return (
        <div className="w-full">
            {/* Banner Section */}
            <PageBanner title="Pre-Wedding" image="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/3-1.jpg?updatedAt=1758109838520" />

            {/* Gallery Section */}
            <div className="max-w-7xl mx-auto px-2 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((img, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-lg"
                    >
                        <ResponsiveImage
                            src={img}
                            alt={`Pre-Wedding ${index + 1}`}
                            className="aspect-[4/5] w-full object-cover transform transition-transform duration-500 hover:scale-105" loading="lazy" decoding="async"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreWedding;
