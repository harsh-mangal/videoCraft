import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Gunasri",
    text: "The team was professional, creative and attentive throughout the celebration. They captured natural emotions and important details beautifully, and the final photographs gave us memories we will always treasure.",
  },
  {
    name: "Geetanjali Sharma",
    text: "I booked Videocrafts for my sister’s wedding. The team was efficient, polite and patient. Mr. Abhir was humble and helpful, and everyone appreciated the way the team handled the functions.",
  },
  {
    name: "Kajal Jain",
    text: "We booked Abhir sir and his team for our wedding in Zirakpur. They created a friendly atmosphere, made us comfortable and delivered photographs and videos that we loved.",
  },
  {
    name: "Shruti Mehta",
    text: "A professional and punctual team that made the wedding enjoyable while capturing every guest and every important moment. Thank you to Abhir and the team for preserving our memories so beautifully.",
  },
  {
    name: "Sonali Batra",
    text: "We booked Videocrafts for our wedding functions and had a lovely experience. The team arrived on time, handled the events professionally and delivered wonderful photographs, videos and a memorable pre-wedding shoot.",
  },
];

const ReviewsSection = () => (
  <section className="mx-auto mb-14 max-w-7xl bg-white px-4">
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
      <div className="flex justify-center lg:col-span-1">
        <img src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/award.jpg?updatedAt=1758032457095" alt="Videocrafts photography award certificate" className="h-auto w-full rounded-lg shadow-md" loading="lazy" decoding="async" />
      </div>

      <div className="lg:col-span-2">
        <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3500, disableOnInteraction: false }} pagination={{ clickable: true }} spaceBetween={20} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 } }}>
          {reviews.map((review) => (
            <SwiperSlide key={review.name} className="h-auto pb-10">
              <article className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center">
                  <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200" aria-hidden="true">👤</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{review.name}</h3>
                    <p className="text-sm text-yellow-500" aria-label="5 out of 5 stars">★★★★★</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{review.text}</p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </section>
);

export default ReviewsSection;
