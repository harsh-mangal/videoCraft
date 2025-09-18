import React from "react";
import { motion } from "framer-motion";

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
            <div
                className="relative w-full h-[74vh] flex items-center justify-center bg-center bg-cover"
                style={{
                    backgroundImage:
                        "url('https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/3-1.jpg?updatedAt=1758109838520')",
                }}
            >
                <h1
                    className="text-white text-center uppercase"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "60px",
                        fontWeight: 700,
                        textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
                    }}
                >
                    Pre-Wedding
                </h1>
            </div>

            {/* Gallery Section */}
            <div className="max-w-7xl mx-auto px-2 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            alt={`Pre-Wedding ${index + 1}`}
                            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PreWedding;
