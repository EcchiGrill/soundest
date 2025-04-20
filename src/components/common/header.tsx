import { IoMusicalNotes } from "react-icons/io5";
import CreateTrackButton from "../ui/create-track-button";

const Header = () => {
  return (
    <header className="flex py-7 px-5 place-items-center justify-between border-b border-secondary">
      <div className="flex gap-3 text-3xl place-items-center text-primary font-bold">
        <IoMusicalNotes /> <h1>Soundest</h1>
      </div>
      <CreateTrackButton />
    </header>
  );
};

export default Header;
