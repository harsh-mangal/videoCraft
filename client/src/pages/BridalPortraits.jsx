import PageBanner from "../components/PageBanner";
import ResponsiveImage from "../components/ResponsiveImage";
import React from "react";

const BridalPortraits = () => {
    const galleryImages = [
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/bridal-portraits.jpg?updatedAt=1758109180702",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/bridal-portraits-1.jpg?updatedAt=1758109180573",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/bridal-portraits-2.jpg?updatedAt=1758109180329",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/bridal-portraits-3.jpg?updatedAt=1758109180869",
    ];

    return (
        <div className="w-full">
            {/* Banner Section */}
            <PageBanner title="Bridal Portraits" image="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/bridal-portraits-4.jpg?updatedAt=1758109180755" />

            {/* Gallery Section */}
            <div className="max-w-7xl mx-auto px-2 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {galleryImages.map((img, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                        <ResponsiveImage
                            src={img}
                            alt={`Bridal Portrait ${index + 1}`}
                            className="aspect-[4/5] w-full object-cover transform transition-transform duration-500 hover:scale-105" loading="lazy" decoding="async"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BridalPortraits;
