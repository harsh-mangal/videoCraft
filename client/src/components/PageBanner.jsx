import ResponsiveImage from "./ResponsiveImage";
import { Link, useLocation } from "react-router-dom";
import { getPageMeta } from "../config/seo";
import { ArrowRight } from "lucide-react";

export default function PageBanner({ image, title }) {
  const { pathname } = useLocation();
  return <><header className="luxury-page-banner relative isolate flex min-h-80 items-center justify-center overflow-hidden bg-[#24251f] px-4 py-16 text-center sm:min-h-[460px] lg:min-h-[560px]">
    <ResponsiveImage src={image} alt="" priority width={1600} sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover" />
    <div className="luxury-hero-overlay absolute inset-0 -z-10" />
    <div>
      <p className="luxury-kicker mb-5 text-white/80">Videocrafts India</p>
      <h1 className="font-serif text-5xl font-normal text-white sm:text-6xl lg:text-7xl">{title}</h1>
    </div>
  </header>
    <div className="mx-auto max-w-3xl px-5 pb-4 pt-12 text-center">
      <p className="leading-relaxed text-[#62625A]">{getPageMeta(pathname).description}</p>
      <Link to="/contact" className="luxury-text-link mt-5 inline-flex min-h-11 items-center gap-2 font-medium">Plan your photography session <ArrowRight size={18} className="shrink-0" aria-hidden="true" focusable="false" /></Link>
    </div>
  </>;
}
