"use client"
import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [selectTab, setSelectTab] = useState(null);
  return (
    <MyContext.Provider value={{ selectTab, setSelectTab }}>
      {children}
    </MyContext.Provider>
  );
};
