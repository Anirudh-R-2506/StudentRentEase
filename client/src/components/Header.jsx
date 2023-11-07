import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-blue-100 shadow-md">
      <div className="flex items-center justify-between max-w-6xl p-3 mx-auto">
        <Link to={"/"}>
          <h1 className="flex flex-wrap text-sm font-bold sm:text-xl">
            <span className="text-blue-500">Student</span>
            <span className="text-blue-700">RentEase</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="flex items-center p-3 rounded-lg bg-blue-50"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-24 bg-transparent focus:outline-none sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-blue-500" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="hidden text-blue-700 sm:inline hover:underline">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden text-blue-700 sm:inline hover:underline">
              About
            </li>
          </Link>

          <Link to={"/profile"}>
            {currentUser ? (
              <img
                className="object-cover rounded-full h-7 w-7"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-blue-700 hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
