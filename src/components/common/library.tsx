import { getTracks } from "@/api/tracks";
import Track from "../ui/track";

const Library = async () => {
  const tracks = (await getTracks()).data;

  return (
    <main className="p-10 grid grid-cols-4 gap-8">
      {tracks.map((track, i) => (
        <Track
          key={i}
          album={track.album}
          artist={track.artist}
          coverImage={track.coverImage}
          genres={track.genres}
          title={track.title}
          audioFile={track.audioFile}
        />
      ))}
    </main>
  );
};

export default Library;
