"use client";
import { createContext, useContext, useEffect, useState } from "react";
type Library = {
  favorites: string[];
  toggle: (id: string) => void;
  ready: boolean;
};
const Context = createContext<Library>({
  favorites: [],
  toggle: () => {},
  ready: false,
});
export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("lume-favorites") || "[]");
      if (Array.isArray(saved))
        setFavorites(saved.filter((v: unknown) => typeof v === "string"));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem("lume-favorites", JSON.stringify(favorites));
      } catch {}
    }
  }, [favorites, ready]);
  return (
    <Context.Provider
      value={{
        favorites,
        ready,
        toggle: (id) =>
          setFavorites((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
          ),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useLibrary = () => useContext(Context);
