import React from "react";

const LegacySection = () => {
    return (
        <div className="bg-[#f4f0ed] py-12 px-6 text-center border-8 border-[#6e6c6a]-800  shadow-xl">
            {/* Heading */}
            <h2
                className="mb-8"
                style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "36px",
                    fontWeight: 600,
                    color: "#000000",
                }}
            >
                Legacy of Father & Son – A Shared Vision
            </h2>

            {/* Image */}
            <div className="flex justify-center mb-10">
                <img
                    src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/fatherson?updatedAt=1758034149989"
                    alt="Father and Son Legacy"
                    className="rounded-lg shadow-lg max-w-4xl w-full"
                />
            </div>

            {/* Content */}
            <div
                className="max-w-5xl mx-auto leading-relaxed"
                style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "20px",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#4F4F47",
                }}
            >
                <p className="mb-6">
                    The journey of <strong>Videocrafts</strong> is truly a father-and-son
                    story, one that blends <em>tradition, resilience, and creativity</em>.
                    Founded by <strong>Late Mr. Ashwani Sood</strong> in the 1980s,
                    Videocrafts began as a small photography business born from Ashwani’s
                    love for the art and his determination to build a future despite
                    life’s challenges. He instilled in his son, <strong>Abhir Sood</strong>, not
                    just the technical skills of photography but also the values of hard
                    work, creativity, and the power of storytelling.
                </p>

                <p className="mb-6">
                    Abhir, now at the helm of <strong>Videocrafts</strong>, honors his
                    father’s legacy by blending innovation with the time-tested approach
                    his father pioneered. Abhir has led the studio into new frontiers by
                    adopting advanced technologies and expanding their services globally,
                    yet his approach remains grounded in the same principles that Ashwani
                    established—capturing emotions, telling stories, and creating beautiful
                    memories.
                </p>

                <p>
                    For Abhir, every project is a way to keep his father’s spirit alive,
                    channeling the wisdom and passion of Ashwani’s work into the creative
                    vision of today. Together, father and son have built more than just a
                    business—they’ve created a legacy that will live on through every
                    frame, every memory, and every story they capture.
                </p>
            </div>
        </div>
    );
};

export default LegacySection;
