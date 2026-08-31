import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import ResponsiveImage from "../components/ResponsiveImage";

const preWeddingImages = [
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/pre-wedding-3%20(1).jpg?updatedAt=1758021539395",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/Pre-wedding-2.jpg?updatedAt=1758021539102",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/Pre-wedding-1.jpg?updatedAt=1758021538373",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/pre-wedding-2%20(1).jpg?updatedAt=1758021538111",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/Pre-wedding.jpg?updatedAt=1758021537920",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/pre-wedding%20(1).jpg?updatedAt=1758021537818",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/Pre-wedding-10.jpg?updatedAt=1758021537778",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/Pre-wedding-9.jpg?updatedAt=1758021537731",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/Pre-wedding-5.jpg?updatedAt=1758021533405",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/Pre%20Wedding/pre-wedding-6%20(2).jpg?updatedAt=1758021533357",
];

const weddingImages = [
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding-1.jpg?updatedAt=1758024050924",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding.jpg?updatedAt=1758024050896",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding-3.jpg?updatedAt=1758024050891",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding-5.jpg?updatedAt=1758024050814",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding-4.jpg?updatedAt=1758024050644",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding-6.jpg?updatedAt=1758024050644",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/bridal-portraits.jpg?updatedAt=1758024050627",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding-2.jpg?updatedAt=1758024050544",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/wedding/Wedding-7.jpg?updatedAt=1758024050358",
];

const juniorImages = [
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/junior-6.jpg?updatedAt=1758024179335",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/junior-3.jpg?updatedAt=1758024179268",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/junior-1.jpg?updatedAt=1758024179156",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/junior.jpg?updatedAt=1758024179151",
    "https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/junior/junior-2.jpg?updatedAt=1758024179185",
];

const portfolios = [
  { title: "Wedding", href: "/bridal-portraits", images: weddingImages },
  { title: "Pre-wedding", href: "/pre-wedding", images: preWeddingImages },
  { title: "Videocrafts Junior", href: "/videocrafts-junior", images: juniorImages },
];

export default function WeddingSection() {
  return <section className="bg-[#f4f0ed] px-4 py-24">
    <div className="mx-auto max-w-7xl">
      <p className="luxury-kicker text-center">Selected portfolios</p>
      <h2 className="section-heading mx-auto mt-4 max-w-4xl text-center">Stories that deserve to feel timeless</h2>
      <p className="mx-auto mt-5 max-w-3xl text-center leading-relaxed text-[#686861]">We turn life's most precious moments into timeless memories. Through photography and videography, we capture the emotions and stories that matter most.</p>
      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {portfolios.map(portfolio => <div key={portfolio.href} className="min-w-0">
          <Carousel items={portfolio.images} label={portfolio.title + " photographs"} renderItem={(src, index) =>
            <Link to={portfolio.href} aria-label={"Explore " + portfolio.title + " photography"}>
              <ResponsiveImage src={src} alt={portfolio.title + " photography, portfolio image " + (index + 1)} sizes="(min-width: 768px) 33vw, 100vw" className="luxury-image aspect-[4/5] w-full object-cover" />
            </Link>
          } />
          <h3 className="mt-6 text-center font-serif text-3xl"><Link to={portfolio.href} className="luxury-text-link">{portfolio.title}</Link></h3>
        </div>)}
      </div>
      <p className="mt-12 text-center text-lg text-[#5E5E56]">Live your magic and preserve your precious memories.</p>
    </div>
  </section>;
}
