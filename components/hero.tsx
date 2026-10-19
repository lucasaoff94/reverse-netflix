"use client";
import { publicPath } from "@/lib/paths";
import Link from "next/link";
import { Play, ArrowUpRight, VolumeX, Plus, Check } from "lucide-react";
import { useState } from "react";
import { titles } from "@/lib/catalog";
import { useLibrary } from "./library";
import { Player } from "./player";
export function Hero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const { favorites, toggle } = useLibrary();
  const featured = [titles[0], titles[3], titles[1]];
  const item = featured[active];
  return (
    <section className={"hero hero-" + active} aria-label="Em destaque">
      <div
        className="hero-art"
        key={active}
        style={{
          backgroundImage: `url('${publicPath("/art/" + (active === 0 ? "hero.jpg" : item.art + ".svg"))}')`,
        }}
      />
      <div className="hero-gradient" />
      <div className="hero-content" key={item.id}>
        <div className="hero-kicker">
          <span className="short-line" />
          HISTÓRIAS QUE FICAM.
        </div>
        <div className="original-label">
          <span className="mini-brand">L</span> ORIGINAL LUME{" "}
          <span className="label-line" />{" "}
          {item.type === "Série" ? "NOVA SÉRIE" : "FILME EM DESTAQUE"}
        </div>
        <h1>
          {active === 0 ? (
            <>
              ALÉM DO
              <br />
              <em>HORIZONTE</em>
            </>
          ) : (
            item.title
          )}
        </h1>
        <div className="hero-meta">
          <span className="match">98% para você</span>
          <span>{item.year}</span>
          <span className="rating">{item.rating}</span>
          <span>{item.duration}</span>
          <span className="quality">4K</span>
        </div>
        <p className="hero-description">
          {active === 0
            ? "O universo é infinito. A coragem de ir além, também. Uma viagem ao desconhecido que vai mudar tudo o que você conhece."
            : item.description}
        </p>
        <div className="hero-buttons">
          <button
            className="button button-primary"
            onClick={() => setPlaying(true)}
          >
            <Play size={18} fill="currentColor" />
            Assistir prévia
          </button>
          <Link className="button button-secondary" href={"/titulo/" + item.id}>
            Mais informações
            <ArrowUpRight size={18} />
          </Link>
          <button
            className="hero-save"
            aria-label={
              (favorites.includes(item.id) ? "Remover " : "Adicionar ") +
              item.title +
              (favorites.includes(item.id)
                ? " da minha lista"
                : " à minha lista")
            }
            aria-pressed={favorites.includes(item.id)}
            onClick={() => toggle(item.id)}
          >
            {favorites.includes(item.id) ? (
              <Check size={22} />
            ) : (
              <Plus size={22} />
            )}
          </button>
        </div>
        <div className="hero-note">
          <span /> UMA NOVA PERSPECTIVA A CADA PLAY
        </div>
      </div>
      <div className="hero-bottom-right">
        <span className="sound-label">
          <VolumeX size={16} /> PRÉVIA SEM ÁUDIO
        </span>
        <div className="hero-pagination">
          <span>
            0{active + 1}
            <small> / 03</small>
          </span>
          <div>
            {featured.map((t, i) => (
              <button
                key={t.id}
                aria-label={"Destacar " + t.title}
                aria-pressed={active === i}
                className={active === i ? "selected" : ""}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="hero-caption">
        EXPLORE ALÉM DO ÓBVIO <span>↓</span>
      </div>
      {playing && (
        <Player title={item.title} onClose={() => setPlaying(false)} />
      )}
    </section>
  );
}
