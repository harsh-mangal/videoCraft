import React, { useEffect, useState } from "react";


const AboutUs = () => {

    const images = [
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/343436716_164584696545059_5452633694856277380_n.jpg?updatedAt=1758095326362",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/453875494_18290686984201135_3117475045989761803_n.jpg?updatedAt=1758095326089",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/451984871_495778003131281_8603668917776350073_n.jpg?updatedAt=1758095326142",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/451232285_878669220750221_5654401183711832386_n.jpg?updatedAt=1758095326128",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/343457423_1855208218169410_3262816958422017919_n.jpg?updatedAt=1758095325998",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/451816231_990775676025712_3930829498517495652_n.jpg?updatedAt=1758095326084",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/451984871_495778003131281_8603668917776350073_n.jpg?updatedAt=1758095326142",
    ];

    const historyImages = [
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/457802175_18294241429201135_6269314796825905026_n.jpg?updatedAt=1758088743134",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/457848006_18294241438201135_1430426432942772031_n.jpg?updatedAt=1758088743129",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/457793381_18294241456201135_1473232198490311256_n-qwntzurqxtp8uu456pympn2y48ribuub0prkq1qvi4.jpg?updatedAt=1758096986862",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/457749077_18294241447201135_7443172115267756558_n-qwntzwnfbhrti21evqrvumlvb0i8r91roz2jolo35o.jpg?updatedAt=1758096986853",
    ];


    const images1 = [
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/339997274_761820905299101_1482883258721342530_n.jpg?updatedAt=1758102950722",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/319282880_1863636050656434_3121507668845167913_n.jpg?updatedAt=1758102950530",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/318869482_537710268244886_4417641904349254790_n.jpg?updatedAt=1758102950608",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/319095871_529489285745408_2411097867280031755_n%20(1).jpg?updatedAt=1758102950477",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/318978161_639392474594869_5202545905984573334_n.jpg?updatedAt=1758102950260",
        "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/339827585_768796091489364_739165343552228577_n.jpg?updatedAt=1758102950069",
    ];

    const services = [
        { name: "Pre-Wedding", percent: 90 },
        { name: "Wedding", percent: 100 },
        { name: "Newborn Shoots", percent: 95 },
        { name: "Maternity Shoots", percent: 92 },
    ];

    const [isPaused, setIsPaused] = useState(false);
    const [touchStartX, setTouchStartX] = useState(null);

    const [current, setCurrent] = useState(0);


    useEffect(() => {
        if (isPaused) return; // stop auto-slide when paused
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % historyImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [isPaused, historyImages.length]);

    // Touch handlers
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        if (touchStartX === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (diff > 50) {
            // swipe left → next
            setCurrent((prev) => (prev + 1) % historyImages.length);
        } else if (diff < -50) {
            // swipe right → previous
            setCurrent((prev) =>
                prev === 0 ? historyImages.length - 1 : prev - 1
            );
        }
        setTouchStartX(null);
    };

    // Auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % historyImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="w-full">
                {/* Banner */}
                <div
                    className="w-full h-96 md:h-[500px] bg-cover bg-center flex items-center justify-center"
                    style={{
                        backgroundImage: `url('https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/about-banner.jpg?updatedAt=1758094499336')`
                    }}
                >
                    <h1
                        className="text-4xl md:text-6xl uppercase font-semibold"
                        style={{
                            fontFamily: '"Cormorant Garamond", serif',
                            color: "#FFFFFF",
                            textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                        }}
                    >
                        ABOUT US
                    </h1>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto py-16 px-4 flex flex-col md:flex-row items-start gap-8">

                    {/* Left Image */}
                    <div className="md:w-1/2 w-full -mt-6">
                        <img
                            src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/385007931_18251174875201135_9088427915493833893_n.jpg?updatedAt=1758094499523"
                            alt="About"
                            className="w-full h-[450px] md:h-full object-cover rounded-lg border-2 border-gray-300 shadow-lg"
                        />
                    </div>


                    {/* Right Content */}
                    <div className="md:w-1/2 w-full flex flex-col justify-start">
                        {/* Main Heading */}
                        <h2
                            className="mb-6 uppercase"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: "#5E5E56",
                                fontSize: "35px",
                                fontWeight: 500,
                                textAlign: "left",
                            }}
                        >
                            Who we are
                        </h2>

                        {/* Paragraphs */}
                        <p
                            className="mb-4"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: "#6C6C63",
                                fontSize: "18px",
                                fontWeight: 500,
                                fontStyle: "italic",
                                textAlign: "left",
                            }}
                        >
                            Founded in the 1980s by Late Mr. Ashwani Sood, Videocrafts has evolved into one of the most trusted names for wedding photographers in Chandigarh. What started as a small photography business has grown into a full-service studio that now offers everything from pre-wedding shoots to corporate photography fueled by challenges and a lot of hard work, has since grown into one of the most respected names in photography and videography. Today, we’re proud to carry forward Mr. Sood’s legacy of capturing the essence of life’s most beautiful moments.
                        </p>

                        <p
                            className="mb-4"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: "#6C6C63",
                                fontSize: "18px",
                                fontWeight: 500,
                                fontStyle: "italic",
                                textAlign: "left",
                            }}
                        >
                            Under the guidance of Abhir Sood, Ashwani’s son, Videocrafts has embraced modern technology while staying true to its roots. Abhir carries forward his father’s legacy, blending innovative techniques with a deep respect for tradition. Today, Videocraftsindia offers a wide range of services, from capturing the magic of weddings and pre-wedding shoots to telling powerful brand stories and creating corporate videos. What sets us apart from others is our ability to present each frame with your unique narrative, making sure that every visual we create is as emotional as it is beautiful.
                        </p>

                        <p
                            className="mb-4"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: "#6C6C63",
                                fontSize: "18px",
                                fontWeight: 500,
                                fontStyle: "italic",
                                textAlign: "left",
                            }}
                        >
                            Our mission is clear: to make your lovely moments last forever. No matter if it’s your wedding memories, family moments or a corporate function, our passionate team is here to capture every moments of memories.
                        </p>

                        <p
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: "#6C6C63",
                                fontSize: "18px",
                                fontWeight: 500,
                                fontStyle: "italic",
                                textAlign: "left",
                            }}
                        >
                            Videocraftsindia is not just a photography studio — it’s a place of memories. Through our lens, we transform special moments into long lasting memories.
                        </p>
                    </div>

                </div>
            </div>

            <div className="w-full overflow-hidden bg-white">
                <div className="flex animate-scroll hover:pause-animation">
                    {images.concat(images).map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Scroll ${index}`}
                            className="w-56 h-66 object-cover flex-shrink-0 rounded-lg"
                        />
                    ))}
                </div>

                {/* Animation styles */}
                <style>{`
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    .animate-scroll {
      display: flex;
      width: max-content;
      animation: scroll 25s linear infinite;
    }

    .hover\\:pause-animation:hover {
      animation-play-state: paused;
    }

    @media (max-width: 768px) {
      .animate-scroll img {
        width: calc(8% - 8px); /* 2 images per screen with small gap */
        height: 230px; /* mobile height */
        margin-right: 8px;
      }
    }
  `}</style>
            </div>

            <div className="w-full bg-white py-16 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-12">

                    {/* Left Side: Content */}
                    <div className="md:w-1/2 w-full flex flex-col">
                        <h2
                            className="mb-6"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: "#5E5E56",
                                fontSize: "35px",
                                fontWeight: 500,
                                textTransform: "uppercase",
                            }}
                        >
                            Our History
                        </h2>

                        <p
                            className="mb-4"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: "#686861",
                                fontSize: "18px",
                                fontWeight: 400,
                                fontStyle: "italic",
                            }}
                        >
                            In the 1980s, Late Mr. Ashwani Sood—affectionately known as Ashu Sood—found himself at a crossroads in life. Though he had aspirations to join the Navy, financial challenges led him to embrace photography, a medium that would ultimately become his passion and legacy.
                        </p>

                        <p
                            className="mb-4"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: "#686861",
                                fontSize: "18px",
                                fontWeight: 400,
                                fontStyle: "italic",
                            }}
                        >
                            In the early days, Ashwani faced several hurdles—be it financial constraints or limited resources—but his dedication and love for the craft propelled him to build Videocrafts into a trusted name in the industry. What started as a small venture in Chandigarh soon grew into a brand known for its ability to capture life’s most precious moments with emotion and creativity.
                        </p>

                        <p
                            className="mb-4"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: "#686861",
                                fontSize: "18px",
                                fontWeight: 400,
                                fontStyle: "italic",
                            }}
                        >
                            Under the leadership of his son, Abhir Sood, Videocrafts has not only upheld its father’s legacy but has also embraced the latest advancements in photography and videography. Today, Videocrafts stands as a beacon of both tradition and innovation, capturing timeless memories for families, couples, brands, and businesses alike.
                        </p>
                    </div>

                    {/* Right Side: Full Image Slider */}
                    <div
                        className="md:w-1/2 w-full h-98 md:h-[530px] relative overflow-hidden rounded-lg"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {historyImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`History ${index}`}
                                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        ))}
                    </div>

                </div>
            </div>

            <div className="bg-[#f4f0ed] py-16 px-8 flex flex-col lg:flex-row gap-10">
                {/* Left Content */}
                <div className="lg:w-1/2 flex flex-col gap-6">
                    <h2
                        className="uppercase"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "35px",
                            fontWeight: 400,
                            color: "rgb(77, 80, 74)",
                            textAlign: "left",
                        }}
                    >
                        Our Services
                    </h2>
                    <p
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "22px",
                            fontStyle: "italic",
                            fontWeight: 400,
                            color: "rgb(132, 132, 124)",
                            textAlign: "justify",
                        }}
                    >
                        Let us help you preserve your cherished memories in stunning,
                        high-quality images.
                    </p>
                    <p
                        style={{
                            fontFamily: "Mulish, sans-serif",
                            fontSize: "15px",
                            fontWeight: 400,
                            color: "rgb(114, 114, 108)",
                            textAlign: "justify",
                        }}
                    >
                        At our photography studio, we offer a wide range of services tailored
                        to capture and preserve your most important moments. From stunning
                        wedding and pre-wedding photography to professional product, food,
                        newborn, and maternity shoots, we bring your vision to life with
                        creativity and precision. Whether for personal, commercial, or
                        promotional use, we’re here to provide you with beautiful, timeless
                        photos.
                    </p>
                </div>

                {/* Right Progress Bars */}
                <div className="lg:w-1/2 flex flex-col gap-6">
                    {services.map((service) => (
                        <div key={service.name} className="flex flex-col gap-2">
                            <div className="flex justify-between text-[#4D504A] font-semibold">
                                <span>{service.name}</span>
                                <span>{service.percent}%</span>
                            </div>
                            <div className="w-full bg-[#84847c] h-4 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#4D504A]"
                                    style={{ width: `${service.percent}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <section
                className="relative bg-fixed bg-center bg-cover py-16 px-6 bg-[#f4f0ed]"
                style={{
                    backgroundImage:
                        "url('https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/455841250_18292334629201135_8028869471403628683_n.jpg?updatedAt=1758102107890')",
                }}
            >
                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Content Container */}
                <div className="relative max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-10">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        {/* Left Side Heading */}
                        <div className="md:w-1/3 text-center md:text-left">
                            <h2
                                className="text-[62px] italic uppercase font-bold leading-tight"
                                style={{ fontFamily: '"Cormorant Garamond", serif', color: "#5E5E56" }}
                            >
                                Why <br /> Choose <br /> Us?
                            </h2>
                        </div>

                        {/* Divider Line */}
                        <div className="hidden md:block w-px bg-gray-300"></div>

                        {/* Right Side Content */}
                        <div className="md:w-2/3 space-y-6">
                            {/* Block 1 */}
                            <div>
                                <h3
                                    className="text-[20px] font-bold mb-2"
                                    style={{ fontFamily: '"Cormorant Garamond", serif', color: "#66665F" }}
                                >
                                    1. What makes us stand out?
                                </h3>
                                <p
                                    className="text-[18px] italic font-medium text-justify"
                                    style={{ fontFamily: '"Cormorant Garamond", serif', color: "#84847C" }}
                                >
                                    Our team combines cutting-edge technology with creative expertise
                                    to produce high-quality visuals that capture the true essence of
                                    your moments. Whether it’s a wedding, corporate event, or personal
                                    milestone, we ensure each frame reflects the emotions and details
                                    that make your story unique.
                                </p>
                            </div>

                            {/* Block 2 */}
                            <div>
                                <h3
                                    className="text-[20px] font-bold mb-2"
                                    style={{ fontFamily: '"Cormorant Garamond", serif', color: "#66665F" }}
                                >
                                    2. How do we ensure your moments are captured flawlessly?
                                </h3>
                                <p
                                    className="text-[18px] italic font-medium text-justify"
                                    style={{ fontFamily: '"Cormorant Garamond", serif', color: "#84847C" }}
                                >
                                    From the first consultation to the final product, we focus on
                                    delivering a seamless experience. Our experienced team works
                                    closely with you to understand your vision, ensuring that every
                                    shot, every angle, and every detail is perfectly captured. With a
                                    keen eye for the personal touches that matter most, we ensure your
                                    memories are preserved with the utmost care and precision.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-[#f4f0ed] py-16 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
                    {/* Mission Card */}
                    <div className="bg-white shadow-lg rounded-xl p-8 text-center">
                        <h2
                            className="mb-3 uppercase"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: "#5E5E56",
                                fontSize: "30px",
                                fontWeight: 700,
                            }}
                        >
                            Our Mission
                        </h2>
                        <div className="w-20 h-[2px] bg-gray-400 mx-auto mb-6"></div>

                        <p
                            className="mb-4"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: "#84847C",
                                fontSize: "19px",
                                fontWeight: 500,
                                fontStyle: "italic",
                            }}
                        >
                            At Videocrafts, our mission is clear: to capture the essence of life’s
                            most meaningful moments with creativity and care. We’re committed to
                            providing top-quality photography and videography that truly reflects
                            the emotions and unique stories of our clients.
                        </p>
                        <p
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: "#84847C",
                                fontSize: "19px",
                                fontWeight: 500,
                                fontStyle: "italic",
                            }}
                        >
                            By blending the latest technology with the timeless art of storytelling,
                            we make sure each project—whether it’s a wedding, corporate event, or
                            family portrait—captures not just the moment, but the heart behind it.
                            We believe in building strong, personal connections with every client,
                            so we can preserve those memories in a way that feels real, raw, and
                            unforgettable.
                        </p>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-white shadow-lg rounded-xl p-8 text-center">
                        <h2
                            className="mb-3 uppercase"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: "#5E5E56",
                                fontSize: "30px",
                                fontWeight: 700,
                            }}
                        >
                            Our Vision
                        </h2>
                        <div className="w-20 h-[2px] bg-gray-400 mx-auto mb-6"></div>

                        <p
                            className="mb-4"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: "#84847C",
                                fontSize: "19px",
                                fontWeight: 500,
                                fontStyle: "italic",
                            }}
                        >
                            At Videocrafts, our vision is to be the trusted storytellers behind the
                            most important moments in people’s lives. We aim to create timeless
                            visuals that not only preserve memories but also capture the emotions
                            and stories that make them special.
                        </p>
                        <p
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: "#84847C",
                                fontSize: "19px",
                                fontWeight: 500,
                                fontStyle: "italic",
                            }}
                        >
                            We see every project as an opportunity to push the boundaries of
                            creativity while staying true to the authenticity of the moment. Our
                            goal is to craft visuals that resonate, evoke emotion, and stand the
                            test of time. By building lasting relationships with our clients, we
                            ensure that every story we tell is personal, meaningful, and beautifully
                            captured.
                        </p>
                    </div>
                </div>
            </section>


            <section className="w-full bg-white py-10 overflow-hidden">
                {/* Top Row → Right to Left */}
                <div className="flex animate-scroll-left">
                    {images1.concat(images1).map((img, i) => (
                        <img
                            key={`top-${i}`}
                            src={img}
                            alt={`Slide ${i}`}
                            className="w-60 h-44 object-cover flex-shrink-0"
                        />
                    ))}
                </div>

                {/* Bottom Row → Left to Right */}
                <div className="flex animate-scroll-right">
                    {images1.concat(images1).map((img, i) => (
                        <img
                            key={`bottom-${i}`}
                            src={img}
                            alt={`Slide ${i}`}
                            className="w-60 h-44 object-cover  flex-shrink-0"
                        />
                    ))}
                </div>

                {/* Animations */}
                <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 25s linear infinite;
          width: max-content;
        }
        .animate-scroll-right {
          animation: scroll-right 25s linear infinite;
          width: max-content;
        }
        /* Pause on hover */
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }

        /* Mobile styling */
        @media (max-width: 768px) {
          .animate-scroll-left img,
          .animate-scroll-right img {
            width: 8%;
            height: 180px;
          }
        }
      `}</style>
            </section>

        </>
    );
};

export default AboutUs;
