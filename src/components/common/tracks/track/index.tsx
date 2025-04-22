"use client";

import EditTrackButton from "@/components/ui/edit-track-button";
import { ITrackProps } from "./track.props";
import Image from "next/image";
import { BsDot } from "react-icons/bs";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { useContext } from "react";
import AudioPlayer from "./audio-player";
import { ModalContext } from "@/components/provider/modal-provider";

const Track = ({
  id,
  title,
  album,
  artist,
  coverImage,
  genres,
  audioFile,
  slug,
}: ITrackProps) => {
  const { activeId, setActiveId } = useContext(ModalContext);

  const isPlaying = activeId === id;

  const handlePlayPause = () => {
    if (isPlaying) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };

  return (
    <div className="max-w-lg p-5 flex flex-col gap-4 bg-background border border-secondary/30 rounded-lg shadow-md hover:shadow-lg transition duration-200 text-primary">
      <div className="relative group h-72 w-full rounded-lg overflow-hidden">
        <Image
          src={coverImage || "/cover-default.jpg"}
          alt={title}
          className="h-full w-full rounded-lg object-cover group-hover:brightness-75 transition duration-200"
          sizes="100vw"
          height={0}
          width={0}
        />
        {!isPlaying ? (
          <CiPlay1
            className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 hidden group-hover:block group-hover:cursor-pointer h-10 w-10"
            onClick={handlePlayPause}
          />
        ) : (
          <CiPause1
            className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 hidden group-hover:block group-hover:cursor-pointer h-10 w-10"
            onClick={handlePlayPause}
          />
        )}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h2 data-testid={`track-item-${id}-title`}>{title}</h2>
          <h3
            data-testid={`track-item-${id}-artist`}
            className="text-secondary mt-1"
          >
            {artist}
          </h3>
        </div>
        <EditTrackButton slug={slug} id={id} />
      </div>

      <div>
        {album && <h3 className="text-secondary">Album: {album}</h3>}
        <div className={`flex gap-2 ${album && "mt-2"}`}>
          {genres.map((genre, i) => (
            <span
              key={i}
              className="rounded-full bg-gray-800 px-2 py-1 text-sm font-semibold text-primary"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {audioFile ? (
        <AudioPlayer
          activeId={id}
          audioFile={audioFile}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
      ) : (
        <div className="flex items-center mt-auto text-secondary">
          <BsDot className="h-8 w-8" />
          <span>Audio unavailable</span>
        </div>
      )}
    </div>
  );
};

export default Track;
