import { useId, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Manual controls keep reading time in the visitor's hands and avoid autoplay motion.
export default function Carousel({ items, label, renderItem }) {
  const [index, setIndex] = useState(0);
  const id = useId();
  const move = delta => setIndex(current => (current + delta + items.length) % items.length);
  if (!items.length) return null;
  return <section aria-label={label} aria-roledescription="carousel">
    <div id={id} aria-live="polite" aria-atomic="true">{renderItem(items[index], index)}</div>
    {items.length > 1 && <div className="mt-3 flex items-center justify-between gap-3">
      <button type="button" className="carousel-control" onClick={() => move(-1)} aria-label={"Previous " + label} aria-controls={id}><ChevronLeft aria-hidden="true" /></button>
      <span className="text-sm text-[#5E5E56]" aria-live="polite">{index + 1} / {items.length}</span>
      <button type="button" className="carousel-control" onClick={() => move(1)} aria-label={"Next " + label} aria-controls={id}><ChevronRight aria-hidden="true" /></button>
    </div>}
  </section>;
}
