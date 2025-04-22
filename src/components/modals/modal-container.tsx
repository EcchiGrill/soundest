"use client";

import { useContext } from "react";
import { ModalContext } from "../provider/modal-provider";
import CreateTrack from "./create-track";
import EditTrack from "./edit-track";
import DeleteTrack from "./delete-track";
import DeleteAudio from "./delete-audio";

const ModalContainer = () => {
  const { modal } = useContext(ModalContext);

  const renderModal = () => {
    switch (modal) {
      case "CreateTrack":
        return <CreateTrack />;
      case "EditTrack":
        return <EditTrack />;
      case "DeleteTrack":
        return <DeleteTrack />;
      case "DeleteAudio":
        return <DeleteAudio />;
      default:
        return null;
    }
  };

  return renderModal();
};

export default ModalContainer;
