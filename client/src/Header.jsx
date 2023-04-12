import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="flex justify-between">
      <Link to={"/"} className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 -rotate-180"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
        <span className="font-bold text-xl">MusicRent</span>
      </Link>
      <nav className=" border-gray-200  rounded-2xl text-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-semibold flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-20 md:mt-0 md:border-0 ">
              <li>
                <Link
                  to={"/"}
                  className="flex py-2 pl-3 pr-4 text-gray-900 rounded transition duration-300  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="flex py-2 pl-3 pr-4 text-gray-900 rounded transition duration-300 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 "
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="flex py-2 pl-3 pr-4 text-gray-900 rounded transition duration-300 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 "
                >
                  Room Models
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="flex py-2 pl-3 pr-4 text-gray-900 rounded transition duration-300 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0     "
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="flex py-2 pl-3 pr-4 text-gray-900 rounded transition duration-300 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0    "
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Link
        to={user ? "account" : "/login"}
        className="flex items-center gap-6 rounded-lg py-2 px-4"
      >
        <div className="font-semibold flex px-2 py-1  text-gray-900 rounded transition duration-300 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 overflow-hidden">
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
    </header>
  );
}
