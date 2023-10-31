import { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { fetchAssetUrl } from "../functions/assetURL";

function Header() {
  const [logoImageUrl, setLogoImageUrl] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchLogoImageUrl = async () => {
      const url = await fetchAssetUrl("10dS6FjpWwkpe0cfqyjXf7");
      setLogoImageUrl(url);
    };
    fetchLogoImageUrl();
  }, []);

  // Toggle the menu state
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white dark:bg-[#201C35] sticky w-full z-20 top-0 left-0 shadow-[4px_4px_5px_0px_rgba(0,0,0,0.1)] dark:shadow-[5px_5px_5px_0px_rgba(0,0,0,0.3)] ">
      <div className="max-w-screen-xl flex md:flex-col flex-wrap items-center justify-between mx-auto p-4">
        <span className="flex items-center">
          {logoImageUrl && (
            <img
              className="w-[2.5em] md:w-[4em]"
              src={logoImageUrl}
              alt="Logo"
            />
          )}
          <p className="text-xl ml-3 md:text-4xl">The Full-Spectrum Coder</p>
        </span>
        <div className="flex">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-12 h-12 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            menuOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <NavLink
                to="/"
                className="text-lg block py-2 pl-3 pr-4 underline decoration-transparent hover:decoration-[#ff4656d1] md:p-0"
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="text-lg block py-2 pl-3 pr-4 underline decoration-transparent hover:decoration-[#ff4656d1] md:p-0"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/glossary"
                className="text-lg block py-2 pl-3 pr-4 underline decoration-transparent hover:decoration-[#ff4656d1] md:p-0"
              >
                Glossary
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </nav>
  );
}
export default Header;
