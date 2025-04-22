"use client";

import { useContext, useState } from "react";
import { ModalContext } from "../provider/modal-provider";
import { Button } from "../ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { deleteAudioFileById } from "@/api/tracks";
import { toast } from "react-toastify";

const DeleteAudio = () => {
  const { setModal, activeId, setActiveId, setActiveSlug } =
    useContext(ModalContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteHandler = async () => {
    setIsLoading(true);
    try {
      await deleteAudioFileById(activeId as string);

      setModal(null);
      setActiveId(null);
      setActiveSlug(null);
      toast.success("Audio file deleted successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div
        data-testid="confirm-dialog"
        className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-black text-primary flex flex-col justify-center p-8 w-[30rem] z-20 rounded-lg gap-3 border border-secondary/30 "
      >
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
          <h2 className="text-xl font-semibold">Delete audio</h2>
          <p className="text-secondary text-sm mt-2">
            Are you sure you want to delete audio file related to this track?
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            data-testid="confirm-delete"
            variant="destructive"
            disabled={isLoading}
            aria-disabled={isLoading}
            onClick={() => {
              deleteHandler();
            }}
          >
            {isLoading ? (
              <FaSpinner
                className="animate-spin"
                data-testid="loading-indicator"
                data-loading="true"
              />
            ) : null}
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
          <Button
            data-testid="cancel-delete"
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

export default DeleteAudio;
