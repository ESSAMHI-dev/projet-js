import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  // Update the document class and localStorage when theme changes
  useEffect(() => {
    const root = document.documentElement;
    console.log("Theme changed to:", theme);
    if (theme === "dark") {
      root.classList.add("dark");
      console.log("Dark class added to root element");
    } else {
      root.classList.remove("dark");
      console.log("Dark class removed from root element");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to change between light and dark mode
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
