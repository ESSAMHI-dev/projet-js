import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors duration-200"
      aria-label="Toggle theme"
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? (
        <HiOutlineMoon className="text-xl text-gray-700 dark:text-gray-300" />
      ) : (
        <HiOutlineSun className="text-xl text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
