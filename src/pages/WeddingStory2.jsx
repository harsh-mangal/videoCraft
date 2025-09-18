import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const WeddingStory2 = () => {
    const navigate=useNavigate();
    const sections = [
        {
            heading: "Introduction to the client and their unique love story",
            content: `Every love story is unique, and when it comes to weddings, the magic often lies in the details that reflect a couple’s journey. Meet Sarah and Jake—a dynamic duo whose romance blossomed over shared adventures and late-night conversations. Their wedding was not just an event; it was a beautiful tapestry woven from their personalities, dreams, and cherished moments together. From their first encounter at a local coffee shop to traveling the world hand in hand, each chapter of their relationship inspired elements of their big day. Join us as we dive into Sarah and Jake’s extraordinary wedding story—an unforgettable celebration filled with personal touches that made every moment truly theirs.`,
        },
        {
            heading: "The wedding planning process and how the couple made it their own",
            content: `Planning a wedding can feel overwhelming, but for this couple, it was an adventure. They decided to embrace their unique personalities. Instead of following traditional norms, they infused creativity into every detail. From the venue selection to the color scheme, each choice reflected who they are as individuals and as partners. One memorable decision was opting for a garden setting rather than a typical hall. This intimate location allowed them to incorporate nature’s beauty into their celebration. The couple also took charge of crafting personalized vows that truly expressed their feelings—no generic templates here! They wanted every guest to feel the depth of their commitment. By collaborating closely with local artisans, they added handcrafted elements like custom centerpieces and one-of-a-kind favors. Each item told a story, making everything feel even more special on their big day.`,
        },
        {
            heading: "Personal touches and details that made the wedding special",
            content: `Every wedding tells a story, and personal touches can make it truly unique. For this couple, their love for art inspired the décor. They commissioned local artists to create beautiful pieces that adorned the venue. The centerpieces featured handcrafted pottery, each symbolizing a cherished memory they shared. Guests were invited to take these home as keepsakes, ensuring everyone left with a piece of their journey. A custom playlist echoed throughout the celebration, filled with songs that marked significant moments in their relationship. Each note resonated with heartfelt memories and laughter. Even the vows were personalized; they included anecdotes from their early days together that brought smiles and tears alike. These details transformed an ordinary ceremony into an extraordinary testament of love.`,
        },
        {
            heading: "Highlights from the ceremony and reception",
            content: `The ceremony unfolded in an enchanting garden, filled with blooming flowers and a soft breeze. The couple exchanged vows under a stunning archway adorned with vibrant colors. Their heartfelt promises echoed through the air, bringing tears to many eyes. As guests made their way to the reception, they were welcomed by twinkling fairy lights and rustic table settings. Each detail reflected the couple’s unique style—from custom centerpieces featuring family mementos to hand-written place cards that added a personal touch. During dinner, laughter filled the room as loved ones shared stories about the couple’s journey together. A surprise dance performance from friends brought everyone to their feet. Later in the evening, a fireworks display lit up the night sky—an unexpected twist that left guests awestruck. Each moment was crafted with love and intention, making it truly unforgettable for everyone involved.`,
        },
        {
            heading: "Advice for other couples planning their wedding",
            content: `When planning a wedding, communication is key. Share your thoughts and feelings openly with each other. This strengthens your bond as you navigate the details together. Set a budget that makes sense for both of you. Prioritize what matters most, whether it’s the venue, food, or entertainment. Flexibility can go a long way when unexpected expenses arise. Don’t hesitate to ask for help from family and friends. They often want to support you and may even have valuable skills or connections to offer. Remember to infuse your personalities into every element of your celebration. From the décor to the playlist, make choices that resonate with both of you. Lastly, take breaks during planning sessions. It’s easy to get overwhelmed by all the decisions—step back and enjoy moments as they come without stress. Embrace this journey together; it’s just one chapter in your beautiful love story.`,
        },
        {
            heading: "Special moments or surprises that made the day even more unforgettable",
            content: `As the sun dipped below the horizon, a surprise flash mob erupted on the dance floor. Guests cheered as friends and family joined in sync, showcasing their best moves. The couple stood in awe, laughter echoing through the venue. This unexpected twist brought everyone together, celebrating love through spontaneous joy. Later in the evening, a heartfelt video montage played. Friends shared messages from various stages of life—childhood memories to college antics—reminding everyone how far they’d come. A late-night snack bar featuring the couple’s favorite comfort foods had guests buzzing with excitement. From gourmet sliders to mini milkshakes, it was a delicious nod to their shared love for culinary adventures. Every moment felt curated just for them—a blend of sentiment and fun that elevated their wedding story into something truly unforgettable.`,
        },
        {
            heading: "How the couple plans to keep the magic alive in their marriage",
            content: `To keep the magic alive, they plan to prioritize date nights. A simple dinner at their favorite restaurant or a cozy movie night at home can reignite that initial spark. They also believe in the power of small surprises. Leaving little notes for each other or planning spontaneous weekend getaways adds excitement to their routine. Communication is key for them. They have set aside time each week to discuss their dreams and goals. This openness strengthens their bond. Additionally, they cherish traditions from both families, incorporating those into regular celebrations. These rituals remind them of where they came from and the love that surrounds them. Lastly, embracing adventure together fuels their connection. Whether it’s hiking new trails or trying out a dance class, exploring life hand-in-hand keeps things fresh and vibrant.`,
        },
        {
            heading: "Conclusion, celebrating love and individuality in weddings",
            content: `As we wrap up this beautiful wedding story, it’s clear that love is a remarkable journey. Each couple has their own unique path to walk, and those paths often weave together in the most unexpected ways. This client’s wedding was not just about two people saying “I do”; it was a celebration of their individuality and shared experiences. Every detail reflected who they are as a couple—from personalized vows to hand-crafted centerpieces that told their story. The laughter, tears, and heartfelt moments created an atmosphere of joy and authenticity. This day will forever be etched in the memories of everyone involved—a true testament to how love can inspire creativity and connection. As couples embark on their own journeys toward marriage, remember that it’s your unique narrative that makes your celebration special. Embrace what sets you apart; let your personalities shine through every choice you make. Love knows no boundaries or templates, so celebrate yours in all its glory! Here’s to many more stories like this one—filled with joy, originality, and everlasting love.`,
        },
    ];

      const relatedPosts = [
        {
            img: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp.jpg?updatedAt=1758112778257",
            title: "Every Love Has a Story | Client Chronicles Their Unforgettable Wedding Day",
            link: "/Unforgettable-Wedding-Day",
            meta: "Leave a Comment / Wedding Stories / By videocraftsindia",
        },
        {
            img: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp-3.jpg?updatedAt=1758112697885",
            title: "Tales of Romance | Highlighting a Client’s Beautiful Wedding Day",
            link: "/tales-off-romance",
            meta: "Leave a Comment / Wedding Stories / By videocraftsindia",
        },
    ];

    return (
        <>
        <div className="bg-[#f0f5fa]">
            <div className="max-w-6xl mx-auto px-4 py-12 bg-white pr-8 pl-8">


                {/* Top Heading */}
                <motion.h2
                    className="text-[#1E293B] font-semibold mb-4 text-2xl sm:text-3xl md:text-4xl"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    From ‘I Do’ to Forever | Celebrating a Client’s Unique Wedding Experience
                </motion.h2>

                {/* Date */}
                <motion.p
                    className="text-[#046bd0] font-medium mb-6"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    November 18, 2024
                </motion.p>

                {/* Main Image */}
                <motion.div
                    className="mb-8 overflow-hidden rounded-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <img
                        src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp-1.jpg?updatedAt=1758112615847"
                        alt="Wedding Story"
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </motion.div>

                {/* Sections */}
                <div className="space-y-6 text-[#7A7A7A]" style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", fontWeight: 400, lineHeight: "1.8" }}>
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <h3 className="text-[#1E293B] font-semibold text-xl mb-2" style={{ fontFamily: "Roboto, sans-serif" }}>
                                {section.heading}
                            </h3>
                            <p>{section.content}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

         {/* Related Posts Section */}
            <div className="bg-[#f0f5fa]">
                <div className="max-w-6xl mx-auto px-4 py-12 bg-white pr-8 pl-8 bg-white">
                    <h2
                        className="text-[#1E293B] font-semibold mb-6 text-2xl"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                        Related Posts
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {relatedPosts.map((post, idx) => (
                            <div key={idx} className="cursor-pointer" onClick={() => navigate(post.link)}>
                                <img
                                    src={post.img}
                                    alt={post.title}
                                    className="w-full h-52 object-cover rounded-md mb-4"
                                />
                                <h3
                                    className="text-lg font-semibold text-[#1E293B] mb-2"
                                    style={{ fontFamily: "Roboto, sans-serif" }}
                                >
                                    {post.title}
                                </h3>
                                <p className="text-[#046bd0] text-sm">{post.meta}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
};

export default WeddingStory2;
