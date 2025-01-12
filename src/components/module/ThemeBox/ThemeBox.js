import React from "react";
import styles from "./ThemeBox.module.css";
import EditIcon from "@mui/icons-material/Edit";
export default function ThemeBox({
  colorback,
  backbtn,
  backbefore,
  colortext,
  text,
  onClick,
  theme,
  activeTheme,
}) {
  return (
    <>
      <div className={styles.theme_box_container}>
        <div
          className={`${styles.theme_box} ${
            theme === activeTheme ? styles.active : ""
          }`}
          style={{ background: colorback }}
          onClick={onClick}
        >
          <span className={styles.text_theme} style={{ color: colortext }}>
            {text}
          </span>
          <button
            className={styles.btn_theme}
            style={{ background: backbtn, "--before-bg": backbefore }}
          >
            <EditIcon className={styles.icon_theme} />
          </button>
        </div>
      </div>
    </>
  );
}
