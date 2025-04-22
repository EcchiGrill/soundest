"use client";
import { useContext } from "react";
import { Button } from "../ui/button";
import { ModalContext } from "../provider/modal-provider";

const CreateTrackButton = () => {
  const { setModal } = useContext(ModalContext);

  return (
    <Button
      onClick={() => setModal("CreateTrack")}
      data-testid="create-track-button"
    >
      Add Track
    </Button>
  );
};

export default CreateTrackButton;
