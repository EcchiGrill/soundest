"use client";

import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { FormEvent, useContext, useState } from "react";
import { Button } from "../ui/button";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import { ModalContext } from "../provider/modal-provider";
import { CreateTrackBody } from "@/api/requestBodies/createTrackBody";
import { createTrack } from "@/api/tracks";
import { COVER_IMAGE_REGEX } from "@/constants";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

const CreateTrack = () => {
  const { setModal, setActiveId, setActiveSlug } = useContext(ModalContext);
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [genres, setGenres] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createTrackHandler = async (body: CreateTrackBody) => {
    setIsLoading(true);
    try {
      await createTrack(body);
      setModal(null);
      setActiveId(null);
      setActiveSlug(null);
      router.refresh();
      toast.success(`Track "${title}" created successfully!`);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const onCreateTrackSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !artist || !genres.length || !album) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (title.length > 200) {
      toast.error("Title cannot be more than 200 symbols!");
      return;
    }

    if (title.length < 3) {
      toast.error("Title cannot be less than 3 symbols!");
      return;
    }

    if (artist.length > 200) {
      toast.error("Artist name cannot be more than 200 symbols!");
      return;
    }

    if (artist.length < 3) {
      toast.error("Artist name cannot be less than 3 symbols!");
      return;
    }

    if (album.length > 200) {
      toast.error("Album name cannot be more than 200 symbols!");
      return;
    }

    if (album.length < 3) {
      toast.error("Album name cannot be less than 3 symbols!");
      return;
    }

    if (coverImage && !COVER_IMAGE_REGEX.test(coverImage)) {
      toast.error("Invalid cover image URL!");
      return;
    }

    const body = {
      title,
      artist,
      album,
      genres,
      coverImage,
    };

    await createTrackHandler(body);
  };

  return (
    <>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-black text-primary flex flex-col justify-center p-8 w-[22rem] xs:w-[28rem] z-20 rounded-lg gap-3 border border-secondary/30 ">
        <Button
          className="absolute top-4 right-4 cursor-pointer h-8 w-8 p-0"
          onClick={() => {
            setModal(null);
            setActiveId(null);
            setActiveSlug(null);
          }}
          variant="link"
        >
          <IoCloseOutline className="min-w-6 min-h-6" />
        </Button>

        <div className="text-2xl font-bold mt-2">Create New Track</div>
        <p className="text-secondary">
          Add a new track to your music library. You can upload audio files
          later.
        </p>
        <form
          className="w-full flex flex-col gap-5 mt-4"
          onSubmit={onCreateTrackSubmit}
          data-testid="track-form"
        >
          <div>
            <label htmlFor="name">Title</label>
            <Input
              data-testid="input-title"
              id="name"
              className="mt-2"
              value={title}
              placeholder="Enter track title..."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="artist">Artist</label>
            <Input
              data-testid="input-artist"
              onChange={(e) => setArtist(e.target.value)}
              value={artist}
              id="artist"
              className="mt-2"
              placeholder="Enter artist name..."
            />
          </div>
          <div>
            <label htmlFor="album">Album</label>
            <Input
              data-testid="input-album"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              placeholder="Enter album name..."
              id="album"
              className="mt-2"
            />
          </div>
          <div>
            <label htmlFor="genres">Genres</label>
            <div className="flex gap-2 place-items-center mt-2 mb-3">
              <Input
                data-testid="genre-selector"
                value={genre}
                id="genres"
                placeholder="Add a genre..."
                onChange={(e) => setGenre(e.target.value)}
              />
              <Button
                type="button"
                onClick={() => {
                  if (!genre) return;
                  setGenres((prev) => [...prev, genre]);
                  setGenre("");
                }}
              >
                <IoAddOutline />
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {genres.map((genre, i) => (
                <span
                  key={i}
                  className="rounded-full bg-gray-800 px-3 py-0.5 text-sm font-semibold text-primary items-center flex gap-3 w-min"
                >
                  {genre}

                  <Button
                    type="button"
                    className="h-6 w-6 p-0 mt-0.5"
                    onClick={() => {
                      setGenres((prev) => prev.filter((g) => g !== genre));
                    }}
                    variant="link"
                  >
                    <IoCloseOutline />
                  </Button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="coverImage">Cover Image URL (Optional)</label>
            <Input
              data-testid="input-cover-image"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              id="coverImage"
              className="mt-2"
            />
          </div>

          <Button
            data-testid="submit-button"
            color="purpleBackground"
            type="submit"
            className="mx-auto px-16 mt-8"
            aria-disabled={isLoading}
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner
                className="animate-spin"
                data-testid="loading-indicator"
                data-loading="true"
              />
            ) : null}
            {isLoading ? "Creating..." : "Create Track"}
          </Button>
        </form>
      </div>
      <div className="h-full w-full fixed top-0 bg-black bg-opacity-70" />
    </>
  );
};

export default CreateTrack;
