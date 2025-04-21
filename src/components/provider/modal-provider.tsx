"use client";

import { useState, createContext, ReactNode } from "react";

type ModalType =
  | "CreateTrack"
  | "EditTrack"
  | "UploadTrack"
  | "DeleteTrack"
  | null;

interface IModalContext {
  modal: ModalType;
  setModal: (modal: ModalType) => void;
  activeSlug: string | null;
  setActiveSlug: (slug: string | null) => void;
}

export const ModalContext = createContext<IModalContext>({
  modal: null,
  setModal: () => {},
  activeSlug: null,
  setActiveSlug: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalType>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <ModalContext.Provider
      value={{ modal, setModal, activeSlug, setActiveSlug }}
    >
      {children}
    </ModalContext.Provider>
  );
};
