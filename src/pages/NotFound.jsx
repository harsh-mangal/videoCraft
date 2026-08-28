import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <section className="min-h-[60vh] bg-[#f4f0ed] px-4 py-24 text-center flex items-center justify-center">
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-[#84847C]">404</p>
      <h1 className="mt-4 text-4xl sm:text-5xl font-semibold text-[#4D504A]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-[#6C6C63]">
        The page may have moved or the address may be incorrect.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-md border border-[#4D504A] px-6 py-3 text-[#4D504A] transition hover:bg-[#4D504A] hover:text-white"
      >
        Return home
      </Link>
    </div>
  </section>
);

export default NotFound;
