"use client";
import { publicPath } from "@/lib/paths";
import { X, Clapperboard } from "lucide-react";
import { useEffect, useRef, useState } from "react";
export function Player({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>(
            "[data-player] button,[data-player] video",
          ),
        );
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div className="player-overlay" onClick={onClose}>
      <section
        data-player
        role="dialog"
        aria-modal="true"
        aria-labelledby="player-title"
        className="player-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="player-heading">
          <div>
            <span className="eyebrow">
              <Clapperboard size={14} /> CINEMA LUME
            </span>
            <h2 id="player-title">{title}</h2>
          </div>
          <button
            ref={closeRef}
            className="icon-button"
            aria-label="Fechar player"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        <video
          controls
          autoPlay
          playsInline
          preload="metadata"
          poster={publicPath("/art/hero.jpg")}
          onError={() => setError(true)}
          tabIndex={0}
        >
          <source src={publicPath("/media/lume-demo.mp4")} type="video/mp4" />
          <track
            kind="captions"
            src={publicPath("/media/demo.vtt")}
            srcLang="pt-BR"
            label="Português"
            default
          />
        </video>
        {error && (
          <p role="alert">
            Não foi possível carregar o vídeo. Tente recarregar a página.
          </p>
        )}
        <p className="player-note">
          Prévia demonstrativa original · 20 segundos · sem áudio narrado
          <br />O catálogo é fictício. Todos os títulos exibem esta mesma
          demonstração visual.
        </p>
      </section>
    </div>
  );
}
