import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      const navaction = document.getElementById("navAction");
      const toToggle = document.querySelectorAll(".toggleColour");

      if (window.scrollY > 10) {
        header.classList.add("bg-white");
        navaction.classList.remove("bg-white");
        navaction.classList.add("gradient");
        navaction.classList.remove("text-gray-800");
        navaction.classList.add("text-white");
        toToggle.forEach((el) => {
          el.classList.add("text-gray-800");
          el.classList.remove("text-white");
        });
        header.classList.add("shadow");
      } else {
        header.classList.remove("bg-white");
        navaction.classList.remove("gradient");
        navaction.classList.add("bg-white");
        navaction.classList.remove("text-white");
        navaction.classList.add("text-gray-800");
        toToggle.forEach((el) => {
          el.classList.add("text-white");
          el.classList.remove("text-gray-800");
        });
        header.classList.remove("shadow");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="header" className="fixed w-full z-30 top-0 text-white max-w-full">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <a
            className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="#"
          >
            <svg
              className="h-8 fill-current inline"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="#2a2a31"
                d="M9 11C10.66 11 12 9.66 12 8S10.66 5 9 5 6 6.34 6 8s1.34 3 3 3zm6 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zM9 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm6 0c-.29 0-.62.02-.97.05C15.99 13.94 17 15.23 17 16.5V19h4v-2.5c0-2.33-4.67-3.5-7-3.5z"
              />
            </svg>
            ORCID
          </a>
        </div>
        <div className="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <Link
                to="/login"
                className="inline-block py-2 px-4 text-black font-bold no-underline"
              >
                Action
              </Link>
            </li>
            <li className="mr-3">
              <Link
                to="/login"
                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
              >
                Link
              </Link>
            </li>
            <li className="mr-3">
              <Link
                to="/login"
                className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                href="#"
              >
                Link
              </Link>
            </li>
          </ul>
          <Link
            to="/login"
            id="navAction"
            className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            Action
          </Link>
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
};

export default Navbar;