import React, { useState } from "react";
import styles from "./Preview.module.css";
import LayersIcon from "@mui/icons-material/Layers";
export default function Preview({
  children,
  toggleModalBottom,
  isExpanded,
  toggleExpand,
 
}) {
  return (
    <div
      className={`${styles.wrap_preview} ${isExpanded && styles.full_screen}  `}
    >
      <div className={styles.icon_top_wrapper_left} onClick={toggleExpand}>
        <img src="/images/4.svg" alt="icon" />
      </div>
      <div
        className={styles.icon_top_wrapper_right}
        onClick={toggleModalBottom}
      >
        <LayersIcon className={styles.icon} />
      </div>
      {children}
    </div>
  );
}
