import React from "react";
import { motion } from "framer-motion";

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
            <div
                className="relative w-full h-[74vh] flex items-center justify-center bg-center bg-cover"
                style={{
                    backgroundImage:
                        "url('https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/vc-junior.jpg?updatedAt=1758110287945')",
                }}
            >
                <h1
                    className="text-white text-center uppercase font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
                    }}
                >
                    VIDEOCRAFTS JUNIOR
                </h1>

            </div>

            {/* Gallery Section */}
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((img, index) => (
                    <motion.div
                        key={index}
                        className="overflow-hidden rounded-lg"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                        <img
                            src={img}
                            alt={`Junior ${index + 1}`}
                            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default VideoCraftsJunior;
