import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const preWeddingImages = [
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/pre-wedding-3%20(1).jpg?updatedAt=1758021539395",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/Pre-wedding-2.jpg?updatedAt=1758021539102",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/Pre-wedding-1.jpg?updatedAt=1758021538373",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/pre-wedding-2%20(1).jpg?updatedAt=1758021538111",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/Pre-wedding.jpg?updatedAt=1758021537920",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/pre-wedding%20(1).jpg?updatedAt=1758021537818",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/Pre-wedding-10.jpg?updatedAt=1758021537778",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/Pre-wedding-9.jpg?updatedAt=1758021537731",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/Pre-wedding-5.jpg?updatedAt=1758021533405",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/pre-wedding-6%20(2).jpg?updatedAt=1758021533357",
];

const weddingImages = [
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding-1.jpg?updatedAt=1758024050924",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding.jpg?updatedAt=1758024050896",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding-3.jpg?updatedAt=1758024050891",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding-5.jpg?updatedAt=1758024050814",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding-4.jpg?updatedAt=1758024050644",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding-6.jpg?updatedAt=1758024050644",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/bridal-portraits.jpg?updatedAt=1758024050627",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding-2.jpg?updatedAt=1758024050544",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding-7.jpg?updatedAt=1758024050358",
];

const juniorImages = [
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/junior-6.jpg?updatedAt=1758024179335",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/junior-3.jpg?updatedAt=1758024179268",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/junior-1.jpg?updatedAt=1758024179156",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/junior.jpg?updatedAt=1758024179151",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/junior-2.jpg?updatedAt=1758024179185",
];

const WeddingSection = () => {
    const navigate = useNavigate();
    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: false,
    };

    return (
        <div className="bg-white">
            <section className="w-full bg-[#f4f0ed] py-16 px-2">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Left Column - Text and Wedding Section */}
                        <div className="w-full lg:w-1/2 flex flex-col">
                            {/* Header Text */}
                            <div className="mb-12 text-center lg:text-left">
                                <p
                                    className="uppercase mb-6"
                                    style={{
                                        fontFamily: '"Cormorant Garamond", serif',
                                        fontSize: "40px",
                                        fontWeight: 400,
                                        color: "#5E5E56",
                                        lineHeight: "1.2",
                                        letterSpacing: "2px",
                                    }}
                                >
                                    Top Wedding and Candid Photographers in Chandigarh
                                </p>
                                <p
                                    style={{
                                        fontFamily: '"Cormorant Garamond", serif',
                                        fontSize: "18px",
                                        fontWeight: 400,
                                        fontStyle: "italic",
                                        color: "#84847C",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    We turn life's most precious moments into timeless memories. Through expert photography and videography, we capture the emotions and stories that matter most. Let us help you preserve your unique journey, frame by frame.
                                </p>
                            </div>

                            {/* Wedding Section */}
                            <div className="relative mb-2 cursor-pointer" onClick={() => navigate('/bridal-potraits')}>
                                <Slider {...sliderSettings}>
                                    {weddingImages.map((src, index) => (
                                        <div key={index} className="flex justify-center">
                                            <img
                                                src={src}
                                                alt={`Wedding ${index + 1}`}
                                                className="w-full h-[700px] object-cover rounded-md"
                                            />
                                        </div>
                                    ))}
                                </Slider>
                                <div
                                    className="bottom-6 left-6 tracking-[3px]"
                                    style={{
                                        fontFamily: '"Cormorant Garamond", serif',
                                        fontSize: "20px",
                                        fontWeight: 500,
                                        color: "#5E5E56",
                                        marginTop: "10px",
                                        marginLeft: "10px",
                                    }}
                                >
                                    WEDDING
                                </div>
                            </div>

                            <div className="flex justify-center mt-16">
                                <img
                                    src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/h1-img-15.png?updatedAt=1758029858056"
                                    className="hidden sm:block w-24 h-24 lg:w-36 lg:h-36 mx-auto lg:mx-0"
                                    alt="Decorative"
                                />
                            </div>

                        </div>

                        {/* Right Column - Pre-Wedding and Junior Sections */}
                        <div className="w-full lg:w-1/2 flex flex-col  lg:gap-28 pt-0 lg:pt-32">
                            {/* Pre-Wedding Section */}
                            <div className="relative p-3 w-full lg:w-3/4 lg:self-end mx-auto lg:mx-0 mb-6 lg:mb-0 cursor-pointer" onClick={() => navigate('/pre-wedding')}>
                                <Slider {...sliderSettings}>
                                    {preWeddingImages.map((src, index) => (
                                        <div key={index}>
                                            <img
                                                src={src}
                                                alt={`Pre-Wedding ${index + 1}`}
                                                className="w-[40] h-[500px] object-cover rounded-md"
                                            />
                                        </div>
                                    ))}
                                </Slider>
                                <div
                                    className="bottom-4 left-4 tracking-[3px]"
                                    style={{
                                        fontFamily: '"Cormorant Garamond", serif',
                                        fontSize: "18px",
                                        fontWeight: 500,
                                        color: "#5E5E56",
                                        marginTop: "10px",
                                        marginLeft: "10px",
                                    }}
                                >
                                    PRE-WEDDING
                                </div>
                            </div>

                            {/* Junior Section */}
                            <div className="relative w-full lg:w-3/5 lg:self-start mx-auto lg:mx-0 cursor-pointer" onClick={() => navigate('/video-craft-junion')}>
                                <Slider {...sliderSettings}>
                                    {juniorImages.map((src, index) => (
                                        <div key={index}>
                                            <img
                                                src={src}
                                                alt={`Junior ${index + 1}`}
                                                className="w-full h-[300px] object-cover rounded-md"
                                            />
                                        </div>
                                    ))}
                                </Slider>
                                <div
                                    className="bottom-4 left-4 tracking-[3px]"
                                    style={{
                                        fontFamily: '"Cormorant Garamond", serif',
                                        fontSize: "20px",
                                        fontWeight: 500,
                                        color: "#5E5E56",
                                        marginTop: "10px",
                                        marginLeft: "10px",
                                    }}
                                >
                                    VIDEOCRAFTS JUNIOR
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="w-full text-center mt-8 px-4 py-8 bg-[#f4f0ed] mb-10">
                <p
                    className="text-lg sm:text-xl md:text-2xl  uppercase text-[#72726C] leading-relaxed"
                    style={{
                        fontStyle: "normal",
                    }}
                >
                    Live your magic and save your precious love!<br /> memories
                    Our team of professional photographers!<br /> is here to help you.
                </p>
            </div>


        </div>
    );
};

export default WeddingSection;