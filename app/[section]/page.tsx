import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Browse } from "@/components/browse";
export const dynamicParams = false;
export function generateStaticParams() {
  return ["filmes", "series", "minha-lista", "buscar"].map((section) => ({
    section,
  }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!["filmes", "series", "minha-lista", "buscar"].includes(section))
    notFound();
  return (
    <Suspense fallback={<div className="loading-screen">LUME</div>}>
      <Browse mode={section} />
    </Suspense>
  );
}
