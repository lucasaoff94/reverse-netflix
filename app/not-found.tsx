import Link from "next/link";
export default function NotFound() {
  return (
    <main className="empty-state error-page">
      <span className="eyebrow">FORA DE CENA · 404</span>
      <h1>Essa história ainda não existe.</h1>
      <p>Mas temos outros universos esperando por você.</p>
      <Link href="/" className="button button-primary">
        Voltar ao catálogo
      </Link>
    </main>
  );
}
