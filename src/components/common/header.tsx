import { IoMusicalNotes } from "react-icons/io5";
import CreateTrackButton from "../ui/create-track-button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex py-7 px-5 place-items-center justify-between border-b border-secondary">
      <Link
        className="flex gap-3 text-3xl place-items-center text-primary font-bold"
        href="/"
      >
        <IoMusicalNotes /> <h1>Soundest</h1>
      </Link>
      <CreateTrackButton />
    </header>
  );
};

export default Header;
