import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const WeddingStory3 = () => {
    const navigate = useNavigate();
    const sections = [
        {
            heading: "Introduction to the Client’s Love Story",
            content: `Every love story is unique, filled with its own twists and turns. Some start as childhood crushes, while others bloom from unexpected friendships. For one couple, their journey was a blend of fate and laughter that ultimately led to an unforgettable wedding day. Meet Sarah and Tom. From the moment they met at a mutual friend’s party, sparks flew. They bonded over shared interests—from their love for adventure to late-night movie marathons. Their connection deepened through countless dates and heartfelt conversations. As we dive into their beautiful wedding story, prepare yourself for moments of joy, chaos in planning, and reflections on what truly matters when two people commit to forever. This is not just another tale of “I do,” but rather a celebration of love’s unpredictable nature—filled with surprises that made their big day all the more memorable!`,
        },
        {
            heading: "The Proposal: How it All Began",
            content: `It was a crisp autumn day, the leaves painted in vibrant hues. James had planned everything down to the last detail. He wanted it to be perfect. They strolled through a charming park, hand in hand. Laughter filled the air as they reminisced about their favorite memories together. Suddenly, he led her to a hidden alcove adorned with twinkling fairy lights. He took a deep breath and knelt on one knee, pulling out a small velvet box. Her heart raced as she realized what was happening. Time seemed to stand still. “Will you marry me?” he asked, eyes sparkling with hope and love. Tears welled up as she nodded vigorously, overwhelmed by joy. The world around them faded away; it was just the two of them in that magical moment. Their engagement marked the beginning of an unforgettable journey—a true wedding story waiting to unfold.`,
        },
        {
            heading: "Planning the Wedding: The Good, the Bad, and the Hilarious",
            content: `Planning a wedding can feel like an exhilarating rollercoaster ride. One minute, you’re picking out the perfect flowers; the next, you’re knee-deep in seating charts. Every couple faces challenges. There were moments when our clients questioned their sanity as they navigated vendor contracts and budget constraints. But with each obstacle came laughter and memories to cherish. Then there were those hilarious mishaps—like the time the cake arrived a day early! Imagine their surprise when they found two layers of frosting sitting in their kitchen while they scrambled through final touches. The good times had them bonding over DIY projects, creating personalized favors that reflected their unique style. These experiences brought them closer together, making every stressful moment worth it. Wedding planning may not always be smooth sailing, but it certainly has its share of unforgettable stories along the way.`,
        },
        {
            heading: "The Big Day: Special Moments and Unexpected Surprises",
            content: `The sun peeked through the clouds, casting a warm glow on the wedding venue. Excitement filled the air as guests arrived, each face beaming with joy. As she walked down the aisle, every eye was glued to her. The moment felt surreal. Time stood still while soft music drifted in from all corners. Then came the vows—raw and heartfelt. Laughter erupted when they mixed up their lines, turning an emotional moment into pure comedy. Unexpected surprises were around every corner. A surprise dance number by family left everyone in stitches. And just when it seemed nothing could top that, a sudden rain shower added an unplanned twist to outdoor festivities. Despite minor hiccups, laughter echoed throughout the day. Each special moment became part of their unique wedding story—a tapestry woven with love and spontaneity that no one would soon forget.`,
        },
        {
            heading: "Reflections from the Bride and Groom",
            content: `Looking back on their wedding day, the bride and groom couldn’t help but smile. Each moment felt like a scene from a dream. They cherished every laugh shared with family and friends. The bride described walking down the aisle as surreal. Her heart raced with joy and anticipation. Every face she saw radiated love, amplifying her happiness. For the groom, seeing his partner in that stunning dress was unforgettable. He recalls feeling overwhelmed by emotion as she approached him, surrounded by blooms they had chosen together. They both laughed at little mishaps—like the cake wobbling during cutting—and how those moments became part of their unique story. As they reflected on vows exchanged under twinkling lights, gratitude filled their hearts. It wasn’t just about perfection; it was about authenticity and connection, making each element truly theirs.`,
        },
        {
            heading: "Advice for Future Brides and Grooms",
            content: `Embrace the chaos. Wedding planning can be wild, but it’s part of your unique journey together. Remember, it’s about you two. Communicate openly with each other and loved ones. Share your visions and listen to feedback, but stay true to what makes you happy. Don’t sweat the small stuff. Unexpected hiccups will happen—you might even find them hilarious later on! Allocate some “me time.” Amidst all the preparations, take moments for just the two of you. It strengthens your bond. Lastly, savor every moment on the big day. Time flies by; take mental snapshots that you’ll cherish forever. This is a celebration of love—let that shine through!`,
        },
        {
            heading: "Photos from the Wedding Day",
            content: `The wedding day was a visual feast, captured in stunning photographs. Every frame told a story—laughter, tears, and joy radiated from each image. From the moment the bride stepped into her dress until the last dance of the evening, every detail sparkled. The vibrant bouquet contrasted beautifully against her gown. The groom’s smile as he saw his bride for the first time is priceless. Candid shots reveal genuine moments between family members and friends. An aunt wiping away happy tears or cousins sharing silly jokes added warmth to the album. The venue looked magical under string lights with soft hues illuminating guests’ faces during dinner. These images freeze precious memories in time, allowing everyone to relive that special day again and again. Each photo serves as a reminder of love’s power—a testament to an unforgettable journey shared by two hearts intertwined forever.`,
        },
        {
            heading: "Conclusion: A Love Story for the Ages",
            content: `Every love story is unique. This wedding tale shines brightly among them. From the heartfelt proposal to the laughter-filled planning stages, each moment crafted an unforgettable journey. On their special day, they celebrated not just their love but also friendship and family bonds. Special moments—like shared glances during vows or unexpected surprises that had everyone laughing—made it truly memorable. As they reflect on their big day, both bride and groom express gratitude for every little detail. Their advice resonates with couples everywhere: cherish the process and embrace spontaneity. This love story showcases how beautiful life can be when two hearts unite. It’s a reminder of what truly matters—the connections we build and celebrate together. A timeless narrative that will inspire generations to come, this couple’s wedding story exemplifies joy, resilience, and unwavering commitment in the ever-changing landscape of love.`,
        },
    ];

    const relatedPosts = [
        {
            img: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp-1.jpg?updatedAt=1758112615847",
            title: "From ‘I Do’ to Forever | Celebrating a Client’s Unique Wedding Experience",
            link: "/From-‘I-Do’-to%20Forever",
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
                        Every Love Has a Story | Client Chronicles Their Unforgettable Wedding Day
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
                            src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp.jpg?updatedAt=1758112778257"
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

export default WeddingStory3;
