export type Title = {
  id: string;
  title: string;
  subtitle: string;
  genre: string;
  type: "Filme" | "Série";
  year: number;
  rating: string;
  duration: string;
  color: string;
  art: string;
  description: string;
  tags: string[];
};
export const titles: Title[] = [
  {
    id: "alem-do-horizonte",
    title: "Além do Horizonte",
    subtitle: "O desconhecido é só o começo.",
    genre: "Ficção científica",
    type: "Filme",
    year: 2026,
    rating: "12",
    duration: "2h 08min",
    color: "#c99351",
    art: "horizonte",
    description:
      "Quando um sinal atravessa o silêncio do universo, uma exploradora parte em direção a um planeta esquecido. Entre memórias da Terra e um horizonte impossível, ela descobre que a maior viagem acontece dentro de nós.",
    tags: ["Épico", "Contemplativo", "Exploração"],
  },
  {
    id: "mar-profundo",
    title: "Mar Profundo",
    subtitle: "Há mundos sob o silêncio.",
    genre: "Aventura",
    type: "Série",
    year: 2026,
    rating: "10",
    duration: "1 temporada",
    color: "#3bafb4",
    art: "mar",
    description:
      "Uma equipe de pesquisadores encontra uma luz que não deveria existir no fundo do oceano. Uma expedição sobre coragem, descobertas e as conexões que nos mantêm na superfície.",
    tags: ["Oceano", "Mistério", "Descobertas"],
  },
  {
    id: "ultima-estacao",
    title: "A Última Estação",
    subtitle: "Todo fim guarda um começo.",
    genre: "Drama",
    type: "Filme",
    year: 2025,
    rating: "12",
    duration: "1h 46min",
    color: "#a2afa1",
    art: "estacao",
    description:
      "Em uma estação de trem prestes a fechar, quatro desconhecidos compartilham uma noite que pode mudar o rumo de suas vidas. Um encontro delicado sobre tempo, afeto e recomeços.",
    tags: ["Emocionante", "Encontros", "Cinema independente"],
  },
  {
    id: "cidade-neon",
    title: "Cidade Neon",
    subtitle: "A noite tem suas próprias regras.",
    genre: "Suspense",
    type: "Série",
    year: 2026,
    rating: "16",
    duration: "1 temporada",
    color: "#d281b6",
    art: "neon",
    description:
      "Uma fotógrafa segue as pistas deixadas por estranhas luzes em uma metrópole que nunca dorme. Cada imagem revela um segredo e aproxima a cidade de uma verdade inesperada.",
    tags: ["Urbano", "Mistério", "Atmosférico"],
  },
  {
    id: "entre-montanhas",
    title: "Entre Montanhas",
    subtitle: "Encontre o seu caminho.",
    genre: "Aventura",
    type: "Filme",
    year: 2025,
    rating: "L",
    duration: "1h 38min",
    color: "#a4c7ae",
    art: "montanhas",
    description:
      "Dois irmãos se reencontram para percorrer uma trilha deixada pelo pai. Entre vales imensos e pequenos imprevistos, eles aprendem a caminhar juntos outra vez.",
    tags: ["Natureza", "Família", "Jornada"],
  },
  {
    id: "orbita",
    title: "Órbita",
    subtitle: "Tão longe. Tão perto.",
    genre: "Ficção científica",
    type: "Série",
    year: 2026,
    rating: "12",
    duration: "1 temporada",
    color: "#8c91c8",
    art: "orbita",
    description:
      "A bordo de uma estação isolada, seis pessoas recebem a mesma mensagem enviada do futuro. A tripulação precisa escolher entre voltar para casa e proteger o que ainda não aconteceu.",
    tags: ["Espaço", "Futuro", "Intrigante"],
  },
  {
    id: "dias-de-sol",
    title: "Dias de Sol",
    subtitle: "A vida acontece no caminho.",
    genre: "Drama",
    type: "Filme",
    year: 2025,
    rating: "L",
    duration: "1h 32min",
    color: "#e4bd75",
    art: "sol",
    description:
      "Uma pequena livraria à beira-mar vira ponto de encontro de moradores em busca de novas histórias. Um verão luminoso sobre amizade e a beleza dos dias comuns.",
    tags: ["Leve", "Acolhedor", "À beira-mar"],
  },
  {
    id: "floresta-viva",
    title: "Floresta Viva",
    subtitle: "Tudo está conectado.",
    genre: "Documentário",
    type: "Série",
    year: 2026,
    rating: "L",
    duration: "1 temporada",
    color: "#76b392",
    art: "floresta",
    description:
      "Uma jornada imaginária por ecossistemas exuberantes, narrada a partir das pequenas conexões entre árvores, rios e a vida que floresce entre eles.",
    tags: ["Natureza", "Contemplativo", "Descobertas"],
  },
  {
    id: "eco-do-tempo",
    title: "O Eco do Tempo",
    subtitle: "Algumas histórias voltam.",
    genre: "Suspense",
    type: "Filme",
    year: 2025,
    rating: "14",
    duration: "1h 54min",
    color: "#a5b5cd",
    art: "eco",
    description:
      "Ao restaurar um velho observatório, uma arquiteta escuta conversas de outra época. As vozes parecem conhecer o seu nome — e o que acontecerá na manhã seguinte.",
    tags: ["Enigmático", "Atmosférico", "Tempo"],
  },
  {
    id: "travessia",
    title: "Travessia",
    subtitle: "O mundo começa depois do medo.",
    genre: "Aventura",
    type: "Filme",
    year: 2026,
    rating: "10",
    duration: "1h 52min",
    color: "#dc9a71",
    art: "travessia",
    description:
      "Uma navegadora decide cruzar sozinha um mar desconhecido. Cartas antigas e estrelas distantes guiam uma viagem sobre encontrar coragem quando não há terra à vista.",
    tags: ["Jornada", "Inspirador", "Oceano"],
  },
  {
    id: "silencio-branco",
    title: "Silêncio Branco",
    subtitle: "Escute o que ninguém vê.",
    genre: "Drama",
    type: "Série",
    year: 2025,
    rating: "12",
    duration: "1 temporada",
    color: "#c5d1d3",
    art: "neve",
    description:
      "Uma meteorologista chega a uma vila cercada de neve. Durante o inverno mais longo em décadas, ela descobre uma comunidade que transforma solidão em pertencimento.",
    tags: ["Inverno", "Humano", "Contemplativo"],
  },
  {
    id: "jardim-da-lua",
    title: "O Jardim da Lua",
    subtitle: "Deixe a imaginação florescer.",
    genre: "Fantasia",
    type: "Filme",
    year: 2026,
    rating: "L",
    duration: "1h 28min",
    color: "#b4a5d7",
    art: "lua",
    description:
      "Uma jovem botânica encontra um jardim que só floresce à luz da lua. Para protegê-lo, precisa confiar na imaginação e em uma amizade que atravessa mundos.",
    tags: ["Mágico", "Acolhedor", "Imaginação"],
  },
];
export const genres = [
  "Todos",
  "Ficção científica",
  "Aventura",
  "Drama",
  "Suspense",
  "Documentário",
  "Fantasia",
];
