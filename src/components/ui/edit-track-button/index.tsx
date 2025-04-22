"use client";

import { BsThreeDots } from "react-icons/bs";
import { Button } from "../button";
import { useContext, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { MdOutlineModeEditOutline, MdDelete, MdUpload } from "react-icons/md";
import { IEditTrackButtonProps } from "./edit-track-button.props.";
import { ModalContext } from "@/components/provider/modal-provider";
import { Input } from "../input";
import { uploadAudioFileById } from "@/api/tracks";
import { useRouter } from "next/navigation";
import { FaRegFileAudio } from "react-icons/fa";
import { toast } from "react-toastify";
import { AUDIO_SIZE_LIMIT } from "@/constants";

const EditTrackButton = ({ slug, id }: IEditTrackButtonProps) => {
  const { setModal, setActiveSlug, setActiveId } = useContext(ModalContext);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) return;
    if (file.size > AUDIO_SIZE_LIMIT) {
      toast.error("File size exceeds 10MB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("audioFile", file);

    await uploadAudioFileById(id, formData);
    toast.success("Audio file uploaded successfully!");
    router.refresh();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="text-secondary p-0" variant="link">
            <BsThreeDots className="min-h-5 min-w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-primary bg-background border border-secondary/20">
          <DropdownMenuItem
            data-testid={`edit-track-${id}`}
            onClick={() => {
              setActiveSlug(slug);
              setActiveId(id);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              setModal("EditTrack");
            }}
          >
            <MdOutlineModeEditOutline /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => fileInputRef.current?.click()}
            data-testid={`upload-track-${id}`}
          >
            <MdUpload /> Upload Audio
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => {
              setActiveSlug(slug);
              setActiveId(id);
              setModal("DeleteAudio");
            }}
          >
            <FaRegFileAudio /> Delete Audio
          </DropdownMenuItem>
          <DropdownMenuItem
            data-testid={`delete-track-${id}`}
            className="text-red-600"
            onClick={() => {
              setActiveSlug(slug);
              setActiveId(id);
              setModal("DeleteTrack");
            }}
          >
            <MdDelete /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".mp3, .wav"
        onChange={onFileUpload}
      />
    </>
  );
};

export default EditTrackButton;
