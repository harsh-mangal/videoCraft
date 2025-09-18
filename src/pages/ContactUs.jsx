import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import ContactForm from "./ContactForm";

const ContactUs = () => {
    return (
        <section className="bg-white py-14 px-4">
            <div className="max-w-8xl mx-auto lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div>
                    {/* Heading */}
                    <h2
                        className="mb-4"
                        style={{
                            fontFamily: '"Cormorant Garamond", serif',
                            fontSize: "48px",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            color: "#4D504A",
                        }}
                    >
                        Get in Touch with Us
                    </h2>

                    {/* Sub Heading */}
                    <h3
                        className="mb-4"
                        style={{
                            fontFamily: '"Cormorant Garamond", serif',
                            fontSize: "22px",
                            fontWeight: 600,
                            fontStyle: "italic",
                            color: "#84847C",
                        }}
                    >
                        Let’s Capture Your Love Story!
                    </h3>

                    {/* Paragraph */}
                    <p
                        className="mb-6"
                        style={{
                            fontFamily: "Mulish, sans-serif",
                            fontSize: "15px",
                            fontWeight: 400,
                            color: "#84847C",
                            textAlign: "left",
                        }}
                    >
                        Whether you have questions or want to discuss your wedding photography
                        needs, we’re here to help. Reach out to us today, and let’s create
                        beautiful memories together!
                    </p>

                    {/* Image */}
                    <img
                        src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/contact.jpg?updatedAt=1758104863608"
                        alt="Contact Us"
                        className="rounded-lg shadow-md"
                    />
                </div>

                {/* Right Content */}
                <div>
                    {/* Contact Form */}
                    <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
                        <ContactForm />
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="mt-12 cursor-pointer">
                            <h4
                                style={{
                                    fontFamily: '"Cormorant Garamond", serif',
                                    fontSize: "22px",
                                    fontWeight: 400,
                                    textTransform: "uppercase",
                                    color: "#4D504A",
                                }}
                            >
                                Email
                            </h4>
                            <p
                                style={{
                                    fontFamily: '"Cormorant Garamond", serif',
                                    fontSize: "19px",
                                    color: "#84847C",
                                }}
                            >
                                <a
                                    href="mailto:videocrafts95@gmail.com"
                                    style={{ textDecoration: "none", color: "#84847C" }}
                                >
                                    videocrafts95@gmail.com
                                </a>
                            </p>

                        </div>

                        <div className="cursor-pointer">
                            <h4
                                style={{
                                    fontFamily: '"Cormorant Garamond", serif',
                                    fontSize: "22px",
                                    fontWeight: 400,
                                    textTransform: "uppercase",
                                    color: "#4D504A",
                                }}
                            >
                                Address
                            </h4>
                            <p
                                style={{
                                    fontFamily: '"Cormorant Garamond", serif',
                                    fontSize: "19px",
                                    color: "#84847C",
                                }}
                            >
                                56-57-58 First floor, Madhya Marg, 9-D, Chandigarh, 160009
                            </p>
                        </div>

                        <div className="cursor-pointer">
                            <h4
                                style={{
                                    fontFamily: '"Cormorant Garamond", serif',
                                    fontSize: "22px",
                                    fontWeight: 400,
                                    textTransform: "uppercase",
                                    color: "#4D504A",
                                }}
                            >
                                Call Us
                            </h4>
                            <a
                                href="tel:+919888626212"
                                style={{
                                    fontFamily: '"Cormorant Garamond", serif',
                                    fontSize: "19px",
                                    color: "#84847C",
                                    textDecoration: "none",
                                }}
                            >
                                +91-9888626212
                            </a>
                        </div>

                    </div>

                    {/* Social Media */}
                    <div className="mt-6">
                        <h4
                            className="mb-3"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                fontSize: "22px",
                                fontWeight: 400,
                                textTransform: "uppercase",
                                color: "#4D504A",
                            }}
                        >
                            Follow
                        </h4>

                        <div className="flex space-x-4 text-xl">
                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/videocrafts9572?mibextid=LQQJ4d&rdid=eH2dNgZipwKZcDgg&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F185CuwCPXh%2F%3Fmibextid%3DLQQJ4d#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877f2] text-white hover:scale-110 transition-transform"
                            >
                                <FaFacebookF />
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/videocrafts/?igsh=ZDhlZnRvdGQ2b3Jo#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E4405F] text-white hover:scale-110 transition-transform"
                            >
                                <FaInstagram />
                            </a>

                            {/* YouTube */}
                            <a
                                href="https://www.youtube.com/@videocrafts84"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF0000] text-white hover:scale-110 transition-transform"
                            >
                                <FaYoutube />
                            </a>

                            {/* WhatsApp */}
                            <a
                                href="https://api.whatsapp.com/resolve/?deeplink=%2F%2520919814527271%2520&not_found=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#25D366] text-white hover:scale-110 transition-transform"
                            >
                                <FaWhatsapp />
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <div className="w-full py-12 mt-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8">
                    {/* Left Side - Map */}
                    <div className="w-full h-[400px]">
                        <iframe
                            title="office-map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.056019984482!2d76.77941747537243!3d30.733314488156763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0b3bafcbfb%3A0x3d5dfc6e8bcd58b8!2sChandigarh!5e0!3m2!1sen!2sin!4v1694789898765!5m2!1sen!2sin"
                            className="w-full h-full rounded-lg shadow-lg border-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    {/* Right Side - Office Timing */}
                    <div className="flex flex-col justify-center bg-[#f2eaea] border-2 border-[#4D504A] rounded-lg pr-6 pl-6 shadow-md">
                        <h2
                            className="mb-6"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                fontSize: "24px",
                                fontWeight: 500,
                                textTransform: "uppercase",
                                color: "#4D504A",
                                textAlign: 'center'
                            }}
                        >
                            Opening Business Hours
                        </h2>

                        <ul className="space-y-3">
                            {[
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                                "Sunday",
                            ].map((day, idx) => (
                                <li
                                    key={idx}
                                    className="flex justify-between border-b border-gray-300 pb-2 text-[#84847C]"
                                    style={{
                                        fontFamily: "Mulish, sans-serif",
                                        fontSize: "16px",
                                    }}
                                >
                                    <span>{day}</span>
                                    <span>Open 24 hours</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactUs;
