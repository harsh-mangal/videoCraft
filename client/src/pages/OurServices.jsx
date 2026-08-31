import PageBanner from "../components/PageBanner";
import { Baby, Camera, Flower2, HandHeart, Heart, Package, Utensils } from "lucide-react";
import React from "react";

const services = [
    {
        icon: Camera,
        title: "Wedding Photography",
        desc: "We provide expert wedding photography services, capturing every special moment with creativity and attention to detail. From candid emotions to grand celebrations, we deliver timeless images that tell the story of your big day."
    },
    {
        icon: Heart,
        title: "Pre-Wedding Photography",
        desc: "We offer bespoke pre-wedding photography services, combining stunning locations, creative styling, and expert guidance to capture your love story. We ensure a seamless and enjoyable experience, delivering breathtaking images that reflect your unique journey."
    },
    {
        icon: Baby,
        title: "Newborn Shoots",
        desc: "We specialize in newborn photography, offering gentle and creative sessions to capture your baby’s first precious milestones. With a focus on safety, comfort, and stunning details, we create beautiful memories that last a lifetime."
    },
    {
        icon: Package,
        title: "Product Photography",
        desc: "Our company delivers professional product photography services, creating high-quality, visually appealing images that highlight your products' best features. With precise lighting and styling, we ensure your brand stands out across e-commerce, marketing, and advertising platforms."
    },
    {
        icon: Utensils,
        title: "Food Photography",
        desc: "Our company offers specialized food photography services, crafting mouthwatering images that showcase the texture, color, and appeal of each dish. Using expert lighting and styling techniques, we bring your culinary creations to life for menus, advertisements, and social media."
    },
    {
        icon: HandHeart,
        title: "Maternity Shoots",
        desc: "We offer maternity shoot services that celebrate the beauty and joy of pregnancy through artistic and heartfelt photography. We provide personalized sessions in serene settings, ensuring comfort while capturing this precious journey."
    }
];

const OurServices = () => {
    return (
        <section>
            {/* Banner */}
            <PageBanner title="Our Services" image="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/bg.jpg?updatedAt=1758103560393" />


            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 mt-2">
                {services.map((service, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-xl shadow-lg p-6 h-full min-h-[350px] flex flex-col hover:shadow-2xl transition duration-300"
                    >
                        {/* Icon Left */}
                        <div className="mb-4">
                            <service.icon className="h-16 w-16 text-[#4D504A]" strokeWidth={1.5} aria-hidden="true" focusable="false" />
                        </div>

                        {/* Title */}
                        <h2
                            className="mb-3"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                fontSize: "25px",
                                fontWeight: 600,
                                color: "var(--theme-heading)",
                            }}
                        >
                            {service.title}
                        </h2>

                        {/* Description */}
                        <p
                            className="text-sm"
                            style={{
                                fontFamily: '"Mulish", sans-serif',
                                fontSize: "15px",
                                fontWeight: 400,
                                color: "var(--theme-text)",
                            }}
                        >
                            {service.desc}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-start w-full h-full  transition duration-300">
                <Flower2 className="mx-auto h-24 w-24 text-[#757b66] sm:h-28 sm:w-28 md:mx-0 md:ml-12" strokeWidth={1} aria-hidden="true" focusable="false" />
            </div>

        </section>
    );
};

export default OurServices;
