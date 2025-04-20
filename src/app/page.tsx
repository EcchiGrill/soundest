import Header from "@/components/common/header";
import Library from "@/components/common/library";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <main className="p-10 grid grid-cols-4 gap-8">
            <Skeleton className="w-[30rem] h-[35rem]" />
            <Skeleton className="w-[30rem] h-[35rem]" />
            <Skeleton className="w-[30rem] h-[35rem]" />
          </main>
        }
      >
        <Library />
      </Suspense>
    </>
  );
}
