import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function Navbar() {
  const { user } = useContext(UserContext);
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <header className="flex items-center justify-between">
      <nav className=" border-gray-200  rounded-2xl text-white">
        <div className="max-w-screen-xl flex items-center mx-auto p-4">
          <Link to={"/"} className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 -rotate-180 text-[#ff6130]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
            <h1 className="font-bold text-3xl text-[#ff6130]">MusicRent</h1>
          </Link>
        </div>
      </nav>
      <div className="hidden md:flex" id="navbar-default">
        <ul className="font-semibold flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-20 md:mt-0 md:border-0 ">
          <li className="p-4">
            <Link
              to={"/"}
              className=" text-gray-900 transition duration-300  hover:text-primary"
              aria-current="page"
            >
              Home
            </Link>
          </li>
          <li className="p-4">
            <Link
              to={"/"}
              className=" text-gray-900 transition duration-300  hover:text-primary"
            >
              About
            </Link>
          </li>
          <li className="p-4">
            <Link
              to={"/"}
              className=" text-gray-900 transition duration-300  hover:text-primary"
            >
              Room Models
            </Link>
          </li>
          <li className="p-4">
            <Link
              to={"/"}
              className=" text-gray-900 transition duration-300  hover:text-primary"
            >
              Our Team
            </Link>
          </li>
          <li className="p-4">
            <Link
              to={user ? "account" : "/login"}
              className=" text-gray-900 transition duration-300  hover:text-primary"
            >
              <div className="font-semibold flex px-2 py-1 text-gray-900 transition duration-300 hover:text-primary overflow-hidden">
                Sign In
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 relative top-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {!!user && <div>{user.name}</div>}
            </Link>
          </li>
        </ul>
      </div>

      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          !nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-slate-100 ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <Link to={"/"} className="flex items-center m-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 -rotate-180 text-[#ff6130]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
          <h1 className="font-bold text-3xl text-[#ff6130]">MusicRent</h1>
        </Link>
        <ul className="uppercase p-4">
          <li className="p-4 border-b border-gray-300">
            <Link
              to={"/"}
              className="p-4 text-gray-900 transition duration-300  hover:text-primary"
              aria-current="page"
            >
              Home
            </Link>
          </li>
          <li className="p-4 border-b border-gray-300">
            <Link
              to={"/"}
              className="p-4 text-gray-900 transition duration-300  hover:text-primary"
            >
              About
            </Link>
          </li>
          <li className="p-4 border-b border-gray-300">
            <Link
              to={"/"}
              className="p-4 text-gray-900 transition duration-300  hover:text-primary"
            >
              Room Models
            </Link>
          </li>
          <li className="p-4 border-b border-gray-300">
            <Link
              to={"/"}
              className="p-4 text-gray-900 transition duration-300  hover:text-primary"
            >
              Our Team
            </Link>
          </li>
          <li className="p-4">
            <Link
              to={"/"}
              className="p-4 text-gray-900 transition duration-300  hover:text-primary"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
