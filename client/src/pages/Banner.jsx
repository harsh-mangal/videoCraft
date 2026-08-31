import { Link } from "react-router-dom";
import ResponsiveImage from "../components/ResponsiveImage";

export default function Banner() {
  return <section className="luxury-hero relative isolate flex min-h-[560px] items-center justify-center overflow-hidden bg-[#24251f] px-6 py-20 text-center text-white sm:min-h-[650px] lg:min-h-[760px]">
    <ResponsiveImage src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/banner.jpg?updatedAt=1758019513834" alt="" priority width={1600} height={1067} sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover" />
    <div className="luxury-hero-overlay absolute inset-0 -z-10" />
    <div className="luxury-hero-copy mx-auto max-w-4xl">
      <ResponsiveImage src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/logo__1_-removebg-preview.png?updatedAt=1758019179068" alt="Videocrafts India" width={400} sizes="240px" loading="eager" className="mx-auto mb-8 h-auto w-44 brightness-0 invert sm:w-56" />
      <p className="luxury-kicker text-white/90">Chandigarh · Established in the 1980s</p>
      <h1 className="mt-5 font-serif text-5xl font-normal leading-[0.98] sm:text-6xl lg:text-7xl">Wedding photography,<br className="hidden sm:block" /> shaped like cinema</h1>
      <p className="mx-auto mt-6 max-w-2xl font-serif text-xl italic text-white/90 sm:text-2xl">Honest emotion. Artful light. Timeless stories.</p>
      <Link to="/about" className="luxury-button mt-10 inline-flex min-h-12 items-center px-8 py-3">Discover our story</Link>
    </div>
  </section>;
}
