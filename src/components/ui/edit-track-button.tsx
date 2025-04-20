"use client";

import { BsThreeDots } from "react-icons/bs";
import { Button } from "./button";
import { useContext } from "react";
import { ModalContext } from "../provider/modal-provider";

const EditTrackButton = ({ slug }: { slug: string }) => {
  const { setModal, setActiveSlug } = useContext(ModalContext);

  return (
    <Button
      className="text-secondary p-0"
      variant="link"
      onClick={() => {
        setModal("EditTrack");
        setActiveSlug(slug);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <BsThreeDots className="min-h-5 min-w-5" />
    </Button>
  );
};

export default EditTrackButton;
