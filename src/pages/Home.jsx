import React from "react";
import Banner from "./Banner";
import WeddingSection from "./WeddingSection";
import ClientFeedback from "./ClientFeedBack";
import LegacySection from "./LagacySection";
import WeddingStories from "./WeddingStories";
import HeroSection from "./HeroSection";
import ContactSection from "./ContactSection";


const Home = () => {
    return (
        <div className="bg-white">
            <Banner />
            <WeddingSection />
            <ClientFeedback />
            <LegacySection />
            <WeddingStories />
            <HeroSection />
            <ContactSection />
        </div>
    )
}

export default Home;