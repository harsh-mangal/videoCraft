import { Link } from "react-router-dom";
import ResponsiveImage from "../components/ResponsiveImage";

export default function Banner() {
  return <section className="relative isolate flex min-h-[480px] items-center justify-center overflow-hidden bg-[#24251f] px-6 py-16 text-center text-white sm:min-h-[560px] lg:min-h-[680px]">
    <ResponsiveImage src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/banner.jpg?updatedAt=1758019513834" alt="" priority width={1600} height={1067} sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover" />
    <div className="absolute inset-0 -z-10 bg-black/50" />
    <div className="mx-auto max-w-3xl">
      <ResponsiveImage src="https://ik.imagekit.io/sqpcbo0c0/Video%20Craft/logo__1_-removebg-preview.png?updatedAt=1758019179068" alt="Videocrafts India" width={400} sizes="240px" loading="eager" className="mx-auto mb-6 h-auto w-48 sm:w-60" />
      <h1 className="font-serif text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl">Wedding photographers in Chandigarh</h1>
      <p className="mt-5 font-serif text-xl italic sm:text-2xl">Crafting timeless visuals of your story</p>
      <Link to="/about" className="mt-8 inline-flex min-h-11 items-center rounded border border-white px-6 py-3 transition-colors hover:bg-white hover:text-black">Meet Videocrafts India</Link>
    </div>
  </section>;
}
