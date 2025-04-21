"use client";

import { BsThreeDots } from "react-icons/bs";
import { Button } from "./button";
import { useContext } from "react";
import { ModalContext } from "../provider/modal-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { MdOutlineModeEditOutline, MdDelete, MdUpload } from "react-icons/md";

const EditTrackButton = ({ slug }: { slug: string }) => {
  const { setModal, setActiveSlug } = useContext(ModalContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-secondary p-0" variant="link">
          <BsThreeDots className="min-h-5 min-w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-primary bg-background border border-secondary/20">
        <DropdownMenuItem
          onClick={() => {
            setModal("EditTrack");
            setActiveSlug(slug);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <MdOutlineModeEditOutline /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setModal("UploadTrack")}>
          <MdUpload /> Upload Audio
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => setModal("DeleteTrack")}
        >
          <MdDelete /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditTrackButton;
