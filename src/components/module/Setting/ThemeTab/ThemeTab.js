import React, { useContext, useEffect, useState } from "react";
import styles from "./ThemeTab.module.css";
import { MyContext } from "@/context/context";
import ThemeBox from "../../ThemeBox/ThemeBox";

export default function ThemeTab() {
  const { theme, setTheme } = useContext(MyContext);
  const [activeTheme, setActiveTheme] = useState(theme);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    setActiveTheme(theme);
  }, [theme]);

  return (
    <div className={styles.wrap_themes}>
      <ThemeBox
        colorback={"#fff"}
        backbtn={"#aec3b0"}
        backbefore={"#9ca6ad"}
        colortext={"#535353"}
        text={"تم سبز لایت"}
        theme={"light"}
        activeTheme={activeTheme}
        onClick={() => handleThemeChange("light")}
      />
      <ThemeBox
        colorback={"#535353"}
        backbtn={"#53a7f3"}
        backbefore={"#5891df"}
        colortext={"#fff"}
        text={"تم آبی دارک"}
        theme={"dark"}
        activeTheme={activeTheme}
        onClick={() => handleThemeChange("dark")}
      />
      <ThemeBox
        colorback={"#292d32"}
        backbtn={"#f5f5f5"}
        backbefore={"#d1cce1"}
        colortext={"#fff"}
        theme={"darksilver"}
        activeTheme={activeTheme}
        text={"تم نقره‌ای دارک"}
        onClick={() => handleThemeChange("darksilver")}
      />
    </div>
  );
}
