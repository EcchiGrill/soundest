import Tracks from "./tracks";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import FilterPanel from "./filter-panel";
import { ILibraryProps } from "./library.props";

const Library = ({ searchParams }: ILibraryProps) => {
  return (
    <main className="p-8">
      <h2 className="text-2xl text-primary font-semibold">
        Your music library
      </h2>
      <Suspense fallback={<Skeleton className="w-full h-[2rem]" />}>
        <FilterPanel />
      </Suspense>

      <Suspense
        fallback={
          <main className="p-10 grid grid-cols-4 gap-8">
            <Skeleton className="w-[30rem] h-[35rem]" />
            <Skeleton className="w-[30rem] h-[35rem]" />
            <Skeleton className="w-[30rem] h-[35rem]" />
          </main>
        }
      >
        <Tracks searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default Library;
