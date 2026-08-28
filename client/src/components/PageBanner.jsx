import ResponsiveImage from "./ResponsiveImage";
import { Link, useLocation } from "react-router-dom";
import { getPageMeta } from "../config/seo";
import { ArrowRight } from "lucide-react";

export default function PageBanner({ image, title }) {
  const { pathname } = useLocation();
  return <><header className="relative isolate flex min-h-80 items-center justify-center overflow-hidden bg-[#24251f] px-4 py-16 text-center sm:min-h-[440px] lg:min-h-[520px]">
    <ResponsiveImage src={image} alt="" priority width={1600} sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover" />
    <div className="absolute inset-0 -z-10 bg-black/40" />
    <h1 className="font-serif text-4xl font-semibold uppercase text-white sm:text-5xl lg:text-6xl">{title}</h1>
  </header>
    <div className="mx-auto max-w-3xl px-5 pt-10 text-center">
      <p className="leading-relaxed text-[#62625A]">{getPageMeta(pathname).description}</p>
      <Link to="/contact" className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium underline underline-offset-4">Plan your photography session <ArrowRight size={18} className="shrink-0" aria-hidden="true" focusable="false" /></Link>
    </div>
  </>;
}
