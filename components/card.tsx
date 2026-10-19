"use client";
import { publicPath } from "@/lib/paths";
import Link from "next/link";
import { Plus, Check, ArrowUpRight } from "lucide-react";
import type { Title } from "@/lib/catalog";
import { useLibrary } from "./library";
export function Card({
  item,
  index,
  ranked = false,
}: {
  item: Title;
  index: number;
  ranked?: boolean;
}) {
  const { favorites, toggle } = useLibrary();
  const saved = favorites.includes(item.id);
  return (
    <article
      className={"movie-card " + (ranked ? "ranked-card" : "")}
      style={{ "--card-color": item.color } as React.CSSProperties}
    >
      {ranked && <span className="rank-number">{index + 1}</span>}
      <div className="card-inner">
        <Link
          href={"/titulo/" + item.id}
          className="poster-link"
          aria-label={"Ver detalhes de " + item.title}
        >
          <div className="card-image">
            <img
              src={publicPath(
                "/art/" +
                  (item.art === "horizonte" ? "hero.jpg" : item.art + ".svg"),
              )}
              alt={"Paisagem ilustrada de " + item.title}
              loading="lazy"
            />
            <span className="card-vignette" />
            <span className="card-brand">
              L<span> ORIGINAL</span>
            </span>
            {index === 0 && !ranked && <span className="new-badge">NOVO</span>}
            <div className={"poster-type poster-" + item.art}>
              <span>{item.title}</span>
              <small>{item.subtitle}</small>
            </div>
            <span className="card-open">
              <ArrowUpRight size={21} />
            </span>
          </div>
        </Link>
        <div className="card-info">
          <Link href={"/titulo/" + item.id}>
            <h3>{item.title}</h3>
            <p>
              {item.year}
              <span>·</span>
              {item.genre}
              <span>·</span>
              {item.type}
            </p>
          </Link>
          <button
            className={"add-button " + (saved ? "is-saved" : "")}
            aria-label={
              (saved ? "Remover " : "Adicionar ") +
              item.title +
              (saved ? " da minha lista" : " à minha lista")
            }
            aria-pressed={saved}
            onClick={() => toggle(item.id)}
          >
            {saved ? <Check size={17} /> : <Plus size={17} />}
          </button>
        </div>
      </div>
    </article>
  );
}
