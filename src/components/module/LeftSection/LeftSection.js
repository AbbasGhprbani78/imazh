"use client";

import styles from "./LeftSection.module.css";

export default function LeftSection({ children, isExpanded }) {
  return (
    <div
      className={`${styles.camera_container} ${
        isExpanded ? styles.full_screen : ""
      }`}
    >
      {children}
    </div>
  );
}
