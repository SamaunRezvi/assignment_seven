import { Suspense } from "react";
import { HomeContent } from "@/components/home/home-content";
import { HomeSkeleton } from "@/components/home/home-skeleton";

export default function HomePage() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
