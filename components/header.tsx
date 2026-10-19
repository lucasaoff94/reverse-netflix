"use client";
import { publicPath } from "@/lib/paths";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X, ChevronDown, Flame } from "lucide-react";
import { useState } from "react";
export function Header() {
  const path = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const [searching, setSearching] = useState(path === "/buscar");
  const [query, setQuery] = useState(params.get("q") || "");
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="LUME, início">
        <Flame fill="currentColor" strokeWidth={1.4} />
        <span>LUME</span>
        <i>●</i>
      </Link>
      <nav aria-label="Navegação principal">
        {[
          ["/", "Início"],
          ["/filmes", "Filmes"],
          ["/series", "Séries"],
          ["/minha-lista", "Minha lista"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className={(path === href ? "active " : "") + "nav-link"}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        {searching ? (
          <form
            action={publicPath("/buscar/")}
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/buscar?q=" + encodeURIComponent(query));
            }}
            className="search-form"
          >
            <Search size={17} />
            <input
              autoFocus
              aria-label="Buscar títulos"
              name="q"
              placeholder="Títulos, gêneros, histórias..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (path === "/buscar")
                  router.replace(
                    "/buscar?q=" + encodeURIComponent(e.target.value),
                    { scroll: false },
                  );
              }}
            />
            <button
              type="button"
              aria-label="Fechar busca"
              onClick={() => setSearching(false)}
            >
              <X size={16} />
            </button>
          </form>
        ) : (
          <button
            className="search-toggle"
            onClick={() => setSearching(true)}
            aria-label="Abrir busca"
          >
            <Search size={21} />
            <span>Buscar</span>
          </button>
        )}
        <span className="header-divider" />
        <div className="profile" title="Perfil local de demonstração">
          <span>L</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </header>
  );
}
