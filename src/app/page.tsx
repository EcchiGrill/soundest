import Tracks from "@/components/common/tracks";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function Home({ searchParams }: PageProps) {
  const queryParams = await searchParams;

  return (
    <Suspense
      fallback={
        <main className="p-10 grid grid-cols-4 gap-8">
          <Skeleton className="w-[30rem] h-[35rem]" />
          <Skeleton className="w-[30rem] h-[35rem]" />
          <Skeleton className="w-[30rem] h-[35rem]" />
        </main>
      }
    >
      <Tracks searchParams={queryParams} />
    </Suspense>
  );
}
