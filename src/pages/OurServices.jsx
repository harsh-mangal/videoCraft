import React from "react";

const services = [
    {
        img: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/camra.png?updatedAt=1758103560595",
        title: "Wedding Photography",
        desc: "We provide expert wedding photography services, capturing every special moment with creativity and attention to detail. From candid emotions to grand celebrations, we deliver timeless images that tell the story of your big day."
    },
    {
        img: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/pre.png?updatedAt=1758103560528",
        title: "Pre-Wedding Photography",
        desc: "We offer bespoke pre-wedding photography services, combining stunning locations, creative styling, and expert guidance to capture your love story. We ensure a seamless and enjoyable experience, delivering breathtaking images that reflect your unique journey."
    },
    {
        img: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/newborn.png?updatedAt=1758103560471",
        title: "Newborn Shoots",
        desc: "We are specialized in newborn photography, offering gentle and creative sessions to capture your baby’s first precious milestones. With a focus on safety, comfort, and stunning details, we create beautiful memories that last a lifetime."
    },
    {
        img: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/product.png?updatedAt=1758103559991",
        title: "Product Photography",
        desc: "Our company delivers professional product photography services, creating high-quality, visually appealing images that highlight your products' best features. With precise lighting and styling, we ensure your brand stands out across e-commerce, marketing, and advertising platforms."
    },
    {
        img: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/food.png?updatedAt=1758103560216",
        title: "Food Photography",
        desc: "Our company offers specialized food photography services, crafting mouthwatering images that showcase the texture, color, and appeal of each dish. Using expert lighting and styling techniques, we bring your culinary creations to life for menus, advertisements, and social media."
    },
    {
        img: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/shootes.png?updatedAt=1758103560188",
        title: "Maternity Shoots",
        desc: "We offer maternity shoot services that celebrate the beauty and joy of pregnancy through artistic and heartfelt photography. We provide personalized sessions in serene settings, ensuring comfort while capturing this precious journey."
    }
];

const OurServices = () => {
    return (
        <section>
            {/* Banner */}
            <div
                className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-white"
                style={{
                    backgroundImage: `url('https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/bg.jpg?updatedAt=1758103560393')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <h2 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest text-center px-4">
                    Our Services
                </h2>
            </div>


            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 mt-2">
                {services.map((service, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-xl shadow-lg p-6 h-[350px] flex flex-col hover:shadow-2xl transition duration-300"
                    >
                        {/* Icon Left */}
                        <div className="mb-4">
                            <img
                                src={service.img}
                                alt={service.title}
                                className="w-16 h-16 object-contain"
                            />
                        </div>

                        {/* Title */}
                        <h3
                            className="mb-3"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                fontSize: "25px",
                                fontWeight: 600,
                                color: "#4D504A",
                            }}
                        >
                            {service.title}
                        </h3>

                        {/* Description */}
                        <p
                            className="text-sm"
                            style={{
                                fontFamily: '"Mulish", sans-serif',
                                fontSize: "15px",
                                fontWeight: 400,
                                color: "#84847C",
                            }}
                        >
                            {service.desc}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-left w-full h-full  transition duration-300">
                <img
                    src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/landing-img-18.png?updatedAt=1758085212783"
                    alt="icon"
                    className="w-27 h-27 object-contain ml-24"
                />
            </div>

        </section>
    );
};

export default OurServices;
