import { getTracks } from "@/api/tracks";
import Track from "./track";
import { ITracksProps } from "./tracks.props";


const Tracks = async ({ searchParams }: ITracksProps) => {
  const tracks = (await getTracks(new URLSearchParams(searchParams).toString()))
    .data;

  return (
    <div className="grid grid-cols-4 gap-8 mt-10">
      {tracks.map((track, i) => (
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
  );
};

export default Tracks;
