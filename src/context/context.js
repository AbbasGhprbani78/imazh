"use client";
import { createContext, useState, useEffect } from "react";
import themes from "@/utils/theme";
import axios from "axios";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [allCustomer, setAllCustomer] = useState([]);
  const [operationsData, setAllOperationsData] = useState([]);
  const [allSettings, setAllSettings] = useState([]);
  const [selectTab, setSelectTab] = useState(null);
  const [theme, setTheme] = useState("dark");

  const applyTheme = (themeName) => {
    const selectedTheme = themes[themeName];
    const root = document.documentElement;

    Object.entries(selectedTheme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  const getAllCustomer = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/customer");
      if (response.status === 200) {
        setAllCustomer(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllOperation = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/operation");
      if (response.status === 200) {
        setAllOperationsData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const getAllSetting = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/setting");
      if (response.status === 200) {
        setAllSettings(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      applyTheme(theme);
    }
    getAllCustomer();
    getAllOperation();
    getAllSetting();
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <MyContext.Provider
      value={{
        selectTab,
        setSelectTab,
        theme,
        setTheme,
        setAllCustomer,
        allCustomer,
        operationsData,
        setAllOperationsData,
        allSettings,
        setAllSettings,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
