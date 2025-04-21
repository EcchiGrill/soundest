"use client";

import { useContext } from "react";
import { ModalContext } from "../provider/modal-provider";
import CreateTrack from "./create-track";
import EditTrack from "./edit-track";

const ModalContainer = () => {
  const { modal } = useContext(ModalContext);

  const renderModal = () => {
    switch (modal) {
      case "CreateTrack":
        return <CreateTrack />;
      case "EditTrack":
        return <EditTrack />;
      case "UploadTrack":
        return <div>Upload Track</div>;
      case "DeleteTrack":
        return <div>Upload Track</div>;
      default:
        return null;
    }
  };

  return renderModal();
};

export default ModalContainer;
