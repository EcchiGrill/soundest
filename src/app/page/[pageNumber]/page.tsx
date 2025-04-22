import Tracks from "@/components/common/tracks";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ pageNumber: string }>;
  searchParams: Promise<Record<string, string>>;
}

const Page = async ({ params, searchParams }: PageProps) => {
  const pageNumber = (await params).pageNumber;
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
      <Tracks searchParams={queryParams} pageNumber={pageNumber} />
    </Suspense>
  );
};

export default Page;
