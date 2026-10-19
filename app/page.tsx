import { Suspense } from "react";
import { Browse } from "@/components/browse";
export default function Home() {
  return (
    <Suspense fallback={<div className="loading-screen">LUME</div>}>
      <Browse />
    </Suspense>
  );
}
