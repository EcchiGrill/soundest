import { getTracks } from "@/api/tracks";
import Track from "./track";
import { ITracksProps } from "./tracks.props";
import TracksPagination from "./tracks-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const Tracks = async ({ searchParams, pageNumber = "1" }: ITracksProps) => {
  const {
    meta: { totalPages },
    data,
  } = await getTracks(
    new URLSearchParams(searchParams).toString() + `&page=${pageNumber}`
  );

  console.log(data);

  return data.length ? (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mt-10 mb-14">
        {data.map((track, i) => (
          <Track
            key={i}
            id={track.id}
            album={track.album}
            artist={track.artist}
            coverImage={track.coverImage}
            genres={track.genres}
            title={track.title}
            audioFile={track.audioFile}
            slug={track.slug}
          />
        ))}
      </div>
      <Suspense fallback={<Skeleton className="w-full h-[2rem]" />}>
        <TracksPagination
          pageNumber={Number(pageNumber)}
          totalPages={totalPages}
        />
      </Suspense>
    </>
  ) : (
    <h1 className="text-2xl text-red-600 text-center mt-44">
      Nothing was found!
    </h1>
  );
};

export default Tracks;
