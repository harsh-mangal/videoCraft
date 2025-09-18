import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ReviewsSection = () => {
  return (
    <div className="bg-white px-4 mb-14 max-w-8xl">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        
        {/* Left Column - Award Certificate */}
        <div className="flex justify-center lg:col-span-1">
          <img
            src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/award.jpg?updatedAt=1758032457095"
            alt="Award"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Right Column - Reviews Carousel */}
        <div className="lg:col-span-2">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
            }}
            
          >
            {/* Review 1 - Gunasri */}
            <SwiperSlide>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-gray-600 text-lg">👤</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Gunasri</p>
                    <div className="text-yellow-400 text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  They were thrilled with the service! The wedding vendors went
                  above and beyond, ensuring every detail was perfect. From floral
                  arrangements to catering, everything was professional and
                  creative. Highly recommend their exceptional services!
                </p>
              </div>
            </SwiperSlide>

            {/* Review 2 - Geetanjali Sharma */}
            <SwiperSlide>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-gray-600 text-lg">👤</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Geetanjali Sharma</p>
                    <div className="text-yellow-400 text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  I booked Videocrafts for my sister’s wedding. The team was
                  efficient, polite, and patient. Mr. Abhir is one of the most
                  humble people I’ve met. Everyone praised the team—one of the
                  best in Tricity!
                </p>
              </div>
            </SwiperSlide>

            {/* Review 3 - Kajal Jain */}
            <SwiperSlide>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-gray-600 text-lg">👤</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Kajal Jain</p>
                    <div className="text-yellow-400 text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We booked Abhir sir and his team for our small wedding in
                  Zirakpur. They created a fun, friendly environment and treated
                  us like family. The photos and videos were amazing! We’ll book
                  them again for sure.
                </p>
              </div>
            </SwiperSlide>

            {/* Review 4 - Shruti Mehta */}
            <SwiperSlide>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-gray-600 text-lg">👤</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Shruti Mehta</p>
                    <div className="text-yellow-400 text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Such a great team! They made the wedding fun, were professional
                  and punctual, and clicked amazing photos. Every guest got their
                  pictures clicked. Thank you Angu and team for capturing our
                  memories so beautifully!
                </p>
              </div>
            </SwiperSlide>

            {/* Review 5 - Duplicate Shruti Mehta (as in original) */}
            <SwiperSlide>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-gray-600 text-lg">👤</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Shruti Mehta</p>
                    <div className="text-yellow-400 text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Such a great team! They made the wedding fun, were professional
                  and punctual, and clicked amazing photos. Every guest got their
                  pictures clicked. Thank you Angu and team for capturing our
                  memories so beautifully!
                </p>
              </div>
            </SwiperSlide>

            {/* Review 6 - Sonali Batra */}
            <SwiperSlide>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-gray-600 text-lg">👤</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Sonali Batra</p>
                    <div className="text-yellow-400 text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We booked Videocrafts for our wedding functions and had a lovely
                  experience. The photos and videos were amazing! The team was on
                  time, professional, and even did a great pre-wedding shoot.
                </p>
              </div>
            </SwiperSlide>

          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
