import { Link } from "react-router-dom";
import SearchBar from "./search-bar";
import Navbar from "./navbar";
import { IoMdAdd } from "react-icons/io";
import { handleAppendModal } from "src/utils/modal";

export default function Header() {
  return (
    <header className="border-b py-2 bg-white">
      <div className="mx-auto w-3/5 container flex items-center justify-between">
        {/* LOGO */}
        <Link to={"/"} className="h-12 w-auto block">
          <img
            src="/images/instagram-logo.png"
            alt="Instagram Logo"
            className="h-full w-auto"
          />
        </Link>

        {/* SEARCH */}
        <SearchBar />
        <button type="button" onClick={() => handleAppendModal('add-post')} className="w-8 h-8 bg-black text-white cursor-pointer flex items-center justify-center border border-black rounded-md">
          <IoMdAdd size={26}/>
        </button>

        {/* NAVIGATION */}
        <Navbar />
      </div> 
    </header>
  );
}
