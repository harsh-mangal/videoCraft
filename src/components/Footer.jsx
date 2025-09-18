import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full">
      {/* Main Footer */}
      <div className="w-full bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">

          {/* Column 1: Social Media */}
          <div className="flex-1 flex flex-col items-center text-center md:items-start md:pr-8 md:border-r border-gray-300 h-full">
            <h3
              className="uppercase mb-6"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                color: "#5E5E56",
                fontSize: "22px",
              }}
            >
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-start space-x-6 mb-6">
              <a href="https://www.facebook.com/videocrafts9572?mibextid=LQQJ4d&rdid=HjXI6anXYVR1TyvK&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F185CuwCPXh%2F%3Fmibextid%3DLQQJ4d#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:opacity-80 transition"><FaFacebookF size={26} /></a>
              <a href="https://www.instagram.com/videocrafts/?igsh=ZDhlZnRvdGQ2b3Jo#" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:opacity-80 transition"><FaInstagram size={26} /></a>
              <a href="https://www.youtube.com/@videocrafts84" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:opacity-80 transition"><FaYoutube size={26} /></a>
              <a href="https://api.whatsapp.com/resolve/?deeplink=%2F%2520919814527271%2520&not_found=1" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:opacity-80 transition"><FaWhatsapp size={26} /></a>
            </div>
            <p
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                color: "#84847C",
                fontSize: "16px",
              }}
            >
              videocrafts95@gmail.com
            </p>
          </div>

          {/* Column 2: Logo */}
          <div className="flex-1 flex justify-center items-center md:px-8 md:border-r border-gray-300 h-full">
            <img
              src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/logo.png?updatedAt=1758018691025"
              alt="Logo"
              className="lg:w-56 h-auto cursor-pointer group"
            />
            <style>{`
              .group:hover {
                animation: heartbeat 1s infinite;
              }
              @keyframes heartbeat {
                0%, 100% { transform: scale(1); }
                25%, 75% { transform: scale(1.1); }
                50% { transform: scale(1.2); }
              }
            `}</style>
          </div>

          {/* Column 3: Newsletter */}
          <div className="flex-1 flex flex-col items-center text-center md:items-start md:pl-8 h-full">
            <h3
              className="uppercase mb-4"
              style={{ fontFamily: '"Cormorant Garamond", serif', color: "#5E5E56", fontSize: "22px" }}
            >
              Newsletter
            </h3>
            <p
              className="mb-6 italic"
              style={{ fontFamily: '"Cormorant Garamond", serif', color: "#84847C", fontSize: "16px" }}
            >
              Follow our latest stories.
            </p>
            <div className="flex w-full md:w-auto justify-center md:justify-start">
              <input
                type="email"
                placeholder="Enter your email"
                className="border-b-2 border-gray-400 bg-transparent placeholder-gray-500 text-gray-700 focus:outline-none py-3 px-3 w-full md:w-64"
              />
              <button className="bg-gray-400 text-white px-5 py-3 ml-2 hover:bg-gray-500 transition">
                <FaEnvelope size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="w-full bg-[#f5f0eb] py-4">
        <p
          className="text-center text-gray-600"
          style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "14px" }}
        >
          Copyright © {new Date().getFullYear()} All Rights Reserved. Videocraftsindia
        </p>
      </div>
    </div>
  );
};

export default Footer;
