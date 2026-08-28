import Carousel from "../components/Carousel";
import ResponsiveImage from "../components/ResponsiveImage";
import { Star } from "lucide-react";

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

export default function ReviewsSection() {
  return <section aria-label="Client reviews" className="mx-auto mb-14 max-w-7xl bg-white px-4">
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
      <ResponsiveImage src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/award.jpg?updatedAt=1758032457095" alt="Videocrafts photography award certificate" className="mx-auto h-auto w-full max-w-sm rounded-lg" sizes="(min-width: 1024px) 33vw, 384px" />
      <div className="min-w-0 lg:col-span-2">
        <Carousel items={reviews} label="client reviews" renderItem={review =>
          <article className="min-h-64 rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="font-semibold text-gray-800">{review.name}</h3>
            <div className="mt-2 flex gap-1 text-amber-700" role="img" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, index) => <Star key={index} size={18} fill="currentColor" aria-hidden="true" focusable="false" />)}
            </div>
            <p className="mt-4 leading-relaxed text-gray-700">{review.text}</p>
          </article>
        } />
      </div>
    </div>
  </section>;
}
