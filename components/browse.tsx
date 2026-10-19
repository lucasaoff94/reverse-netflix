"use client";
import { publicPath } from "@/lib/paths";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Search,
  Bookmark,
  SlidersHorizontal,
  Clapperboard,
} from "lucide-react";
import { titles, genres } from "@/lib/catalog";
import { useLibrary } from "./library";
import { Header } from "./header";
import { Hero } from "./hero";
import { Card } from "./card";
import { Carousel } from "./carousel";
import { Footer } from "./footer";
export function Browse({ mode = "home" }: { mode?: string }) {
  const [genre, setGenre] = useState("Todos");
  const [sort, setSort] = useState("recommended");
  const params = useSearchParams();
  const query = params.get("q") || "";
  const { favorites, ready } = useLibrary();
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  let filtered = titles.filter(
    (t) =>
      (mode !== "filmes" || t.type === "Filme") &&
      (mode !== "series" || t.type === "Série") &&
      (mode !== "minha-lista" || favorites.includes(t.id)) &&
      (genre === "Todos" || t.genre === genre) &&
      (mode !== "buscar" ||
        normalize(
          [t.title, t.genre, t.description, ...t.tags].join(" "),
        ).includes(normalize(query))),
  );
  if (sort === "name")
    filtered = [...filtered].sort((a, b) =>
      a.title.localeCompare(b.title, "pt-BR"),
    );
  if (sort === "newest")
    filtered = [...filtered].sort((a, b) => b.year - a.year);
  const heading =
    mode === "filmes"
      ? "Uma boa história muda tudo."
      : mode === "series"
        ? "Só mais um episódio."
        : mode === "minha-lista"
          ? "Suas próximas histórias."
          : query
            ? `Resultados para “${query}”`
            : "Qual história você procura?";
  return (
    <>
      <Header />
      <main>
        {mode === "home" && <Hero />}
        {mode !== "home" && (
          <div className="page-intro">
            <span className="eyebrow">
              {mode === "minha-lista"
                ? "SUA CURADORIA"
                : mode === "buscar"
                  ? "EXPLORE O CATÁLOGO"
                  : "UM UNIVERSO DE POSSIBILIDADES"}
            </span>
            <h1>{heading}</h1>
            <p>
              {mode === "minha-lista"
                ? "Os títulos que você quer guardar para depois."
                : mode === "buscar"
                  ? "Busque por título, gênero ou por aquilo que você quer sentir."
                  : mode === "series"
                    ? "Novos mundos que merecem mais tempo."
                    : "Escolha o seu próximo destino, sem sair do sofá."}
            </p>
            {mode === "buscar" && (
              <form action={publicPath("/buscar/")} className="large-search">
                <Search size={20} />
                <input
                  name="q"
                  aria-label="Pesquisar no catálogo"
                  defaultValue={query}
                  key={query}
                  placeholder="Experimente: espaço, aventura, mar..."
                />
                <button className="button button-primary" type="submit">
                  Buscar
                </button>
              </form>
            )}
          </div>
        )}
        <div className="catalog-wrap">
          <div className="genre-bar">
            <div className="genre-pills" aria-label="Filtrar por gênero">
              {genres.map((g) => (
                <button
                  key={g}
                  className={genre === g ? "selected" : ""}
                  aria-pressed={genre === g}
                  onClick={() => setGenre(g)}
                >
                  {g === "Todos" && <Sparkles size={14} />}
                  {g === "Todos" && mode === "home" ? "Para você" : g}
                </button>
              ))}
            </div>
            <label className="sort-label">
              <SlidersHorizontal size={16} />
              <select
                aria-label="Ordenar catálogo"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="recommended">Recomendados</option>
                <option value="newest">Mais recentes</option>
                <option value="name">Título A–Z</option>
              </select>
            </label>
          </div>
          {mode === "home" && genre === "Todos" && sort === "recommended" ? (
            <>
              <Carousel
                title="Seu próximo grande play"
                subtitle="Histórias selecionadas para você se perder e se encontrar."
                items={titles.slice(0, 7)}
              />
              <Carousel
                title="Em alta no LUME"
                subtitle="As histórias que estão dando o que falar."
                items={[
                  titles[3],
                  titles[0],
                  titles[5],
                  titles[1],
                  titles[8],
                  titles[11],
                ]}
                ranked
              />
              <section className="editorial-banner">
                <img
                  src={publicPath("/art/montanhas.svg")}
                  alt="Montanhas ilustradas ao amanhecer"
                />
                <div className="editorial-copy">
                  <span className="eyebrow">COLEÇÃO LUME</span>
                  <h2>
                    O mundo é maior
                    <br />
                    lá fora.
                  </h2>
                  <p>Histórias para despertar o seu lado explorador.</p>
                  <button
                    onClick={() => {
                      setGenre("Aventura");
                      window.scrollTo({ top: 640, behavior: "smooth" });
                    }}
                    className="button button-secondary"
                  >
                    Explore a coleção
                    <ArrowUpRight size={18} />
                  </button>
                </div>
                <span className="editorial-number">01 — AVENTURE-SE</span>
              </section>
              <Carousel
                title="Desconecte. Sinta. Descubra."
                subtitle="Uma pausa para ver a vida por outro ângulo."
                items={[
                  titles[6],
                  titles[7],
                  titles[4],
                  titles[10],
                  titles[11],
                  titles[2],
                ]}
              />
              <div className="lume-manifesto">
                <Clapperboard size={24} />
                <p>O melhor do cinema é o que fica com você.</p>
                <span>APERTE O PLAY. SINTA A HISTÓRIA.</span>
              </div>
            </>
          ) : (
            <section className="results-section">
              <div className="results-heading">
                <h2>
                  {mode === "home"
                    ? genre === "Todos"
                      ? "Todo o catálogo"
                      : genre
                    : mode === "minha-lista"
                      ? "Minha lista"
                      : mode === "buscar"
                        ? "Histórias encontradas"
                        : mode === "filmes"
                          ? "Filmes"
                          : "Séries"}
                </h2>
                <span>
                  {filtered.length}{" "}
                  {filtered.length === 1 ? "título" : "títulos"}
                </span>
              </div>
              {mode === "minha-lista" && !ready ? (
                <p>Carregando sua lista…</p>
              ) : filtered.length ? (
                <div className="card-grid">
                  {filtered.map((item, i) => (
                    <Card item={item} index={i} key={item.id} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  {mode === "minha-lista" ? (
                    <Bookmark size={35} />
                  ) : (
                    <Search size={35} />
                  )}
                  <h2>
                    {mode === "minha-lista"
                      ? "Sua lista começa com uma boa história."
                      : "Nenhuma história por aqui."}
                  </h2>
                  <p>
                    {mode === "minha-lista"
                      ? "Use o botão + nos títulos para guardar seus favoritos neste navegador."
                      : "Tente outro título, uma palavra diferente ou remova o filtro de gênero."}
                  </p>
                  {genre !== "Todos" ? (
                    <button
                      className="button button-primary"
                      onClick={() => setGenre("Todos")}
                    >
                      Limpar filtro
                    </button>
                  ) : (
                    <Link href="/" className="button button-primary">
                      Explorar catálogo
                      <ArrowUpRight size={17} />
                    </Link>
                  )}
                </div>
              )}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
