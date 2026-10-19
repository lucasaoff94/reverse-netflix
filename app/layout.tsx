import type { Metadata } from "next";
import "./globals.css";
import { LibraryProvider } from "@/components/library";
export const metadata: Metadata = {
  title: "LUME — Histórias que ficam",
  description:
    "Descubra novos universos. Uma experiência de cinema com catálogo fictício e conteúdo demonstrativo original.",
  applicationName: "LUME",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <LibraryProvider>{children}</LibraryProvider>
      </body>
    </html>
  );
}
