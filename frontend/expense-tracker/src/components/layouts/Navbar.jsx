import React from "react";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import ThemeToggle from "../ThemeToggle";

const Navbar = ({ activeMenu }) => {
  const [openNavbar, setOpenNavbar] = useState(false);
  return (
    <div className="flex justify-between items-center gap-5 bg-white dark:bg-slate-800 border border-b border-gray-200/50 dark:border-slate-700 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 transition-colors duration-200">
      <div className="flex items-center gap-5">
        <button
          className="block lg:hidden text-black dark:text-white"
          onClick={() => {
            setOpenNavbar(!openNavbar);
          }}
        >
          {openNavbar ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>
        <h2 className="text-lg font-medium text-black dark:text-white">Expense Tracker</h2>
      </div>
      
      <ThemeToggle />

      {openNavbar && (
        <div className="fixed top-[61px] -ml-4 bg-white dark:bg-slate-800">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
