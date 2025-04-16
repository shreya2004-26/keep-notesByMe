import { IoSearchSharp } from "react-icons/io5";
import { IoReorderThreeSharp } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import logo from "../assets/keepNotesLogo.png";
import { TfiViewList } from "react-icons/tfi";
import { FaListUl, FaUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useSearch } from "../context/SearchContext";
import { CiGrid41 } from "react-icons/ci";
const Header = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  const { view, setView } = useSearch();
  console.log("Initial value if view is", view);

  const toggleView = () => {
    console.log("Hi");

    setView((prev) => {
      console.log("prev is: ", prev);

      return prev === "list" ? "grid" : "list";
    });
  };
  return (
    <div className="flex justify-between items-center p-4 border-b border-b-gray-300">
      <div className="flex justify-between ">
        <div className="flex justify-center items-center gap-5 px-5 mr-8 text-gray-600 text-2xl">
          <IoReorderThreeSharp />
          <img src={logo} width="35px" />
          <p>Keep</p>
        </div>

        <div className="flex items-center gap-2 border-1 rounded p-3 bg-gray-200 border-none w-xl text-[17px]">
          <IoSearchSharp className="text-gray-500" />
          <input
            className="border-none outline-none"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-x-16 px-5 text-2xl text-gray-600">
        <div className="flex items-center gap-5">
          <IoMdRefresh />
          {/* <TfiViewList /> */}
          <button onClick={toggleView}>
            {console.log("view is: ", view)}
            {view === "list" ? <CiGrid41 /> : <FaListUl />}
          </button>
          <IoSettingsOutline />
        </div>
        <FaUser />
      </div>
    </div>
  );
};

export default Header;
