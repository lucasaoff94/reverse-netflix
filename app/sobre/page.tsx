import Link from "next/link";
export default function About() {
  return (
    <main className="about-project">
      <Link href="/" className="eyebrow">
        ← VOLTAR AO LUME
      </Link>
      <h1>Histórias que ficam.</h1>
      <p>
        LUME é um protótipo de plataforma de streaming com identidade própria,
        criado com Next.js, React e Tailwind CSS.
      </p>
      <h2>Um universo fictício, uma experiência real.</h2>
      <p>
        Os 12 títulos, sinopses, metadados e recomendações são fictícios. O
        indicador “98% para você” é ilustrativo e não resulta de análise de
        dados pessoais. Não há assinatura, cobrança, conta ou transmissão de
        filmes completos.
      </p>
      <h2>Conteúdo original</h2>
      <p>
        A paisagem de Além do Horizonte foi gerada por IA para este projeto. As
        demais ilustrações vetoriais foram criadas para o LUME. O vídeo
        demonstrativo é uma animação original de 20 segundos dessa paisagem, sem
        áudio narrado. Todos os títulos reproduzem a mesma prévia.
      </p>
      <h2>Sua lista, no seu navegador.</h2>
      <p>
        Favoritos ficam no armazenamento local deste navegador. Eles não são
        enviados a um servidor ou sincronizados com outros dispositivos.
      </p>
      <h2>Referência de experiência</h2>
      <p>
        Este projeto explora padrões comuns de catálogos audiovisuais: banner de
        destaque, navegação por categorias, carrosséis e páginas de detalhes.
        Não possui vínculo com a Netflix e não utiliza suas marcas, imagens ou
        código. A análise ao vivo da referência foi bloqueada pela rede deste
        ambiente.
      </p>
      <Link className="button button-primary" href="/">
        Explorar as histórias ↗
      </Link>
    </main>
  );
}
