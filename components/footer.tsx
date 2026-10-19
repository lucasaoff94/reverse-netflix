import { Flame, ArrowUpRight } from "lucide-react";
import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link href="/" className="brand">
          <Flame fill="currentColor" />
          <span>LUME</span>
          <i>●</i>
        </Link>
        <p>Grandes histórias. Novas perspectivas.</p>
      </div>
      <div className="footer-center">
        Feito para quem sente o cinema.
        <br />
        <small>
          Projeto demonstrativo · Catálogo fictício · Conteúdo visual original
        </small>
      </div>
      <Link href="/sobre" className="footer-link">
        Conheça o projeto <ArrowUpRight size={15} />
      </Link>
      <span className="copyright">© {new Date().getFullYear()} LUME</span>
    </footer>
  );
}
