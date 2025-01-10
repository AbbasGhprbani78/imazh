import React, { useContext } from 'react'
import styles from './ThemeTab.module.css'
import { MyContext } from '@/context/context';
export default function ThemeTab() {
 const { theme, setTheme } = useContext(MyContext);

 const handleThemeChange = (newTheme) => {
   setTheme(newTheme);
 };

 return (
   <div>
     <p>Current Theme: {theme}</p>
     <button onClick={() => handleThemeChange("dark")}>Dark Theme</button>
     <button onClick={() => handleThemeChange("light")}>Light Theme</button>
     <button onClick={() => handleThemeChange("blue")}>Blue Theme</button>
   </div>
 );
}
