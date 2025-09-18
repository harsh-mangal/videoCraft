import React from "react";
import { CalendarHeart, Camera, Mic2, Video } from "lucide-react";

const HeroSection = () => {
    return (
        <>
            {/* Hero Section with Background Image */}
            <div
                className="relative flex items-center justify-center text-center text-white min-h-[300px] md:min-h-[400px] lg:min-h-[500px] px-4"
                style={{
                    backgroundImage:
                        "url('https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Untitled-design-8.jpg?updatedAt=1758086811812')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                {/* Overlay for dark effect */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                {/* Content */}
                <div className="relative z-10 max-w-3xl px-6">
                    {/* Main Heading */}
                    <h1
                        className="mb-6"
                        style={{
                            fontFamily: '"Cormorant Garamond", serif',
                            fontWeight: 500,
                            fontSize: "48px",
                            textTransform: "uppercase",
                            fontStyle: "normal",
                            lineHeight: 1.2,
                        }}
                    >
                        YOU JUST ENJOY YOUR DAY!
                    </h1>

                    {/* Subheading */}
                    <p
                        className="mb-8"
                        style={{
                            fontFamily: '"Cormorant Garamond", serif',
                            fontWeight: 400,
                            fontSize: "20px",
                            fontStyle: "italic",
                            textTransform: "none",
                            lineHeight: 1.5,
                        }}
                    >
                        Every moment of your wedding day is a beautiful story waiting to be
                        told—let us capture it in timeless photographs. Your love deserves to
                        be remembered with artistry and heart.
                    </p>

                    <a
                        href="#contact"
                        className="border border-white px-6 py-2 rounded-md text-lg hover:bg-white hover:text-black transition"
                    >
                        Contact Us
                    </a>
                </div>
            </div>

            {/* Bottom Section with Full Width */}
            <div className="w-full bg-[#757b66] text-white py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 mt-24 mb-14">
                    {/* Wedding Photography */}
                    <div className="flex flex-col p-6 rounded-lg border border-white/30 bg-[#757b66] shadow-lg hover:shadow-2xl transition-all duration-300"
                        style={{ minHeight: "400px" }} // increased height
                    >
                        <img
                            src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/h1-custom-icon-1.png?updatedAt=1758087922100"
                            alt="Wedding Photography"
                            className="w-20 h-20 mb-4"
                        />
                        <h3
                            className="mb-4"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                fontWeight: 600,
                                fontSize: "25px",
                                textAlign: "left",
                                letterSpacing: "1px", // gap between letters
                            }}
                        >
                            Wedding Photography
                        </h3>
                        <p
                            className="text-sm"
                            style={{
                                fontFamily: "Mulish, sans-serif",
                                fontWeight: 400,
                                fontSize: "15px",
                                textAlign: "left",
                                letterSpacing: "0.5px", // slight gap between words/letters
                            }}
                        >
                            We provide expert wedding photography services, capturing every
                            special moment with creativity and attention to detail. From candid
                            emotions to grand celebrations, we deliver timeless images that
                            tell the story of your big day.
                        </p>
                    </div>

                    {/* Pre-Wedding Photography */}
                    <div className="flex flex-col p-6 rounded-lg border border-white/30 bg-[#757b66] shadow-lg hover:shadow-2xl transition-all duration-300"
                        style={{ minHeight: "400px" }}
                    >
                        <img
                            src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/h1-custom-icon-2.png?updatedAt=1758087922084"
                            alt="Pre-Wedding Photography"
                            className="w-20 h-20 mb-4"
                        />
                        <h3
                            className="mb-4"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                fontWeight: 600,
                                fontSize: "25px",
                                textAlign: "left",
                                letterSpacing: "1px",
                            }}
                        >
                            Pre-Wedding Photography
                        </h3>
                        <p
                            className="text-sm"
                            style={{
                                fontFamily: "Mulish, sans-serif",
                                fontWeight: 400,
                                fontSize: "15px",
                                textAlign: "left",
                                letterSpacing: "0.5px",
                            }}
                        >
                            We offer bespoke pre-wedding photography services, combining
                            stunning locations, creative styling, and expert guidance to
                            capture your love story. We ensure a seamless and enjoyable
                            experience, delivering breathtaking images that reflect your
                            unique journey.
                        </p>
                    </div>

                    {/* Maternity Shoots */}
                    <div className="flex flex-col p-6 rounded-lg border border-white/30 bg-[#757b66] shadow-lg hover:shadow-2xl transition-all duration-300"
                        style={{ minHeight: "400px" }}
                    >
                        <img
                            src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/h1-custom-icon-3.png?updatedAt=1758087921838"
                            alt="Maternity Shoots"
                            className="w-20 h-20 mb-4"
                        />
                        <h3
                            className="mb-4"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                fontWeight: 600,
                                fontSize: "25px",
                                textAlign: "left",
                                letterSpacing: "1px",
                            }}
                        >
                            Maternity Shoots
                        </h3>
                        <p
                            className="text-sm"
                            style={{
                                fontFamily: "Mulish, sans-serif",
                                fontWeight: 400,
                                fontSize: "15px",
                                textAlign: "left",
                                letterSpacing: "0.5px",
                            }}
                        >
                            We offer maternity shoot services that celebrate the beauty and joy
                            of pregnancy through artistic and heartfelt photography. We provide
                            personalized sessions in serene settings, ensuring comfort while
                            capturing this precious journey.
                        </p>
                    </div>

                    {/* Newborn Shoots */}
                    <div className="flex flex-col p-6 rounded-lg border border-white/30 bg-[#757b66] shadow-lg hover:shadow-2xl transition-all duration-300"
                        style={{ minHeight: "400px" }}
                    >
                        <img
                            src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/h1-custom-icon-4.png?updatedAt=1758087921729"
                            alt="Newborn Shoots"
                            className="w-20 h-20 mb-4"
                        />
                        <h3
                            className="mb-4"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                fontWeight: 600,
                                fontSize: "25px",
                                textAlign: "left",
                                letterSpacing: "1px",
                            }}
                        >
                            Newborn Shoots
                        </h3>
                        <p
                            className="text-sm"
                            style={{
                                fontFamily: "Mulish, sans-serif",
                                fontWeight: 400,
                                fontSize: "15px",
                                textAlign: "left",
                                letterSpacing: "0.5px",
                            }}
                        >
                            We are specialized in newborn photography, offering gentle and
                            creative sessions to capture your baby’s first precious milestones.
                            With a focus on safety, comfort, and stunning details, we create
                            beautiful memories that last a lifetime.
                        </p>
                    </div>
                </div>
            </div>


            <div className="w-full mb-12">
                <div className="mx-auto px-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/457802175_18294241429201135_6269314796825905026_n.jpg?updatedAt=1758088743134",
                            "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/460960379_18297353044201135_9027240885004106328_n-processedlightpdf.com_.jpg?updatedAt=1758088743115",
                            "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/457848006_18294241438201135_1430426432942772031_n.jpg?updatedAt=1758088743129",
                            "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/461242449_18297352966201135_3079240717870446045_n.jpg?updatedAt=1758088743172",
                        ].map((img, index) => (
                            <div
                                key={index}
                                className="hover-parent relative overflow-hidden cursor-pointer w-full sm:w-auto peer"
                            >
                                {/* Image with zoom-out effect on hover */}
                                <div className="overflow-hidden w-full h-[500px] ">
                                    <img
                                        src={img}
                                        alt={`Gallery ${index + 1}`}
                                        className="gallery-img w-full h-full object-cover "
                                    />
                                </div>

                                {/* Overlay */}
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-500"
                                    style={{
                                        mixBlendMode: "overlay",
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
};

export default HeroSection;