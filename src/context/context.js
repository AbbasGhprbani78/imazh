"use client";
import { createContext, useState, useEffect } from "react";
import themes from "@/utils/theme";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [selectTab, setSelectTab] = useState(null);
  const [theme, setTheme] = useState("dark");

  const applyTheme = (themeName) => {
    const selectedTheme = themes[themeName];
    const root = document.documentElement;

    Object.entries(selectedTheme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      applyTheme(theme);
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <MyContext.Provider value={{ selectTab, setSelectTab, theme, setTheme }}>
      {children}
    </MyContext.Provider>
  );
};
