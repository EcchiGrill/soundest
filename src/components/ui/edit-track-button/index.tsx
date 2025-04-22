"use client";

import { BsThreeDots } from "react-icons/bs";
import { Button } from "../button";
import { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { MdOutlineModeEditOutline, MdDelete, MdUpload } from "react-icons/md";
import { IEditTrackButtonProps } from "./edit-track-button.props.";
import { ModalContext } from "@/components/provider/modal-provider";

const EditTrackButton = ({ slug, id }: IEditTrackButtonProps) => {
  const { setModal, setActiveSlug, setActiveId } = useContext(ModalContext);

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
        <DropdownMenuItem>
          <MdUpload /> Upload Audio
        </DropdownMenuItem>
        <DropdownMenuItem
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
  );
};

export default EditTrackButton;
