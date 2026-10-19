import { Suspense } from "react";
import { notFound } from "next/navigation";
import { titles } from "@/lib/catalog";
import { Details } from "@/components/details";
export const dynamicParams = false;
export function generateStaticParams() {
  return titles.map((t) => ({ slug: t.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      (titles.find((t) => t.id === slug)?.title || "Título não encontrado") +
      " — LUME",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = titles.find((t) => t.id === slug);
  if (!item) notFound();
  return (
    <Suspense>
      <Details item={item} />
    </Suspense>
  );
}
