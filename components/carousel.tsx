"use client";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "./card";
import type { Title } from "@/lib/catalog";
export function Carousel({
  title,
  subtitle,
  items,
  ranked = false,
}: {
  title: string;
  subtitle?: string;
  items: Title[];
  ranked?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const scroll = (dir: number) =>
    ref.current?.scrollBy({
      left: dir * (ref.current.clientWidth * 0.85),
      behavior: "smooth",
    });
  if (!items.length) return null;
  return (
    <section className="catalog-section">
      <div className="section-heading">
        <div>
          <h2>
            {title}
            <span className="title-dot">.</span>
          </h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="carousel-arrows">
          <button
            aria-label={"Anterior em " + title}
            disabled={atStart}
            onClick={() => scroll(-1)}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            aria-label={"Próximo em " + title}
            disabled={atEnd}
            onClick={() => scroll(1)}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <div
        className="carousel"
        ref={ref}
        onScroll={() => {
          const el = ref.current;
          if (el) {
            setAtStart(el.scrollLeft < 10);
            setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
          }
        }}
      >
        {items.map((item, i) => (
          <Card item={item} index={i} ranked={ranked} key={item.id} />
        ))}
      </div>
    </section>
  );
}
