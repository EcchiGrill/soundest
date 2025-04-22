"use client";

import { useContext, useState } from "react";
import { ModalContext } from "../provider/modal-provider";
import { Button } from "../ui/button";
import { deleteTrackById } from "@/api/tracks";
import { IoCloseOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

const DeleteTrack = () => {
  const { setModal, activeId, setActiveId, setActiveSlug } =
    useContext(ModalContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteHandler = async () => {
    setIsLoading(true);
    try {
      await deleteTrackById(activeId as string);

      setModal(null);
      setActiveId(null);
      setActiveSlug(null);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-black text-primary flex flex-col justify-center p-8 w-[30rem] z-20 rounded-lg gap-3 border border-secondary/30 ">
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

        <div>
          <h2 className="text-xl font-semibold">Delete track</h2>
          <p className="text-secondary text-sm mt-2">
            Are you sure you want to delete this track? This action cannot be
            undone.
          </p>
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={() => {
              deleteHandler();
            }}
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : null}
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => {
              setModal(null);
              setActiveId(null);
              setActiveSlug(null);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
      <div className="h-full w-full fixed top-0 bg-black bg-opacity-70" />
    </>
  );
};

export default DeleteTrack;
