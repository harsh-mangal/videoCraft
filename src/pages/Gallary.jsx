import React from "react";
import { motion } from "framer-motion";

const galleryImages = [
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/461267915_18297353080201135_2943885549578416297_n.jpg?updatedAt=1758114059614",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/bridal-portraits.jpg?updatedAt=1758114059573",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/bridal-portraits-2.jpg?updatedAt=1758114059501",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/461242449_18297352966201135_3079240717870446045_n.jpg?updatedAt=1758114059295",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/457848006_18294241438201135_1430426432942772031_n.jpg?updatedAt=1758114059013",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/457802175_18294241429201135_6269314796825905026_n.jpg?updatedAt=1758114058572",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/397897023_18256206283201135_1899464957726777447_n.jpg?updatedAt=1758114058205",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/457749077_18294241447201135_7443172115267756558_n.jpg?updatedAt=1758114058130",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Wedding-7.jpg?updatedAt=1758114056023",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Wedding-6.jpg?updatedAt=1758114053642",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Wedding-5.jpg?updatedAt=1758114053063",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Wedding-2%20(1).jpg?updatedAt=1758114053058",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Wedding-5%20(1).jpg?updatedAt=1758114053032",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Wedding-4.jpg?updatedAt=1758114053012",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Wedding-4%20(1).jpg?updatedAt=1758114052995",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Wedding-3%20(1).jpg?updatedAt=1758114052842",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Wedding-3.jpg?updatedAt=1758114052587",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Wedding.jpg?updatedAt=1758114046328",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Wedding-1%20(1).jpg?updatedAt=1758114046307",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Pre-wedding-7.jpg?updatedAt=1758114046070",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Pre-wedding-9.jpg?updatedAt=1758114045769",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Pre-wedding-8.jpg?updatedAt=1758114045750",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/pre-wedding-6.jpg?updatedAt=1758114045495",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Pre-wedding-6%20(1).jpg?updatedAt=1758114045474",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Pre-wedding-5.jpg?updatedAt=1758114045375",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Pre-wedding-4.jpg?updatedAt=1758114045122",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/pre-wedding-4%20(1).jpg?updatedAt=1758114040384",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Pre-wedding-3%20(1).jpg?updatedAt=1758114040337",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/pre-wedding-2.jpg?updatedAt=1758114040321",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/pre-wedding-3.jpg?updatedAt=1758114040276",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/pre-wedding-1.jpg?updatedAt=1758114040235",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Pre-wedding.jpg?updatedAt=1758114040122",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/junior-6.jpg?updatedAt=1758114040021",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/junior-5.jpg?updatedAt=1758114039836",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/FAMILY-3.jpg?updatedAt=1758114032201",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/FAMILY.jpg?updatedAt=1758114032195",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/FAMILY-5.jpg?updatedAt=1758114032164",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/junior-3.jpg?updatedAt=1758114032158",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/junior-2.jpg?updatedAt=1758114032134",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/FAMILY-1.jpg?updatedAt=1758114032016",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/FAMILY-2.jpg?updatedAt=1758114031787",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/FAMILY-3.jpg?updatedAt=1758114032201",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/Pre-wedding-4.jpg?updatedAt=1758114045122"
];

const Gallery = () => {
    return (
        <div className="w-full">
            {/* Banner */}
            <div
                className="relative w-full h-[430px] md:h-[530px] flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Gallary/gallery-banner-1.jpg?updatedAt=1758114079587')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <h1
                    className="text-white uppercase text-center"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "60px",
                        fontWeight: 700,
                        textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
                    }}
                >
                    GALLERY
                </h1>
            </div>

            {/* Image Grid */}
            <div className="max-w-[1200px] mx-auto px-2 py-10 grid grid-cols-3 gap-4">
                {galleryImages.map((img, index) => (
                    <motion.div
                        key={index}
                        className="w-full overflow-hidden"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        <img
                            src={img}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
