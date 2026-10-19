"use client";
import { publicPath } from "@/lib/paths";
import { useState } from "react";
import Link from "next/link";
import { Play, Plus, Check, ArrowLeft, ArrowUpRight } from "lucide-react";
import { type Title, titles } from "@/lib/catalog";
import { Header } from "./header";
import { Footer } from "./footer";
import { Player } from "./player";
import { Carousel } from "./carousel";
import { useLibrary } from "./library";
export function Details({ item }: { item: Title }) {
  const [playing, setPlaying] = useState(false);
  const { favorites, toggle } = useLibrary();
  const saved = favorites.includes(item.id);
  return (
    <>
      <Header />
      <main>
        <section className="detail-hero">
          <img
            className="detail-art"
            src={publicPath(
              "/art/" +
                (item.id === "alem-do-horizonte"
                  ? "hero.jpg"
                  : item.art + ".svg"),
            )}
            alt={"Arte original de " + item.title}
          />
          <div className="detail-shade" />
          <div className="detail-content">
            <Link href="/" className="back-link">
              <ArrowLeft size={17} />
              Voltar ao catálogo
            </Link>
            <span className="eyebrow">
              ORIGINAL LUME · {item.type.toUpperCase()}
            </span>
            <h1>{item.title}</h1>
            <p className="detail-tagline">{item.subtitle}</p>
            <div className="hero-meta">
              <span className="match">98% para você</span>
              <span>{item.year}</span>
              <span className="rating">{item.rating}</span>
              <span>{item.duration}</span>
              <span className="quality">4K</span>
            </div>
            <p className="detail-description">{item.description}</p>
            <div className="hero-buttons">
              <button
                className="button button-primary"
                onClick={() => setPlaying(true)}
              >
                <Play size={18} fill="currentColor" />
                Assistir prévia
              </button>
              <button
                className="button button-secondary"
                aria-pressed={saved}
                onClick={() => toggle(item.id)}
              >
                {saved ? <Check size={18} /> : <Plus size={18} />}
                {saved ? "Na minha lista" : "Minha lista"}
              </button>
            </div>
            <div className="detail-tags">
              {item.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </section>
        <div className="catalog-wrap detail-body">
          <section className="about-title">
            <div>
              <span className="eyebrow">POR TRÁS DA HISTÓRIA</span>
              <h2>
                Sobre {item.title}
                <span className="title-dot">.</span>
              </h2>
              <p>{item.description}</p>
            </div>
            <dl>
              <div>
                <dt>Gênero</dt>
                <dd>{item.genre}</dd>
              </div>
              <div>
                <dt>Formato</dt>
                <dd>{item.type}</dd>
              </div>
              <div>
                <dt>Classificação indicativa</dt>
                <dd>{item.rating === "L" ? "Livre" : item.rating + " anos"}</dd>
              </div>
              <div>
                <dt>Disponibilidade</dt>
                <dd>Prévia demonstrativa original</dd>
              </div>
            </dl>
          </section>
          {item.type === "Série" && (
            <section className="episodes">
              <div className="section-heading">
                <h2>Episódios</h2>
                <span className="muted">Temporada 1 · Catálogo fictício</span>
              </div>
              {[
                "O primeiro sinal",
                "Entre dois mundos",
                "Um novo horizonte",
              ].map((name, i) => (
                <button
                  className="episode"
                  key={name}
                  onClick={() => setPlaying(true)}
                >
                  <span className="episode-num">0{i + 1}</span>
                  <img src={publicPath("/art/" + item.art + ".svg")} alt="" />
                  <div>
                    <h3>{name}</h3>
                    <p>Uma nova descoberta transforma o rumo desta jornada.</p>
                    <small>Exibe a prévia demonstrativa de 20 segundos.</small>
                  </div>
                  <Play size={22} />
                </button>
              ))}
            </section>
          )}
          <Carousel
            title="Continue descobrindo"
            items={titles.filter((t) => t.id !== item.id).slice(0, 7)}
          />
          <Link href="/sobre" className="demo-disclosure">
            Este título faz parte de um catálogo fictício. Saiba mais sobre o
            projeto <ArrowUpRight size={15} />
          </Link>
        </div>
      </main>
      <Footer />
      {playing && (
        <Player title={item.title} onClose={() => setPlaying(false)} />
      )}
    </>
  );
}
