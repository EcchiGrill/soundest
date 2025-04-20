import { IoMusicalNotes } from "react-icons/io5";

const Header = () => {
  return (
    <header className="flex gap-3 py-7 pl-5 place-items-center text-3xl text-primary font-bold border-b border-secondary">
      <IoMusicalNotes /> <h1>Soundest</h1>
    </header>
  );
};

export default Header;
