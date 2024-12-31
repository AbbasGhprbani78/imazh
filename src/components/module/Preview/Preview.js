import React, { useState } from "react";
import styles from "./Preview.module.css";
export default function Preview({ children}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div
      className={`${styles.wrap_preview} ${isExpanded && styles.full_screen}`}
    >
      <div className={styles.icon_top_wrapper_left} onClick={toggleExpand}>
        <img src="/images/4.svg" alt="icon" />
      </div>
      {children}
    </div>
  );
}
