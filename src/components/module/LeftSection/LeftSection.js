"use client";
import styles from "./LeftSection.module.css";

export default function LeftSection({ children }) {
  return (
    <div
      className={styles.camera_container}
    >
      {children}
    </div>
  );
}
