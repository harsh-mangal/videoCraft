import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TalesOf = () => {
    const navigate = useNavigate();
    const sections = [
        {
            heading: "Introduction to the wedding story and the client",
            content: `Every couple has a unique story, but some shine brighter than others. Today, we’re diving into the enchanting wedding day of Emma and Jake—a celebration filled with love, laughter, and unforgettable moments. From their first encounter at a coffee shop to saying “I do” surrounded by family and friends, this wedding story is one for the books. Join us as we explore their journey from romance to vows in an event that beautifully captured the essence of true love.`,
        },
        {
            heading: "The love story of the couple, how they met and fell in love",
            content: `It all began on a rainy afternoon in a cozy coffee shop. Sarah, absorbed in her book, didn’t notice when Jack walked in. Their lives intertwined through an accidental brush of shoulders as he reached for the last blueberry muffin. That brief moment sparked curiosity. They struck up a conversation that flowed effortlessly. Laughter filled the air and time slipped away unnoticed. Over countless coffee dates and spontaneous adventures, their bond deepened. Weekend hikes turned into shared dreams under starlit skies. Each experience brought them closer together. Months later, during a romantic getaway at the beach, Jack asked Sarah to be his forever. With waves crashing around them and hearts full of hope, she said yes without hesitation. Their journey from strangers to soulmates is a testament to love’s beautiful unpredictability—one chance encounter can change everything.`,
        },
        {
            heading: "Planning for the big day: details and challenges",
            content: `Planning a wedding can be both thrilling and daunting. Every couple dreams of their perfect day, but achieving that vision requires careful attention to detail. The bride and groom dove into research, exploring venues, florists, and caterers. They created mood boards filled with colors and themes that reflected their personalities. Each decision was a blend of personal tastes and practicality. Challenges emerged along the way. Scheduling conflicts arose with vendors, adding stress to an already busy timeline. Budget constraints required sacrifices in some areas while splurging on others that mattered most. They turned to friends for support. Group brainstorming sessions transformed hurdles into creative solutions. Support from loved ones made everything more manageable while bringing joy back into planning. Every choice became part of their unique wedding story—a narrative woven through collaboration, love, and occasional chaos.`,
        },
        {
            heading: "Behind-the-scenes of the wedding day preparations",
            content: `The morning of the wedding was a whirlwind of excitement. The bride, surrounded by her closest friends, sipped mimosas while hair and makeup artists worked their magic. Laughter filled the air as they reminisced about old memories. In another room, the groom donned his tailored suit with help from his groomsmen. Their playful banter eased any pre-wedding jitters. Meanwhile, family members were busy setting up floral arrangements that had been meticulously planned for months. Every detail mattered—from personalized favors to handwritten vows placed in a special box. As photographers captured these candid moments, the anticipation grew stronger. Outside, guests began arriving early to admire the stunning venue adorned with twinkling lights and fresh blooms. Excitement crackled like electricity in the air as everyone prepared for what would become an unforgettable day full of love and joy.`,
        },
        {
            heading: "The ceremony: emotional moments and special touches",
            content: `As the sun began to set, casting a warm glow over the venue, guests settled into their seats. Anticipation filled the air. The couple stood at the altar, eyes locked in an embrace that spoke volumes. Vows were exchanged with heartfelt sincerity. Each word resonated deeply, echoing laughter and tears from loved ones nearby. Personal touches adorned every corner of the ceremony area—a family heirloom tucked into a bouquet and handwritten notes shared between them. A gentle breeze played through the trees as they lit a unity candle together. This simple act symbolized not just their love but also two families merging into one. Tears flowed freely during a surprise performance by close friends who serenaded them with their favorite song. It was an unforgettable moment that united everyone present in joy and celebration. Each detail wove together beautifully, creating memories destined to last a lifetime.`,
        },
        {
            heading: "Reception highlights: speeches, first dance, and more",
            content: `The reception buzzed with excitement as guests settled into their seats, eager to celebrate. Laughter filled the air, and heartfelt speeches began. Friends and family shared touching stories that highlighted the couple’s journey together. As the evening unfolded, it was time for the much-anticipated first dance. The newlyweds took center stage under shimmering lights. Their movements were graceful, a perfect blend of love and joy radiating from them. Following this romantic moment, everyone joined in on the dance floor. The music echoed through the venue, creating an unforgettable atmosphere filled with energy and celebration. It wasn’t just about dancing; it was about unity—the merging of two families celebrating love. Throughout the night, small details sparkled: personalized table settings adorned each space while delicious food delighted every guest’s palate. Each element contributed to a magical evening that would be remembered forever.`,
        },
        {
            heading: "Memorable moments captured on camera",
            content: `The wedding day unfolded like a beautifully scripted film, with each moment more enchanting than the last. As the couple exchanged vows, tears glistened in their eyes. The photographer captured that raw emotion perfectly. Laughter erupted during the reception when the best man shared an endearing story about the groom’s clumsiness on their first camping trip. It had everyone in stitches, and those candid shots showcased pure joy. And then there was that unforgettable first dance. The couple swayed gracefully under twinkling fairy lights, surrounded by loved ones. Each twirl spun memories into frames for years to come. As guests joined in later on the dance floor, spontaneous moments emerged—friends belting out lyrics together and children spinning wildly around them created a vibrant tapestry of life and love. These snapshots tell more than just a wedding story; they encapsulate laughter, tears, and everything in between—a beautiful mosaic of cherished memories.`,
        },
        {
            heading: "Advice for other couples planning their weddings",
            content: `Planning a wedding can feel overwhelming. Start by prioritizing what matters most to you as a couple. Whether it’s the venue, food, or entertainment, focus on those elements first. Don’t hesitate to ask for help from friends and family. They often have great ideas and can lend a hand with tasks that seem daunting. Set a realistic budget early on. It helps to avoid stress later when juggling various expenses. Remember that things may not go perfectly according to plan; embrace the unexpected moments instead of worrying about them. Lastly, take time for yourselves amidst all the chaos. Step back and enjoy each other’s company during this special journey together. Your love is what truly makes your wedding day memorable.`,
        },
        {
            heading: "Conclusion: celebrating love and marriage",
            content: `As we reflect on the beautiful wedding story of this lovely couple, it becomes evident that love truly knows no bounds. Their journey from meeting in a quaint coffee shop to saying “I do” was marked by laughter, challenges, and unwavering commitment. Each detail of their special day showcased their personalities and shared history. From the intimate ceremony surrounded by close friends and family to the lively reception filled with dance and joy, every moment radiated happiness. Captured through stunning photography, these memories will be cherished for years to come. The heartfelt speeches shared during the reception highlighted not only their love but also the support they have from those around them. The first dance served as a reminder of how far they’ve come together—each twirl signifying milestones achieved hand-in-hand. For any couple planning their own wedding story, take note: embrace each unique challenge as part of your adventure together. Focus on what matters most—your love—and let everything else fall into place. Celebrating love is what weddings are all about. It’s a testament to two people committing to one another amidst life’s chaos. Here’s to cherishing those moments today and always!`,
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
            img: "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp-1.jpg?updatedAt=1758112615847",
            title: "From ‘I Do’ to Forever | Celebrating a Client’s Unique Wedding Experience",
            link: "/From-‘I-Do’-to%20Forever",
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
                        Tales of Romance | Highlighting a Client’s Beautiful Wedding Day
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
                            src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wp-3.jpg?updatedAt=1758112697885"
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

export default TalesOf;
