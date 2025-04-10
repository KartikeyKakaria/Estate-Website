import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import { useSelector } from "react-redux";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Kakaria</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 flex p-3 items-center rounded-lg">
          <input
            type="text"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            placeholder="Search"
          />
          <FaSearch />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline hover:underline text-slate-700 cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline text-slate-700 cursor-pointer">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={`${currentUser.avatar}`}
                alt="PFP"
              />
            ) : (
              <li className="hover:underline text-slate-700 cursor-pointer">
                SignIn
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
