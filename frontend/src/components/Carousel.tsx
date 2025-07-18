import { ReactNode, useRef, useState, useEffect } from "react";

const CARD_MIN_WIDTH = 280; // px
const SIDE_PADDING_DESKTOP = 64; // px (pl-16 pr-16)
const SIDE_PADDING_MOBILE = 24; // px (pl-6 pr-6)

export function Carousel({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(1);
  const [start, setStart] = useState(0);

  // Convert children to array
  const items = Array.isArray(children) ? children : [children];
  const total = items.length;

  // Responsive visible count based on container width minus side paddings
  useEffect(() => {
    function updateVisibleCount() {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      // Use matchMedia to determine side padding
      const sidePadding = window.matchMedia("(min-width: 768px)").matches
        ? SIDE_PADDING_DESKTOP * 2
        : SIDE_PADDING_MOBILE * 2;
      const count = Math.max(
        1,
        Math.floor((width - sidePadding) / CARD_MIN_WIDTH)
      );
      setVisibleCount(count);
      setStart((prev) => Math.min(prev, Math.max(0, total - count)));
    }
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [total]);

  // Only render the visible window
  const visibleItems = items.slice(start, start + visibleCount);

  function scroll(direction: "left" | "right") {
    setStart((prev) => {
      if (direction === "left") return Math.max(0, prev - visibleCount);
      return Math.min(total - visibleCount, prev + visibleCount);
    });
  }

  return (
    <div
      className="w-full relative pl-6 pr-6 md:pl-16 md:pr-16"
      ref={containerRef}
    >
      {start > 0 && (
        <button
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full shadow p-2 hover:bg-blue-100"
          onClick={() => scroll("left")}
        >
          &#8592;
        </button>
      )}
      {start + visibleCount < total && (
        <button
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full shadow p-2 hover:bg-blue-100"
          onClick={() => scroll("right")}
        >
          &#8594;
        </button>
      )}
      <div className="flex w-full overflow-hidden">
        {visibleItems.map((child, i) => (
          <div
            key={start + i}
            className="flex-shrink-0 min-w-[280px] max-w-full px-0.5"
            style={{ width: `calc(100%/${visibleCount})` }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
